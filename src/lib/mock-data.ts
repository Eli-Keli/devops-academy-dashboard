import type { DashboardPayload, TrackProgress, LabChallenge, WeeklyReview } from './contracts/academy'

export const dashboardData: DashboardPayload = {
  todayMission: {
    id: "m-linux-services",
    date: new Date().toISOString().split('T')[0],
    trackId: "t-linux",
    trackName: "Linux Fundamentals",
    title: "Systemd Service Architecture & Logs",
    whyToday: "You understand the process tree but need to learn how system-level services are managed, recovered, and audited in production settings.",
    objectives: [
      { id: "obj1", description: "Understand Systemd unit file structure and lifecycle targets." },
      { id: "obj2", description: "Manage service states (start, stop, restart, enable, disable) using systemctl." },
      { id: "obj3", description: "Parse and query system service failures using journalctl logs." }
    ],
    resources: [
      { title: "Systemd: Learn Linux Services & Daemons", url: "https://youtube.com/watch?v=systemd-tutorial", type: "video" },
      { title: "systemd.service Documentation Manual", url: "https://man7.org/linux/man-pages/man5/systemd.service.5.html", type: "doc" },
      { title: "Practical Guide to systemd unit files", url: "https://www.digitalocean.com/community/tutorials/understanding-systemd-units-and-unit-files", type: "guide" }
    ],
    labs: [
      { id: "lab1", title: "Write a Custom Systemd Service Daemon", instructions: "Create a simple Python HTTP server running background checks, build a service unit file at /etc/systemd/system/dummy-api.service, set up automatic restarts on failure, and verify that the auto-recovery fires when process is forcefully terminated." }
    ],
    expectedTime: "4-6 hours",
    successCriteria: [
      "dummy-api.service restarts automatically within 5 seconds of a SIGKILL signal.",
      "Service logs are filtered using journalctl -u dummy-api.service --since '5 minutes ago'."
    ],
    checkpointQuestions: [
      "What is the operational difference between systemctl enable and systemctl start?",
      "How do you inspect why a service crashed before restarting it?"
    ],
    proofOfWorkSpec: "Send a screenshot of the systemctl status output showing the auto-recovered process pid, and a code snippet of your unit config.",
    status: "in_progress"
  },
  activeTrack: {
    id: "t-linux",
    title: "Linux Fundamentals",
    progressPercent: 65
  },
  lastFeedback: {
    date: "2026-05-31",
    verdict: "reinforce",
    whatWentRight: [
      "Demonstrated correct usage of grep, awk, and sed file text filters.",
      "Correctly parsed access logs for duplicate IP addresses in the diagnostic challenge."
    ],
    weakSpots: [
      "Struggled to explain the structural difference between hard links and symbolic links in file allocation paths."
    ],
    corrections: [
      "Review directory index allocation and how deleting a source file affects inodes under symbolic vs. hard link models."
    ]
  },
  actionRequiredList: [
    {
      "id": "act-remedy-inodes",
      "title": "Symbolic Link Diagnostics",
      "type": "remediation",
      "description": "Cortana flagged symbolic link structures as a weak area. Review before advancing to Track 2."
    },
    {
      "id": "act-lab-dummy",
      "title": "Active Lab Pending Verification",
      "type": "lab_pending",
      "description": "Write a Custom Systemd Service Daemon. Pending local proof-of-work upload."
    }
  ],
  analytics: {
    totalHoursStudied: 34.5,
    activeStreakDays: 5,
    missionCompletionRate: 85,
    weeklyStudyGoalHours: 30
  }
}

export const roadmapData: TrackProgress[] = [
  {
    id: "t-linux",
    title: "Linux Fundamentals",
    status: "active",
    progressPercent: 65,
    modulesCompleted: 5,
    modulesTotal: 8,
    level: "foundational",
    colorTone: "info",
    score: 6.8,
    evidenceQuality: "high",
    rationale: "Strong terminal scripting and utility pipelines verified; directory hardlinks currently being reinforced."
  },
  {
    id: "t-network",
    title: "Networking Fundamentals",
    status: "locked",
    progressPercent: 0,
    modulesCompleted: 0,
    modulesTotal: 6,
    level: "foundational",
    colorTone: "muted",
    score: 0,
    evidenceQuality: "low",
    rationale: "Requires completion of Track 1: Linux Fundamentals."
  },
  {
    id: "t-git",
    title: "Git & GitHub Workflows",
    status: "locked",
    progressPercent: 0,
    modulesCompleted: 0,
    modulesTotal: 5,
    level: "foundational",
    colorTone: "muted",
    score: 0,
    evidenceQuality: "low",
    rationale: "Requires completion of Track 2: Networking Fundamentals."
  },
  {
    id: "t-docker",
    title: "Docker & Containers",
    status: "locked",
    progressPercent: 0,
    modulesCompleted: 0,
    modulesTotal: 7,
    level: "intermediate",
    colorTone: "muted",
    score: 0,
    evidenceQuality: "low",
    rationale: "Requires completion of Track 3: Git & GitHub Workflows."
  },
  {
    id: "t-cicd",
    title: "CI/CD Pipelines",
    status: "locked",
    progressPercent: 0,
    modulesCompleted: 0,
    modulesTotal: 6,
    level: "intermediate",
    colorTone: "muted",
    score: 0,
    evidenceQuality: "low",
    rationale: "Requires completion of Track 4: Docker & Containers."
  },
  {
    id: "t-cloud",
    title: "Cloud Fundamentals",
    status: "locked",
    progressPercent: 0,
    modulesCompleted: 0,
    modulesTotal: 8,
    level: "intermediate",
    colorTone: "muted",
    score: 0,
    evidenceQuality: "low",
    rationale: "Requires completion of Track 5: CI/CD Pipelines."
  },
  {
    id: "t-iac",
    title: "Infrastructure as Code",
    status: "locked",
    progressPercent: 0,
    modulesCompleted: 0,
    modulesTotal: 7,
    level: "advanced",
    colorTone: "muted",
    score: 0,
    evidenceQuality: "low",
    rationale: "Requires completion of Track 6: Cloud Fundamentals."
  },
  {
    id: "t-monitoring",
    title: "Monitoring & Observability",
    status: "locked",
    progressPercent: 0,
    modulesCompleted: 0,
    modulesTotal: 6,
    level: "advanced",
    colorTone: "muted",
    score: 0,
    evidenceQuality: "low",
    rationale: "Requires completion of Track 7: Infrastructure as Code."
  },
  {
    id: "t-kubernetes",
    title: "Kubernetes & Orchestration",
    status: "locked",
    progressPercent: 0,
    modulesCompleted: 0,
    modulesTotal: 9,
    level: "advanced",
    colorTone: "muted",
    score: 0,
    evidenceQuality: "low",
    rationale: "Requires completion of Track 8: Monitoring & Observability."
  }
]

