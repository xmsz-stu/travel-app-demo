import React, { useState } from 'react';
import { TravelData } from './types';
import { mockData } from './mockData';
import { NavBar } from './components/NavBar';
import { PlanList } from './pages/PlanList';
import { PlanDetail } from './pages/PlanDetail';

export default function App() {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [data, setData] = useState<TravelData>(mockData);

  return (
    <div className="min-h-screen font-body pb-20 bg-paper text-graphite">
      <NavBar currentView={view} setView={setView} />
      
      {view === 'list' ? (
        <PlanList onSelectPlan={(id) => setView('detail')} />
      ) : (
        <PlanDetail data={data} onBack={() => setView('list')} />
      )}
    </div>
  );
}
