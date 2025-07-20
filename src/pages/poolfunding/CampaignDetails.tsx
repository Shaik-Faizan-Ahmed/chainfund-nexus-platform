import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CheckCircle, Clock, Lock, ThumbsUp, ThumbsDown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockCampaign = {
  id: 1,
  title: "Revolutionary Water Purification System",
  description: `We are developing an innovative water purification system that can provide clean, safe drinking water to rural communities worldwide. Our technology uses advanced filtration combined with UV sterilization to remove 99.9% of harmful bacteria, viruses, and contaminants.

The device is solar-powered, making it completely sustainable and perfect for areas without reliable electricity. Each unit can purify up to 500 liters of water per day, enough to serve a small community of 50-100 people.

This project addresses one of the most critical global challenges - access to clean water. With your support, we can manufacture and deploy these systems to communities in need across developing countries.`,
  image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
  raised: 75000,
  goal: 150000,
  deadline: "2024-08-15",
  verified: true,
  creator: {
    name: "Dr. Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
    verified: true,
    pastProjects: 3
  },
  milestones: [
    { name: "Prototype Development", description: "Complete initial prototype and testing", amount: 30000, status: "Completed" },
    { name: "Field Testing", description: "Deploy prototypes in 3 test communities", amount: 45000, status: "Locked" },
    { name: "Manufacturing Setup", description: "Set up production line and quality control", amount: 50000, status: "Pending" },
    { name: "Community Deployment", description: "Deploy systems to 10 target communities", amount: 25000, status: "Pending" }
  ],
  updates: [
    {
      date: "2024-07-20",
      title: "Prototype Testing Complete!",
      content: "We've successfully completed all laboratory tests. The system achieves 99.97% purification efficiency.",
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=200&h=150&fit=crop"
    },
    {
      date: "2024-07-15",
      title: "Manufacturing Partner Confirmed",
      content: "We've secured a partnership with GreenTech Manufacturing for production scaling.",
      image: null
    }
  ]
}

export default function CampaignDetails() {
  const { id } = useParams()
  const { toast } = useToast()
  const [fundAmount, setFundAmount] = useState("")
  const [agreed, setAgreed] = useState(false)
  
  const progressPercentage = (mockCampaign.raised / mockCampaign.goal) * 100
  const daysLeft = Math.ceil((new Date(mockCampaign.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  const handleFund = () => {
    if (!fundAmount || !agreed) {
      toast({
        title: "Missing Information",
        description: "Please enter an amount and accept the risk agreement.",
        variant: "destructive"
      })
      return
    }
    
    toast({
      title: "✅ Funding Successful!",
      description: "Your funds are locked until milestone approval.",
    })
    setFundAmount("")
    setAgreed(false)
  }

  const handleVote = (vote: 'yes' | 'no') => {
    toast({
      title: `Vote Recorded: ${vote.toUpperCase()}`,
      description: "Your vote has been recorded for Milestone 1 approval.",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link to="/poolfunding">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Campaigns
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Overview */}
            <div>
              <img 
                src={mockCampaign.image} 
                alt={mockCampaign.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl lg:text-4xl font-bold">{mockCampaign.title}</h1>
                {mockCampaign.verified && (
                  <Badge className="bg-success text-success-foreground">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">${mockCampaign.raised.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">raised</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">${mockCampaign.goal.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">goal</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">{daysLeft}</div>
                  <div className="text-sm text-muted-foreground">days left</div>
                </div>
              </div>

              <Progress value={progressPercentage} className="h-3 mb-6" />
              
              <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                {mockCampaign.description}
              </div>
            </div>

            {/* Milestones Table */}
            <Card>
              <CardHeader>
                <CardTitle>Project Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCampaign.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-medium">{milestone.name}</h4>
                          <Badge variant={
                            milestone.status === "Completed" ? "default" :
                            milestone.status === "Locked" ? "secondary" : "outline"
                          }>
                            {milestone.status === "Completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {milestone.status === "Locked" && <Lock className="h-3 w-3 mr-1" />}
                            {milestone.status === "Pending" && <Clock className="h-3 w-3 mr-1" />}
                            {milestone.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${milestone.amount.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project Updates */}
            <Card>
              <CardHeader>
                <CardTitle>Project Updates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {mockCampaign.updates.map((update, index) => (
                  <div key={index} className="border-l-2 border-primary pl-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{update.title}</h4>
                          <span className="text-sm text-muted-foreground">{update.date}</span>
                        </div>
                        <p className="text-muted-foreground mb-3">{update.content}</p>
                        {update.image && (
                          <img 
                            src={update.image} 
                            alt="Update" 
                            className="w-48 h-32 object-cover rounded"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Creator Profile */}
            <Card>
              <CardHeader>
                <CardTitle>Project Creator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={mockCampaign.creator.avatar} />
                    <AvatarFallback>{mockCampaign.creator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{mockCampaign.creator.name}</span>
                      {mockCampaign.creator.verified && (
                        <CheckCircle className="h-4 w-4 text-success" />
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {mockCampaign.creator.pastProjects} successful projects
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View Past Projects
                </Button>
              </CardContent>
            </Card>

            {/* Voting Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Milestone Voting</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Backers voting in progress for Milestone 1 approval
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleVote('yes')}
                      className="flex-1"
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Yes
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleVote('no')}
                      className="flex-1"
                    >
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      No
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fund Now Section */}
            <Card>
              <CardHeader>
                <CardTitle>Fund This Project</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Amount (USD)</label>
                  <Input 
                    type="number" 
                    placeholder="0.00"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                  />
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="risk-agreement" 
                    checked={agreed}
                    onCheckedChange={(checked) => setAgreed(checked === true)}
                  />
                  <label htmlFor="risk-agreement" className="text-sm leading-relaxed">
                    I understand this is a high-risk project and may fail. I accept this risk.
                  </label>
                </div>
                
                <Button 
                  className="w-full btn-gradient" 
                  onClick={handleFund}
                  disabled={!fundAmount || !agreed}
                >
                  Fund Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}