import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Search, 
  Square, 
  Edit3, 
  Trash2, 
  Navigation,
  MapPin,
  Layers,
  ZoomIn,
  ZoomOut,
  Target,
  CheckCircle
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// TODO: Integrate with Supabase Projects
// - Use useProject hook to save selected polygon as GeoJSON
// - Store polygon coordinates in projects table
// - Add project name and description input
// - Call createProject API on confirm selection

interface MapSelectionScreenProps {
  onConfirmSelection: () => void;
}

export function MapSelectionScreen({ onConfirmSelection }: MapSelectionScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [coordinates, setCoordinates] = useState({
    latitude: "40.7589",
    longitude: "-73.9851"
  });
  const [selectedTool, setSelectedTool] = useState("select");
  const [hasSelection, setHasSelection] = useState(false);
  const [selectionData, setSelectionData] = useState({
    area: "0",
    coordinates: ""
  });

  const handleSearch = () => {
    // Simulate search functionality
    console.log("Searching for:", searchQuery);
  };

  const handleGoToLocation = () => {
    // Simulate going to coordinates
    console.log("Going to:", coordinates);
  };

  const handleMapClick = () => {
    if (selectedTool === "draw") {
      // Simulate drawing polygon
      setHasSelection(true);
      setSelectionData({
        area: "2,847",
        coordinates: "40.7589°N, 73.9851°W"
      });
    }
  };

  const clearSelection = () => {
    setHasSelection(false);
    setSelectionData({ area: "0", coordinates: "" });
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <MapPin className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Select Project Area</h1>
          </div>
          
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Enter coordinates or location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="text-green-700 bg-green-100">
            Step 1 of 2
          </Badge>
          <Button variant="outline" onClick={() => window.history.back()}>
            Back
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Coordinate Input */}
          <Card className="m-4 border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Navigation className="h-4 w-4" />
                Location Coordinates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="latitude" className="text-sm">Latitude</Label>
                  <Input
                    id="latitude"
                    value={coordinates.latitude}
                    onChange={(e) => setCoordinates(prev => ({ ...prev, latitude: e.target.value }))}
                    placeholder="40.7589"
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="longitude" className="text-sm">Longitude</Label>
                  <Input
                    id="longitude"
                    value={coordinates.longitude}
                    onChange={(e) => setCoordinates(prev => ({ ...prev, longitude: e.target.value }))}
                    placeholder="-73.9851"
                    className="text-sm"
                  />
                </div>
              </div>
              <Button onClick={handleGoToLocation} className="w-full" size="sm">
                <Target className="h-4 w-4 mr-2" />
                Go to Location
              </Button>
            </CardContent>
          </Card>

          {/* Drawing Tools */}
          <Card className="m-4 border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Edit3 className="h-4 w-4" />
                Drawing Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant={selectedTool === "select" ? "default" : "outline"}
                  onClick={() => setSelectedTool("select")}
                  className="justify-start"
                  size="sm"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Select Tool
                </Button>
                
                <Button
                  variant={selectedTool === "draw" ? "default" : "outline"}
                  onClick={() => setSelectedTool("draw")}
                  className="justify-start"
                  size="sm"
                >
                  <Square className="h-4 w-4 mr-2" />
                  Draw Polygon
                </Button>
                
                <Button
                  variant={selectedTool === "edit" ? "default" : "outline"}
                  onClick={() => setSelectedTool("edit")}
                  className="justify-start"
                  size="sm"
                  disabled={!hasSelection}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                
                <Button
                  variant="outline"
                  onClick={clearSelection}
                  className="justify-start text-red-600 hover:text-red-700"
                  size="sm"
                  disabled={!hasSelection}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
              
              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Instructions:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Click "Draw Polygon" to start</li>
                  <li>• Click on map to add points</li>
                  <li>• Double-click to finish drawing</li>
                  <li>• Use Edit to modify shape</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Map Controls */}
          <Card className="m-4 border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Map Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <ZoomIn className="h-4 w-4 mr-1" />
                  Zoom In
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <ZoomOut className="h-4 w-4 mr-1" />
                  Zoom Out
                </Button>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Map Type:</label>
                <select className="w-full p-2 text-sm border rounded-md">
                  <option>Satellite</option>
                  <option>Terrain</option>
                  <option>Hybrid</option>
                  <option>Street Map</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Map Area */}
        <div className="flex-1 relative">
          <div 
            className="w-full h-full bg-gray-100 cursor-crosshair relative overflow-hidden"
            onClick={handleMapClick}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1625428354222-ce52b4227b26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRlbGxpdGUlMjBtYXAlMjBhZXJpYWwlMjB2aWV3fGVufDF8fHx8MTc1NzI2NjcxNXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Satellite map view"
              className="w-full h-full object-cover"
            />
            
            {/* Grid overlay for better selection */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="mapGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#000" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#mapGrid)" />
              </svg>
            </div>

            {/* Selected polygon simulation */}
            {hasSelection && (
              <div className="absolute top-1/4 left-1/3 w-64 h-40 border-4 border-blue-500 bg-blue-500/20 rounded-lg">
                <div className="absolute -top-8 left-0 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                  Selected Area
                </div>
              </div>
            )}

            {/* Tool hint */}
            {selectedTool === "draw" && !hasSelection && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-sm">
                Click on the map to start drawing your polygon
              </div>
            )}

            {/* Map attribution */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-xs text-gray-600">
              © OpenStreetMap contributors
            </div>
          </div>
        </div>

        {/* Right Selection Panel */}
        {hasSelection && (
          <div className="w-80 bg-white border-l border-gray-200">
            <Card className="m-4 border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Area Selected
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-xs text-green-700 font-medium">Total Area</p>
                    <p className="text-lg font-bold text-green-800">{selectionData.area} acres</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-blue-700 font-medium">Hectares</p>
                    <p className="text-lg font-bold text-blue-800">{(parseFloat(selectionData.area.replace(",", "")) * 0.404686).toFixed(0)}</p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Polygon Coordinates</Label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700 font-mono">{selectionData.coordinates}</p>
                    <p className="text-xs text-gray-500 mt-1">Center point coordinates</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Selection Details</Label>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Polygon Points:</span>
                      <span className="font-medium">4 vertices</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Perimeter:</span>
                      <span className="font-medium">8.2 km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shape:</span>
                      <span className="font-medium">Irregular</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={onConfirmSelection}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirm Selection
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  This will take you to the constraint analysis
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}