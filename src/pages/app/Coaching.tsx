import { Calendar, MessageSquare, Video, Clock, Star, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

const coaches = [
  {
    id: 1,
    name: "Sarah Miller",
    specialty: "Strength & Conditioning",
    rating: 4.9,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    available: true
  },
  {
    id: 2,
    name: "Mike Ross",
    specialty: "HIIT & Weight Loss",
    rating: 4.8,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    available: true
  },
  {
    id: 3,
    name: "Emma Wilson",
    specialty: "Yoga & Mobility",
    rating: 5.0,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    available: false
  }
];

export default function Coaching() {
  const { user } = useAuth();

  if (!user?.isPremium) {
    return (
      <div className="min-h-[80vh] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 backdrop-blur-md bg-white/10 rounded-full flex items-center justify-center mb-6 border border-white/20">
          <Lock className="w-10 h-10 text-white/60" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Premium Coaching</h1>
        <p className="text-white/60 max-w-md mb-8">
          Get personalized guidance, form checks, and custom plans from our certified expert trainers.
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
          <h1 className="text-2xl font-bold text-white">Personal Coaching</h1>
          <button className="backdrop-blur-sm bg-emerald-500/80 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            My Sessions
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {coaches.map((coach) => (
            <div key={coach.id} className="backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/20 flex gap-6">
              <div className="w-20 h-20 bg-slate-700 rounded-full overflow-hidden flex-shrink-0">
                <img src={coach.image} alt={coach.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-white text-lg">{coach.name}</h3>
                    <p className="text-sm text-emerald-300 font-medium">{coach.specialty}</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-300 text-sm font-bold">
                    <Star className="w-4 h-4 fill-current" /> {coach.rating}
                  </div>
                </div>
                
                <div className="flex gap-3 mt-4">
                  <button className="flex-1 backdrop-blur-sm bg-emerald-500/30 text-emerald-200 py-2 rounded-lg text-sm font-bold hover:bg-emerald-500/50 transition-colors flex items-center justify-center gap-2 border border-emerald-500/30">
                    <MessageSquare className="w-4 h-4" /> Chat
                  </button>
                  <button className="flex-1 backdrop-blur-sm bg-white/10 text-white py-2 rounded-lg text-sm font-bold hover:bg-white/20 transition-colors flex items-center justify-center gap-2 border border-white/20">
                    <Calendar className="w-4 h-4" /> Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Sessions */}
        <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/20">
          <h3 className="text-lg font-bold text-white mb-6">Upcoming Sessions</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10">
              <div className="p-3 backdrop-blur-sm bg-emerald-500/30 rounded-lg text-emerald-300">
                <Video className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white">Form Check & Review</h4>
                <p className="text-sm text-white/60">with Coach Sarah</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-white">Tomorrow</p>
                <div className="flex items-center gap-1 text-xs text-white/60 justify-end">
                  <Clock className="w-3 h-3" /> 10:00 AM
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
