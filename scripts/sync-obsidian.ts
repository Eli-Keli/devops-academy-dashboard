import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { dashboardData, roadmapData, labsData, reviewsData } from '../src/lib/mock-data'
import type { AcademyState } from '../src/lib/data/fetcher'

const OUTPUT_FILE = path.resolve(process.cwd(), 'src/lib/data/academy-state.json')

async function readObsidianFile(): Promise<{ content: string; filePath: string }> {
  const paths = [
    process.env.OBSIDIAN_FILE,
    '/Users/mac/Knowledge/Obsidian/OBSIDIAN-Devops-Academy-System.md',
    '/Users/mac/Desktop/ANTIGRAVITY/DevOps Academy Context/OBSIDIAN-Devops-Academy-System.md',
    path.resolve(process.cwd(), '../DevOps Academy Context/OBSIDIAN-Devops-Academy-System.md'),
    path.resolve(process.cwd(), 'DevOps Academy Context/OBSIDIAN-Devops-Academy-System.md')
  ].filter((p): p is string => !!p)

  for (const filePath of paths) {
    try {
      const content = await fs.readFile(filePath, 'utf-8')
      return { content, filePath }
    } catch (e) {
      // Continue searching
    }
  }
  throw new Error('Could not find or read OBSIDIAN-Devops-Academy-System.md at any configured paths.')
}

