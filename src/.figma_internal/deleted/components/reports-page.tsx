import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar,
  Filter,
  Search,
  FileSpreadsheet,
  Presentation,
  Plus,
  Settings,
  Share2,
  CheckCircle
} from "lucide-react";
import { Input } from "./ui/input";

const reports = [
  {
    id: 1,
    title: "Solar Potential Assessment - Site A",
    description: "Comprehensive analysis of solar energy potential including irradiance maps and financial projections",
    type: "PDF",
    size: "2.4 MB",
    date: "2025-09-05",
    status: "Ready",
    thumbnail: "bg-red-100 text-red-600"
  },
  {
    id: 2,
    title: "Wind Resource Analysis - Site B", 
    description: "Detailed wind resource assessment with turbine placement recommendations",
    type: "Excel",
    size: "1.8 MB", 
    date: "2025-09-04",
    status: "Ready",
    thumbnail: "bg-green-100 text-green-600"
  },
  {
    id: 3,
    title: "Constraint Analysis Summary",
    description: "Land use constraints overview with regulatory compliance assessment",
    type: "PowerPoint",
    size: "4.2 MB",
    date: "2025-09-03", 
    status: "Processing",
    thumbnail: "bg-orange-100 text-orange-600"
  },
  {
    id: 4,
    title: "Financial Feasibility Report",
    description: "ROI analysis with payback periods and cash flow projections",
    type: "PDF", 
    size: "1.9 MB",
    date: "2025-09-02",
    status: "Ready",
    thumbnail: "bg-blue-100 text-blue-600"
  },
  {
    id: 5,
    title: "Environmental Impact Assessment",
    description: "Environmental considerations and mitigation strategies",
    type: "PDF",
    size: "3.1 MB",
    date: "2025-09-01",
    status: "Ready", 
    thumbnail: "bg-purple-100 text-purple-600"
  },
  {
    id: 6,
    title: "Optimization Results - Combined",
    description: "Optimal layout design for solar and wind integration",
    type: "Excel",
    size: "2.7 MB",
    date: "2025-08-31",
    status: "Draft",
    thumbnail: "bg-yellow-100 text-yellow-600"
  }
];

