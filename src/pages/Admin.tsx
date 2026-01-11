import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { getAdminStats, getAllUsers, AdminStats } from '@/lib/api/admin'
import { ChartIcon } from '@/components/icons/PlatformIcons'

export function Admin() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAdminData() {
      if (!user?.id) {
        navigate('/login')
        return
      }

      setLoading(true)
      const adminStats = await getAdminStats(user.id)
      if (!adminStats) {
        // User is not admin
        navigate('/dashboard')
        return
      }

      setStats(adminStats)
      const allUsers = await getAllUsers(user.id)
      setUsers(allUsers || [])
      setLoading(false)
    }

    if (!authLoading && user) {
      loadAdminData()
    }
  }, [user, authLoading, navigate])

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center py-12 text-gray-400 font-mono">
          Loading admin dashboard...
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center py-12 text-gray-400 font-mono">
          Access denied. Admin privileges required.
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-mono mb-2 flex items-center gap-3">
          <ChartIcon className="text-primary w-8 h-8" />
          <span className="text-primary">{'>'}</span>
          <span className="text-white">Admin Dashboard</span>
        </h1>
        <p className="text-gray-400 font-mono">Site analytics and user management</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-mono text-gray-400 mb-2">Total Users</h3>
          <div className="text-3xl font-bold font-mono text-primary">{stats.totalUsers}</div>
        </div>
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-mono text-gray-400 mb-2">Active Users (30d)</h3>
          <div className="text-3xl font-bold font-mono text-primary">{stats.activeUsers}</div>
        </div>
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-mono text-gray-400 mb-2">Total Reminders</h3>
          <div className="text-3xl font-bold font-mono text-primary">{stats.totalReminders}</div>
        </div>
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
          <h3 className="text-sm font-mono text-gray-400 mb-2">Total Favorites</h3>
          <div className="text-3xl font-bold font-mono text-primary">{stats.totalFavorites}</div>
        </div>
      </div>

      {/* Platform Distribution */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-mono font-semibold text-white mb-4">Platform Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(stats.platformDistribution).map(([platform, count]) => (
            <div key={platform} className="text-center">
              <div className="text-2xl font-bold font-mono text-primary mb-1">{count}</div>
              <div className="text-sm font-mono text-gray-400">{platform}</div>
            </div>
          ))}
          {Object.keys(stats.platformDistribution).length === 0 && (
            <p className="text-gray-400 font-mono col-span-full text-center py-4">
              No platform data yet
            </p>
          )}
        </div>
      </div>

      {/* Users List */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-mono font-semibold text-white mb-4">Recent Users</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-6 py-4 text-left text-xs font-mono font-semibold text-gray-400 uppercase">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-mono font-semibold text-gray-400 uppercase">
                  Joined
                </th>
                <th className="px-6 py-4 text-left text-xs font-mono font-semibold text-gray-400 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {users.map((userItem) => (
                <tr key={userItem.id} className="hover:bg-[#0a0a0a] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                        <span className="text-primary font-mono font-bold text-xs">
                          {userItem.username?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-mono text-white font-semibold">
                          {userItem.username || 'Anonymous'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono text-gray-400">
                      {new Date(userItem.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-mono font-semibold rounded bg-primary/20 text-primary border border-primary/30">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <p className="text-gray-400 font-mono text-center py-8">No users found</p>
          )}
        </div>
      </div>
    </div>
  )
}