async function runSync() {
  let fileContent = ''
  let resolvedPath = ''
  try {
    const result = await readObsidianFile()
    fileContent = result.content
    resolvedPath = result.filePath
    console.log(`Starting sync pipeline from: ${resolvedPath}`)
  } catch (error: any) {
    console.error(`Error: ${error.message || error}. Falling back to defaults.`)
    await writeDefaultState()
    return
  }

  // Parse sections
  const sections = splitIntoSections(fileContent)
  
  // 1. Current Learning State
  const learningStateText = sections['## Current Learning State'] || ''
  const currentPhase = parseMetaField(learningStateText, 'Current phase') || 'Phase 1 — Linux Fundamentals'
  const currentTrack = parseMetaField(learningStateText, 'Current track') || 'Linux Fundamentals'
  const readinessScore = parseFloat(parseMetaField(learningStateText, 'Readiness Score') || '6.8')
  const evidenceQuality = (parseMetaField(learningStateText, 'Evidence Quality') || 'high').toLowerCase() as 'high' | 'medium' | 'low'
  const totalHoursStudied = parseFloat(parseMetaField(learningStateText, 'Active Hours') || '34.5')
  const activeStreakDays = parseInt(parseMetaField(learningStateText, 'Streak Days') || '5', 10)
  const missionCompletionRate = parseInt(parseMetaField(learningStateText, 'Completion Rate') || '85', 10)

  // 2. Active Mission (Scan for active mission block)
  let todayMission = null
  const missionMatch = fileContent.match(/(?:##|###) 🛠️ DevOps Mission — ([^\n]+)\n([\s\S]+?)(?=\n(?:##|###)|$)/)
  if (missionMatch) {
    const missionTitle = missionMatch[1].trim()
    const blockContent = missionMatch[2]
    todayMission = {
      id: "m-active-sync",
      date: new Date().toISOString().split('T')[0],
      trackId: currentPhase.includes('Linux') ? 't-linux' : 't-network',
      trackName: currentTrack,
      title: missionTitle,
      whyToday: parseSectionField(blockContent, 'Why this today:'),
      objectives: parseListItems(blockContent, "Today's Objectives:").map((desc, idx) => ({ id: `obj${idx}`, description: desc })),
      resources: parseResources(blockContent),
      labs: parseLabsBlock(blockContent),
      expectedTime: parseSectionField(blockContent, 'Expected Time:') || '4-6 hours',
      successCriteria: parseListItems(blockContent, 'Success Criteria:'),
      checkpointQuestions: parseListItems(blockContent, 'Checkpoint Questions:'),
      proofOfWorkSpec: parseSectionField(blockContent, 'Proof of Work:') || 'Paste command output.',
      status: 'in_progress' as const
    }
  } else {
    // If no active mission is written in Obsidian, load standard V1 default today's mission
    todayMission = dashboardData.todayMission
  }

  // 3. Progress Ledger (Reviews & Critique Feedback)
  const ledgerText = sections['## Progress Ledger'] || ''
  const ledgerEntries = parseLedgerEntries(ledgerText)

  // Rework the Dashboard Payload
  const activeTrackId = currentPhase.includes('Linux') ? 't-linux' : 't-network'
  const activeTrackTitle = currentTrack

  // Find last review with feedback values
  const lastReviewEntry = ledgerEntries.find(e => e.verdict)
  const lastFeedback = lastReviewEntry ? {
    date: lastReviewEntry.date,
    verdict: lastReviewEntry.verdict,
    whatWentRight: lastReviewEntry.whatWentRight || [],
    weakSpots: lastReviewEntry.weakSpots || [],
    corrections: lastReviewEntry.corrections || []
  } : dashboardData.lastFeedback

  // Formulate actionRequiredList
  const actionRequiredList = []
  if (lastFeedback && lastFeedback.verdict === 'reinforce') {
    actionRequiredList.push({
      id: "act-remedy-sync",
      title: "Skills Reinforcement Needed",
      type: "remediation" as const,
      description: lastFeedback.weakSpots[0] || "Review weak spots from the last review critique."
    })
  }
  if (todayMission) {
    actionRequiredList.push({
      id: "act-lab-sync",
      title: "Active Mission Lab Verification",
      type: "lab_pending" as const,
      description: todayMission.labs[0]?.title || "Active lab task is pending local verification."
    })
  }

  const dashboardPayload = {
    todayMission,
    activeTrack: {
      id: activeTrackId,
      title: activeTrackTitle,
      progressPercent: activeTrackId === 't-linux' ? 65 : 0
    },
    lastFeedback,
    actionRequiredList,
    analytics: {
      totalHoursStudied,
      activeStreakDays,
      missionCompletionRate,
      weeklyStudyGoalHours: 30
    }
  }

  // Rework the Roadmap Progress list dynamically
  const updatedRoadmap = roadmapData.map((track) => {
    if (track.title === activeTrackTitle) {
      return {
        ...track,
        status: 'active' as const,
        progressPercent: activeTrackId === 't-linux' ? 65 : 0,
        score: readinessScore,
        evidenceQuality
      }
    }
    // Simple completion simulation for previous tracks
    if (track.id === 't-linux' && activeTrackId !== 't-linux') {
      return {
        ...track,
        status: 'complete' as const,
        progressPercent: 100,
        score: 9.0,
        evidenceQuality: 'high' as const
      }
    }
    return track
  })

  // Format Reviews from Ledger
  const formattedReviews: WeeklyReview[] = ledgerEntries
    .filter(e => e.verdict)
    .map((e, idx) => ({
      id: `rev-sync-${idx}`,
      weekEndingDate: e.date,
      verdict: e.verdict!,
      topicsCovered: (e.topicsCovered || []).map(t => ({ title: t, status: 'completed' as const })),
      strongAreas: e.whatWentRight || [],
      weakAreas: e.weakSpots || [],
      evidenceQuality: 'high' as const,
      evidenceRationale: 'Fully verified command outputs submitted.',
      recommendedNextFocus: e.corrections || [],
      juniorDevOpsReadiness: 15 - idx * 5,
      internshipReadiness: 22 - idx * 6,
      strategy: e.strategy || "Review gaps and continue curriculum pipeline."
    }))

  const finalReviews = formattedReviews.length > 0 ? formattedReviews : reviewsData

  const state: AcademyState = {
    dashboard: dashboardPayload,
    roadmap: updatedRoadmap,
    labs: labsData,
    reviews: finalReviews
  }

  // Create dir if missing
  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true })
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(state, null, 2), 'utf-8')
  console.log(`Sync pipeline complete! Generated state file written successfully to ${OUTPUT_FILE}`)
}

async function writeDefaultState() {
  const defaultState: AcademyState = {
    dashboard: dashboardData,
    roadmap: roadmapData,
    labs: labsData,
    reviews: reviewsData
  }
  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true })
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(defaultState, null, 2), 'utf-8')
  console.log(`Created default fallback JSON state config file at ${OUTPUT_FILE}`)
}