const getFileIcon = (type: string) => {
  switch (type) {
    case "Excel":
      return <FileSpreadsheet className="h-8 w-8" />;
    case "PowerPoint":
      return <Presentation className="h-8 w-8" />;
    default:
      return <FileText className="h-8 w-8" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Ready":
      return <Badge className="bg-green-100 text-green-700">Ready</Badge>;
    case "Processing":
      return <Badge className="bg-yellow-100 text-yellow-700">Processing</Badge>;
    case "Draft":
      return <Badge className="bg-gray-100 text-gray-700">Draft</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const reportSections = [
  { id: "constraints", name: "Constraint Analysis", checked: true, icon: Filter },
  { id: "energy", name: "Energy Potential", checked: true, icon: FileText },
  { id: "optimization", name: "Layout Optimization", checked: false, icon: Settings },
  { id: "financials", name: "Financial Analysis", checked: true, icon: FileSpreadsheet }
];

export function ReportsPage() {
  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Exports</h1>
        <p className="text-gray-600 mt-1">Generate and manage assessment reports</p>
      </div>

      {/* Actions Bar */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search reports..." className="pl-10 w-64" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-1" />
            Date Range
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            New PDF Report
          </Button>
          <Button variant="outline">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button>
            <Presentation className="h-4 w-4 mr-2" />
            Create Presentation
          </Button>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-lg ${report.thumbnail}`}>
                  {getFileIcon(report.type)}
                </div>
                {getStatusBadge(report.status)}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div>
                <CardTitle className="text-base line-clamp-2">{report.title}</CardTitle>
                <CardDescription className="text-sm mt-1 line-clamp-2">
                  {report.description}
                </CardDescription>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{report.type} • {report.size}</span>
                <span>{new Date(report.date).toLocaleDateString()}</span>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1" 
                  disabled={report.status === "Processing"}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Builder & Preview */}
      <div className="mt-8 grid grid-cols-12 gap-6">
        {/* Report Builder */}
        <div className="col-span-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Report Builder
              </CardTitle>
              <CardDescription>Customize your assessment report</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Include Sections:</h4>
                <div className="space-y-3">
                  {reportSections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <div key={section.id} className="flex items-center space-x-3">
                        <Checkbox checked={section.checked} />
                        <Icon className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{section.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="pt-4 border-t space-y-3">
                <h4 className="font-medium">Export Format:</h4>
                <div className="grid grid-cols-3 gap-2">
                  <Button size="sm" variant="outline" className="flex-col h-16">
                    <FileText className="h-4 w-4 mb-1 text-red-500" />
                    <span className="text-xs">PDF</span>
                  </Button>
                  <Button size="sm" variant="outline" className="flex-col h-16">
                    <FileSpreadsheet className="h-4 w-4 mb-1 text-green-500" />
                    <span className="text-xs">Excel</span>
                  </Button>
                  <Button size="sm" variant="outline" className="flex-col h-16">
                    <Presentation className="h-4 w-4 mb-1 text-orange-500" />
                    <span className="text-xs">PPT</span>
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 space-y-2">
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Link
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Preview */}
        <div className="col-span-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Report Preview
              </CardTitle>
              <CardDescription>Preview of generated report pages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {/* Page thumbnails */}
                <div className="aspect-[3/4] bg-white border rounded-lg p-3 shadow-sm">
                  <div className="h-full flex flex-col">
                    <div className="h-8 bg-blue-100 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="flex-1 bg-green-50 rounded mb-2"></div>
                    <div className="h-2 bg-gray-100 rounded"></div>
                  </div>
                  <p className="text-xs text-center mt-2 text-gray-600">Executive Summary</p>
                </div>
                
                <div className="aspect-[3/4] bg-white border rounded-lg p-3 shadow-sm">
                  <div className="h-full flex flex-col">
                    <div className="h-6 bg-red-100 rounded mb-2"></div>
                    <div className="grid grid-cols-2 gap-1 mb-2">
                      <div className="h-8 bg-yellow-100 rounded"></div>
                      <div className="h-8 bg-blue-100 rounded"></div>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded mb-2"></div>
                    <div className="h-4 bg-purple-100 rounded"></div>
                  </div>
                  <p className="text-xs text-center mt-2 text-gray-600">Constraint Analysis</p>
                </div>
                
                <div className="aspect-[3/4] bg-white border rounded-lg p-3 shadow-sm">
                  <div className="h-full flex flex-col">
                    <div className="h-6 bg-green-100 rounded mb-2"></div>
                    <div className="h-16 bg-gradient-to-r from-yellow-100 to-blue-100 rounded mb-2"></div>
                    <div className="h-8 bg-orange-100 rounded mb-2"></div>
                    <div className="flex-1 bg-gray-50 rounded"></div>
                  </div>
                  <p className="text-xs text-center mt-2 text-gray-600">Energy Potential</p>
                </div>
                
                <div className="aspect-[3/4] bg-white border rounded-lg p-3 shadow-sm">
                  <div className="h-full flex flex-col">
                    <div className="h-6 bg-purple-100 rounded mb-2"></div>
                    <div className="h-12 bg-gray-100 rounded mb-2"></div>
                    <div className="grid grid-cols-3 gap-1 mb-2">
                      <div className="h-6 bg-yellow-100 rounded"></div>
                      <div className="h-6 bg-blue-100 rounded"></div>
                      <div className="h-6 bg-green-100 rounded"></div>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded"></div>
                  </div>
                  <p className="text-xs text-center mt-2 text-gray-600">Financial Analysis</p>
                </div>
                
                <div className="aspect-[3/4] bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">Add Page</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>4 pages ready for export</span>
                </div>
                <div className="text-sm text-gray-500">
                  Estimated size: 3.2 MB
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}