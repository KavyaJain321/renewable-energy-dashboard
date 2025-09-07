import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Zap, CheckCircle } from "lucide-react";

interface SignupScreenProps {
  onSignup: () => void;
  onSwitchToLogin: () => void;
}

export function SignupScreen({ onSignup, onSwitchToLogin }: SignupScreenProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    // Simulate signup - in real app, you'd create account
    onSignup();
  };

  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center pb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">EcoAssess</h1>
          </div>
          <CardTitle className="text-xl text-gray-900">Create your account</CardTitle>
          <CardDescription className="text-gray-600">
            Start your renewable energy assessment journey
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  required
                  className={`h-11 pr-10 ${
                    formData.confirmPassword.length > 0 
                      ? passwordsMatch 
                        ? "border-green-300 focus:border-green-500" 
                        : "border-red-300 focus:border-red-500"
                      : ""
                  }`}
                />
                {passwordsMatch && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                )}
              </div>
              {formData.confirmPassword.length > 0 && !passwordsMatch && (
                <p className="text-sm text-red-600">Passwords don't match</p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-11 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              disabled={!formData.name || !formData.email || !formData.password || !passwordsMatch}
            >
              Create Account
            </Button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full h-11 border-gray-200 hover:bg-gray-50"
            onClick={() => {
              // Simulate Google signup
              onSignup();
            }}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Button 
                variant="link" 
                onClick={onSwitchToLogin}
                className="text-green-600 hover:text-green-700 p-0 h-auto font-medium"
              >
                Login
              </Button>
            </p>
          </div>
          
          <div className="text-xs text-gray-500 text-center">
            By creating an account, you agree to our{" "}
            <Button variant="link" className="text-xs p-0 h-auto underline">
              Terms of Service
            </Button>{" "}
            and{" "}
            <Button variant="link" className="text-xs p-0 h-auto underline">
              Privacy Policy
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}