import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
}

export function FeatureCard({ title, description, icon: Icon, href }: FeatureCardProps) {
  return (
    <Link to={href}>
      <Card className="feature-card h-full cursor-pointer border-0 hover:shadow-lg">
        <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}