import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  Upload, 
  Square, 
  MousePointer, 
  Maximize2,
  Sun,
  Wind,
  DollarSign,
  TreePine,
  Building2,
  Droplets
} from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// TODO: Replace mock data with real Supabase queries
// - Fetch constraint data from projects table
// - Fetch energy output data from energy_potential field
// - Fetch ROI data from financial_analysis field
// - Use useProject hook to get current project data

const constraintData = [
  { name: "Buildings", value: 15, color: "#ef4444" },
  { name: "Water Bodies", value: 12, color: "#3b82f6" },
  { name: "Forest Areas", value: 23, color: "#22c55e" },
  { name: "Protected Zones", value: 8, color: "#f59e0b" },
  { name: "Slopes >15°", value: 18, color: "#8b5cf6" },
  { name: "Usable Land", value: 24, color: "#10b981" }
];

const energyOutputData = [
  { month: "Jan", solar: 450, wind: 320 },
  { month: "Feb", solar: 520, wind: 380 },
  { month: "Mar", solar: 680, wind: 420 },
  { month: "Apr", solar: 780, wind: 450 },
  { month: "May", solar: 890, wind: 380 },
  { month: "Jun", solar: 950, wind: 340 },
  { month: "Jul", solar: 920, wind: 360 },
  { month: "Aug", solar: 850, wind: 400 },
  { month: "Sep", solar: 720, wind: 480 },
  { month: "Oct", solar: 580, wind: 520 },
  { month: "Nov", solar: 480, wind: 450 },
  { month: "Dec", solar: 420, wind: 380 }
];

const roiData = [
  { year: "Year 1", roi: -15, payback: -2.3 },
  { year: "Year 5", roi: 8, payback: 1.2 },
  { year: "Year 10", roi: 25, payback: 4.5 },
  { year: "Year 15", roi: 42, payback: 7.8 },
  { year: "Year 20", roi: 58, payback: 11.2 },
  { year: "Year 25", roi: 73, payback: 14.6 }
];

interface DashboardMainProps {
  onResetMapSelection?: () => void;
}

export function DashboardMain({ onResetMapSelection }: DashboardMainProps) {
  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Land Assessment Dashboard</h1>
          <p className="text-gray-600 mt-1">Analyze renewable energy potential for selected land parcels</p>
        </div>
        {onResetMapSelection && (
          <Button 
            variant="outline" 
            onClick={onResetMapSelection}
            className="text-sm"
          >
            <Square className="w-4 h-4 mr-2" />
            Reselect Area
          </Button>
        )}
      </div>

      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Main Map Area */}
        <div className="col-span-8">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Interactive Land Map</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <MousePointer className="h-4 w-4 mr-1" />
                    Select
                  </Button>
                  <Button size="sm" variant="outline">
                    <Square className="h-4 w-4 mr-1" />
                    Draw
                  </Button>
                  <Button size="sm" variant="outline">
                    <Upload className="h-4 w-4 mr-1" />
                    Upload
                  </Button>
                  <Button size="sm" variant="outline">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-96">
              <div className="w-full h-full relative bg-gradient-to-br from-green-50 to-blue-50 rounded-lg overflow-hidden">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1681415722812-32f3c1e9f865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5ld2FibGUlMjBlbmVyZ3klMjBzb2xhciUyMHBhbmVscyUyMHdpbmQlMjB0dXJiaW5lcyUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTcxODk0MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Renewable energy landscape"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 text-center">
                    <p className="text-gray-700 mb-4">Interactive map will be integrated here</p>
                    <p className="text-sm text-gray-500">Click tools above to start land selection</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Panel */}
        <div className="col-span-4 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Project Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-blue-600 font-medium">Total Area</p>
                  <p className="text-lg font-bold text-blue-700">2,847 acres</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-xs text-green-600 font-medium">Usable Area</p>
                  <p className="text-lg font-bold text-green-700">1,923 acres</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Solar Potential</span>
                  </div>
                  <span className="font-semibold text-green-600">850 MW</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Wind Potential</span>
                  </div>
                  <span className="font-semibold text-green-600">420 MW</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Est. ROI (20yr)</span>
                  </div>
                  <span className="font-semibold text-green-600">58%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Land Usability</span>
                  <span>68%</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Constraints Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {constraintData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="col-span-12">
          <div className="grid grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Land Constraints</CardTitle>
                <CardDescription>Distribution of land usage constraints</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={constraintData}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      dataKey="value"
                    >
                      {constraintData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Monthly Energy Output</CardTitle>
                <CardDescription>Solar and wind energy potential by month</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={energyOutputData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="solar" fill="#f59e0b" />
                    <Bar dataKey="wind" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">ROI Projection</CardTitle>
                <CardDescription>Return on investment over 25 years</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={roiData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="roi" stroke="#22c55e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}