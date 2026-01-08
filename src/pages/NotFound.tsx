import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 mb-4 font-mono text-sm">
          <span className="text-primary">$</span>{' '}
          <span className="text-white">404 - Page not found</span>
        </div>
        <h1 className="text-9xl font-bold font-mono text-primary glow-green">404</h1>
        <h2 className="text-3xl font-semibold font-mono text-white">
          Page Not Found
        </h2>
        <p className="text-gray-400 font-mono">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all font-mono font-semibold border-glow-green"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
