import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ThemeToggle } from "@/components/ThemeToggle"
import heroImage from "@/assets/hero-blockchain-finance.jpg"

export default function Landing() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="hero-gradient min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 text-center space-y-12">
          
          {/* Hero Content */}
          <div className="space-y-8">
            <h1 className="text-6xl lg:text-8xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ChainFund
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Blockchain-powered community pooling for transparent funding & investments.
            </p>
          </div>

          {/* Hero Image */}
          <div className="max-w-4xl mx-auto">
            <img 
              src={heroImage} 
              alt="Blockchain Finance Network" 
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Link to="/login">
              <Button size="lg" className="btn-gradient text-lg px-12 py-6 w-full sm:w-auto">
                ✅ Login
              </Button>
            </Link>
            
            <Link to="/register">
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-12 py-6 border-2 border-primary/20 hover:border-primary/40 w-full sm:w-auto"
              >
                ✅ Register
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}