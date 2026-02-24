import { Dumbbell, Lock, PlayCircle, Clock, BarChart, Crown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from 'react';

const programs = [
  {
    id: 1,
    title: "Push Pull Legs (PPL)",
    desc: "Classic 3-day split for muscle growth.",
    level: "Intermediate",
    duration: "60 min",
    isFree: true,
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Upper / Lower Split",
    desc: "Balanced 4-day routine for strength.",
    level: "Beginner",
    duration: "45 min",
    isFree: true,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Pro Split",
    desc: "Advanced 5-day isolation training.",
    level: "Advanced",
    duration: "75 min",
    isFree: false,
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Personalized Plan",
    desc: "Custom plan tailored to your goals.",
    level: "All Levels",
    duration: "Custom",
    isFree: false,
    image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "HIIT Shred",
    desc: "High intensity interval training for fat loss.",
    level: "Intermediate",
    duration: "30 min",
    isFree: false,
    image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=2025&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Yoga Flow",
    desc: "Relaxing yoga for flexibility and mind.",
    level: "Beginner",
    duration: "45 min",
    isFree: false,
    image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "Powerlifting 101",
    desc: "Master the big three lifts.",
    level: "Advanced",
    duration: "90 min",
    isFree: false,
    image: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 8,
    title: "Home Bodyweight",
    desc: "No equipment needed. Train anywhere.",
    level: "Beginner",
    duration: "20 min",
    isFree: true,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function Workouts() {
  const { user } = useAuth();
  const [view, setView] = useState<'browse'|'my-plan'>('browse');
  const [myTab, setMyTab] = useState<'workout'|'nutrition'>('workout');
  const [myPlan, setMyPlan] = useState<any>(null);

  useEffect(() => {
    // attempt to fetch user's plan (backend may not provide it yet)
    const token = localStorage.getItem('token');
    fetch('/api/workouts/my-plan', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => setMyPlan(data || null))
      .catch(() => setMyPlan(null));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Workout Programs</h1>
          <div className="flex gap-2">
            <button onClick={() => setView('browse')} className={`px-3 py-1 rounded-lg text-sm font-medium ${view==='browse'?'bg-emerald-500/80 text-white':'backdrop-blur-md bg-white/10 text-white border border-white/20'}`}>Browse</button>
            <button onClick={() => setView('my-plan')} className={`px-3 py-1 rounded-lg text-sm font-medium ${view==='my-plan'?'bg-purple-500/80 text-white':'backdrop-blur-md bg-white/10 text-white border border-white/20'}`}>My Plan</button>
          </div>
        </div>

        {view === 'browse' && (
          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((program) => (
              <div key={program.id} className="group relative backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 overflow-hidden hover:border-white/40 transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={program.image} 
                    alt={program.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{program.title}</h3>
                    <p className="text-white/60 text-sm">{program.desc}</p>
                  </div>
                  {!program.isFree && (
                    <div className="absolute top-4 right-4 bg-amber-500/80 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg backdrop-blur-sm">
                      <Crown className="w-3 h-3" /> Premium
                    </div>
                  )}
                </div>
                
                <div className="p-4 flex items-center justify-between border-t border-white/10">
                  <div className="flex gap-4 text-sm text-white/70">
                    <div className="flex items-center gap-1">
                      <BarChart className="w-4 h-4 text-emerald-400" />
                      {program.level}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-emerald-400" />
                      {program.duration}
                    </div>
                  </div>
                  
                  <button 
                    className={`p-2 rounded-full transition-colors ${
                      program.isFree || user?.isPremium 
                        ? 'backdrop-blur-sm bg-emerald-500/30 text-emerald-300 hover:bg-emerald-500/50' 
                        : 'bg-white/5 text-white/40 cursor-not-allowed'
                    }`}
                    onClick={() => {
                      if (!program.isFree && !user?.isPremium) {
                        alert("This is a premium program. Please upgrade to access.");
                      }
                    }}
                  >
                    {program.isFree || user?.isPremium ? <PlayCircle className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === 'my-plan' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setMyTab('workout')} className={`px-3 py-1 rounded-lg ${myTab==='workout'?'bg-emerald-500 text-white':'bg-white/5 text-white/70'}`}>My Workout Plan</button>
              <button onClick={() => setMyTab('nutrition')} className={`px-3 py-1 rounded-lg ${myTab==='nutrition'?'bg-emerald-500 text-white':'bg-white/5 text-white/70'}`}>My Nutrition Plan</button>
            </div>

            {/* Today's Plan */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 md:p-6 relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="inline-block px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full mb-2">Today</div>
                  <h3 className="text-xl font-bold">{myPlan?.today?.title || 'Upper Body Power'}</h3>
                  <p className="text-slate-400 text-sm">{myPlan?.today?.notes || '45 mins • Dumbbells • Assigned by your coach'}</p>
                </div>
                <button className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold">Start</button>
              </div>
            </div>

            {/* Tab content */}
            <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4">
              {myTab === 'workout' ? (
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">My Workout Plan</h4>
                  <p className="text-white/70 text-sm mb-4">{myPlan?.workout?.description || 'Your coach-selected workout plan will appear here. If you have a private coach they can add sessions and progress.'}</p>
                  {/* simple list */}
                  <ul className="space-y-2">
                    {(myPlan?.workout?.sessions || [{name:'Day 1 - Push', duration:'45 min'}]).map((s:any, i:number) => (
                      <li key={i} className="p-3 rounded-lg bg-white/5 flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-white">{s.name}</div>
                          <div className="text-xs text-white/60">{s.duration}</div>
                        </div>
                        <button className="text-emerald-300">Open</button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">My Nutrition Plan</h4>
                  <p className="text-white/70 text-sm mb-4">{myPlan?.nutrition?.notes || 'Your coach can provide daily meal plans and macros here.'}</p>
                  <div className="p-3 rounded-lg bg-white/5">
                    <strong className="text-white">Breakfast:</strong> Oats, banana, whey
                    <div className="text-white/60 text-sm">Calories: 450 • Protein: 35g</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
