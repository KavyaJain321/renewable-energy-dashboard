import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { 
  Sun, 
  Wind, 
  Zap,
  TrendingUp,
  Gauge,
  BarChart3
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const monthlyEnergyData = [
  { month: "Jan", solar: 450, wind: 320, hybrid: 770 },
  { month: "Feb", solar: 520, wind: 380, hybrid: 900 },
  { month: "Mar", solar: 680, wind: 420, hybrid: 1100 },
  { month: "Apr", solar: 780, wind: 450, hybrid: 1230 },
  { month: "May", solar: 890, wind: 380, hybrid: 1270 },
  { month: "Jun", solar: 950, wind: 340, hybrid: 1290 },
  { month: "Jul", solar: 920, wind: 360, hybrid: 1280 },
  { month: "Aug", solar: 850, wind: 400, hybrid: 1250 },
  { month: "Sep", solar: 720, wind: 480, hybrid: 1200 },
  { month: "Oct", solar: 580, wind: 520, hybrid: 1100 },
  { month: "Nov", solar: 480, wind: 450, hybrid: 930 },
  { month: "Dec", solar: 420, wind: 380, hybrid: 800 }
];

const seasonalData = [
  { season: "Spring", solar: 750, wind: 417, efficiency: 82 },
  { season: "Summer", solar: 907, wind: 367, efficiency: 89 },
  { season: "Fall", solar: 593, wind: 483, efficiency: 75 },
  { season: "Winter", solar: 463, wind: 373, efficiency: 68 }
];

const comparisonData = [
  { metric: "Peak Output", solar: 950, wind: 520, fullMark: 1000 },
  { metric: "Consistency", solar: 65, wind: 85, fullMark: 100 },
  { metric: "Efficiency", solar: 82, wind: 78, fullMark: 100 },
  { metric: "Reliability", solar: 70, wind: 80, fullMark: 100 },
  { metric: "Cost Effectiveness", solar: 88, wind: 75, fullMark: 100 }
];

export function EnergyPotential() {
  const [activeTab, setActiveTab] = useState("solar");

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Energy Potential Analysis</h1>
        <p className="text-gray-600 mt-1">Assess renewable energy generation potential across the site</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-fit grid-cols-3">
          <TabsTrigger value="solar" className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            Solar
          </TabsTrigger>
          <TabsTrigger value="wind" className="flex items-center gap-2">
            <Wind className="h-4 w-4" />
            Wind
          </TabsTrigger>
          <TabsTrigger value="hybrid" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Hybrid
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-12 gap-6">
          {/* Main Map Area */}
          <div className="col-span-8">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {activeTab === "solar" && "Solar Irradiance Map"}
                    {activeTab === "wind" && "Wind Resource Map"}
                    {activeTab === "hybrid" && "Hybrid Potential Map"}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Heatmap
                    </Button>
                    <Button size="sm" variant="outline">
                      <Gauge className="h-4 w-4 mr-1" />
                      Contours
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 h-96">
                <TabsContent value="solar" className="w-full h-full m-0">
                  <div className="w-full h-full relative bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg overflow-hidden">
                    <ImageWithFallback 
                      src="https://images.unsplash.com/photo-1726795867795-32bc9872a44a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMGFlcmlhbCUyMHZpZXd8ZW58MXx8fHwxNzU3MTkwMjU1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Solar irradiance map"
                      className="w-full h-full object-cover opacity-60"
                    />
                    
                    {/* Solar irradiance zones */}
                    <div className="absolute inset-4">
                      <div className="absolute top-8 right-8 w-32 h-24 bg-yellow-400/40 rounded-lg border-2 border-yellow-500">
                        <div className="text-xs font-medium text-center mt-8 text-yellow-800">High Irradiance</div>
                      </div>
                      <div className="absolute bottom-12 left-12 w-28 h-20 bg-orange-400/40 rounded-lg border-2 border-orange-500">
                        <div className="text-xs font-medium text-center mt-6 text-orange-800">Medium</div>
                      </div>
                      <div className="absolute top-16 left-20 w-20 h-16 bg-red-400/30 rounded-lg border-2 border-red-500">
                        <div className="text-xs font-medium text-center mt-4 text-red-800">Low</div>
                      </div>
                    </div>

                    {/* Solar Legend */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                      <h4 className="font-medium text-sm mb-2">Solar Irradiance (kWh/m²/day)</h4>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <div className="w-3 h-3 bg-yellow-400 rounded border border-yellow-500" />
                          <span>High (6.5-8.0)</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <div className="w-3 h-3 bg-orange-400 rounded border border-orange-500" />
                          <span>Medium (4.5-6.5)</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <div className="w-3 h-3 bg-red-400 rounded border border-red-500" />
                          <span>Low (2.0-4.5)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="wind" className="w-full h-full m-0">
                  <div className="w-full h-full relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg overflow-hidden">
                    <ImageWithFallback 
                      src="https://images.unsplash.com/photo-1739648385162-6059c331d24f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5kJTIwdHVyYmluZXMlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU3MTkwMjU3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Wind resource map"
                      className="w-full h-full object-cover opacity-60"
                    />
                    
                    {/* Wind speed zones */}
                    <div className="absolute inset-4">
                      <div className="absolute top-12 left-16 w-36 h-28 bg-blue-500/40 rounded-lg border-2 border-blue-600">
                        <div className="text-xs font-medium text-center mt-10 text-blue-800">High Wind Speed</div>
                      </div>
                      <div className="absolute bottom-16 right-16 w-24 h-20 bg-cyan-400/40 rounded-lg border-2 border-cyan-500">
                        <div className="text-xs font-medium text-center mt-6 text-cyan-800">Medium</div>
                      </div>
                    </div>

                    {/* Wind Legend */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                      <h4 className="font-medium text-sm mb-2">Wind Speed (m/s)</h4>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <div className="w-3 h-3 bg-blue-500 rounded border border-blue-600" />
                          <span>High (8.0-12.0)</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <div className="w-3 h-3 bg-cyan-400 rounded border border-cyan-500" />
                          <span>Medium (5.0-8.0)</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <div className="w-3 h-3 bg-gray-400 rounded border border-gray-500" />
                          <span>Low (2.0-5.0)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="hybrid" className="w-full h-full m-0">
                  <div className="w-full h-full relative bg-gradient-to-br from-green-50 to-blue-50 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 grid grid-cols-2">
                      <div className="bg-gradient-to-r from-yellow-200/50 to-yellow-300/50"></div>
                      <div className="bg-gradient-to-l from-blue-200/50 to-blue-300/50"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 text-center">
                        <Zap className="h-12 w-12 mx-auto mb-4 text-green-600" />
                        <p className="text-gray-700 mb-2">Hybrid Energy Optimization Map</p>
                        <p className="text-sm text-gray-500">Optimal placement zones for combined solar and wind systems</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel */}
          <div className="col-span-4 space-y-4">
            {/* Energy Output Summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Energy Output</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <TabsContent value="solar" className="space-y-4 m-0">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <p className="text-xs text-yellow-700 font-medium">Peak Solar Output</p>
                      <p className="text-lg font-bold text-yellow-800">950 MWh</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <p className="text-xs text-orange-700 font-medium">Annual Average</p>
                      <p className="text-lg font-bold text-orange-800">720 MWh</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs text-green-700 font-medium">System Efficiency</p>
                      <p className="text-lg font-bold text-green-800">82%</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Capacity Factor</span>
                      <span className="font-medium">28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                </TabsContent>

                <TabsContent value="wind" className="space-y-4 m-0">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-blue-700 font-medium">Peak Wind Output</p>
                      <p className="text-lg font-bold text-blue-800">520 MWh</p>
                    </div>
                    <div className="bg-cyan-50 p-3 rounded-lg">
                      <p className="text-xs text-cyan-700 font-medium">Annual Average</p>
                      <p className="text-lg font-bold text-cyan-800">425 MWh</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs text-green-700 font-medium">System Efficiency</p>
                      <p className="text-lg font-bold text-green-800">78%</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Capacity Factor</span>
                      <span className="font-medium">35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                </TabsContent>

                <TabsContent value="hybrid" className="space-y-4 m-0">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs text-green-700 font-medium">Combined Peak Output</p>
                      <p className="text-lg font-bold text-green-800">1,290 MWh</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-blue-700 font-medium">Annual Average</p>
                      <p className="text-lg font-bold text-blue-800">1,080 MWh</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-xs text-purple-700 font-medium">System Efficiency</p>
                      <p className="text-lg font-bold text-purple-800">85%</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Combined Capacity Factor</span>
                      <span className="font-medium">42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                </TabsContent>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Consistency</span>
                  </div>
                  <span className="font-semibold text-green-600">
                    {activeTab === "solar" && "65%"}
                    {activeTab === "wind" && "85%"}
                    {activeTab === "hybrid" && "78%"}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Peak Hours/Day</span>
                  </div>
                  <span className="font-semibold text-blue-600">
                    {activeTab === "solar" && "6.5h"}
                    {activeTab === "wind" && "8.2h"}
                    {activeTab === "hybrid" && "12.5h"}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Variability</span>
                  </div>
                  <span className="font-semibold text-purple-600">
                    {activeTab === "solar" && "Medium"}
                    {activeTab === "wind" && "Low"}
                    {activeTab === "hybrid" && "Very Low"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="col-span-12">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Monthly Energy Output</CardTitle>
                  <CardDescription>Seasonal energy generation patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={monthlyEnergyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      {activeTab === "solar" && <Line type="monotone" dataKey="solar" stroke="#f59e0b" strokeWidth={2} />}
                      {activeTab === "wind" && <Line type="monotone" dataKey="wind" stroke="#3b82f6" strokeWidth={2} />}
                      {activeTab === "hybrid" && (
                        <>
                          <Line type="monotone" dataKey="solar" stroke="#f59e0b" strokeWidth={2} />
                          <Line type="monotone" dataKey="wind" stroke="#3b82f6" strokeWidth={2} />
                          <Line type="monotone" dataKey="hybrid" stroke="#22c55e" strokeWidth={2} />
                        </>
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Solar vs Wind Comparison</CardTitle>
                  <CardDescription>Performance metrics comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <RadarChart data={comparisonData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" />
                      <PolarRadiusAxis angle={0} domain={[0, 100]} />
                      <Radar name="Solar" dataKey="solar" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
                      <Radar name="Wind" dataKey="wind" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
}