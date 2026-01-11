import { Link } from 'react-router-dom'
import { HeroSection } from '@/components/home/HeroSection'
import { PlatformShowcase } from '@/components/home/PlatformShowcase'
import { UpcomingContestsPreview } from '@/components/home/UpcomingContestsPreview'

export function Index() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <PlatformShowcase />
      <UpcomingContestsPreview />
      <footer className="text-center py-12 text-gray-500 font-mono text-sm">
        <p className="mb-2">$ Built for competitive programmers, by competitive programmers</p>
        <p>© 2026 CP Hub. Track. Compete. Improve.</p>
      </footer>
    </div>
  )
}
