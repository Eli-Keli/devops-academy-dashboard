import { Link, useRouterState } from '@tanstack/react-router'
import { LayoutDashboard, Milestone, Terminal, ClipboardCheck, Search, Command, RefreshCw } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import ThemeToggle from './ThemeToggle'

interface AppShellProps {
  children: ReactNode
  title: string
  subtitle?: string
}

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, hint: '⌘1' },
  { to: '/roadmap', label: 'Roadmap', icon: Milestone, hint: '⌘2' },
  { to: '/labs', label: 'Labs', icon: Terminal, hint: '⌘3' },
  { to: '/reviews', label: 'Reviews', icon: ClipboardCheck, hint: '⌘4' },
] as const

export default function AppShell({ children, title, subtitle }: AppShellProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const [showSearch, setShowSearch] = useState(false)

  return (
    <div className="flex min-h-screen w-full bg-[var(--bg-base)] text-[var(--sea-ink)]">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-[var(--line)] bg-[var(--surface)] backdrop-blur-md relative z-20">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-6 h-16 border-b border-[var(--line)]">
          <div className="h-8 w-8 rounded-lg bg-[var(--lagoon-deep)] text-white grid place-items-center font-bold text-base shadow-sm">
            D
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-tight text-[var(--sea-ink)]">DevOps Academy</div>
            <div className="text-[10px] font-semibold text-[var(--sea-ink-soft)] uppercase tracking-wider">Visual command v1.0</div>
          </div>
        </div>

        {/* Search trigger */}
        <div className="px-4 pt-4 pb-2">
          <button 
            onClick={() => setShowSearch(true)}
            className="w-full flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--surface-strong)] px-3 py-2 text-xs text-[var(--sea-ink-soft)] hover:bg-[var(--link-bg-hover)] transition-all cursor-pointer"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="flex-1 text-left">Search academy...</span>
            <kbd className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[var(--sand)] border border-[var(--line)]">⌘K</kbd>
          </button>
        </div>

        {/* Navigation links */}
        <nav className="px-3 py-2 flex flex-col gap-1">
          {navItems.map((item) => {
            const active = item.to === '/' ? pathname === '/' : pathname.startsWith(item.to)
            const Icon = item.icon
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                  active
                    ? 'bg-[var(--lagoon)] text-[var(--sea-ink)] font-semibold shadow-sm border border-[rgba(79,184,178,0.18)]'
                    : 'text-[var(--sea-ink-soft)] hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]'
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${active ? 'text-[var(--sea-ink)]' : 'text-[var(--sea-ink-soft)] group-hover:text-[var(--sea-ink)]'}`} />
                <span className="flex-1">{item.label}</span>
                <kbd className={`font-mono text-[9px] opacity-0 group-hover:opacity-100 transition-opacity ${active ? 'text-[var(--sea-ink)]' : 'text-[var(--sea-ink-soft)]'}`}>
                  {item.hint}
                </kbd>
              </Link>
            )
          })}
        </nav>

        {/* Sidebar Footer widgets */}
        <div className="mt-auto p-4 border-t border-[var(--line)] bg-[var(--foam)]/50">
          <div className="rounded-lg border border-[var(--line)] bg-[var(--surface-strong)] p-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--sea-ink)]">
              <Command className="h-3.5 w-3.5 text-[var(--lagoon-deep)]" />
              Socratic Coach
            </div>
            <p className="mt-1 text-[10px] leading-relaxed text-[var(--sea-ink-soft)]">
              Active session linked. Complete today's mission to trigger verification critique.
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between px-1">
            <span className="text-[10px] text-[var(--sea-ink-soft)] font-medium">Theme Control</span>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Main Shell Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky Header */}
        <header className="h-16 border-b border-[var(--line)] bg-[var(--surface)]/90 backdrop-blur-md sticky top-0 z-10 flex items-center px-6 gap-4 justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold tracking-tight text-[var(--sea-ink)] truncate">{title}</h1>
            {subtitle && <p className="text-xs text-[var(--sea-ink-soft)] truncate mt-0.5">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-4 text-xs text-[var(--sea-ink-soft)]">
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-[rgba(47,106,74,0.08)] text-[var(--palm)] font-medium border border-[var(--chip-line)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--palm)] animate-pulse" />
              Sync Active
            </span>
            <span className="text-[var(--line)]">|</span>
            <span className="font-mono bg-[var(--surface-strong)] px-2 py-1 rounded border border-[var(--line)]">
              {new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
          </div>
        </header>

        {/* Mobile Navigation bar */}
        <header className="md:hidden h-14 border-b border-[var(--line)] bg-[var(--surface)] flex items-center justify-around px-4">
          {navItems.map((item) => {
            const active = item.to === '/' ? pathname === '/' : pathname.startsWith(item.to)
            const Icon = item.icon
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center justify-center p-2 text-xs transition-all ${
                  active ? 'text-[var(--lagoon-deep)] font-semibold' : 'text-[var(--sea-ink-soft)]'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-[10px] mt-0.5">{item.label}</span>
              </Link>
            )
          })}
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 max-w-[1280px] w-full mx-auto overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mock Search Dialog Modal */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center pt-[15vh] px-4">
          <div className="island-shell w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl p-4 relative animate-rise-in">
            <div className="flex items-center gap-3 border-b border-[var(--line)] pb-3">
              <Search className="h-4 w-4 text-[var(--sea-ink-soft)]" />
              <input 
                type="text" 
                placeholder="Search topics, missions, reviews..." 
                className="flex-1 bg-transparent border-0 outline-none text-sm placeholder-[var(--sea-ink-soft)] text-[var(--sea-ink)]"
                autoFocus
              />
              <button 
                onClick={() => setShowSearch(false)}
                className="text-xs px-2 py-1 rounded bg-[var(--sand)] hover:bg-[var(--foam)] border border-[var(--line)] cursor-pointer text-[var(--sea-ink-soft)]"
              >
                ESC
              </button>
            </div>
            <div className="py-8 text-center text-xs text-[var(--sea-ink-soft)]">
              No results found. Type "Linux" or "Docker" to begin searching.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
