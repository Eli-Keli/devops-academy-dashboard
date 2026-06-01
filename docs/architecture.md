# System Architecture Documentation

The DevOps Academy Dashboard is a full-stack React Single Page Application utilizing Server-Side Rendering (SSR) through **TanStack Start**.

---

## 1. Core Structural Stack

### Tech Stack
* **Vite 8**: Serves as the compiler, bundler, and development environment.
* **React 19**: Standard component rendering engine.
* **TanStack Start**: Configures Nitro server endpoints and implements server functions seamlessly.
* **TanStack Router**: Handles client routing with strict compile-time type-safety.
* **Tailwind CSS v4**: Theme styling utilizing high-performance CSS theme custom variables.

---

## 2. Ingestion Flow

The dashboard represents a **Read-Model** of Eli's DevOps academy records.

1. **Write Source**: Cortana/Hermes write updates, daily missions, and lab reviews directly to local Obsidian notes.
2. **Compile Task**: A future CLI parsing adapter will watch the notes folder, extract JSON blocks, and compile them to a single state file.
3. **Data Fetch**: The dashboard loads this state file via standard TanStack Start loaders, rendering updates client-side.
