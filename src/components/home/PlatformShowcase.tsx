const platforms = [
  { name: 'Codeforces', color: 'bg-blue-500', icon: '🔵' },
  { name: 'LeetCode', color: 'bg-yellow-500', icon: '🟡' },
  { name: 'CodeChef', color: 'bg-orange-500', icon: '🟠' },
  { name: 'AtCoder', color: 'bg-purple-500', icon: '🟣' },
  { name: 'HackerRank', color: 'bg-green-500', icon: '🟢' },
  { name: 'TopCoder', color: 'bg-blue-600', icon: '💎' },
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
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 hover:border-primary/50 transition-all cursor-pointer group"
              >
                <div className={`w-12 h-12 ${platform.color} rounded-full mx-auto mb-4 flex items-center justify-center text-2xl`}>
                  {platform.icon}
                </div>
                <h3 className="text-center text-white font-mono font-semibold group-hover:text-primary transition-colors">
                  {platform.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
