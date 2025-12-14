import { AlertTriangle, Battery, MessageSquare, PlayCircle, Zap } from "lucide-react";
import { Area, AreaChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { StatCard } from "../components/ui/StatCard";
import { AdminLayout } from "../layouts/AdminLayout";

// Mock Data - Adapted for Museum Context
const activityData = [
  { name: '09:00', visitors: 12, interactions: 45 },
  { name: '10:00', visitors: 25, interactions: 80 },
  { name: '11:00', visitors: 45, interactions: 120 },
  { name: '12:00', visitors: 30, interactions: 60 },
  { name: '13:00', visitors: 55, interactions: 150 },
  { name: '14:00', visitors: 40, interactions: 110 },
];

const artworkPopularityData = [
  { name: 'Mona Lisa', value: 450 },
  { name: 'Starry Night', value: 300 },
  { name: 'The Scream', value: 250 },
];
const COLORS = ['#7ab529', '#0d1e15', '#e5e7eb'];

const recentInteractions = [
    { text: "Who painted this?", time: "2 min ago", type: "Question", id: "Q-1023", icon: MessageSquare },
    { text: "Moving to 'Renaissance Hall'", time: "5 min ago", type: "Robot Action", id: "A-552", icon: Zap },
    { text: "What technique is used?", time: "12 min ago", type: "Question", id: "Q-1022", icon: MessageSquare },
    { text: "Tour started: Highlights", time: "25 min ago", type: "Tour", id: "T-89", icon: PlayCircle },
    { text: "Can you repeat that?", time: "30 min ago", type: "Question", id: "Q-1021", icon: MessageSquare },
];

export function Dashboard() {
  return (
    <AdminLayout title="Robot Overview">
      <div className="mb-8">
        <p className="text-gray-500">Real-time monitoring of robot activity and visitor engagement.</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
         {/* Main Content Area (Left 9 cols) */}
         <div className="col-span-12 lg:col-span-9 space-y-6">
            
            {/* Top Stats Row */}
            <div className="grid grid-cols-3 gap-6">
               <StatCard 
                  title="Robot Status" 
                  value="Online • 82% Battery" 
                  dark={true}
                  className="col-span-1 border-none"
               />
               <StatCard 
                  title="Active Visitors" 
                  value="42" 
                  trend="12%" 
                  trendUp={true} 
               />
               <StatCard 
                  title="Daily Interactions" 
                  value="1,248" 
                  trend="5%" 
                  trendUp={true} 
               />
            </div>

            {/* Middle Row: Interactions List & Activity Chart */}
            <div className="grid grid-cols-3 gap-6">
               {/* Interactions List */}
               <div className="col-span-1 rounded-3xl bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                     <h3 className="font-bold">Live Feed</h3>
                     <button className="text-gray-400">•••</button>
                  </div>
                  <div className="space-y-4">
                     {recentInteractions.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <div className={
                                 `flex h-10 w-10 items-center justify-center rounded-full text-white
                                 ${item.type === 'Robot Action' ? 'bg-sidebar' : 'bg-primary'}`
                              }>
                                 <item.icon className="h-5 w-5" />
                              </div>
                              <div>
                                 <div className="text-sm font-bold truncate w-32">{item.text}</div>
                                 <div className="text-xs text-gray-400">{item.time}</div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Activity Chart */}
               <div className="col-span-2 rounded-3xl bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                     <div>
                        <h3 className="font-bold text-lg">Visitor Activity</h3>
                        <div className="flex items-center gap-2">
                           <span className="text-2xl font-bold">150</span>
                           <span className="text-sm text-primary font-medium">Peak at 13:00</span>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600"><div className="w-3 h-3 rounded bg-sidebar"></div> Interactions</div>
                        <div className="flex items-center gap-2 text-sm text-gray-600"><div className="w-3 h-3 rounded bg-primary"></div> Visitors</div>
                     </div>
                  </div>
                  
                  <div className="h-[250px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={activityData}>
                           <defs>
                              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#0d1e15" stopOpacity={0.8}/>
                                 <stop offset="95%" stopColor="#0d1e15" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="colorInteractions" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#7ab529" stopOpacity={0.8}/>
                                 <stop offset="95%" stopColor="#7ab529" stopOpacity={0}/>
                              </linearGradient>
                           </defs>
                           <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                           <YAxis hide />
                           <Tooltip />
                           <Area type="monotone" dataKey="visitors" stroke="#0d1e15" fillOpacity={1} fill="url(#colorVisits)" />
                           <Area type="monotone" dataKey="interactions" stroke="#7ab529" fillOpacity={1} fill="url(#colorInteractions)" />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>
               </div>
            </div>

            {/* Bottom Row: Tour Progess (Replacing Sales Report) */}
            <div className="w-full rounded-3xl bg-white p-6 shadow-sm">
               <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-bold">Active Tours Progress</h3>
                  <button className="text-gray-400">•••</button>
               </div>
               <div className="space-y-4">
                   <div className="relative pt-6">
                      <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-500">Renaissance Highlights (Group A)</span>
                          <span className="font-bold text-orange-500">12 mins left</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                         <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                   </div>
                   <div className="relative pt-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-500">Modern Art Walk (Group B)</span>
                          <span className="font-bold text-orange-500">Starting...</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                         <div className="bg-primary h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                   </div>
               </div>
            </div>

         </div>

         {/* Right Sidebar (3 cols) */}
         <div className="col-span-12 lg:col-span-3 space-y-6">
            
            {/* Top Artworks Chart */}
            <div className="rounded-3xl bg-white p-6 shadow-sm">
               <h3 className="font-bold mb-6">Top Artworks</h3>
               <div className="h-[200px] w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                           data={artworkPopularityData}
                           innerRadius={60}
                           outerRadius={80}
                           paddingAngle={0}
                           dataKey="value"
                           stroke="none"
                        >
                           {artworkPopularityData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                           ))}
                        </Pie>
                     </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                      <div className="text-sm text-gray-400">Views</div>
                      <div className="text-2xl font-bold">1.2K</div>
                  </div>
               </div>
               <div className="mt-4 space-y-2">
                  {artworkPopularityData.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                          <span className="text-gray-600">{item.name}</span>
                      </div>
                  ))}
               </div>
            </div>

            {/* Quick Actions (Replacing Promo Card) */}
            <div className="rounded-3xl bg-[#dcfce7] p-6 text-sidebar relative overflow-hidden">
               <AlertTriangle className="absolute -top-4 -right-4 h-24 w-24 text-primary opacity-20 rotate-12" fill="currentColor" />
               
               <div className="relative z-10">
                  <div className="mb-4 h-8 w-8 text-primary">
                     <Zap className="h-8 w-8" fill="currentColor" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Emergency Control</h3>
                  <p className="text-sm opacity-70 mb-6">
                     Immediate override actions for the robot guide.
                  </p>
                  <div className="space-y-3">
                     <button className="w-full rounded-xl bg-sidebar py-3 text-sm font-bold text-white shadow-lg hover:bg-black flex items-center justify-center gap-2">
                        <Battery className="h-4 w-4" /> Return to Charger
                     </button>
                     <button className="w-full rounded-xl bg-red-500 py-3 text-sm font-bold text-white shadow-lg hover:bg-red-600 flex items-center justify-center gap-2">
                         <AlertTriangle className="h-4 w-4" /> Emergency Stop
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </AdminLayout>
  );
}
