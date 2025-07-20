import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { Wallet, Shield, Smartphone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function WalletConnect() {
  const [isConnecting, setIsConnecting] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleWalletConnect = async (walletType: string) => {
    setIsConnecting(true)
    
    // Simulate wallet connection
    setTimeout(() => {
      toast({
        title: "✅ Wallet Connected Successfully!",
        description: `${walletType} has been connected to your account.`,
      })
      
      setTimeout(() => {
        navigate("/dashboard")
      }, 1500)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="container max-w-2xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Connect Your Wallet
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            To join communities and pool funds, please connect your blockchain wallet.
          </p>
        </div>

        {/* Wallet Options */}
        <Card className="card-gradient border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Choose Your Wallet</CardTitle>
            <CardDescription>
              Select your preferred wallet to get started with ChainFund
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* MetaMask */}
            <Button 
              className="w-full h-16 text-lg justify-start gap-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0"
              onClick={() => handleWalletConnect("MetaMask")}
              disabled={isConnecting}
            >
              <Wallet className="h-6 w-6" />
              ✅ MetaMask
            </Button>

            {/* WalletConnect */}
            <Button 
              className="w-full h-16 text-lg justify-start gap-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0"
              onClick={() => handleWalletConnect("WalletConnect")}
              disabled={isConnecting}
            >
              <Shield className="h-6 w-6" />
              ✅ WalletConnect
            </Button>

            {/* Coinbase Wallet */}
            <Button 
              className="w-full h-16 text-lg justify-start gap-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0"
              onClick={() => handleWalletConnect("Coinbase Wallet")}
              disabled={isConnecting}
            >
              <Smartphone className="h-6 w-6" />
              ✅ Coinbase Wallet
            </Button>
          </CardContent>
        </Card>

        {isConnecting && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-primary">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              Connecting wallet...
            </div>
          </div>
        )}
      </div>
    </div>
  )
}