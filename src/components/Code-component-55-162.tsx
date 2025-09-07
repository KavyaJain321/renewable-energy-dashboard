import { 
  MapPin, 
  BarChart3, 
  Zap, 
  Target, 
  DollarSign, 
  FileText, 
  Settings,
  FolderOpen
} from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

const menuItems = [
  { title: "Projects", icon: FolderOpen, key: "projects" },
  { title: "Map", icon: MapPin, key: "map" },
  { title: "Constraint Analysis", icon: BarChart3, key: "constraints" },
  { title: "Energy Potential", icon: Zap, key: "energy" },
  { title: "Optimization", icon: Target, key: "optimization" },
  { title: "Financials", icon: DollarSign, key: "financials" },
  { title: "Reports", icon: FileText, key: "reports" },
  { title: "Settings", icon: Settings, key: "settings" },
];

interface SidebarNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function SidebarNav({ activeTab, onTabChange }: SidebarNavProps) {
  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarContent>
        <div className="p-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold">EcoAssess</span>
          </div>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.key)}
                    isActive={activeTab === item.key}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}