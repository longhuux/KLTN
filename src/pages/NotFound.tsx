
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center py-12 px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">404</h1>
        <p className="text-xl md:text-2xl mb-2 font-display">Page Not Found</p>
        <p className="text-muted-foreground mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link to="/">Go Back Home</Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link to="/recipes">Browse Recipes</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
