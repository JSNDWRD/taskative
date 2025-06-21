import { Button } from "@/components/ui/button";

export default function Landing() {
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
            <Button size={"lg"}>Sign Up</Button>
            <Button size={"lg"} variant={"outline"}>
              Learn More
            </Button>
          </div>
        </div>
        <div className="grow bg-white/50 h-full">s</div>
      </div>
    </div>
  );
}
