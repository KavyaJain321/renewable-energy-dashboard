import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Sun, 
  Wind, 
  Zap,
  MousePointer,
  RotateCcw,
  Play,
  Download,
  Eye,
  Grid3X3,
  Target
} from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const radarData = [
  { metric: "Consistency", solar: 75, wind: 85, hybrid: 95, fullMark: 100 },
  { metric: "Capacity Factor", solar: 68, wind: 78, hybrid: 88, fullMark: 100 },
  { metric: "Variability", solar: 60, wind: 70, hybrid: 85, fullMark: 100 },
  { metric: "Cost Effectiveness", solar: 88, wind: 75, hybrid: 82, fullMark: 100 },
  { metric: "Grid Stability", solar: 65, wind: 80, hybrid: 92, fullMark: 100 },
  { metric: "Maintenance", solar: 90, wind: 70, hybrid: 80, fullMark: 100 }
];

const equipmentData = [
  { id: 1, type: "solar", x: 25, y: 35, capacity: "2.5 MW", status: "optimal" },
  { id: 2, type: "solar", x: 45, y: 25, capacity: "2.5 MW", status: "optimal" },
  { id: 3, type: "solar", x: 65, y: 40, capacity: "2.5 MW", status: "suboptimal" },
  { id: 4, type: "wind", x: 15, y: 15, capacity: "3.0 MW", status: "optimal" },
  { id: 5, type: "wind", x: 75, y: 20, capacity: "3.0 MW", status: "optimal" },
  { id: 6, type: "wind", x: 55, y: 65, capacity: "3.0 MW", status: "good" }
];

export function Optimization() {
  const [selectedTool, setSelectedTool] = useState("pointer");
  const [showPreview, setShowPreview] = useState(true);
  const [recommendation, setRecommendation] = useState("hybrid");

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Layout Optimization</h1>
        <p className="text-gray-600 mt-1">Optimize equipment placement for maximum energy output</p>
      </div>

      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Main Map Area */}
        <div className="col-span-8">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Interactive Equipment Placement</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant={selectedTool === "pointer" ? "default" : "outline"}
                    onClick={() => setSelectedTool("pointer")}
                  >
                    <MousePointer className="h-4 w-4 mr-1" />
                    Select
                  </Button>
                  <Button 
                    size="sm" 
                    variant={selectedTool === "solar" ? "default" : "outline"}
                    onClick={() => setSelectedTool("solar")}
                  >
                    <Sun className="h-4 w-4 mr-1" />
                    Solar
                  </Button>
                  <Button 
                    size="sm" 
                    variant={selectedTool === "wind" ? "default" : "outline"}
                    onClick={() => setSelectedTool("wind")}
                  >
                    <Wind className="h-4 w-4 mr-1" />
                    Wind
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
                  alt="Optimization map"
                  className="w-full h-full object-cover opacity-40"
                />
                
                {/* Equipment Icons */}
                {equipmentData.map((equipment) => (
                  <div
                    key={equipment.id}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${equipment.x}%`, top: `${equipment.y}%` }}
                  >
                    {equipment.type === "solar" ? (
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        equipment.status === "optimal" ? "bg-yellow-400 border-2 border-yellow-600" :
                        equipment.status === "good" ? "bg-yellow-300 border-2 border-yellow-500" :
                        "bg-orange-300 border-2 border-orange-500"
                      }`}>
                        <Sun className="h-4 w-4 text-yellow-800" />
                      </div>
                    ) : (
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        equipment.status === "optimal" ? "bg-blue-400 border-2 border-blue-600" :
                        equipment.status === "good" ? "bg-blue-300 border-2 border-blue-500" :
                        "bg-cyan-300 border-2 border-cyan-500"
                      }`}>
                        <Wind className="h-4 w-4 text-blue-800" />
                      </div>
                    )}
                    
                    {/* Tooltip */}
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                      {equipment.capacity} - {equipment.status}
                    </div>
                  </div>
                ))}

                {/* Grid overlay */}
                <div className="absolute inset-0 opacity-20">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Status Legend */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <h4 className="font-medium text-sm mb-2">Placement Status</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-green-400 rounded border border-green-600" />
                      <span>Optimal</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-yellow-400 rounded border border-yellow-600" />
                      <span>Good</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-orange-400 rounded border border-orange-600" />
                      <span>Suboptimal</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel */}
        <div className="col-span-4 space-y-4">
          {/* Drag & Drop Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Equipment Library</CardTitle>
              <CardDescription>Drag equipment to the map for placement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-yellow-50 border-2 border-dashed border-yellow-300 rounded-lg p-4 text-center cursor-pointer hover:bg-yellow-100 transition-colors">
                  <Sun className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-yellow-700">Solar Panel</span>
                  <p className="text-xs text-yellow-600">2.5 MW</p>
                </div>
                
                <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-4 text-center cursor-pointer hover:bg-blue-100 transition-colors">
                  <Wind className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-blue-700">Wind Turbine</span>
                  <p className="text-xs text-blue-600">3.0 MW</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Play className="h-4 w-4 mr-1" />
                  Auto Optimize
                </Button>
                <Button size="sm" variant="outline">
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 3D Preview */}
          {showPreview && (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">3D Preview</CardTitle>
                  <Button size="sm" variant="outline" onClick={() => setShowPreview(false)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Target className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">3D Layout Preview</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recommendation Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">System Recommendation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-green-700">Hybrid System Recommended</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Optimal combination of solar and wind for this site
                </p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Expected Output:</span>
                  <span className="font-medium">1,290 MW</span>
                </div>
                <div className="flex justify-between">
                  <span>Efficiency Gain:</span>
                  <span className="font-medium text-green-600">+23%</span>
                </div>
                <div className="flex justify-between">
                  <span>Cost Reduction:</span>
                  <span className="font-medium text-green-600">-15%</span>
                </div>
              </div>
              
              <Button className="w-full mt-3">
                <Download className="h-4 w-4 mr-2" />
                Download Layout
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="col-span-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Performance Comparison</CardTitle>
              <CardDescription>Key metrics comparison across different system configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={250}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis angle={0} domain={[0, 100]} />
                    <Radar name="Solar" dataKey="solar" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
                    <Radar name="Wind" dataKey="wind" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                    <Radar name="Hybrid" dataKey="hybrid" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <Sun className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-yellow-700">Solar Only</p>
                      <p className="text-xs text-yellow-600">850 MW capacity</p>
                      <Badge variant="secondary" className="mt-1">Good</Badge>
                    </div>
                    
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Wind className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-blue-700">Wind Only</p>
                      <p className="text-xs text-blue-600">420 MW capacity</p>
                      <Badge variant="secondary" className="mt-1">Fair</Badge>
                    </div>
                    
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <Zap className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-green-700">Hybrid</p>
                      <p className="text-xs text-green-600">1,290 MW capacity</p>
                      <Badge className="mt-1 bg-green-100 text-green-700">Optimal</Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <h4 className="font-medium">Optimization Benefits:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Higher overall capacity factor (42% vs 28% solar-only)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Reduced energy variability through complementary generation
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Better grid stability with continuous power output
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Shared infrastructure reduces overall costs
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}