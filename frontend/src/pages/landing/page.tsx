import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/useAuthStore";
import { Link } from "react-router-dom";

export default function Landing() {
  const session = useAuthStore((state) => state.session);
  const onSession = !!session;
  return (
    <div className="min-h-svh">
      <div className="h-dvh flex justify-between items-center">
        <div className="w-3xl px-6">
          <h1>Accelerates your workflow</h1>
          <p className="text-2xl">
            Our task management app simplifies your workflow, making it easier
            to organize and prioritize your tasks.
          </p>
          <div className="flex items-center gap-2 py-4">
            <Button size={"lg"}>
              {onSession ? (
                <Link to="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
              ) : (
                <Link to="/authentication" className="hover:underline">
                  Sign Up
                </Link>
              )}
            </Button>

            <Button size={"lg"} variant={"outline"}>
              Learn More
            </Button>
          </div>
        </div>
        <div className="grow bg-white/50 h-full"></div>
      </div>
    </div>
  );
}
