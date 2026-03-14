import React, { useState } from 'react';
import { TravelData } from './types';
import { mockData } from './mockData';
import { NavBar } from './components/NavBar';
import { PlanList } from './pages/PlanList';
import { PlanDetail } from './pages/PlanDetail';
import { Discovery } from './pages/Discovery';

export default function App() {
  const [view, setView] = useState<'list' | 'detail' | 'discovery'>('list');
  const [data, setData] = useState<TravelData>(mockData);

  return (
    <div className="min-h-screen font-body bg-paper text-graphite">
      <NavBar currentView={view} setView={setView} />
      
      {view === 'list' && (
        <div className="pb-20">
          <PlanList onSelectPlan={(id) => setView('detail')} />
        </div>
      )}
      
      {view === 'detail' && (
        <div className="pb-20">
          <PlanDetail data={data} onBack={() => setView('list')} />
        </div>
      )}

      {view === 'discovery' && (
        <Discovery />
      )}
    </div>
  );
}
