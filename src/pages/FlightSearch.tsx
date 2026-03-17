import React, { useState } from 'react';
import { Search, ArrowRightLeft, Calendar, Users, Filter, Clock, PlaneTakeoff, PlaneLanding, Check, ChevronDown } from 'lucide-react';
import { FlightOption } from '../types';
import { mockData } from '../mockData';

export function FlightSearch() {
  const [flights] = useState<FlightOption[]>(mockData.flights || []);
  const [isSearching, setIsSearching] = useState(false);
  const [tripType, setTripType] = useState<'Round trip' | 'One way' | 'Multi-city'>('Round trip');
  const [passengers, setPassengers] = useState('1 Adult');
  const [cabinClass, setCabinClass] = useState('Economy');
  
  const [from, setFrom] = useState('San Francisco (SFO)');
  const [to, setTo] = useState('Tokyo (NRT)');
  const [departDate, setDepartDate] = useState('Oct 12');
  const [returnDate, setReturnDate] = useState('Oct 18');

  const [activeSort, setActiveSort] = useState<'Best' | 'Cheapest' | 'Fastest'>('Best');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 800);
  };

  const renderFlightSegment = (segment: any) => (
    <div className="flex items-center gap-6">
      <div className="w-10 h-10 rounded-full bg-graphite/5 flex items-center justify-center overflow-hidden shrink-0">
        {segment.airlineLogo ? (
          <img src={segment.airlineLogo} alt={segment.airline} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        ) : (
          <PlaneTakeoff className="w-5 h-5 text-graphite/40" />
        )}
      </div>
      
      <div className="flex-1 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-lg font-medium text-graphite">{segment.departureTime}</span>
          <span className="text-sm text-graphite/50">{segment.origin}</span>
        </div>
        
        <div className="flex-1 px-8 flex flex-col items-center relative">
          <span className="text-xs text-graphite/50 mb-1">{segment.duration}</span>
          <div className="w-full h-px bg-graphite/20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-sunset" />
          </div>
          <span className="text-xs text-sunset mt-1 font-medium">Direct</span>
        </div>
        
        <div className="flex flex-col text-right">
          <span className="text-lg font-medium text-graphite">{segment.arrivalTime}</span>
          <span className="text-sm text-graphite/50">{segment.destination}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      {/* Hero Search Section */}
      <div className="bg-graphite text-paper pt-8 pb-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-serif font-light mb-8">Where to next?</h1>
          
          <div className="bg-paper rounded-2xl p-2 md:p-4 shadow-xl text-graphite">
            {/* Search Controls */}
            <div className="flex flex-wrap items-center gap-4 mb-4 px-2">
              <div className="flex items-center gap-2 cursor-pointer hover:text-sunset transition-colors">
                <span className="text-sm font-medium">{tripType}</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-sunset transition-colors">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">{passengers}</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-sunset transition-colors">
                <span className="text-sm font-medium">{cabinClass}</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            {/* Search Inputs */}
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex flex-col md:flex-row gap-2 relative">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <PlaneTakeoff className="w-5 h-5 text-graphite/40" />
                  </div>
                  <input 
                    type="text" 
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-graphite/5 border border-graphite/10 rounded-xl focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all font-medium"
                    placeholder="From"
                  />
                </div>
                
                <button type="button" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-paper border border-graphite/10 rounded-full flex items-center justify-center hover:shadow-md transition-all hidden md:flex">
                  <ArrowRightLeft className="w-4 h-4 text-graphite/60" />
                </button>

                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <PlaneLanding className="w-5 h-5 text-graphite/40" />
                  </div>
                  <input 
                    type="text" 
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-graphite/5 border border-graphite/10 rounded-xl focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all font-medium"
                    placeholder="To"
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Calendar className="w-5 h-5 text-graphite/40" />
                  </div>
                  <input 
                    type="text" 
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-graphite/5 border border-graphite/10 rounded-xl focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all font-medium"
                    placeholder="Depart"
                  />
                </div>
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Calendar className="w-5 h-5 text-graphite/40" />
                  </div>
                  <input 
                    type="text" 
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-graphite/5 border border-graphite/10 rounded-xl focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all font-medium"
                    placeholder="Return"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="h-14 px-8 bg-sunset text-paper rounded-xl font-bold text-lg hover:bg-[#e65a1f] transition-colors flex items-center justify-center gap-2"
              >
                {isSearching ? (
                  <div className="w-6 h-6 border-2 border-paper border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Search</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 shrink-0 space-y-6">
            <div className="bg-paper rounded-2xl p-6 shadow-sm border border-graphite/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-lg text-graphite">Filters</h3>
                <button className="text-xs text-sunset font-medium hover:underline">Reset</button>
              </div>

              <div className="space-y-6">
                {/* Stops */}
                <div>
                  <h4 className="text-sm font-bold text-graphite mb-3">Stops</h4>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded border border-graphite/20 flex items-center justify-center group-hover:border-sunset transition-colors">
                          <Check className="w-3 h-3 text-sunset opacity-0" />
                        </div>
                        <span className="text-sm text-graphite/80">Direct</span>
                      </div>
                      <span className="text-xs text-graphite/50">$850+</span>
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded border border-sunset bg-sunset flex items-center justify-center">
                          <Check className="w-3 h-3 text-paper" />
                        </div>
                        <span className="text-sm text-graphite/80">1 stop</span>
                      </div>
                      <span className="text-xs text-graphite/50">$550+</span>
                    </label>
                  </div>
                </div>

                <div className="h-px w-full bg-graphite/10" />

                {/* Airlines */}
                <div>
                  <h4 className="text-sm font-bold text-graphite mb-3">Airlines</h4>
                  <div className="space-y-2">
                    {['Japan Airlines', 'ANA', 'United Airlines', 'Zipair'].map(airline => (
                      <label key={airline} className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded border border-sunset bg-sunset flex items-center justify-center">
                            <Check className="w-3 h-3 text-paper" />
                          </div>
                          <span className="text-sm text-graphite/80">{airline}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="flex-1 space-y-6">
            {/* Sort Tabs */}
            <div className="bg-paper rounded-2xl shadow-sm border border-graphite/10 flex overflow-hidden">
              {[
                { id: 'Best', label: 'Best', price: '$850', duration: '20h 30m' },
                { id: 'Cheapest', label: 'Cheapest', price: '$550', duration: '20h 30m' },
                { id: 'Fastest', label: 'Fastest', price: '$1,200', duration: '19h 30m' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSort(tab.id as any)}
                  className={`flex-1 p-4 text-left transition-colors relative ${
                    activeSort === tab.id ? 'bg-graphite/5' : 'hover:bg-graphite/5'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className={`text-sm font-bold ${activeSort === tab.id ? 'text-sunset' : 'text-graphite'}`}>
                      {tab.label}
                    </span>
                    <span className="text-lg font-medium text-graphite mt-1">{tab.price}</span>
                    <span className="text-xs text-graphite/50">{tab.duration}</span>
                  </div>
                  {activeSort === tab.id && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-sunset" />
                  )}
                </button>
              ))}
            </div>

            {/* Flight Cards */}
            <div className="space-y-4">
              {flights.map(flight => (
                <div key={flight.id} className="bg-paper rounded-2xl shadow-sm border border-graphite/10 hover:shadow-md transition-shadow overflow-hidden flex flex-col md:flex-row">
                  <div className="flex-1 p-6 space-y-6">
                    {renderFlightSegment(flight.outbound)}
                    {flight.returnFlight && (
                      <>
                        <div className="h-px w-full bg-graphite/5" />
                        {renderFlightSegment(flight.returnFlight)}
                      </>
                    )}
                  </div>
                  
                  <div className="bg-graphite/5 p-6 md:w-64 flex flex-col justify-center items-start md:items-end border-t md:border-t-0 md:border-l border-graphite/10">
                    <span className="text-xs text-graphite/50 uppercase tracking-widest font-bold mb-1">Total Price</span>
                    <span className="text-3xl font-serif text-graphite mb-4">${flight.price}</span>
                    <button className="w-full py-3 bg-sunset text-paper rounded-xl font-bold hover:bg-[#e65a1f] transition-colors">
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
