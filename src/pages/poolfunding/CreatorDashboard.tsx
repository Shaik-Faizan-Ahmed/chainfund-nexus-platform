import { useState } from "react"
import { Link } from "react-router-dom"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, Plus, Trash2, Edit3 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Milestone {
  name: string
  amount: string
  date: string
}

const mockUserCampaigns = [
  {
    id: 1,
    name: "Water Purification System",
    goal: 150000,
    raised: 75000,
    status: "Active"
  },
  {
    id: 2,
    name: "Solar Education Hub",
    goal: 80000,
    raised: 28000,
    status: "Active"
  },
  {
    id: 3,
    name: "Smart Farming App",
    goal: 50000,
    raised: 50000,
    status: "Completed"
  }
]

export default function CreatorDashboard() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    goal: "",
    deadline: "",
    image: null as File | null
  })
  const [milestones, setMilestones] = useState<Milestone[]>([
    { name: "", amount: "", date: "" }
  ])
  const [confirmed, setConfirmed] = useState(false)
  const [updateText, setUpdateText] = useState("")
  const [updateImage, setUpdateImage] = useState<File | null>(null)

  const addMilestone = () => {
    setMilestones([...milestones, { name: "", amount: "", date: "" }])
  }

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index))
  }

  const updateMilestone = (index: number, field: keyof Milestone, value: string) => {
    const updated = milestones.map((milestone, i) => 
      i === index ? { ...milestone, [field]: value } : milestone
    )
    setMilestones(updated)
  }

  const handleSubmit = () => {
    if (!formData.title || !formData.category || !formData.description || !formData.goal || !formData.deadline || !confirmed) {
      toast({
        title: "Missing Information",
        description: "Please fill all fields and confirm the agreement.",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "✅ Campaign Created Successfully!",
      description: "Your campaign is now live and accepting funding.",
    })

    // Reset form
    setFormData({
      title: "",
      category: "",
      description: "",
      goal: "",
      deadline: "",
      image: null
    })
    setMilestones([{ name: "", amount: "", date: "" }])
    setConfirmed(false)
  }

  const handleSubmitUpdate = () => {
    if (!updateText) {
      toast({
        title: "Missing Content",
        description: "Please enter update content.",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "✅ Update Posted!",
      description: "Your project update has been published.",
    })
    setUpdateText("")
    setUpdateImage(null)
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

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">Creator Dashboard</h1>
            <p className="text-xl text-muted-foreground">
              Create and manage your campaigns
            </p>
          </div>

          {/* Create Campaign Form */}
          <Card>
            <CardHeader>
              <CardTitle>Create New Campaign</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Project Title</label>
                  <Input 
                    placeholder="Enter project title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="environment">Environment</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="social">Social Impact</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea 
                  placeholder="Describe your project in detail..."
                  className="min-h-32"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Goal Amount (USD)</label>
                  <Input 
                    type="number"
                    placeholder="0"
                    value={formData.goal}
                    onChange={(e) => setFormData({...formData, goal: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Deadline</label>
                  <Input 
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Project Image</label>
                <Input 
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({...formData, image: e.target.files?.[0] || null})}
                />
              </div>

              {/* Milestone Setup */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium">Milestones</label>
                  <Button size="sm" variant="outline" onClick={addMilestone}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Milestone
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {milestones.map((milestone, index) => (
                    <Card key={index} className="p-4">
                      <div className="grid md:grid-cols-3 gap-4">
                        <Input 
                          placeholder="Milestone name"
                          value={milestone.name}
                          onChange={(e) => updateMilestone(index, 'name', e.target.value)}
                        />
                        <Input 
                          type="number"
                          placeholder="Amount"
                          value={milestone.amount}
                          onChange={(e) => updateMilestone(index, 'amount', e.target.value)}
                        />
                        <div className="flex gap-2">
                          <Input 
                            type="date"
                            value={milestone.date}
                            onChange={(e) => updateMilestone(index, 'date', e.target.value)}
                            className="flex-1"
                          />
                          {milestones.length > 1 && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => removeMilestone(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="fund-confirmation" 
                  checked={confirmed}
                  onCheckedChange={(checked) => setConfirmed(checked === true)}
                />
                <label htmlFor="fund-confirmation" className="text-sm leading-relaxed">
                  I confirm I will use funds only for this project and provide regular updates to backers.
                </label>
              </div>

              <Button 
                className="w-full btn-gradient" 
                onClick={handleSubmit}
                disabled={!confirmed}
              >
                Create Campaign
              </Button>
            </CardContent>
          </Card>

          {/* User's Campaigns */}
          <Card>
            <CardHeader>
              <CardTitle>Your Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUserCampaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{campaign.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Goal: ${campaign.goal.toLocaleString()}</span>
                        <span>Raised: ${campaign.raised.toLocaleString()}</span>
                        <Badge variant={campaign.status === "Active" ? "default" : "secondary"}>
                          {campaign.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Edit3 className="h-4 w-4 mr-1" />
                          Submit Update
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Post Project Update</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Update Content</label>
                            <Textarea 
                              placeholder="Share your progress with backers..."
                              value={updateText}
                              onChange={(e) => setUpdateText(e.target.value)}
                              className="min-h-24"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Optional Image</label>
                            <Input 
                              type="file"
                              accept="image/*"
                              onChange={(e) => setUpdateImage(e.target.files?.[0] || null)}
                            />
                          </div>
                          <Button className="w-full" onClick={handleSubmitUpdate}>
                            Post Update
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}