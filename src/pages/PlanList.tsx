import React from 'react';

const mockPlans = [
  {
    id: '1',
    title: 'Autumn in Kansai',
    subtitle: 'Kyoto & Osaka',
    date: 'Nov 12 - Nov 20, 2024',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
    status: 'Upcoming'
  },
  {
    id: '2',
    title: 'Parisian Spring',
    subtitle: 'Paris, France',
    date: 'Apr 5 - Apr 15, 2025',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop',
    status: 'Planning'
  },
  {
    id: '3',
    title: 'Nordic Winter',
    subtitle: 'Tromsø & Oslo',
    date: 'Dec 20 - Jan 2, 2024',
    image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=2070&auto=format&fit=crop',
    status: 'Completed'
  }
];

export function PlanList({ onSelectPlan }: { onSelectPlan: (id: string) => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 border-b border-graphite/10 pb-8 gap-6">
        <div>
          <h1 className="text-6xl sm:text-8xl font-serif font-light tracking-tight text-graphite mb-4">
            Your <span className="italic text-graphite/40">Journeys.</span>
          </h1>
          <p className="text-graphite/60 font-sans">Curated itineraries and travel memories.</p>
        </div>
        <button className="px-6 py-3.5 bg-graphite text-paper text-xs uppercase tracking-widest font-medium hover:bg-black transition-colors whitespace-nowrap">
          + New Journey
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {mockPlans.map(plan => (
          <div key={plan.id} onClick={() => onSelectPlan(plan.id)} className="group cursor-pointer flex flex-col">
            <div className="relative aspect-[4/5] overflow-hidden mb-6">
              <img src={plan.image} alt={plan.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 bg-paper/90 backdrop-blur-sm text-graphite text-[10px] uppercase tracking-widest font-semibold">
                  {plan.status}
                </span>
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="text-[10px] uppercase tracking-[0.2em] text-sunset mb-2 font-semibold">{plan.date}</div>
              <h3 className="text-3xl font-serif font-light text-graphite mb-2">{plan.title}</h3>
              <p className="text-graphite/50 font-sans text-sm">{plan.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
