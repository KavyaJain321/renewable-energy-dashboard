import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { 
  Layers, 
  RotateCcw, 
  Filter,
  Eye,
  EyeOff,
  TreePine,
  Building2,
  Droplets,
  Shield,
  Mountain,
  Home
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const constraintLayers = [
  { id: "forest", name: "Forest Areas", color: "#22c55e", percentage: 23, area: "657 acres", active: true, icon: TreePine },
  { id: "water", name: "Water Bodies", color: "#3b82f6", percentage: 12, area: "341 acres", active: true, icon: Droplets },
  { id: "buildings", name: "Buildings", color: "#ef4444", percentage: 15, area: "427 acres", active: true, icon: Building2 },
  { id: "protected", name: "Protected Zones", color: "#f59e0b", percentage: 8, area: "228 acres", active: false, icon: Shield },
  { id: "slopes", name: "Steep Slopes", color: "#8b5cf6", percentage: 18, area: "512 acres", active: true, icon: Mountain },
  { id: "residential", name: "Residential", color: "#ec4899", percentage: 6, area: "170 acres", active: false, icon: Home }
];

const constraintData = constraintLayers.map(layer => ({
  name: layer.name,
  value: layer.percentage,
  color: layer.color
}));

const beforeAfterData = [
  { category: "Total Land", before: 2847, after: 2847 },
  { category: "Usable Land", before: 1923, after: 2156 },
  { category: "Constraints", before: 924, after: 691 },
  { category: "Efficiency", before: 68, after: 76 }
];

export function ConstraintAnalysis() {
  const [showComparison, setShowComparison] = useState(false);
  const [sliderValue, setSliderValue] = useState([50]);

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Constraint Analysis</h1>
        <p className="text-gray-600 mt-1">Identify and analyze land use restrictions and constraints</p>
      </div>

      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Main Map Area */}
        <div className="col-span-8">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Constraint Map View</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setShowComparison(!showComparison)}>
                    <Layers className="h-4 w-4 mr-1" />
                    {showComparison ? "Hide" : "Show"} Comparison
                  </Button>
                  <Button size="sm" variant="outline">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                  <Button size="sm" variant="outline">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-96">
              <div className="w-full h-full relative bg-gradient-to-br from-green-50 to-blue-50 rounded-lg overflow-hidden">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1726795867795-32bc9872a44a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMGFlcmlhbCUyMHZpZXd8ZW58MXx8fHwxNzU3MTkwMjU1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Constraint analysis map"
                  className="w-full h-full object-cover opacity-40"
                />
                
                {/* Overlay zones */}
                <div className="absolute inset-4">
                  {/* Forest areas */}
                  <div className="absolute top-8 left-12 w-20 h-16 bg-green-500/30 rounded-lg border-2 border-green-500"></div>
                  <div className="absolute bottom-16 right-20 w-24 h-20 bg-green-500/30 rounded-lg border-2 border-green-500"></div>
                  
                  {/* Water bodies */}
                  <div className="absolute top-24 right-16 w-16 h-12 bg-blue-500/30 rounded-full border-2 border-blue-500"></div>
                  <div className="absolute bottom-8 left-20 w-12 h-8 bg-blue-500/30 rounded-full border-2 border-blue-500"></div>
                  
                  {/* Buildings */}
                  <div className="absolute top-16 left-32 w-8 h-8 bg-red-500/40 border-2 border-red-500"></div>
                  <div className="absolute center-12 right-32 w-6 h-6 bg-red-500/40 border-2 border-red-500"></div>
                  
                  {/* Slopes */}
                  <div className="absolute bottom-20 center w-28 h-12 bg-purple-500/30 rounded-lg border-2 border-purple-500 transform rotate-12"></div>
                </div>

                {showComparison && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Before / After Comparison</span>
                        <span className="text-xs text-gray-500">{sliderValue[0]}%</span>
                      </div>
                      <Slider
                        value={sliderValue}
                        onValueChange={setSliderValue}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}

                {/* Legend */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <h4 className="font-medium text-sm mb-2">Constraint Legend</h4>
                  <div className="space-y-1">
                    {constraintLayers.slice(0, 4).map((layer) => (
                      <div key={layer.id} className="flex items-center gap-2 text-xs">
                        <div 
                          className="w-3 h-3 rounded border" 
                          style={{ backgroundColor: layer.color + "40", borderColor: layer.color }}
                        />
                        <span>{layer.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel */}
        <div className="col-span-4 space-y-4">
          {/* Summary Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Area Summary</CardTitle>
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
              
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-xs text-red-600 font-medium">Restricted Area</p>
                <p className="text-lg font-bold text-red-700">924 acres (32%)</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Land Efficiency</span>
                  <span className="font-medium">68%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "68%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Layer Controls */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Constraint Layers</CardTitle>
              <CardDescription>Toggle visibility and adjust constraints</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {constraintLayers.map((layer) => {
                const Icon = layer.icon;
                return (
                  <div key={layer.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" style={{ color: layer.color }} />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{layer.name}</span>
                        <span className="text-xs text-gray-500">{layer.area}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{layer.percentage}%</span>
                      <Switch checked={layer.active} />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Constraints Breakdown */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Constraint Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={160}>
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
        </div>

        {/* Before/After Comparison Chart */}
        {showComparison && (
          <div className="col-span-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Before vs After Optimization</CardTitle>
                <CardDescription>Impact of constraint optimization on usable land</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={beforeAfterData}>
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="before" fill="#94a3b8" name="Before" />
                    <Bar dataKey="after" fill="#22c55e" name="After" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}