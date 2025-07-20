import { Header } from "@/components/Header"
import { FeatureCard } from "@/components/FeatureCard"
import { Button } from "@/components/ui/button"
import { CheckCircle, TrendingUp, Users, Shield, Heart, Leaf, Palette } from "lucide-react"
import heroImage from "@/assets/hero-blockchain.jpg"

const features = [
  {
    title: "Project Crowdfunding",
    description: "Support innovative projects with milestone-based fund release.",
    icon: TrendingUp,
    href: "/poolfunding"
  },
  {
    title: "Collaborative Investments",
    description: "Invest together and share profits fairly through smart contracts.",
    icon: Users,
    href: "/features/collaborative-investments"
  },
  {
    title: "Real Estate Investment Pools",
    description: "Co-own properties and earn rental or resale profits transparently.",
    icon: Shield,
    href: "/features/real-estate-investment"
  },
  {
    title: "Transparent Tenders & Bids",
    description: "Fair bidding and milestone-based payments for government and corporate projects.",
    icon: CheckCircle,
    href: "/features/transparent-tenders"
  },
  {
    title: "Social Welfare & Community Development",
    description: "Fund education, healthcare, and public infrastructure with transparency.",
    icon: Heart,
    href: "/features/social-welfare"
  },
  {
    title: "Green & Sustainable Projects",
    description: "Support renewable energy, tree plantations, and climate-friendly initiatives.",
    icon: Leaf,
    href: "/features/green-projects"
  },
  {
    title: "Arts & Creative Works",
    description: "Help artists, writers, and filmmakers bring ideas to life transparently.",
    icon: Palette,
    href: "/features/arts-creative"
  }
]

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ChainFund
                </span>
              </h1>
              <div className="space-y-4 text-lg lg:text-xl text-muted-foreground">
                <p>A blockchain-powered platform for transparent pooled fund management.</p>
                <p>Collaborate, fund, and invest securely with 100% traceability.</p>
              </div>
              <Button size="lg" className="btn-gradient text-lg px-8 py-6">
                Get Started
              </Button>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Blockchain Finance Dashboard" 
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">What is ChainFund?</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              ChainFund is a decentralized platform where people, investors, and organizations can pool money together 
              for multiple purposes—such as funding projects, investing collaboratively, or even managing public tenders. 
              Every transaction is recorded on blockchain, ensuring transparency, security, and community-driven control.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Explore ChainFund</h2>
            <p className="text-lg text-muted-foreground">Discover the many ways to collaborate and invest transparently</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                {...feature}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">How ChainFund Works</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold">Pool Funds</h3>
              <p className="text-sm text-muted-foreground">Pool funds with contributors or investors</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold">Smart Contracts</h3>
              <p className="text-sm text-muted-foreground">Smart contracts lock and release funds milestone-by-milestone</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold">Community Voting</h3>
              <p className="text-sm text-muted-foreground">Voting or approvals decide fund usage</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold">Full Transparency</h3>
              <p className="text-sm text-muted-foreground">All transactions are public, verifiable, and tamper-proof</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
