import { createFileRoute } from '@tanstack/react-router'
import AppShell from '../components/AppShell'
import { getAcademyState } from '../lib/data/fetcher'
import { Terminal, Lock, CheckCircle2, Circle, AlertCircle, Award } from 'lucide-react'

export const Route = createFileRoute('/labs')({
  loader: async () => {
    const state = await getAcademyState()
    return state.labs
  },
  component: LabsPage,
})

function LabsPage() {
  const labs = Route.useLoaderData()

  return (
    <AppShell 
      title="Practice Labs" 
      subtitle="Operational CLI execution challenges, verification tests, and critiques"
    >
      <div className="space-y-6 rise-in">
        {/* Intro Banner */}
        <section className="island-shell relative overflow-hidden rounded-2xl p-6">
          <span className="island-kicker">Lab Environment</span>
          <h2 className="text-xl font-bold text-[var(--sea-ink)] mt-1">DevOps Practice Challenges</h2>
          <p className="text-xs text-[var(--sea-ink-soft)] mt-2 leading-relaxed max-w-3xl">
            These labs are completed locally in your terminal. You must configure infrastructure, capture log outputs, and write setup files. When finished, submit proof-of-work in the Telegram channel to trigger the Lab Instructor verification agent.
          </p>
        </section>

        {/* Labs List */}
        <div className="space-y-4">
          {labs.map((lab, i) => {
            const isLocked = lab.status === 'locked'
            const isInProgress = lab.status === 'in_progress'
            const isComplete = lab.status === 'complete'
            const isReady = lab.status === 'ready'

            return (
              <article 
                key={lab.id} 
                className={`island-shell rounded-2xl p-6 border flex flex-col md:flex-row justify-between gap-6 transition-all ${
                  isInProgress 
                    ? 'border-[var(--lagoon)] shadow-[0_4px_14px_rgba(79,184,178,0.06)]' 
                    : isLocked 
                    ? 'opacity-82 bg-[rgba(23,58,64,0.01)] border-dashed border-[var(--line)]'
                    : 'border-[var(--line)] bg-[var(--surface-strong)]'
                }`}
                style={{ animationDelay: `${i * 90}ms` }}
              >
                {/* Left Block: Identity & Description */}
                <div className="flex-1 space-y-4 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[10px] uppercase font-bold text-[var(--sea-ink-soft)] bg-[var(--sand)] px-2 py-0.5 rounded border border-[var(--line)]">
                      {lab.trackName}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      lab.difficulty === 'advanced'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : lab.difficulty === 'intermediate'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {lab.difficulty}
                    </span>
                    <span className="text-xs font-mono text-[var(--sea-ink-soft)]">
                      Duration: {lab.duration}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[var(--sea-ink)] flex items-center gap-2">
                      {isLocked && <Lock className="h-4.5 w-4.5 text-[var(--sea-ink-soft)]" />}
                      {!isLocked && <Terminal className="h-4.5 w-4.5 text-[var(--lagoon-deep)]" />}
                      {lab.name}
                    </h3>
                    <p className="text-xs text-[var(--sea-ink-soft)] mt-2 leading-relaxed">
                      {lab.description}
                    </p>
                  </div>

                  {/* Lab specs (Only if unlocked) */}
                  {!isLocked && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-[var(--line)]">
                      {/* Success Criteria */}
                      <div>
                        <h4 className="text-xs font-bold text-[var(--sea-ink)] uppercase tracking-wider mb-2">Success Criteria</h4>
                        <ul className="space-y-1.5">
                          {lab.successCriteria.map((sc, scIdx) => (
                            <li key={scIdx} className="flex items-start gap-2 text-[11px] text-[var(--sea-ink-soft)]">
                              <CheckCircle2 className="h-3.5 w-3.5 text-[var(--lagoon-deep)] shrink-0 mt-0.5" />
                              <span>{sc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Proof of Work */}
                      <div>
                        <h4 className="text-xs font-bold text-[var(--sea-ink)] uppercase tracking-wider mb-2">Evidence Required</h4>
                        <ul className="space-y-1.5">
                          {lab.proofOfWorkRequired.map((po, poIdx) => (
                            <li key={poIdx} className="flex items-start gap-2 text-[11px] text-[var(--sea-ink-soft)]">
                              <Circle className="h-3.5 w-3.5 text-[var(--sea-ink-soft)] shrink-0 mt-0.5" />
                              <span>{po}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Block: Status actions */}
                <div className="flex flex-col justify-between items-start md:items-end min-w-[120px] shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-[var(--line)]">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                    isInProgress
                      ? 'bg-[rgba(79,184,178,0.12)] text-[var(--lagoon-deep)] border border-[rgba(79,184,178,0.24)]'
                      : isComplete
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : isReady
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-gray-50 text-gray-500 border border-gray-200'
                  }`}>
                    {isComplete ? 'Mastered' : isInProgress ? 'Active Lab' : isReady ? 'Ready' : 'Locked'}
                  </span>

                  {isInProgress && (
                    <div className="mt-4 text-xs text-[var(--sea-ink-soft)] leading-snug text-left md:text-right">
                      Run commands locally. Upload logs in Telegram when done.
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </AppShell>
  )
}
