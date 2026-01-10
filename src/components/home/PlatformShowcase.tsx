import { CodeforcesIcon, LeetCodeIcon } from '@/components/icons/PlatformIcons'

const platforms = [
  { name: 'Codeforces', color: 'bg-blue-500', Component: CodeforcesIcon, url: 'https://codeforces.com' },
  { name: 'LeetCode', color: 'bg-yellow-500', Component: LeetCodeIcon, url: 'https://leetcode.com' },
  { name: 'CodeChef', color: 'bg-orange-500', url: 'https://www.codechef.com' },
  { name: 'AtCoder', color: 'bg-purple-500', url: 'https://atcoder.jp' },
  { name: 'HackerRank', color: 'bg-green-500', url: 'https://www.hackerrank.com' },
  { name: 'TopCoder', color: 'bg-blue-600', url: 'https://www.topcoder.com' },
]

export function PlatformShowcase() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold font-mono mb-3 flex items-center gap-2">
            <span className="text-primary">{'>'}</span>
            <span className="text-white">Supported Platforms</span>
          </h2>
          <p className="text-gray-400 font-mono mb-12">
            We aggregate contests from all the platforms you love
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {platforms.map((platform) => {
              const IconComponent = 'Component' in platform ? platform.Component : null
              return (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 hover:border-primary/50 transition-all cursor-pointer group"
                >
                  <div className={`w-12 h-12 ${platform.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                    {IconComponent ? (
                      <IconComponent className="w-6 h-6 text-white" />
                    ) : (
                      <span className="text-white font-mono font-bold text-xs">{platform.name[0]}</span>
                    )}
                  </div>
                  <h3 className="text-center text-white font-mono font-semibold group-hover:text-primary transition-colors">
                    {platform.name}
                  </h3>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
