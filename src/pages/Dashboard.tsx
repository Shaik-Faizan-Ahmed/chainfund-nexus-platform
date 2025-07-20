import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Link, useNavigate } from "react-router-dom"
import { Users, DollarSign, TrendingUp, Plus, Settings, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ThemeToggle } from "@/components/ThemeToggle"

// Mock data
const userCommunities = [
  {
    id: 1,
    name: "Green Energy Fund",
    userContribution: 2500,
    totalPool: 45000,
    members: 24,
    role: "Member",
    status: "Active"
  },
  {
    id: 2,
    name: "Tech Startup Pool",
    userContribution: 5000,
    totalPool: 120000,
    members: 48,
    role: "Admin",
    status: "Under Voting"
  },
  {
    id: 3,
    name: "Real Estate Collective",
    userContribution: 10000,
    totalPool: 250000,
    members: 85,
    role: "Voter",
    status: "Active"
  }
]

const discoverCommunities = [
  {
    id: 4,
    name: "AI Research Fund",
    description: "Supporting artificial intelligence research and development projects",
    totalPool: 75000,
    members: 32
  },
  {
    id: 5,
    name: "Healthcare Innovation",
    description: "Funding breakthrough medical technologies and treatments",
    totalPool: 150000,
    members: 67
  },
  {
    id: 6,
    name: "Education Access Pool",
    description: "Providing educational resources and scholarships globally",
    totalPool: 95000,
    members: 156
  }
]

export default function Dashboard() {
  const [communities, setCommunities] = useState(userCommunities)
  const [discover, setDiscover] = useState(discoverCommunities)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isProposalOpen, setIsProposalOpen] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleJoinCommunity = (communityId: number) => {
    const community = discover.find(c => c.id === communityId)
    if (community) {
      // Add to user communities
      const newCommunity = {
        ...community,
        userContribution: 0,
        role: "Member" as const,
        status: "Active" as const
      }
      setCommunities([...communities, newCommunity])
      setDiscover(discover.filter(c => c.id !== communityId))
      
      toast({
        title: "✅ Joined Successfully!",
        description: `You've joined ${community.name}`,
      })
    }
  }

  const handleCreateCommunity = () => {
    toast({
      title: "✅ Community Created!",
      description: "Your new community has been created successfully.",
    })
    setIsCreateOpen(false)
  }

  const handleCreateProposal = () => {
    toast({
      title: "✅ Proposal Submitted!",
      description: "Your project proposal has been submitted for review.",
    })
    setIsProposalOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ChainFund
          </h1>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-12">
        
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Welcome to <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">ChainFund Communities</span>
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Join communities, pool funds, and vote on how shared money is used – 100% transparent.
          </p>
        </section>

        {/* Dashboard Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* My Communities - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Communities</h2>
              <Badge variant="secondary">{communities.length} Joined</Badge>
            </div>
            
            <div className="grid gap-4">
              {communities.map((community) => (
                <Card key={community.id} className="feature-card cursor-pointer hover:shadow-lg transition-all" onClick={() => navigate(`/community/${community.id}`)}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{community.name}</h3>
                        <Badge variant={community.status === "Active" ? "default" : "secondary"} className="mt-1">
                          {community.status}
                        </Badge>
                      </div>
                      <Badge variant="outline">{community.role}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">My Contribution</p>
                        <p className="font-semibold text-lg">${community.userContribution.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Total Pool</p>
                        <p className="font-semibold text-lg">${community.totalPool.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Members</p>
                        <p className="font-semibold text-lg flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {community.members}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions - Right Side */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Quick Actions</h2>
            
            <div className="space-y-4">
              {/* Create New Community */}
              <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogTrigger asChild>
                  <Card className="feature-card cursor-pointer">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                        <Plus className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold">Create New Community</h3>
                      <p className="text-sm text-muted-foreground">Start your own funding pool</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Community</DialogTitle>
                    <DialogDescription>Set up your community funding pool</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Community Name</Label>
                      <Input placeholder="Enter community name" />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Input placeholder="e.g., Technology, Healthcare" />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea placeholder="Describe your community's purpose" />
                    </div>
                    <div>
                      <Label>Goal Amount (Optional)</Label>
                      <Input type="number" placeholder="Enter target amount" />
                    </div>
                    <Button onClick={handleCreateCommunity} className="w-full btn-gradient">
                      Create Community
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Create Project Proposal */}
              <Dialog open={isProposalOpen} onOpenChange={setIsProposalOpen}>
                <DialogTrigger asChild>
                  <Card className="feature-card cursor-pointer">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold">Create Project Proposal</h3>
                      <p className="text-sm text-muted-foreground">Propose a new project to communities</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create Project Proposal</DialogTitle>
                    <DialogDescription>Submit a project for community funding</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Project Title</Label>
                      <Input placeholder="Enter project title" />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea placeholder="Describe your project" />
                    </div>
                    <div>
                      <Label>Estimated Cost</Label>
                      <Input type="number" placeholder="Enter estimated cost" />
                    </div>
                    <Button onClick={handleCreateProposal} className="w-full btn-gradient">
                      Submit Proposal
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Discover New Communities */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Discover New Communities to Join</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {discover.map((community) => (
              <Card key={community.id} className="feature-card">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold">{community.name}</h3>
                  <p className="text-sm text-muted-foreground">{community.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Total Pool</p>
                      <p className="font-semibold">${community.totalPool.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Members</p>
                      <p className="font-semibold flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {community.members}
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleJoinCommunity(community.id)}
                    className="w-full btn-gradient"
                  >
                    Join Community
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}