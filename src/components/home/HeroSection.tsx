import { Link } from 'react-router-dom'
import { TrophyIcon, ChartIcon, BellIcon } from '@/components/icons/PlatformIcons'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[80vh] flex items-center justify-center">
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Terminal command line */}
          <div className="bg-[#1a1a1a] border border-primary/30 rounded-lg p-4 font-mono text-sm border-glow-green">
            <span className="text-primary">$</span>{' '}
            <span className="text-white">./track_contests --all</span>
          </div>

          {/* Main headline */}
          <h1 className="text-6xl md:text-7xl font-bold font-mono leading-tight">
            <span className="text-white">All Your Contests.</span>
            <br />
            <span className="text-primary glow-green">One Dashboard.</span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-400 font-mono max-w-2xl">
            Track competitive programming contests from{' '}
            <span className="text-secondary glow-cyan">Codeforces</span>,{' '}
            <span className="text-secondary glow-cyan">LeetCode</span>,{' '}
            <span className="text-orange-400">CodeChef</span>, and more. Monitor your ratings, never miss a contest.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 pt-6">
            <Link
              to="/contests"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all font-mono font-semibold border-glow-green flex items-center gap-2"
            >
              <TrophyIcon className="w-5 h-5" />
              View Contests →
            </Link>
            <Link
              to="/signup"
              className="px-6 py-3 bg-[#1a1a1a] border border-gray-600 text-white rounded-md hover:border-primary/50 transition-all font-mono"
            >
              Get Started Free
            </Link>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <span className="text-primary font-mono font-bold">6+</span>
              </div>
              <div>
                <h3 className="text-primary font-mono font-semibold mb-1">6+ Platforms</h3>
                <p className="text-gray-400 text-sm font-mono">All major CP platforms in one place</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <ChartIcon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-primary font-mono font-semibold mb-1">Track Ratings</h3>
                <p className="text-gray-400 text-sm font-mono">Monitor your progress across platforms</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <BellIcon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-primary font-mono font-semibold mb-1">Never Miss</h3>
                <p className="text-gray-400 text-sm font-mono">Set reminders for upcoming contests</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
