import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type RecentSession = {
  id: number;
  start_time: string;
  end_time: string;
  total_steps: number;
  total_distance_km: number;
  calories: number;
  created_at: string;
};

export default function Analytics() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem('token');
    fetch('/api/analytics/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data) => setMetrics(data))
      .catch((e) => console.error('Analytics fetch error', e))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user?.isPremium) {
    return (
      <div className="min-h-[80vh] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 backdrop-blur-md bg-white/10 rounded-full flex items-center justify-center mb-6 border border-white/20">
          <Lock className="w-10 h-10 text-white/60" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Premium Feature</h1>
        <p className="text-white/60 max-w-md mb-8">
          Unlock advanced analytics to track your weight trends, detailed activity breakdown, and performance metrics.
        </p>
        <Link to="/app/pricing" className="bg-emerald-500/80 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-emerald-500/20 backdrop-blur-sm">
          Upgrade to Premium
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Advanced Analytics</h1>
          <select className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white">
            <option className="bg-slate-900 text-white">Last 6 Months</option>
            <option className="bg-slate-900 text-white">Last 30 Days</option>
            <option className="bg-slate-900 text-white">This Year</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/20">
            <h3 className="text-lg font-bold text-white mb-6">Summary</h3>
            {loading ? (
              <p className="text-white/60">Loading...</p>
            ) : (
              <div className="space-y-3 text-white/80">
                <p>Total Steps: <strong className="text-white">{metrics?.totalSteps?.toLocaleString() || 0}</strong></p>
                <p>Total Distance: <strong className="text-white">{(metrics?.totalDistance || 0).toFixed(2)} km</strong></p>
                <p>Total Calories: <strong className="text-white">{metrics?.totalCalories || 0}</strong></p>
                <p>Premium Sessions: <strong className="text-white">{metrics?.sessionsCount || 0}</strong></p>
              </div>
            )}
          </div>

          <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/20">
            <h3 className="text-lg font-bold text-white mb-6">Recent Sessions</h3>
            {loading ? (
              <p className="text-white/60">Loading...</p>
            ) : (
              <div className="space-y-3 text-white/80">
                {(metrics?.recentSessions || []).map((s: RecentSession) => (
                  <div key={s.id} className="p-3 bg-white/5 rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <div className="text-sm">{new Date(s.start_time).toLocaleString()}</div>
                        <div className="text-xs text-white/60">Duration: {s.end_time ? Math.round((new Date(s.end_time).getTime() - new Date(s.start_time).getTime())/60000) : 'N/A'} mins</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{s.total_steps.toLocaleString()} steps</div>
                        <div className="text-xs text-white/60">{s.total_distance_km.toFixed(2)} km • {s.calories} kcal</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/20">
          <h3 className="text-lg font-bold text-white mb-6">Performance Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl">
              <p className="text-sm text-white/70 mb-1">Avg. Daily Steps</p>
              <p className="text-2xl font-bold text-white">{Math.round((metrics?.weekly || []).reduce((a:any,b:any)=>a+b.steps,0)/7).toLocaleString() || '0'}</p>
              <span className="text-xs text-emerald-300 font-medium">Real data</span>
            </div>
            <div className="p-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl">
              <p className="text-sm text-white/70 mb-1">Total Sessions</p>
              <p className="text-2xl font-bold text-white">{metrics?.sessionsCount || 0}</p>
              <span className="text-xs text-emerald-300 font-medium">Saved routes</span>
            </div>
            <div className="p-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl">
              <p className="text-sm text-white/70 mb-1">Calories Burned</p>
              <p className="text-2xl font-bold text-white">{metrics?.totalCalories || 0}</p>
              <span className="text-xs text-emerald-300 font-medium">From tracked sessions</span>
            </div>
            <div className="p-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl">
              <p className="text-sm text-white/70 mb-1">Consistency</p>
              <p className="text-2xl font-bold text-white">{metrics ? Math.round(((metrics.weekly || []).filter((d:any)=>d.steps>0).length/7)*100) : 0}%</p>
              <span className="text-xs text-emerald-300 font-medium">Last 7 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
