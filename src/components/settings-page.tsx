import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  User, 
  CreditCard, 
  Shield, 
  Bell, 
  Key,
  Trash2,
  Edit,
  Upload,
  Crown,
  Lock,
  Smartphone,
  Eye,
  EyeOff
} from "lucide-react";
import { useState } from "react";

interface SettingsPageProps {
  onLogout?: () => void;
}

export function SettingsPage({ onLogout }: SettingsPageProps) {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [dataRetentionEnabled, setDataRetentionEnabled] = useState(false);
  const [anonymizationEnabled, setAnonymizationEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account and application preferences</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* User Profile */}
        <div className="col-span-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                User Profile
              </CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Button size="sm" variant="outline" className="mb-2">
                    <Upload className="h-4 w-4 mr-1" />
                    Change Photo
                  </Button>
                  <p className="text-xs text-gray-500">JPG, PNG up to 2MB</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john.doe@company.com" />
              </div>
              
              <div>
                <Label htmlFor="role">Role</Label>
                <Input id="role" defaultValue="Senior Energy Analyst" disabled />
              </div>
              
              <div className="flex gap-2">
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscription */}
        <div className="col-span-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Subscription
              </CardTitle>
              <CardDescription>Manage your plan and billing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Crown className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="font-medium">Pro Plan</p>
                    <p className="text-sm text-gray-600">Unlimited projects & exports</p>
                  </div>
                </div>
                <Badge className="bg-purple-100 text-purple-700">Active</Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Monthly Cost:</span>
                  <span className="font-medium">$299/month</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Next Billing:</span>
                  <span className="font-medium">October 6, 2025</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Projects Used:</span>
                  <span className="font-medium">24/Unlimited</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Storage Used:</span>
                  <span className="font-medium">12.5 GB/100 GB</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1">Upgrade Plan</Button>
                <Button variant="outline">Billing History</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Settings */}
        <div className="col-span-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security
              </CardTitle>
              <CardDescription>Protect your account and data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                </div>
                <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Password</p>
                    <p className="text-sm text-gray-600">Last changed 3 months ago</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Change</Button>
              </div>
              
              <div className="space-y-3">
                <Label>API Keys</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Production API Key</p>
                      <p className="text-xs text-gray-500">Created Sep 1, 2025</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Key className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Key className="h-4 w-4 mr-1" />
                  Generate New Key
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Privacy Settings */}
        <div className="col-span-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <EyeOff className="h-5 w-5" />
                Privacy
              </CardTitle>
              <CardDescription>Control your data privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Data Anonymization</p>
                  <p className="text-sm text-gray-600">Remove personal identifiers from exports</p>
                </div>
                <Switch checked={anonymizationEnabled} onCheckedChange={setAnonymizationEnabled} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Data Retention</p>
                  <p className="text-sm text-gray-600">Auto-delete old project data</p>
                </div>
                <Switch checked={dataRetentionEnabled} onCheckedChange={setDataRetentionEnabled} />
              </div>
              
              <div className="space-y-2">
                <Label>Data Retention Period</Label>
                <select className="w-full p-2 border rounded-md text-sm" disabled={!dataRetentionEnabled}>
                  <option>6 months</option>
                  <option>1 year</option>
                  <option>2 years</option>
                  <option>5 years</option>
                </select>
              </div>
              
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> All data is encrypted at rest and in transit. We comply with GDPR and other privacy regulations.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <div className="col-span-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>Configure how you receive updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-600">Project updates and reports</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-gray-600">Browser and mobile alerts</p>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>
              
              <div className="space-y-3">
                <Label>Email Frequency</Label>
                <select className="w-full p-2 border rounded-md text-sm" disabled={!emailNotifications}>
                  <option>Immediate</option>
                  <option>Daily digest</option>
                  <option>Weekly summary</option>
                  <option>Monthly summary</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label>Notification Types</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="analysis-complete" defaultChecked />
                    <label htmlFor="analysis-complete" className="text-sm">Analysis completed</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="report-ready" defaultChecked />
                    <label htmlFor="report-ready" className="text-sm">Report ready for download</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="system-updates" />
                    <label htmlFor="system-updates" className="text-sm">System updates</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="billing" defaultChecked />
                    <label htmlFor="billing" className="text-sm">Billing reminders</label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Actions */}
        <div className="col-span-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Actions
              </CardTitle>
              <CardDescription>Manage your account session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Sign Out</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Sign out of your account. You'll need to sign in again to access the application.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onLogout}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Danger Zone */}
        <div className="col-span-6">
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <Trash2 className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>Irreversible and destructive actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
                <p className="text-sm text-red-700 mb-3">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
              
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-medium text-orange-800 mb-2">Export All Data</h4>
                <p className="text-sm text-orange-700 mb-3">
                  Download a complete backup of all your projects and data before deletion.
                </p>
                <Button variant="outline" size="sm">
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}