import { createFileRoute } from '@tanstack/react-router'
import AppShell from '../components/AppShell'
import { getAcademyState } from '../lib/data/fetcher'
import { Milestone, Lock, CheckCircle, HelpCircle, Award, Database } from 'lucide-react'

export const Route = createFileRoute('/roadmap')({
  loader: async () => {
    const state = await getAcademyState()
    return state.roadmap
  },
  component: RoadmapPage,
})

function RoadmapPage() {
  const tracks = Route.useLoaderData()

  // Calculate overall progress stats
  const completedTracksCount = tracks.filter((t) => t.status === 'complete').length
  const totalTracksCount = tracks.length
  const activeTrack = tracks.find((t) => t.status === 'active')

  return (
    <AppShell 
      title="Academy Roadmap" 
      subtitle={`Curriculum progression: ${completedTracksCount} of ${totalTracksCount} tracks mastered`}
    >
      <div className="space-y-6 rise-in">
        {/* Progress Overview Hero */}
        <section className="island-shell relative overflow-hidden rounded-2xl p-6 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="island-kicker">Curriculum Pipeline</span>
            <h2 className="text-xl font-bold text-[var(--sea-ink)]">Eli's DevOps Academy Progression</h2>
            {activeTrack && (
              <p className="text-xs text-[var(--sea-ink-soft)]">
                Active Milestone Focus: <strong>{activeTrack.title}</strong>
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-[var(--sea-ink-soft)]">Mastery</span>
              <div className="text-2xl font-black mt-1 text-[var(--lagoon-deep)]">
                {Math.round((completedTracksCount / totalTracksCount) * 100)}%
              </div>
            </div>
            <div className="h-10 w-[1px] bg-[var(--line)]" />
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-[var(--sea-ink-soft)]">Verified Gaps</span>
              <div className="text-2xl font-black mt-1 text-amber-600">
                {tracks.filter(t => t.evidenceQuality === 'medium' || t.evidenceQuality === 'low').length} tracks
              </div>
            </div>
          </div>
        </section>

        {/* The Pipeline list grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tracks.map((track, i) => {
            const isLocked = track.status === 'locked'
            const isActive = track.status === 'active'
            const isComplete = track.status === 'complete'

            return (
              <article 
                key={track.id} 
                className={`island-shell rounded-2xl p-5 border relative flex flex-col justify-between transition-all ${
                  isActive 
                    ? 'border-[var(--lagoon)] shadow-[0_4px_18px_rgba(79,184,178,0.12)]' 
                    : isLocked
                    ? 'opacity-82 bg-[rgba(23,58,64,0.01)] border-dashed border-[var(--line)]'
                    : 'border-[var(--line)] bg-[var(--surface-strong)]'
                }`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Track ID tag and Level */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-[var(--sea-ink-soft)]">
                    Track 0{i + 1}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-[var(--sand)] px-1.5 py-0.5 text-[9.5px] font-bold text-[var(--sea-ink-soft)] uppercase border border-[var(--line)]">
                    {track.level}
                  </span>
                </div>

                {/* Track Details */}
                <div className="mt-4">
                  <h3 className="text-sm font-bold text-[var(--sea-ink)] flex items-center gap-2">
                    {isComplete && <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />}
                    {isActive && <Milestone className="h-4 w-4 text-[var(--lagoon-deep)] shrink-0" />}
                    {isLocked && <Lock className="h-4 w-4 text-[var(--sea-ink-soft)] shrink-0" />}
                    {track.title}
                  </h3>
                  
                  {/* Progress segment */}
                  {!isLocked && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[10px] text-[var(--sea-ink-soft)] mb-1">
                        <span>Modules: {track.modulesCompleted}/{track.modulesTotal}</span>
                        <span>{track.progressPercent}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-[var(--sand)] overflow-hidden border border-[var(--line)]">
                        <div 
                          className={`h-full transition-all ${
                            isComplete ? 'bg-emerald-500' : 'bg-[var(--lagoon)]'
                          }`}
                          style={{ width: `${track.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Rationale and lock notes */}
                  <p className="mt-3.5 text-xs text-[var(--sea-ink-soft)] leading-relaxed">
                    {track.rationale}
                  </p>
                </div>

                {/* Evidence metrics for active/mastered nodes */}
                {!isLocked && (
                  <div className="mt-5 pt-3 border-t border-[var(--line)] flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1 text-[var(--sea-ink-soft)]">
                      <Database className="h-3 w-3 shrink-0" />
                      <span>Evidence: <strong className="uppercase">{track.evidenceQuality}</strong></span>
                    </div>
                    {track.score > 0 && (
                      <div className="font-semibold text-[var(--sea-ink)]">
                        Score: <span className="text-xs font-bold">{track.score}</span>/10
                      </div>
                    )}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </AppShell>
  )
}
