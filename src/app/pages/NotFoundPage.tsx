import { Link } from "react-router";
import { Home, Search } from "lucide-react";
import { Button } from "../components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F8FA] px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-[#308279]">404</h1>
          <h2 className="text-3xl font-bold text-[#0A1B45]">Page Not Found</h2>
          <p className="text-lg text-[#476074]">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="bg-[#308279] hover:bg-[#308279]/90 text-white">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link to="/marketplace">
            <Button variant="outline" className="border-[#308279] text-[#308279] hover:bg-[#308279]/10">
              <Search className="w-4 h-4 mr-2" />
              Browse Classes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
