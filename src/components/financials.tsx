import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { 
  DollarSign, 
  TrendingUp, 
  Calculator,
  PiggyBank,
  CreditCard,
  Building,
  Settings
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const costBreakdownData = [
  { category: "Solar Panels", amount: 12500000, percentage: 35 },
  { category: "Wind Turbines", amount: 8750000, percentage: 25 },
  { category: "Installation", amount: 7000000, percentage: 20 },
  { category: "Grid Connection", amount: 3500000, percentage: 10 },
  { category: "Maintenance (5yr)", amount: 2800000, percentage: 8 },
  { category: "Other", amount: 700000, percentage: 2 }
];

const revenueProjectionData = [
  { year: "Year 1", revenue: 8500000, costs: 5200000, profit: 3300000 },
  { year: "Year 2", revenue: 8950000, costs: 4800000, profit: 4150000 },
  { year: "Year 3", revenue: 9420000, costs: 4950000, profit: 4470000 },
  { year: "Year 4", revenue: 9910000, costs: 5100000, profit: 4810000 },
  { year: "Year 5", revenue: 10420000, costs: 5250000, profit: 5170000 },
  { year: "Year 10", revenue: 13550000, costs: 6200000, profit: 7350000 },
  { year: "Year 15", revenue: 17650000, costs: 7100000, profit: 10550000 },
  { year: "Year 20", revenue: 23000000, costs: 8000000, profit: 15000000 }
];

const paybackData = [
  { year: 1, cumulative: -32000000 },
  { year: 2, cumulative: -27850000 },
  { year: 3, cumulative: -23380000 },
  { year: 4, cumulative: -18570000 },
  { year: 5, cumulative: -13400000 },
  { year: 6, cumulative: -8050000 },
  { year: 7, cumulative: -2520000 },
  { year: 8, cumulative: 2830000 },
  { year: 9, cumulative: 8480000 },
  { year: 10, cumulative: 15830000 }
];

export function Financials() {
  const [energyPrice, setEnergyPrice] = useState([0.12]);
  const [subsidyRate, setSubsidyRate] = useState([25]);
  const [financingOption, setFinancingOption] = useState("hybrid");

  // Recalculated values based on sliders
  const baseRevenue = 10420000;
  const adjustedRevenue = baseRevenue * (energyPrice[0] / 0.12);
  const subsidyAmount = 35250000 * (subsidyRate[0] / 100);

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Financial Analysis</h1>
        <p className="text-gray-600 mt-1">Comprehensive financial modeling and investment analysis</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Cost Breakdown */}
        <div className="col-span-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Project Cost Breakdown
              </CardTitle>
              <CardDescription>Total investment: $35.25M</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={costBreakdownData}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    dataKey="amount"
                    label={({ percentage }) => `${percentage}%`}
                  >
                    {costBreakdownData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={`hsl(${index * 60}, 70%, 50%)`} 
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="mt-4 space-y-2">
                {costBreakdownData.map((item, index) => (
                  <div key={item.category} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded" 
                        style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }}
                      />
                      <span>{item.category}</span>
                    </div>
                    <span className="font-medium">${(item.amount / 1000000).toFixed(1)}M</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ROI & Payback */}
        <div className="col-span-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                ROI & Payback Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-xs text-green-700 font-medium">20-Year ROI</p>
                  <p className="text-2xl font-bold text-green-800">187%</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <Calculator className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-xs text-blue-700 font-medium">Payback Period</p>
                  <p className="text-2xl font-bold text-blue-800">7.2 years</p>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={paybackData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`} />
                  <Tooltip formatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                  <Line type="monotone" dataKey="cumulative" stroke="#22c55e" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="text-center">
                  <p className="text-gray-500">NPV</p>
                  <p className="font-semibold">$48.2M</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500">IRR</p>
                  <p className="font-semibold">18.5%</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500">LCOE</p>
                  <p className="font-semibold">$0.08/kWh</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Projection */}
        <div className="col-span-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Revenue Projection</CardTitle>
              <CardDescription>20-year financial forecast with revenue, costs, and profit</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueProjectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`} />
                  <Tooltip formatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                  <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                  <Bar dataKey="costs" fill="#ef4444" name="Costs" />
                  <Bar dataKey="profit" fill="#22c55e" name="Profit" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Sensitivity Analysis */}
        <div className="col-span-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Sensitivity Analysis
              </CardTitle>
              <CardDescription>Adjust key parameters to see impact on returns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Energy Price ($/kWh)</label>
                  <span className="text-sm text-gray-600">${energyPrice[0].toFixed(3)}</span>
                </div>
                <Slider
                  value={energyPrice}
                  onValueChange={setEnergyPrice}
                  max={0.20}
                  min={0.08}
                  step={0.001}
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Government Subsidies (%)</label>
                  <span className="text-sm text-gray-600">{subsidyRate[0]}%</span>
                </div>
                <Slider
                  value={subsidyRate}
                  onValueChange={setSubsidyRate}
                  max={50}
                  min={0}
                  step={1}
                />
              </div>
              
              <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-sm">Impact on Key Metrics:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Adjusted Annual Revenue:</span>
                    <span className="font-medium">${(adjustedRevenue / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subsidy Amount:</span>
                    <span className="font-medium">${(subsidyAmount / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Effective Investment:</span>
                    <span className="font-medium">${((35250000 - subsidyAmount) / 1000000).toFixed(1)}M</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financing Options */}
        <div className="col-span-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <PiggyBank className="h-5 w-5" />
                Financing Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div 
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    financingOption === "loan" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setFinancingOption("loan")}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Bank Loan (80%)</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• Loan Amount: $28.2M</p>
                    <p>• Interest Rate: 4.5%</p>
                    <p>• Term: 15 years</p>
                    <p>• Monthly Payment: $215K</p>
                  </div>
                </div>
                
                <div 
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    financingOption === "equity" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setFinancingOption("equity")}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Full Equity</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• Investment: $35.25M</p>
                    <p>• No interest payments</p>
                    <p>• Full ownership</p>
                    <p>• Higher initial returns</p>
                  </div>
                </div>
                
                <div 
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    financingOption === "hybrid" ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setFinancingOption("hybrid")}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-green-500 rounded"></div>
                    <span className="font-medium">Hybrid (60% Loan, 40% Equity)</span>
                    <Badge className="ml-auto bg-purple-100 text-purple-700">Recommended</Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• Loan: $21.15M | Equity: $14.1M</p>
                    <p>• Balanced risk/return</p>
                    <p>• Lower monthly payments</p>
                    <p>• Optimal tax benefits</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Table */}
        <div className="col-span-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Financial Summary</CardTitle>
              <CardDescription>Key financial indicators for project evaluation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Metric</th>
                      <th className="text-center p-3 font-medium">5 Years</th>
                      <th className="text-center p-3 font-medium">10 Years</th>
                      <th className="text-center p-3 font-medium">20 Years</th>
                      <th className="text-center p-3 font-medium">Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3">Cumulative Revenue</td>
                      <td className="p-3 text-center">$46.2M</td>
                      <td className="p-3 text-center">$117.8M</td>
                      <td className="p-3 text-center">$310.5M</td>
                      <td className="p-3 text-center">USD</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">Cumulative Profit</td>
                      <td className="p-3 text-center">$22.0M</td>
                      <td className="p-3 text-center">$64.3M</td>
                      <td className="p-3 text-center">$183.7M</td>
                      <td className="p-3 text-center">USD</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">ROI</td>
                      <td className="p-3 text-center">62%</td>
                      <td className="p-3 text-center">182%</td>
                      <td className="p-3 text-center">521%</td>
                      <td className="p-3 text-center">%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">Net Present Value (NPV)</td>
                      <td className="p-3 text-center">$12.8M</td>
                      <td className="p-3 text-center">$35.2M</td>
                      <td className="p-3 text-center">$68.9M</td>
                      <td className="p-3 text-center">USD</td>
                    </tr>
                    <tr>
                      <td className="p-3">Levelized Cost of Energy</td>
                      <td className="p-3 text-center">$0.089</td>
                      <td className="p-3 text-center">$0.081</td>
                      <td className="p-3 text-center">$0.076</td>
                      <td className="p-3 text-center">$/kWh</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}