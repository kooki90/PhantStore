
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-phant-dark p-4">
      <div className="glassmorphism rounded-xl p-8 max-w-md w-full text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-phant-blue/20 rounded-full blur-xl animate-pulse-slow"></div>
          <div className="relative flex h-full w-full items-center justify-center">
            <span className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-phant-blue to-phant-neon-blue">
              4
            </span>
            <div className="relative h-16 w-16 mx-1">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-phant-blue to-phant-neon-blue opacity-70 blur-sm"></div>
              <div className="relative flex h-full w-full items-center justify-center rounded-full bg-phant-dark-blue">
                <span className="text-4xl font-bold text-phant-blue">0</span>
              </div>
            </div>
            <span className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-phant-blue to-phant-neon-blue">
              4
            </span>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-phant-gray mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild
            className="bg-gradient-to-r from-phant-blue to-phant-neon-blue hover:from-phant-neon-blue hover:to-phant-blue text-white transition-all duration-300 shadow-neon hover:shadow-neon-hover"
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
          <Button 
            variant="outline" 
            asChild
            className="border-phant-blue/30 text-phant-blue hover:bg-phant-blue/10"
          >
            <button onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </button>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
