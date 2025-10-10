import Countdown from './Countdown'


export default function MissionSection(){
return (
<section className="mx-auto max-w-6xl px-4 py-14">
<div className="grid items-start gap-8 md:grid-cols-2">
<div className="space-y-4">
<h2 className="text-3xl font-bold">The Mission</h2>
<p className="text-gray-600">We will add some details here on the problem.</p>
<div>
<div className="text-sm text-gray-600 mb-2">Days to complete the mission</div>
<Countdown />
</div>
<div>
<h3 className="text-xl font-semibold mt-6 mb-2">Mission Objectives</h3>
<ul className="list-disc pl-5 space-y-1 text-gray-800">
<li>Submit PhD thesis before deadline on 20th December</li>
<li>Build the team of builders and reviewers and teachers</li>
<li>Get wide industry critique on the PhD ideas</li>
<li>Get teaching course live</li>
<li>Get external to academia and industry people involved and excited about science</li>
<li>Get feedback from innovative suppliers and generators</li>
<li>Have progress made on legislative changes required for delivery</li>
<li>Deliver MVP set of capabilities live including UIs ideally with some third parties using the capabilities</li>
<li>Not get kicked out of Imperial due to going rogue</li>
<li>Not become a bad man</li>
</ul>
</div>
</div>
<div className="border rounded-2xl aspect-video grid place-items-center bg-gray-50">
<div className="text-center px-4">
<div className="font-semibold mb-1">Introduction to the mission (video)</div>
<div className="text-sm text-gray-600">Embed space reserved — add your video link when ready</div>
</div>
</div>
</div>
</section>
)
}