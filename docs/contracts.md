# Data Contracts Documentation

All academy endpoints and components are strongly typed by standard schemas located in [academy.ts](../src/lib/contracts/academy.ts).

---

## 1. Domain Entities

### `DailyMission`
Describes Eli's active study guidelines for the current day.
* `title`: Name of the topic.
* `objectives`: Bulleted checklist items.
* `labs`: Target practical instructions.
* `resources`: Reference urls.
* `successCriteria`: Measurable validation triggers.

### `TrackProgress`
Represents milestone parameters for the 9 core DevOps disciplines.
* `status`: locked, active, or complete.
* `progressPercent`: Float representing track completion.
* `evidenceQuality`: high, medium, or low rating.
* `score`: Numerical rating (0-10) showing competency.

### `LabChallenge`
Represents local CLI exercises Eli must complete to test signal progress.
* `difficulty`: foundational, intermediate, or advanced.
* `status`: locked, ready, in_progress, complete, or failed.

### `WeeklyReview`
Represents historical Sunday assessments.
* `verdict`: advance, reinforce, or remediate.
* `juniorDevOpsReadiness` & `internshipReadiness`: Scaled percentage estimates.
