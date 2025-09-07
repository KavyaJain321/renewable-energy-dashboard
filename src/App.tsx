import { useState, useEffect } from "react";
import { SidebarProvider } from "./components/ui/sidebar";
import { SidebarNav } from "./components/sidebar-nav";
import { TopNav } from "./components/top-nav";
import { DashboardMain } from "./components/dashboard-main";
import { ProjectsPage } from "./components/projects-page";
import { ReportsPage } from "./components/reports-page";
import { ConstraintAnalysis } from "./components/constraint-analysis";
import { EnergyPotential } from "./components/energy-potential";
import { Optimization } from "./components/optimization";
import { Financials } from "./components/financials";
import { SettingsPage } from "./components/settings-page";
import { LoginScreen } from "./components/login-screen";
import { SignupScreen } from "./components/signup-screen";
import { MapSelectionScreen } from "./components/map-selection-screen";
import { useAuth } from "./context/AuthProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {title}
        </h1>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            This section is under development and will be
            available soon.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            The {title.toLowerCase()} functionality will include
            comprehensive tools for renewable energy assessment
            and analysis.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function App() {
  const { user, loading, logout } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<
    "login" | "signup" | "mapSelection" | "dashboard"
  >("login");
  const [activeTab, setActiveTab] = useState("dashboard");

  // Handle authentication state changes
  useEffect(() => {
    if (!loading) {
      if (user) {
        // Check if user has already completed map selection
        const hasCompletedMapSelection = localStorage.getItem(`mapSelectionCompleted_${user.id}`);
        
        if (hasCompletedMapSelection) {
          // User has completed map selection, go to dashboard
          setCurrentScreen("dashboard");
        } else {
          // User is authenticated but hasn't completed map selection
          setCurrentScreen("mapSelection");
        }
      } else {
        // User is not authenticated, show login
        setCurrentScreen("login");
      }
    }
  }, [user, loading]);

  const handleLogin = () => {
    setCurrentScreen("mapSelection");
  };

  const handleSignup = () => {
    setCurrentScreen("mapSelection");
  };

  const handleMapSelectionConfirm = () => {
    // Mark map selection as completed for this user
    if (user) {
      localStorage.setItem(`mapSelectionCompleted_${user.id}`, 'true');
    }
    setCurrentScreen("dashboard");
    setActiveTab("dashboard"); // Start with dashboard after map selection
  };

  const switchToSignup = () => {
    setCurrentScreen("signup");
  };

  const switchToLogin = () => {
    setCurrentScreen("login");
  };

  const resetMapSelection = () => {
    // Clear map selection status and go back to map selection
    if (user) {
      localStorage.removeItem(`mapSelectionCompleted_${user.id}`);
    }
    setCurrentScreen("mapSelection");
  };

  const handleLogout = async () => {
    await logout();
    // The useEffect will handle redirecting to login
  };

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Render login/signup screens
  if (currentScreen === "login") {
    return (
      <LoginScreen
        onLogin={handleLogin}
        onSwitchToSignup={switchToSignup}
      />
    );
  }

  if (currentScreen === "signup") {
    return (
      <SignupScreen
        onSignup={handleSignup}
        onSwitchToLogin={switchToLogin}
      />
    );
  }

  // Render map selection screen
  if (currentScreen === "mapSelection") {
    return (
      <MapSelectionScreen
        onConfirmSelection={handleMapSelectionConfirm}
      />
    );
  }

  // Render main dashboard
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardMain onResetMapSelection={resetMapSelection} />;
      case "constraints":
        return <ConstraintAnalysis />;
      case "energy":
        return <EnergyPotential />;
      case "optimization":
        return <Optimization />;
      case "financials":
        return <Financials />;
      case "projects":
        return <ProjectsPage onLogout={handleLogout} />;
      case "reports":
        return <ReportsPage />;
      case "settings":
        return <SettingsPage onLogout={handleLogout} />;
      default:
        return <DashboardMain />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-white">
        <SidebarNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={handleLogout}
        />
        <div className="flex-1 flex flex-col">
          <TopNav onLogout={handleLogout} />
          {renderContent()}
        </div>
      </div>
    </SidebarProvider>
  );
}