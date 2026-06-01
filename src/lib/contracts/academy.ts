export type TrackStatus = "locked" | "active" | "complete";
export type MissionStatus = "not_started" | "in_progress" | "complete" | "blocked";
export type LabStatus = "locked" | "ready" | "in_progress" | "complete" | "failed";
export type Verdict = "advance" | "reinforce" | "remediate";
export type EvidenceQuality = "high" | "medium" | "low";
export type Difficulty = "foundational" | "intermediate" | "advanced";

export interface MissionObjective {
  id: string;
  description: string;
}

export interface MissionResource {
  title: string;
  url: string;
  type: "video" | "doc" | "guide";
}

export interface MissionLab {
  id: string;
  title: string;
  instructions: string;
}

export interface DailyMission {
  id: string;
  date: string;
  trackId: string;
  trackName: string;
  title: string;
  whyToday: string;
  objectives: MissionObjective[];
  resources: MissionResource[];
  labs: MissionLab[];
  expectedTime: string;
  successCriteria: string[];
  checkpointQuestions: string[];
  proofOfWorkSpec: string;
  status: MissionStatus;
}

export interface TrackProgress {
  id: string;
  title: string;
  status: TrackStatus;
  progressPercent: number; // 0 to 100
  modulesCompleted: number;
  modulesTotal: number;
  level: "foundational" | "intermediate" | "advanced";
  colorTone: "primary" | "success" | "warning" | "info" | "muted";
  score: number; // 0 to 10 based on evidence
  evidenceQuality: EvidenceQuality;
  rationale: string;
}

export interface LabChallenge {
  id: string;
  name: string;
  trackId: string;
  trackName: string;
  description: string;
  difficulty: Difficulty;
  status: LabStatus;
  duration: string;
  successCriteria: string[];
  proofOfWorkRequired: string[];
}

export interface WeeklyReview {
  id: string;
  weekEndingDate: string;
  verdict: Verdict;
  topicsCovered: { title: string; status: "completed" | "reinforcing" | "remediating" }[];
  strongAreas: string[];
  weakAreas: string[];
  evidenceQuality: EvidenceQuality;
  evidenceRationale: string;
  recommendedNextFocus: string[];
  juniorDevOpsReadiness: number; // 0 to 100%
  internshipReadiness: number; // 0 to 100%
  strategy: string;
}

export interface LearningAnalytics {
  totalHoursStudied: number;
  activeStreakDays: number;
  missionCompletionRate: number; // 0 to 100%
  weeklyStudyGoalHours: number;
}

export interface DashboardPayload {
  todayMission: DailyMission | null;
  activeTrack: {
    id: string;
    title: string;
    progressPercent: number;
  };
  lastFeedback: {
    date: string;
    verdict: Verdict;
    whatWentRight: string[];
    weakSpots: string[];
    corrections: string[];
  } | null;
  actionRequiredList: {
    id: string;
    title: string;
    type: "remediation" | "blocker" | "lab_pending" | "missing_evidence";
    description: string;
  }[];
  analytics: LearningAnalytics;
}
