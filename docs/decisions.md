# Architecture Decisions Log

## ADR 1: Scope Rescission - DevOps Academy Focus Only
* **Date**: 2026-06-01
* **Context**: The original visual prototype was styled as a general "Personal OS" containing habits, streaks, and personal calendars.
* **Decision**: Strictly strip non-learning vectors. The dashboard will exclusively serve as the read model for the DevOps learning curriculum.
* **Consequence**: Unified clarity; removes duplicate life-tracking efforts handled elsewhere.

---

## ADR 2: Static Schema Mocking for V1
* **Date**: 2026-06-01
* **Context**: Real databases require orchestration setups and connection keys.
* **Decision**: Keep V1 data fully mocked in `mock-data.ts`, but structure all objects to follow production-grade schemas.
* **Consequence**: Zero deploy setup blocks for V1; easily connects to future SQLite/API backends without rebuilding page UI templates.

---

## ADR 3: consolidated Layout Navigation
* **Date**: 2026-06-01
* **Context**: The rescope review suggested 6 tabs, which can clutter small viewports.
* **Decision**: Group categories into 4 primary views: Dashboard, Roadmap, Labs, Reviews.
* **Consequence**: Clean sidebar design; consistent desktop-first responsive structure.
