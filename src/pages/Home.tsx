import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import IntelligentSystem from "@/components/IntelligentSystem";
import { Link } from "wouter";

/**
 * Home Page - Landing Page for TRYONYOU
 * Features: Hero Section + Intelligent System Modules
 */
export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gold/20">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={APP_LOGO} alt="TRYONYOU Logo" className="w-8 h-8" />
            <span className="font-bold text-lg text-white">TRYONYOU</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/demo-brands" className="text-sm hover:text-gold transition">
              Demo for Brands
            </Link>
            <Link href="/virtual-tryon" className="text-sm hover:text-gold transition">
              Virtual Try-On
            </Link>
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-400">{user?.name}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                size="sm"
                onClick={() => window.location.href = getLoginUrl()}
              >
                Sign In
              </Button>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center px-4 py-20 bg-gradient-to-b from-black via-black to-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-white">TRYONYOU</span>
            <br />
            <span className="bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent">
              ABVETOS — ULTRA PLUS ULTIMATUM
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            The future of fashion is here. Experience AI-powered styling, intelligent wardrobe management, and sustainable fashion all in one platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
<Link href="/demo">
	              <Button 
	                size="lg"
	                className="bg-gold hover:bg-yellow-500 text-black font-bold w-full sm:w-auto"
	              >
	                Activate my Digital Twin
	              </Button>
	            </Link>
            <Link href="/demo-brands">
              <Button 
                size="lg"
                variant="outline"
                className="border-gold text-gold hover:bg-gold/10"
              >
                Request Demo
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-500">
            Join thousands of fashion enthusiasts revolutionizing their style
          </p>
        </div>
      </section>

      {/* Intelligent System Section */}
      <IntelligentSystem />

      {/* Footer */}
      <footer className="bg-black border-t border-gold/20 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          <p>&copy; 2024 TRYONYOU — ABVETOS. All rights reserved.</p>
          <p className="mt-2">Futuristic Fashion Technology Platform</p>
        </div>
      </footer>
    </div>
  );
}
