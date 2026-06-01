# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-06-01

### Added
- **Core Architecture**: Scaffolded clean web app using React 19, TanStack Start, and Tailwind CSS v4.
- **Sidebar Layout**: Designed responsive, Notion/Linear-inspired left navigation shell featuring animated status sync indicator and keyboard shortcut cues.
- **Domain Contracts**: Defined type contracts in `src/lib/contracts/academy.ts` for Daily Missions, Track Progress, Practice Labs, and Weekly Assessments.
- **Visual Pages**: Implemented `/` (Today's Mission & Critique), `/roadmap` (Curriculum master progress), `/labs` (CLI scenarios), and `/reviews` (Weekly metrics history).
- **Mock Store**: Configured `src/lib/mock-data.ts` conforming to the defined schemas to model the Linux fundamentals learning milestone.
