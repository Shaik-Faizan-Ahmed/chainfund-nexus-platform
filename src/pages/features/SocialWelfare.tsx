import { Link } from "react-router-dom"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function SocialWelfare() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex items-center justify-center mb-8">
            <Link to="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold">Social Welfare & Community Development</h1>
          <p className="text-xl text-muted-foreground">
            This module is under development
          </p>
          
          <div className="hero-gradient rounded-lg p-12 mt-12">
            <p className="text-lg">
              Fund education, healthcare, and public infrastructure with transparency 
              and community-driven decision making.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}