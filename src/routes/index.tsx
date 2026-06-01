import { createFileRoute } from '@tanstack/react-router'
import AppShell from '../components/AppShell'
import { dashboardData } from '../lib/mock-data'
import { 
  PlayCircle, CheckCircle2, AlertCircle, HelpCircle, 
  Hourglass, Trophy, Target, BookOpen, Flame, RefreshCw, XCircle
} from 'lucide-react'

export const Route = createFileRoute('/')({
  loader: () => dashboardData,
  component: DashboardPage,
})

function DashboardPage() {
  const data = Route.useLoaderData()
  const { todayMission, activeTrack, lastFeedback, actionRequiredList, analytics } = data

  return (
    <AppShell 
      title="Today's Mission" 
      subtitle={`Eli's active learning track: ${activeTrack.title} (${activeTrack.progressPercent}% complete)`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 rise-in">
        {/* Main Columns: Today's Mission & Feedback */}
        <div className="lg:col-span-2 space-y-6">
          {/* Mission Card */}
          {todayMission ? (
            <section className="island-shell relative overflow-hidden rounded-[2rem] p-6 md:p-8">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <span className="island-kicker">Active Track: {todayMission.trackName}</span>
                  <h2 className="display-title text-2xl md:text-3xl font-bold tracking-tight text-[var(--sea-ink)] mt-2">
                    {todayMission.title}
                  </h2>
                </div>
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border ${
                  todayMission.status === 'in_progress' 
                    ? 'bg-[rgba(79,184,178,0.14)] border-[rgba(79,184,178,0.3)] text-[var(--lagoon-deep)]' 
                    : 'bg-white/50 border-[var(--line)] text-[var(--sea-ink-soft)]'
                }`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--lagoon)] mr-1.5 animate-pulse" />
                  Active Mission
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[var(--sea-ink-soft)] italic bg-[var(--foam)]/50 p-4 rounded-xl border border-[var(--line)]">
                <strong>Why today:</strong> {todayMission.whyToday}
              </p>

              {/* Objectives */}
              <div className="mt-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--sea-ink)] mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4 text-[var(--lagoon-deep)]" />
                  Core Objectives
                </h3>
                <ul className="space-y-2.5">
                  {todayMission.objectives.map((obj) => (
                    <li key={obj.id} className="flex items-start gap-3 text-sm text-[var(--sea-ink-soft)]">
                      <PlayCircle className="h-4 w-4 text-[var(--lagoon-deep)] shrink-0 mt-0.5" />
                      <span>{obj.description}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Labs */}
              <div className="mt-6 border-t border-[var(--line)] pt-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--sea-ink)] mb-3 flex items-center gap-2">
                  <Hourglass className="h-4 w-4 text-[var(--lagoon-deep)]" />
                  Hands-On Lab
                </h3>
                {todayMission.labs.map((lab) => (
                  <div key={lab.id} className="bg-[var(--foam)] p-4 rounded-xl border border-[var(--line)]">
                    <h4 className="text-sm font-bold text-[var(--sea-ink)]">{lab.title}</h4>
                    <p className="text-xs text-[var(--sea-ink-soft)] mt-1.5 leading-relaxed">
                      {lab.instructions}
                    </p>
                  </div>
                ))}
              </div>

              {/* Success Criteria */}
              <div className="mt-6 border-t border-[var(--line)] pt-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--sea-ink)] mb-3 flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-[var(--lagoon-deep)]" />
                  Success Criteria
                </h3>
                <ul className="space-y-2">
                  {todayMission.successCriteria.map((sc, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-[var(--sea-ink-soft)]">
                      <div className="h-1.5 w-1.5 rounded-full bg-[var(--lagoon)] shrink-0" />
                      <span>{sc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div className="mt-6 border-t border-[var(--line)] pt-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--sea-ink)] mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[var(--lagoon-deep)]" />
                  Study Resources
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {todayMission.resources.map((res, i) => (
                    <a 
                      key={i} 
                      href={res.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl border border-[var(--line)] bg-[var(--surface-strong)] hover:border-[var(--lagoon)] hover:-translate-y-0.5 transition-all text-xs no-underline text-[var(--sea-ink)] font-semibold"
                    >
                      <span>{res.title}</span>
                      <span className="text-[10px] text-[var(--sea-ink-soft)] uppercase bg-[var(--sand)] px-1.5 py-0.5 rounded">
                        {res.type}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Proof of Work */}
              <div className="mt-6 border-t border-[var(--line)] pt-6">
                <div className="bg-[rgba(47,106,74,0.06)] border border-[rgba(47,106,74,0.14)] p-4 rounded-xl">
                  <h4 className="text-xs font-bold text-[var(--palm)] uppercase tracking-wider">Proof of Work Target</h4>
                  <p className="text-xs text-[var(--sea-ink-soft)] mt-2 leading-relaxed">
                    {todayMission.proofOfWorkSpec}
                  </p>
                </div>
              </div>
            </section>
          ) : (
            <div className="island-shell p-8 text-center text-[var(--sea-ink-soft)]">
              No active daily mission today. Enjoy your rest or review completed modules!
            </div>
          )}

          {/* Socratic Critique / Last Feedback */}
          {lastFeedback && (
            <section className="island-shell rounded-2xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--sea-ink)] mb-4 flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-[var(--lagoon-deep)]" />
                Latest Instructor Critique
              </h3>
              <div className="flex items-start justify-between border-b border-[var(--line)] pb-4 flex-wrap gap-2">
                <div>
                  <span className="text-xs text-[var(--sea-ink-soft)]">Verdict Issued on {lastFeedback.date}</span>
                </div>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                  lastFeedback.verdict === 'advance' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : lastFeedback.verdict === 'reinforce'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {lastFeedback.verdict}
                </span>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wide">What Went Right:</h4>
                  <ul className="list-disc pl-5 mt-1.5 space-y-1 text-xs text-[var(--sea-ink-soft)]">
                    {lastFeedback.whatWentRight.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
                {lastFeedback.weakSpots.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wide">Weak Spots & Gaps:</h4>
                    <ul className="list-disc pl-5 mt-1.5 space-y-1 text-xs text-[var(--sea-ink-soft)]">
                      {lastFeedback.weakSpots.map((w, i) => <li key={i}>{w}</li>)}
                    </ul>
                  </div>
                )}
                {lastFeedback.corrections.length > 0 && (
                  <div className="bg-[var(--foam)] p-3 rounded-lg border border-[var(--line)]">
                    <h4 className="text-xs font-bold text-[var(--sea-ink)] uppercase tracking-wide">Actionable Corrections:</h4>
                    <ul className="list-disc pl-5 mt-1 space-y-1 text-xs text-[var(--sea-ink-soft)]">
                      {lastFeedback.corrections.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar Section: Alerts & Analytics */}
        <div className="space-y-6">
          {/* Action Required Column */}
          <section className="island-shell rounded-2xl p-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--sea-ink)] mb-4 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-[var(--lagoon-deep)]" />
              Action Required
            </h3>
            {actionRequiredList.length > 0 ? (
              <div className="space-y-3">
                {actionRequiredList.map((act) => (
                  <div 
                    key={act.id} 
                    className={`p-3.5 rounded-xl border flex gap-3 text-xs ${
                      act.type === 'blocker'
                        ? 'bg-rose-50/50 border-rose-200 text-rose-950'
                        : act.type === 'remediation'
                        ? 'bg-amber-50/50 border-amber-200 text-amber-950'
                        : 'bg-[var(--foam)] border-[var(--line)] text-[var(--sea-ink)]'
                    }`}
                  >
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold">{act.title}</h4>
                      <p className="mt-1 leading-relaxed text-[var(--sea-ink-soft)] text-[11px]">{act.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-[var(--sea-ink-soft)]">
                🎉 Complete alignment! No active alerts.
              </div>
            )}
          </section>

          {/* Analytics Summary */}
          <section className="island-shell rounded-2xl p-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--sea-ink)] mb-4 flex items-center gap-2">
              <Flame className="h-4 w-4 text-[var(--lagoon-deep)]" />
              Learning Velocity
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[var(--foam)] rounded-xl border border-[var(--line)] text-center">
                <span className="text-[10px] uppercase font-bold text-[var(--sea-ink-soft)]">Studied</span>
                <div className="text-xl font-bold mt-1 text-[var(--sea-ink)]">
                  {analytics.totalHoursStudied} <span className="text-xs text-[var(--sea-ink-soft)]">hrs</span>
                </div>
              </div>
              <div className="p-3 bg-[var(--foam)] rounded-xl border border-[var(--line)] text-center">
                <span className="text-[10px] uppercase font-bold text-[var(--sea-ink-soft)]">Streak</span>
                <div className="text-xl font-bold mt-1 text-[var(--sea-ink)] flex items-center justify-center gap-1">
                  {analytics.activeStreakDays}
                  <span className="text-[10px] text-amber-600">🔥</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--line)]">
              <div className="flex items-center justify-between text-xs mb-1.5 text-[var(--sea-ink-soft)]">
                <span>Mission Completion</span>
                <span className="font-semibold">{analytics.missionCompletionRate}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-[var(--sand)] overflow-hidden border border-[var(--line)]">
                <div 
                  className="h-full bg-[var(--lagoon)] transition-all" 
                  style={{ width: `${analytics.missionCompletionRate}%` }} 
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  )
}
