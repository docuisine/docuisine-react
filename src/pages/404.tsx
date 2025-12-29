import { Button } from "@/components/ui/button";

const PageNotFound404 = () => {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
        <h2 className="mb-6 text-5xl font-semibold">Whoops!</h2>
        <h3 className="mb-1.5 text-3xl font-semibold">Something went wrong</h3>
        <p className="text-muted-foreground mb-6 max-w-sm">
          The page you&apos;re looking for isn&apos;t found, we suggest you back
          to home.
        </p>
        <Button asChild size="lg" className="rounded-md text-base">
          <a href="/recipes">Back to home page</a>
        </Button>
      </div>

      {/* Right Section: Illustration */}
      <div className="relative w-full p-2 max-lg:hidden flex items-center justify-center">
        <div className="h-60 w-full rounded-md flex items-center justify-center bg-accent text-accent-foreground text-center text-9xl font-bold">
          404
        </div>
      </div>
    </div>
  );
};

export default PageNotFound404;
