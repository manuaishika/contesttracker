interface RatingChartProps {
  data?: Array<{ date: string; rating: number }>
}

export function RatingChart({ data = [] }: RatingChartProps) {
  // Placeholder chart component
  // In a real app, you'd use a charting library like recharts or chart.js
  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
      <div className="h-64 flex items-center justify-center text-gray-400 font-mono">
        {data.length === 0 ? (
          <p>No rating data available. Link your accounts to see rating history.</p>
        ) : (
          <p>Chart visualization would go here</p>
        )}
      </div>
    </div>
  )
}
