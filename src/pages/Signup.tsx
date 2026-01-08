import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement signup logic
    console.log('Signup:', { username, email, password })
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-[#1a1a1a] border border-gray-800 p-8 rounded-lg border-glow-green">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold font-mono text-white">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-mono text-gray-400 mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 text-white placeholder-gray-500 rounded-md focus:outline-none focus:border-primary transition-colors font-mono"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="block text-sm font-mono text-gray-400 mb-2">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 text-white placeholder-gray-500 rounded-md focus:outline-none focus:border-primary transition-colors font-mono"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-mono text-gray-400 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 text-white placeholder-gray-500 rounded-md focus:outline-none focus:border-primary transition-colors font-mono"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none transition-all font-mono font-semibold border-glow-green"
            >
              Sign up
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="text-sm text-primary hover:text-primary/80 font-mono"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
