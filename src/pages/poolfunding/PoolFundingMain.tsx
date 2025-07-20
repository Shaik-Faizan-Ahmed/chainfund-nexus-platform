import { Link } from "react-router-dom"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle } from "lucide-react"

const mockCampaigns = [
  {
    id: 1,
    title: "Revolutionary Water Purification System",
    description: "Developing an affordable water filtration device for rural communities worldwide.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop",
    raised: 75000,
    goal: 150000,
    deadline: "15 days left",
    verified: true
  },
  {
    id: 2,
    title: "Smart Urban Farming Platform",
    description: "AI-powered vertical farming solution to grow fresh produce in urban environments.",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=200&fit=crop",
    raised: 42000,
    goal: 100000,
    deadline: "22 days left",
    verified: true
  },
  {
    id: 3,
    title: "Solar-Powered Education Hub",
    description: "Building sustainable learning centers with solar power for remote communities.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=200&fit=crop",
    raised: 28000,
    goal: 80000,
    deadline: "8 days left",
    verified: false
  },
  {
    id: 4,
    title: "Blockchain Supply Chain Tracker",
    description: "Transparent tracking system for food safety and authenticity verification.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop",
    raised: 95000,
    goal: 120000,
    deadline: "30 days left",
    verified: true
  },
  {
    id: 5,
    title: "Eco-Friendly Packaging Innovation",
    description: "Biodegradable packaging made from agricultural waste materials.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=200&fit=crop",
    raised: 18000,
    goal: 60000,
    deadline: "12 days left",
    verified: false
  },
  {
    id: 6,
    title: "Mental Health Support App",
    description: "AI-powered mental wellness platform connecting users with professional support.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop",
    raised: 67000,
    goal: 90000,
    deadline: "18 days left",
    verified: true
  }
]

export default function PoolFundingMain() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Homepage
              </Button>
            </Link>
          </div>
          
          <Link to="/poolfunding/create">
            <Button className="btn-gradient">
              Start a Campaign
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Poolfunding Campaigns</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Support projects you believe in – fund with transparency and traceability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCampaigns.map((campaign) => {
            const progressPercentage = (campaign.raised / campaign.goal) * 100
            
            return (
              <Link key={campaign.id} to={`/poolfunding/campaign/${campaign.id}`}>
                <Card className="feature-card h-full cursor-pointer border-0 hover:shadow-lg overflow-hidden">
                  <div className="relative">
                    <img 
                      src={campaign.image} 
                      alt={campaign.title}
                      className="w-full h-48 object-cover"
                    />
                    {campaign.verified && (
                      <Badge className="absolute top-3 right-3 bg-success text-success-foreground">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{campaign.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{campaign.description}</p>
                    
                    <div className="space-y-3">
                      <Progress value={progressPercentage} className="h-2" />
                      
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">${campaign.raised.toLocaleString()}</span>
                        <span className="text-muted-foreground">of ${campaign.goal.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-primary">{Math.round(progressPercentage)}% funded</span>
                        <span className="text-sm text-muted-foreground">{campaign.deadline}</span>
                      </div>
                      
                      <Button className="w-full mt-4" variant="outline">
                        View Campaign
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}