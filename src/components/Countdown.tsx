'use client'
import { useEffect, useState } from 'react'


// Target: 23:59 on 20 Dec 2025 in Europe/London
const targetISO = '2025-12-20T23:59:00+00:00' // keep simple; display is relative


function format(deltaMs: number){
if (deltaMs <= 0) return { d: 0, h: 0, m: 0, s: 0 }
const s = Math.floor(deltaMs/1000)
const d = Math.floor(s / 86400)
const h = Math.floor((s % 86400) / 3600)
const m = Math.floor((s % 3600) / 60)
const sec = s % 60
return { d, h, m, s: sec }
}


export default function Countdown(){
const [now, setNow] = useState(() => Date.now())
const [ended, setEnded] = useState(false)


useEffect(() => {
const id = setInterval(() => setNow(Date.now()), 1000)
return () => clearInterval(id)
}, [])


const target = new Date(targetISO).getTime()
const delta = target - now
const t = format(delta)


useEffect(()=>{ setEnded(delta <= 0) }, [delta])


return (
<div className="flex items-center gap-3 text-center">
{ended ? (
<div className="text-lg font-semibold">Mission deadline reached.</div>
) : (
<div className="flex gap-2">
<TimeBox label="Days" value={t.d} />
<TimeBox label="Hours" value={t.h} />
<TimeBox label="Minutes" value={t.m} />
<TimeBox label="Seconds" value={t.s} />
</div>
)}
</div>
)
}


function TimeBox({ label, value }: { label: string, value: number }){
return (
<div className="rounded-2xl border px-4 py-3 min-w-[90px]">
<div className="text-3xl font-bold tabular-nums">{value}</div>
<div className="text-xs text-gray-600">{label}</div>
</div>
)
}