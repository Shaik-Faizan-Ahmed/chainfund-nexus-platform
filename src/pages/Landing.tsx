import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ThemeToggle } from "@/components/ThemeToggle"

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Blockchain Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated nodes */}
        <div className="blockchain-nodes">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="blockchain-node"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
        
        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {Array.from({ length: 15 }).map((_, i) => (
            <line
              key={i}
              x1={`${Math.random() * 100}%`}
              y1={`${Math.random() * 100}%`}
              x2={`${Math.random() * 100}%`}
              y2={`${Math.random() * 100}%`}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              className="animate-pulse"
              style={{
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </svg>

        {/* Floating particles */}
        <div className="particles">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-12 max-w-4xl mx-auto">
          
          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent animate-pulse">
                ChainFund
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl xl:text-3xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-light">
              Blockchain-powered community pooling for transparent funding & investments.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Link to="/login" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-lg px-12 py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 font-semibold"
              >
                Login
              </Button>
            </Link>
            
            <Link to="/register" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-lg px-12 py-6 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white border-0 rounded-xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 font-semibold"
              >
                Register
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .blockchain-nodes {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .blockchain-node {
          position: absolute;
          width: 8px;
          height: 8px;
          background: linear-gradient(45deg, #3b82f6, #10b981);
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
          animation: float infinite ease-in-out;
        }

        .blockchain-node::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          background: linear-gradient(45deg, #3b82f6, #10b981);
          border-radius: 50%;
          opacity: 0.3;
          animation: pulse 2s infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }

        .particles {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(59, 130, 246, 0.4);
          border-radius: 50%;
          animation: drift infinite linear;
        }

        @keyframes drift {
          0% {
            transform: translateY(100vh) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) translateX(100px);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  )
}