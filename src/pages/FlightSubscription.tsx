import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plane, Info, TrendingUp, Plus, Bell, MoreHorizontal, ArrowRight } from 'lucide-react';
import { FlightSubscription, FlightSubscriptionRow, FlightSolution } from '../types';
import { mockData } from '../mockData';

export function FlightSubscriptionPage() {
  const [subscriptions] = useState<FlightSubscription[]>(mockData.subscriptions || []);
  const [selectedSub, setSelectedSub] = useState<FlightSubscription | null>(null);
  const [activeDuration, setActiveDuration] = useState<number | null>(null);
  const [selectedSolution, setSelectedSolution] = useState<FlightSolution | null>(null);

  // List View
  if (!selectedSub) {
    return (
      <div className="min-h-screen bg-paper p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-4xl font-serif text-graphite">Flight Subscriptions</h1>
            <button className="flex items-center gap-2 px-6 py-3 bg-graphite text-paper rounded-full text-sm font-bold uppercase tracking-widest hover:bg-black transition-colors shadow-lg">
              <Plus className="w-4 h-4" />
              New Subscription
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subscriptions.map(sub => (
              <div 
                key={sub.id}
                onClick={() => {
                  setSelectedSub(sub);
                  setActiveDuration(sub.durations[0]?.days);
                }}
                className="group bg-paper border border-graphite/10 rounded-3xl p-8 cursor-pointer hover:border-sunset hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-sunset/10 rounded-2xl flex items-center justify-center">
                    <Bell className="w-6 h-6 text-sunset" />
                  </div>
                  <button className="p-2 hover:bg-graphite/5 rounded-full transition-colors">
                    <MoreHorizontal className="w-5 h-5 text-graphite/30" />
                  </button>
                </div>
                <h3 className="text-2xl font-serif text-graphite mb-2">{sub.name}</h3>
                <div className="space-y-2">
                  <p className="text-xs text-graphite/40 uppercase tracking-widest font-bold flex items-center gap-2">
                    <CalendarIcon className="w-3 h-3" />
                    Holiday: {sub.holidayRange}
                  </p>
                  <p className="text-xs text-graphite/40 uppercase tracking-widest font-bold flex items-center gap-2">
                    <Info className="w-3 h-3" />
                    Makeup: {sub.makeupDays.join(', ')}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-graphite/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-sunset uppercase tracking-widest">Active Tracking</span>
                  <ArrowRight className="w-4 h-4 text-graphite/20 group-hover:text-sunset group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Detail View
  const currentDuration = selectedSub.durations.find(d => d.days === activeDuration);

  return (
    <div className="min-h-screen bg-paper flex flex-col overflow-hidden">
      {/* Detail Header */}
      <header className="border-b border-graphite/10 px-8 py-6 bg-paper shrink-0">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setSelectedSub(null)}
              className="p-2 hover:bg-graphite/5 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-graphite" />
            </button>
            <div>
              <h2 className="text-2xl font-serif text-graphite">{selectedSub.name}</h2>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-[10px] font-bold text-graphite/40 uppercase tracking-widest">Holiday: {selectedSub.holidayRange}</span>
                <div className="w-1 h-1 rounded-full bg-graphite/20" />
                <span className="text-[10px] font-bold text-graphite/40 uppercase tracking-widest">Makeup: {selectedSub.makeupDays.join(', ')}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-graphite/10 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-graphite/5 transition-colors">Edit</button>
            <button className="px-4 py-2 bg-graphite text-paper rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors">Refresh Prices</button>
          </div>
        </div>
      </header>

      {/* Main Content: 3 Columns */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* Left Column: Calendar */}
        <aside className="w-80 border-r border-graphite/10 p-6 overflow-y-auto bg-graphite/[0.02]">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-graphite">May 2025</h4>
            <div className="flex gap-2">
              <ChevronLeft className="w-4 h-4 text-graphite/40 cursor-pointer" />
              <ChevronRight className="w-4 h-4 text-graphite/40 cursor-pointer" />
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <span key={i} className="text-[10px] font-bold text-graphite/30">{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 31 }).map((_, i) => {
              const day = i + 1;
              const isHoliday = day >= 1 && day <= 5;
              const isMakeup = day === 9;
              return (
                <div 
                  key={i} 
                  className={`aspect-square flex items-center justify-center text-xs rounded-lg transition-colors cursor-pointer
                    ${isHoliday ? 'bg-sunset/10 text-sunset font-bold' : ''}
                    ${isMakeup ? 'bg-graphite/10 text-graphite font-bold' : 'hover:bg-graphite/5'}
                  `}
                >
                  {day}
                </div>
              );
            })}
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-sunset/20 rounded-sm" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-graphite/60">Holiday Period</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-graphite/10 rounded-sm" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-graphite/60">Makeup Workday</span>
            </div>
          </div>
        </aside>

        {/* Middle Column: Tabs & Table */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="px-8 pt-6 border-b border-graphite/10 flex gap-8 shrink-0">
            {selectedSub.durations.map(d => (
              <button
                key={d.days}
                onClick={() => setActiveDuration(d.days)}
                className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative
                  ${activeDuration === d.days ? 'text-sunset' : 'text-graphite/40 hover:text-graphite'}
                `}
              >
                {d.days} Days
                {activeDuration === d.days && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-sunset" />
                )}
              </button>
            ))}
          </div>

          {/* Table Area */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="bg-paper border border-graphite/10 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse table-fixed">
                <thead>
                  <tr className="bg-graphite/[0.02] border-b border-graphite/10">
                    <th className="w-[60px] px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-graphite/40">ID</th>
                    <th className="w-[30%] px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-graphite/40">Departure</th>
                    <th className="w-[30%] px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-graphite/40">Return</th>
                    <th className="w-[120px] px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-graphite/40">Leave Days</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-graphite/40">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDuration?.options.map(row => (
                    <React.Fragment key={row.id}>
                      {/* Parent Row */}
                      <tr className="border-b border-graphite/5 bg-paper z-10 relative">
                        <td className="px-6 py-4 text-xs font-bold text-graphite/40">{row.id}</td>
                        <td className="px-6 py-4 text-sm font-medium text-graphite">{row.departureDate}</td>
                        <td className="px-6 py-4 text-sm font-medium text-graphite">{row.returnDate}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-sunset/10 text-sunset text-[10px] font-bold rounded-md">
                            {row.leaveDays} Days
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-graphite/60">{row.remarks}</td>
                      </tr>
                      
                      {/* Sub-rows (Solutions) */}
                      {row.solutions.map(sol => (
                        <tr 
                          key={sol.id}
                          onClick={() => setSelectedSolution(sol)}
                          className={`group cursor-pointer transition-colors border-b border-graphite/5 last:border-b-0 ${
                            selectedSolution?.id === sol.id ? 'bg-sunset/[0.03]' : 'hover:bg-graphite/[0.01]'
                          }`}
                        >
                          <td className="px-6 py-3 text-[10px] font-bold text-graphite/20 group-hover:text-sunset/40 transition-colors">
                            {sol.id}
                          </td>
                          <td className="px-6 py-3">
                            <div className="flex flex-col gap-1">
                              {sol.outbound.length > 0 ? sol.outbound.map((f, idx) => (
                                <div key={idx} className="text-[10px] text-graphite/60 leading-tight">
                                  <span className="font-medium">({f.departureTime} {f.origin} - {f.duration} - {f.arrivalTime} {f.destination})</span>
                                  {idx < sol.outbound.length - 1 && <span className="text-sunset font-bold ml-1">(2h Layover)</span>}
                                </div>
                              )) : <span className="text-[10px] text-graphite/30">---</span>}
                            </div>
                          </td>
                          <td className="px-6 py-3">
                            <div className="flex flex-col gap-1">
                              {sol.returnFlights.length > 0 ? sol.returnFlights.map((f, idx) => (
                                <div key={idx} className="text-[10px] text-graphite/60 leading-tight">
                                  <span className="font-medium">({f.departureTime} {f.origin} - {f.duration} - {f.arrivalTime} {f.destination})</span>
                                  {idx < sol.returnFlights.length - 1 && <span className="text-sunset font-bold ml-1">(2h Layover)</span>}
                                </div>
                              )) : <span className="text-[10px] text-graphite/30">---</span>}
                            </div>
                          </td>
                          <td className="px-6 py-3">
                            <div className="flex flex-col">
                              <span className="text-sm font-serif text-graphite">${sol.price}</span>
                              <span className={`text-[8px] font-bold uppercase tracking-widest ${sol.isAlternative ? 'text-graphite/30' : 'text-sunset'}`}>
                                {sol.isAlternative ? 'Alternative' : 'Primary'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-3 text-[10px] text-graphite/50 italic">
                            {sol.remarks}
                          </td>
                        </tr>
                      ))}
                      
                      {/* Spacer between groups */}
                      <tr className="h-4 bg-graphite/[0.02]"><td colSpan={5}></td></tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Price Trends */}
        <aside className="w-96 border-l border-graphite/10 p-8 overflow-y-auto">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-5 h-5 text-sunset" />
            <h4 className="text-sm font-bold uppercase tracking-widest text-graphite">Price Trends</h4>
          </div>

          {selectedSolution ? (
            <div className="space-y-8">
              <div>
                <p className="text-[10px] font-bold text-graphite/40 uppercase tracking-widest mb-1">Selected Solution</p>
                <h5 className="text-xl font-serif text-graphite">{selectedSolution.name}</h5>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-bold text-graphite/40 uppercase tracking-widest">Prices by Date</p>
                {[
                  { date: 'May 1', price: 1350 },
                  { date: 'May 2', price: 1250, active: true },
                  { date: 'May 3', price: 1420 },
                  { date: 'May 4', price: 1580 },
                  { date: 'May 5', price: 1650 },
                ].map((item, i) => (
                  <div 
                    key={i}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all
                      ${item.active ? 'border-sunset bg-sunset/5' : 'border-graphite/10 hover:border-graphite/20'}
                    `}
                  >
                    <span className="text-sm font-medium text-graphite">{item.date}</span>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-1.5 bg-graphite/5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${item.active ? 'bg-sunset' : 'bg-graphite/20'}`}
                          style={{ width: `${(item.price / 2000) * 100}%` }}
                        />
                      </div>
                      <span className={`text-sm font-serif ${item.active ? 'text-sunset font-bold' : 'text-graphite'}`}>
                        ${item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-graphite text-paper rounded-2xl shadow-xl">
                <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-4">AI Recommendation</p>
                <p className="text-xs leading-relaxed italic opacity-80">
                  "Booking for May 2nd saves you approximately 15% compared to the holiday peak. The direct flight option is currently at its 30-day low."
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 bg-graphite/5 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-graphite/20" />
              </div>
              <p className="text-sm text-graphite/40 italic">Select a solution from the table to view detailed price trends across different dates.</p>
            </div>
          )}
        </aside>

      </main>
    </div>
  );
}