// Helpers
function splitIntoSections(content: string): Record<string, string> {
  const sections: Record<string, string> = {}
  const headings = content.split(/\n(?=## )/g)
  for (const block of headings) {
    const lines = block.trim().split('\n')
    const headerName = lines[0].trim()
    sections[headerName] = block
  }
  return sections
}

function parseMetaField(sectionContent: string, fieldName: string): string | null {
  const regex = new RegExp(`-\\s*\\*\\*${fieldName}:\\*\\*\\s*([^\n]+)`)
  const match = sectionContent.match(regex)
  return match ? match[1].trim() : null
}

function parseSectionField(content: string, fieldName: string): string {
  const regex = new RegExp(`\\*\\*${fieldName}\\*\\*\\s*\n*([\\s\\S]*?)(?=\\n\\*\\*|$)`)
  const match = content.match(regex)
  return match ? match[1].trim() : ''
}

function parseListItems(content: string, listHeader: string): string[] {
  const regex = new RegExp(`\\*\\*${listHeader}\\*\\*\\s*\n*([\\s\\S]*?)(?=\\n\\*\\*|$)`)
  const match = content.match(regex)
  if (!match) return []
  
  const block = match[1]
  const items: string[] = []
  const listRegex = /^[1-9\-*•]+\.?\s*([^\n]+)/gm
  let m
  while ((m = listRegex.exec(block)) !== null) {
    items.push(m[1].trim())
  }
  return items
}

function parseResources(content: string): any[] {
  const items = parseListItems(content, 'Learning Resources:')
  return items.map((item) => {
    // Parse format: [Title](url) or - Title: url
    const mdLink = item.match(/\[([^\]]+)\]\(([^)]+)\)/)
    if (mdLink) {
      return { title: mdLink[1].trim(), url: mdLink[2].trim(), type: 'guide' }
    }
    const parts = item.split(':')
    if (parts.length > 1) {
      const url = parts.slice(1).join(':').trim()
      return { title: parts[0].trim(), url, type: url.includes('youtube') ? 'video' : 'doc' }
    }
    return { title: item, url: '#', type: 'guide' }
  })
}

function parseLabsBlock(content: string): any[] {
  const labsText = parseSectionField(content, 'Hands-On Labs:')
  if (!labsText) return []
  
  const items: string[] = []
  const listRegex = /^[1-9\-*•]+\.?\s*([^\n]+)/gm
  let m
  while ((m = listRegex.exec(labsText)) !== null) {
    items.push(m[1].trim())
  }
  
  return items.map((item, idx) => ({
    id: `lab-sync-${idx}`,
    title: `Lab: ${item}`,
    instructions: item
  }))
}

interface LedgerEntry {
  date: string
  title: string
  verdict?: 'advance' | 'reinforce' | 'remediate'
  whatWentRight?: string[]
  weakSpots?: string[]
  corrections?: string[]
  topicsCovered?: string[]
  strategy?: string
}

function parseLedgerEntries(ledgerContent: string): LedgerEntry[] {
  const entries: LedgerEntry[] = []
  const splits = ledgerContent.split(/\n(?=### )/g)
  
  for (const block of splits) {
    const lines = block.trim().split('\n')
    if (lines.length === 0) continue
    
    const headerMatch = lines[0].match(/### (\d{4}-\d{2}-\d{2}) — ([^\n]+)/)
    if (!headerMatch) continue
    
    const date = headerMatch[1]
    const title = headerMatch[2].trim()
    
    const verdictRaw = parseMetaField(block, 'Verdict')
    const verdict = verdictRaw 
      ? (verdictRaw.toLowerCase() as 'advance' | 'reinforce' | 'remediate') 
      : undefined

    entries.push({
      date,
      title,
      verdict,
      whatWentRight: parseListItems(block, 'What You Got Right:'),
      weakSpots: parseListItems(block, 'Weak Spots:'),
      corrections: parseListItems(block, 'Corrections:'),
      topicsCovered: parseListItems(block, 'Topics Covered:'),
      strategy: parseSectionField(block, 'Strategy:') || undefined
    })
  }
  
  return entries
}

runSync().catch(console.error)