export const labsData: LabChallenge[] = [
  {
    id: "lab-dummy-svc",
    name: "Custom Systemd Daemon Setup",
    trackId: "t-linux",
    trackName: "Linux Fundamentals",
    description: "Configure, register, and troubleshoot a background Daemon configured for auto-recovery.",
    difficulty: "foundational",
    status: "in_progress",
    duration: "90m",
    successCriteria: [
      "Unit custom service file dummy-api.service running local python API.",
      "Service automatically restarts on SIGKILL signal within 5 seconds.",
      "Custom service logs output to syslog/journald correctly."
    ],
    proofOfWorkRequired: [
      "Config unit file contents.",
      "Output of systemctl status dummy-api.service.",
      "journalctl logs showing SIGKILL crash and recovery events."
    ]
  },
  {
    id: "lab-cron-logrotate",
    name: "Log Rotation and Cron Automation",
    trackId: "t-linux",
    trackName: "Linux Fundamentals",
    description: "Build an automated shell backup task and configure system-level log rotation rules to avoid storage leaks.",
    difficulty: "foundational",
    status: "ready",
    duration: "60m",
    successCriteria: [
      "Backup script executing via cron every midnight.",
      "Logrotate configuration managing directory sizes.",
      "Clean log compress history verified."
    ],
    proofOfWorkRequired: [
      "crontab configuration line.",
      "logrotate.d/app config dump.",
      "Verified target files list showing rotated archives."
    ]
  },
  {
    id: "lab-port-redirect",
    name: "Network Traffic Port Redirection",
    trackId: "t-network",
    trackName: "Networking Fundamentals",
    description: "Redirect inbound local interface traffic on Port 80 down to standard application Port 8080 using UFW or IPTables.",
    difficulty: "foundational",
    status: "locked",
    duration: "75m",
    successCriteria: [
      "IPTables port forward rule defined.",
      "UFW routing table successfully forwarding traffic.",
      "Verify connection works with client curl -I requests."
    ],
    proofOfWorkRequired: [
      "iptables configuration command.",
      "Output of iptables -t nat -L.",
      "Log showing raw port mapping response."
    ]
  }
]

export const reviewsData: WeeklyReview[] = [
  {
    id: "rev-w1",
    weekEndingDate: "2026-05-31",
    verdict: "reinforce",
    topicsCovered: [
      { title: "Linux Process Signals & CLI Utilities", status: "completed" },
      { title: "Filesystem Allocation & Inodes", status: "reinforcing" }
    ],
    strongAreas: [
      "Fluent bash script loop controls.",
      "Clean process tree analysis using ps and pgrep.",
      "Regex usage under grep, sed, and awk."
    ],
    weakAreas: [
      "Directory allocation link targets (hard vs. symlinks)."
    ],
    evidenceQuality: "high",
    evidenceRationale: "Successfully submitted verified command history lists and sample parser script code.",
    recommendedNextFocus: [
      "Deep dive symlink allocation references.",
      "Complete the Custom Systemd Daemon practice lab."
    ],
    juniorDevOpsReadiness: 15,
    internshipReadiness: 22,
    strategy: "Spend the first half of the week closing the inode gaps, complete Track 1: Linux, and unlock Track 2: Networking."
  },
  {
    id: "rev-w0",
    weekEndingDate: "2026-05-24",
    verdict: "advance",
    topicsCovered: [
      { title: "Command Line Navigation & File Operations", status: "completed" }
    ],
    strongAreas: [
      "Standard command line navigation operations (cd, ls, mkdir, rm).",
      "Standard file redirection (pipes, >, >>, <)."
    ],
    weakAreas: [
      "Vague on nested file permission flags."
    ],
    evidenceQuality: "medium",
    evidenceRationale: "Answered conceptual checklist questions, basic terminal command list submitted.",
    recommendedNextFocus: [
      "Process monitoring CLI tools.",
      "Regular expression search tools."
    ],
    juniorDevOpsReadiness: 8,
    internshipReadiness: 12,
    strategy: "Acknowledge system layout context, build basic script files to practice command constructs."
  }
]
