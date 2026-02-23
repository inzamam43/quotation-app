import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Switch } from "../components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import {
  Upload,
  Save,
  Building,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Palette,
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "next-themes";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [logo, setLogo] = useState<string | null>(null);
  const [businessInfo, setBusinessInfo] = useState({
    name: "My Business Inc.",
    address: "123 Business Street, City, State 12345",
    email: "contact@mybusiness.com",
    whatsapp: "+1 234 567 8900",
    whatsappVerified: true,
  });
  const [brandColors, setBrandColors] = useState({
    primary: "#3b82f6",
    secondary: "#8b5cf6",
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
        toast.success("Logo uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBusinessInfo = () => {
    toast.success("Business information saved successfully!");
  };

  const handleSaveBrandColors = () => {
    toast.success("Brand colors saved successfully!");
  };

  const handleVerifyWhatsApp = () => {
    toast.success("WhatsApp verification code sent!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your business profile and preferences
        </p>
      </div>

      <Tabs defaultValue="business" className="space-y-6">
        <TabsList>
          <TabsTrigger value="business">Business Profile</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Business Profile Tab */}
        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Logo</CardTitle>
              <CardDescription>
                Upload your company logo to appear on quotations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6">
                <div className="h-24 w-24 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900">
                  {logo ? (
                    <img
                      src={logo}
                      alt="Company logo"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Building className="h-10 w-10 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    id="logo-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoUpload}
                  />
                  <Label htmlFor="logo-upload">
                    <Button asChild variant="outline">
                      <span className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Logo
                      </span>
                    </Button>
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Recommended size: 200x200px, Max file size: 2MB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                This information will appear on your quotations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="business-name">Business Name</Label>
                <Input
                  id="business-name"
                  value={businessInfo.name}
                  onChange={(e) =>
                    setBusinessInfo({ ...businessInfo, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business-address">Business Address</Label>
                <Textarea
                  id="business-address"
                  value={businessInfo.address}
                  onChange={(e) =>
                    setBusinessInfo({
                      ...businessInfo,
                      address: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sender-email">Sender Email for Quotations</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="sender-email"
                    type="email"
                    className="pl-9"
                    value={businessInfo.email}
                    onChange={(e) =>
                      setBusinessInfo({ ...businessInfo, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp-number">WhatsApp Business Number</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="whatsapp-number"
                      type="tel"
                      className="pl-9"
                      value={businessInfo.whatsapp}
                      onChange={(e) =>
                        setBusinessInfo({
                          ...businessInfo,
                          whatsapp: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Badge
                    variant={businessInfo.whatsappVerified ? "default" : "secondary"}
                    className="self-center"
                  >
                    {businessInfo.whatsappVerified ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3 w-3 mr-1" />
                        Unverified
                      </>
                    )}
                  </Badge>
                </div>
                {!businessInfo.whatsappVerified && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleVerifyWhatsApp}
                  >
                    Verify WhatsApp Number
                  </Button>
                )}
              </div>
              <Button onClick={handleSaveBusinessInfo}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branding Tab */}
        <TabsContent value="branding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme Mode</CardTitle>
              <CardDescription>
                Choose your preferred theme mode
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Enable dark mode for better visibility in low light
                  </p>
                </div>
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={(checked) =>
                    setTheme(checked ? "dark" : "light")
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Brand Colors</CardTitle>
              <CardDescription>
                Customize your brand colors for quotations and documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex gap-2">
                    <div
                      className="h-10 w-10 rounded border"
                      style={{ backgroundColor: brandColors.primary }}
                    />
                    <Input
                      id="primary-color"
                      type="color"
                      value={brandColors.primary}
                      onChange={(e) =>
                        setBrandColors({
                          ...brandColors,
                          primary: e.target.value,
                        })
                      }
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <div className="flex gap-2">
                    <div
                      className="h-10 w-10 rounded border"
                      style={{ backgroundColor: brandColors.secondary }}
                    />
                    <Input
                      id="secondary-color"
                      type="color"
                      value={brandColors.secondary}
                      onChange={(e) =>
                        setBrandColors({
                          ...brandColors,
                          secondary: e.target.value,
                        })
                      }
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
              <Button onClick={handleSaveBrandColors}>
                <Palette className="h-4 w-4 mr-2" />
                Save Brand Colors
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Manage your email notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium">Quotation Accepted</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive email when a quotation is accepted
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium">Quotation Rejected</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive email when a quotation is rejected
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium">Weekly Summary</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive weekly summary of your business performance
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">Marketing Updates</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive updates about new features and promotions
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Notifications</CardTitle>
              <CardDescription>
                Manage your WhatsApp notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium">Delivery Status</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive WhatsApp updates on delivery status
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">Customer Responses</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive WhatsApp notifications for customer responses
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
