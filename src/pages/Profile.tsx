import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Wallet, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock user data
const userData = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  phone: "+1 (555) 123-4567",
  address: "123 Blockchain Ave, Crypto City, CC 12345",
  walletAddress: "0x742d35Cc6634C0532925a3b8D",
  bio: "Passionate about sustainable technology and community-driven investments."
}

const userCommunities = [
  {
    name: "Green Energy Fund",
    contribution: 2500,
    role: "Member"
  },
  {
    name: "Tech Startup Pool",
    contribution: 5000,
    role: "Admin"
  },
  {
    name: "Real Estate Collective",
    contribution: 10000,
    role: "Voter"
  }
]

export default function Profile() {
  const [formData, setFormData] = useState(userData)
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    toast({
      title: "✅ Profile Updated",
      description: "Your profile has been updated successfully.",
    })
    setIsEditing(false)
  }

  const totalContributions = userCommunities.reduce((sum, community) => sum + community.contribution, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        
        {/* Profile Header */}
        <Card className="card-gradient border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold">{formData.name}</h1>
                <p className="text-muted-foreground">{formData.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Wallet className="h-4 w-4" />
                  <span className="text-sm font-mono">{formData.walletAddress}...</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Contributions</p>
                <p className="text-2xl font-bold text-primary">${totalContributions.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Profile Information</CardTitle>
                <Button 
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div>
                <Label>Wallet Address</Label>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                  <Wallet className="h-4 w-4" />
                  <span className="font-mono text-sm">{formData.walletAddress}</span>
                  <Badge variant="secondary">Connected</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Communities Joined */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Communities Joined
              </CardTitle>
              <CardDescription>
                Your participation across ChainFund communities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userCommunities.map((community, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{community.name}</h3>
                      <Badge variant="outline" className="mt-1">{community.role}</Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Contributed</p>
                      <p className="font-semibold">${community.contribution.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Contributions</span>
                    <span className="text-xl font-bold text-primary">${totalContributions.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}