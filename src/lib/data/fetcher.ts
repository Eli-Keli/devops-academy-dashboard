import { createServerFn } from '@tanstack/react-start'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { dashboardData, roadmapData, labsData, reviewsData } from '../mock-data'

export interface AcademyState {
  dashboard: typeof dashboardData
  roadmap: typeof roadmapData
  labs: typeof labsData
  reviews: typeof reviewsData
}

export const getAcademyState = createServerFn({ method: 'GET' }).handler(async (): Promise<AcademyState> => {
  try {
    const filePath = path.resolve(process.cwd(), 'src/lib/data/academy-state.json')
    const fileContent = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(fileContent) as AcademyState
  } catch (error) {
    // FALLBACK: Return static mock data if the JSON sync file is not yet generated
    return {
      dashboard: dashboardData,
      roadmap: roadmapData,
      labs: labsData,
      reviews: reviewsData,
    }
  }
})
