import { createFileRoute } from '@tanstack/react-router'
import AppShell from '../components/AppShell'
import { reviewsData } from '../lib/mock-data'
import { ClipboardCheck, Sparkles, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react'

export const Route = createFileRoute('/reviews')({
  loader: () => reviewsData,
  component: ReviewsPage,
})

function ReviewsPage() {
  const reviews = Route.useLoaderData()

  // Grab latest review as highlight
  const latestReview = reviews[0]

  return (
    <AppShell 
      title="Weekly Reviews" 
      subtitle="Sunday audit reviews, skill evaluation scores, and operational feedback"
    >
      <div className="space-y-6 rise-in">
        {/* Latest Report Highlight card */}
        {latestReview && (
          <section className="island-shell relative overflow-hidden rounded-[2rem] p-6 md:p-8">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <span className="island-kicker">Latest Audit Report</span>
                <h2 className="display-title text-2xl font-bold text-[var(--sea-ink)] mt-2">
                  Week Ending {latestReview.weekEndingDate}
                </h2>
              </div>
              <span className="inline-flex items-center rounded-full bg-[rgba(47,106,74,0.08)] px-3 py-1 text-xs font-semibold border border-[var(--chip-line)] text-[var(--palm)] uppercase">
                Verdict: {latestReview.verdict}
              </span>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-[var(--foam)] p-4 rounded-xl border border-[var(--line)]">
                <span className="text-[10px] uppercase font-bold text-[var(--sea-ink-soft)] flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5 text-[var(--lagoon-deep)]" />
                  Junior DevOps Readiness
                </span>
                <div className="text-3xl font-black mt-2 text-[var(--sea-ink)]">
                  {latestReview.juniorDevOpsReadiness}%
                </div>
              </div>
              
              <div className="bg-[var(--foam)] p-4 rounded-xl border border-[var(--line)]">
                <span className="text-[10px] uppercase font-bold text-[var(--sea-ink-soft)] flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-[var(--lagoon-deep)]" />
                  Internship Project Readiness
                </span>
                <div className="text-3xl font-black mt-2 text-[var(--sea-ink)]">
                  {latestReview.internshipReadiness}%
                </div>
              </div>

              <div className="bg-[var(--foam)] p-4 rounded-xl border border-[var(--line)]">
                <span className="text-[10px] uppercase font-bold text-[var(--sea-ink-soft)]">
                  Evidence Quality
                </span>
                <div className="text-xl font-bold mt-2 uppercase text-[var(--palm)]">
                  {latestReview.evidenceQuality}
                </div>
                <p className="text-[10px] text-[var(--sea-ink-soft)] mt-1.5 leading-snug">
                  {latestReview.evidenceRationale}
                </p>
              </div>
            </div>

            {/* In-depth details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 border-t border-[var(--line)] pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-[var(--sea-ink)] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    Verified Strengths
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--sea-ink-soft)]">
                    {latestReview.strongAreas.map((sa, i) => <li key={i}>{sa}</li>)}
                  </ul>
                </div>
                {latestReview.weakAreas.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-[var(--sea-ink)] uppercase tracking-wider mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      Active Weak Spots
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--sea-ink-soft)]">
                      {latestReview.weakAreas.map((wa, i) => <li key={i}>{wa}</li>)}
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-[var(--sea-ink)] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-[var(--lagoon-deep)]" />
                    Recommended Next Focus
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--sea-ink-soft)]">
                    {latestReview.recommendedNextFocus.map((nf, i) => <li key={i}>{nf}</li>)}
                  </ul>
                </div>
                <div className="p-4 bg-[var(--foam)] rounded-xl border border-[var(--line)]">
                  <h4 className="text-xs font-bold text-[var(--sea-ink)] uppercase tracking-wider">Weekly Execution Strategy</h4>
                  <p className="text-xs text-[var(--sea-ink-soft)] mt-2 leading-relaxed">
                    {latestReview.strategy}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Ledger History List */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--sea-ink)]">
            Historical Audit Ledger
          </h3>
          <div className="space-y-3">
            {reviews.map((rev, idx) => (
              <div 
                key={rev.id} 
                className="island-shell rounded-xl p-5 border border-[var(--line)] flex items-center justify-between gap-4 flex-wrap text-xs bg-[var(--surface-strong)]"
              >
                <div className="space-y-1 min-w-[200px]">
                  <h4 className="font-bold text-[var(--sea-ink)]">Week Ending {rev.weekEndingDate}</h4>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] text-[var(--sea-ink-soft)]">Verdict: <strong className="uppercase">{rev.verdict}</strong></span>
                    <span className="text-[var(--line)]">•</span>
                    <span className="text-[10px] text-[var(--sea-ink-soft)]">Ready: <strong>{rev.juniorDevOpsReadiness}%</strong></span>
                  </div>
                </div>

                <div className="text-left md:text-right max-w-sm">
                  <div className="text-[10px] text-[var(--sea-ink-soft)] uppercase font-semibold">Weekly Focus</div>
                  <p className="text-[11px] text-[var(--sea-ink-soft)] mt-1 truncate max-w-xs">{rev.strategy}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  )
}

// Simple internal helper component
function CheckCircle({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="m9 12 2 2 4-4"></path>
    </svg>
  )
}
