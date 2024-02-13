export default function({className = '', pin = ''}) {
  const indiBg = (index: number) => (pin.length - 1) >= index ? 'bg-dp-purple' : 'bg-slate-200'
  return (
    <div className={`digit-indicators ${className}`}>
      <div className="flex w-1/2 mx-auto justify-between">
        {[...Array(Math.max(4, pin.length))].map((_, k) => (
          <div key={k} className={`w-3 h-3 rounded-full ${indiBg(k)}`}></div>
        ))}
      </div>
    </div>
  )
}