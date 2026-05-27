const hooks = [
  'From Sullivan County — where Tennessee began',
  "Weather wisdom from the Southwest Territory's capital",
  '250 years of reading these skies',
  "Sullivan County's gift to Tennessee",
  'What the frontier knew about these mountains',
  "Built where Tennessee's government started",
  'Modern intelligence, ancestral wisdom',
]

function getDayOfYear(): number {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

export default function RotatingHook() {
  const dayOfYear = getDayOfYear()
  const hook = hooks[dayOfYear % hooks.length]

  return <p className="text-sm text-almanac-parchment/60 italic font-serif tracking-wide">{hook}</p>
}
