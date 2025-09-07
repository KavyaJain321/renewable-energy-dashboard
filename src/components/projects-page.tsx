import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  Plus, 
  MoreVertical, 
  MapPin, 
  Calendar,
  Users,
  TrendingUp,
  Zap,
  Wind
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const projects = [
  {
    id: 1,
    name: "Solar Valley Project",
    location: "Arizona, USA",
    area: "2,847 acres",
    type: "Solar",
    status: "In Progress",
    progress: 75,
    team: 8,
    lastUpdate: "2025-09-05",
    potential: "850 MW",
    roi: "58%",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&h=200&fit=crop"
  },
  {
    id: 2,
    name: "Coastal Wind Farm",
    location: "Oregon, USA", 
    area: "1,523 acres",
    type: "Wind",
    status: "Planning",
    progress: 35,
    team: 5,
    lastUpdate: "2025-09-04",
    potential: "420 MW",
    roi: "42%",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=200&fit=crop"
  },
  {
    id: 3,
    name: "Hybrid Energy Park",
    location: "Texas, USA",
    area: "4,200 acres", 
    type: "Mixed",
    status: "Assessment",
    progress: 20,
    team: 12,
    lastUpdate: "2025-09-03",
    potential: "1.2 GW",
    roi: "65%",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=200&fit=crop"
  },
  {
    id: 4,
    name: "Desert Solar Initiative",
    location: "Nevada, USA",
    area: "3,156 acres",
    type: "Solar", 
    status: "Completed",
    progress: 100,
    team: 6,
    lastUpdate: "2025-08-28",
    potential: "720 MW",
    roi: "52%",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=200&fit=crop"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-700";
    case "In Progress":
      return "bg-blue-100 text-blue-700";
    case "Planning":
      return "bg-yellow-100 text-yellow-700";
    case "Assessment":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Solar":
      return <div className="w-2 h-2 rounded-full bg-yellow-400" />;
    case "Wind":
      return <div className="w-2 h-2 rounded-full bg-blue-400" />;
    case "Mixed":
      return <div className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-blue-400" />;
    default:
      return <div className="w-2 h-2 rounded-full bg-gray-400" />;
  }
};

export function ProjectsPage() {
  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage your renewable energy assessment projects</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Capacity</p>
                <p className="text-2xl font-bold">8.4 GW</p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. ROI</p>
                <p className="text-2xl font-bold">54%</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <ImageWithFallback
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <Button size="sm" variant="secondary" className="bg-white/80 backdrop-blur-sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute top-4 left-4">
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {project.location}
                  </CardDescription>
                </div>
                {getTypeIcon(project.type)}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Area</p>
                  <p className="font-medium">{project.area}</p>
                </div>
                <div>
                  <p className="text-gray-500">Potential</p>
                  <p className="font-medium">{project.potential}</p>
                </div>
                <div>
                  <p className="text-gray-500">Est. ROI</p>
                  <p className="font-medium text-green-600">{project.roi}</p>
                </div>
                <div>
                  <p className="text-gray-500">Team Size</p>
                  <p className="font-medium flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {project.team}
                  </p>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Last updated {new Date(project.lastUpdate).toLocaleDateString()}
                </div>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}