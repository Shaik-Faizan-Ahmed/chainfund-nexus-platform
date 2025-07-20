import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Users, DollarSign, Vote, LogOut, AlertTriangle, CheckCircle, Clock, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data
const communityData: Record<string, {
  name: string;
  logo: string;
  totalPool: number;
  members: number;
  activeProjects: number;
  userContribution: number;
  status: string;
}> = {
  "1": {
    name: "Green Energy Fund",
    logo: "🌱",
    totalPool: 45000,
    members: 24,
    activeProjects: 3,
    userContribution: 2500,
    status: "Active"
  }
}

const projects = [
  {
    id: 1,
    title: "Solar Panel Installation",
    description: "Installing solar panels for community building",
    requestedAmount: 15000,
    releasedAmount: 10000,
    progress: 67,
    status: "In Progress",
    latestUpdate: "Installation phase 1 completed successfully"
  },
  {
    id: 2,
    title: "Wind Turbine Project",
    description: "Small wind turbine for renewable energy",
    requestedAmount: 20000,
    releasedAmount: 20000,
    progress: 100,
    status: "Completed",
    latestUpdate: "Project completed and operational"
  },
  {
    id: 3,
    title: "Battery Storage System",
    description: "Energy storage for renewable sources",
    requestedAmount: 10000,
    releasedAmount: 0,
    progress: 0,
    status: "Pending",
    latestUpdate: "Awaiting community approval"
  }
]

const members = [
  { name: "Alex Johnson", role: "Admin", avatar: "AJ" },
  { name: "Sarah Chen", role: "Member", avatar: "SC" },
  { name: "Mike Davis", role: "Voter", avatar: "MD" },
  { name: "Lisa Wang", role: "Member", avatar: "LW" }
]

const activeVotes = [
  {
    id: 1,
    title: "Release funds for Battery Storage System",
    description: "Approve $5,000 for phase 1 of battery installation",
    yesVotes: 12,
    noVotes: 3,
    totalVotes: 24,
    deadline: "2 days left"
  }
]

export default function Community() {
  const { id } = useParams()
  const [isVoteOpen, setIsVoteOpen] = useState(false)
  const [isExitOpen, setIsExitOpen] = useState(false)
  const [isForceExitOpen, setIsForceExitOpen] = useState(false)
  const { toast } = useToast()
  
  const community = id ? communityData[id] : null
  
  if (!community) {
    return <div>Community not found</div>
  }

  const handleVote = (voteId: number, vote: 'yes' | 'no') => {
    toast({
      title: "✅ Vote Submitted",
      description: `Your ${vote} vote has been recorded.`,
    })
    setIsVoteOpen(false)
  }

  const handleRequestExit = () => {
    toast({
      title: "✅ Exit Request Submitted",
      description: "Your exit request is now awaiting community votes.",
    })
    setIsExitOpen(false)
  }

  const handleForceExit = () => {
    toast({
      title: "✅ You have left this community",
      description: "You have been removed from the community with no refund.",
    })
    setIsForceExitOpen(false)
  }

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

      <div className="container mx-auto px-4 py-8 space-y-8">
        
        {/* Community Overview */}
        <Card className="card-gradient border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl">
                  {community.logo}
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{community.name}</h1>
                  <Badge variant="default" className="mt-1">{community.status}</Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-muted-foreground text-sm">Total Pool</p>
                  <p className="text-2xl font-bold">${community.totalPool.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Members</p>
                  <p className="text-2xl font-bold flex items-center justify-center gap-1">
                    <Users className="h-5 w-5" />
                    {community.members}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Projects</p>
                  <p className="text-2xl font-bold">{community.activeProjects}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">My Contribution</p>
                  <p className="text-2xl font-bold text-primary">${community.userContribution.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Voting & Exit Controls */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Vote Button */}
          <Dialog open={isVoteOpen} onOpenChange={setIsVoteOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="h-16 btn-gradient">
                <Vote className="h-6 w-6 mr-2" />
                ✅ Vote
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Active Votes</DialogTitle>
                <DialogDescription>Cast your vote on community proposals</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {activeVotes.map((vote) => (
                  <Card key={vote.id}>
                    <CardContent className="p-4 space-y-4">
                      <div>
                        <h3 className="font-semibold">{vote.title}</h3>
                        <p className="text-sm text-muted-foreground">{vote.description}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Yes: {vote.yesVotes}</span>
                          <span>No: {vote.noVotes}</span>
                          <span>{vote.deadline}</span>
                        </div>
                        <Progress value={(vote.yesVotes / vote.totalVotes) * 100} />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button onClick={() => handleVote(vote.id, 'yes')} className="flex-1 bg-green-600 hover:bg-green-700">
                          Yes
                        </Button>
                        <Button onClick={() => handleVote(vote.id, 'no')} variant="destructive" className="flex-1">
                          No
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* Request Exit */}
          <Dialog open={isExitOpen} onOpenChange={setIsExitOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="lg" className="h-16">
                <LogOut className="h-6 w-6 mr-2" />
                ✅ Request Exit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request Exit from Community</DialogTitle>
                <DialogDescription>
                  Your request will be voted on by other members. If approved, you will exit and receive remaining funds according to rules.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Exit Terms:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Community voting period: 7 days</li>
                    <li>• Requires 60% approval to exit with funds</li>
                    <li>• Your contribution: ${community.userContribution.toLocaleString()}</li>
                  </ul>
                </div>
                <Button onClick={handleRequestExit} className="w-full">
                  Submit Exit Request
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Force Exit */}
          <Dialog open={isForceExitOpen} onOpenChange={setIsForceExitOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="lg" className="h-16">
                <AlertTriangle className="h-6 w-6 mr-2" />
                ✅ Force Exit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Force Exit - No Refund</DialogTitle>
                <DialogDescription>
                  You will be removed from the community with no refund. Are you sure?
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Warning:</strong> This action cannot be undone. You will lose your ${community.userContribution.toLocaleString()} contribution.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsForceExitOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleForceExit} className="flex-1">
                    Confirm Force Exit
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Community Projects */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Community Projects</h2>
          
          <div className="grid gap-4">
            {projects.map((project) => (
              <Card key={project.id} className="feature-card">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold">{project.title}</h3>
                          <Badge variant={
                            project.status === "Completed" ? "default" : 
                            project.status === "In Progress" ? "secondary" : 
                            "outline"
                          }>
                            {project.status === "Completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {project.status === "In Progress" && <Clock className="h-3 w-3 mr-1" />}
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{project.description}</p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress: {project.progress}%</span>
                          <span>${project.releasedAmount.toLocaleString()} / ${project.requestedAmount.toLocaleString()}</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        <strong>Latest Update:</strong> {project.latestUpdate}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Members Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Community Members</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {members.map((member, index) => (
              <Card key={index}>
                <CardContent className="p-4 flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{member.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <Badge variant="outline" className="text-xs">{member.role}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}