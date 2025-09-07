import React, { useState } from "react";
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
import { ProtectedRoute } from "./components/ProtectedRoute";
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
  const [currentScreen, setCurrentScreen] = useState<
    "login" | "signup" | "mapSelection" | "dashboard"
  >("login");
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogin = () => {
    setCurrentScreen("mapSelection");
  };

  const handleSignup = () => {
    setCurrentScreen("mapSelection");
  };

  const handleMapSelectionConfirm = () => {
    setCurrentScreen("dashboard");
    setActiveTab("dashboard"); // Start with dashboard after map selection
  };

  const switchToSignup = () => {
    setCurrentScreen("signup");
  };

  const switchToLogin = () => {
    setCurrentScreen("login");
  };

  const handleUnauthorized = () => {
    setCurrentScreen("login");
  };

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
      <ProtectedRoute onUnauthorized={handleUnauthorized}>
        <MapSelectionScreen
          onConfirmSelection={handleMapSelectionConfirm}
        />
      </ProtectedRoute>
    );
  }

  // Render main dashboard
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardMain />;
      case "constraints":
        return <ConstraintAnalysis />;
      case "energy":
        return <EnergyPotential />;
      case "optimization":
        return <Optimization />;
      case "financials":
        return <Financials />;
      case "projects":
        return <ProjectsPage />;
      case "reports":
        return <ReportsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <DashboardMain />;
    }
  };

  return (
    <ProtectedRoute onUnauthorized={handleUnauthorized}>
      <SidebarProvider>
        <div className="flex h-screen bg-white">
          <SidebarNav
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <div className="flex-1 flex flex-col">
            <TopNav />
            {renderContent()}
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}