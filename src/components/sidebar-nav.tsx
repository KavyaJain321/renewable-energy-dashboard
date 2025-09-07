import { 
  LayoutDashboard,
  BarChart3, 
  Zap, 
  Target, 
  DollarSign, 
  FileText, 
  Settings,
  FolderOpen,
  LogOut
} from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, key: "dashboard" },
  { title: "Constraint Analysis", icon: BarChart3, key: "constraints" },
  { title: "Energy Potential", icon: Zap, key: "energy" },
  { title: "Optimization", icon: Target, key: "optimization" },
  { title: "Financials", icon: DollarSign, key: "financials" },
  { title: "Projects", icon: FolderOpen, key: "projects" },
  { title: "Settings", icon: Settings, key: "settings" },
];

interface SidebarNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout?: () => void;
}

export function SidebarNav({ activeTab, onTabChange, onLogout }: SidebarNavProps) {
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
        
        {/* Logout Section */}
        {onLogout && (
          <div className="mt-auto p-4 border-t border-gray-200">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={onLogout}
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}