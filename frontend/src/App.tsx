import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <div className="min-h-svh p-6">
        <div className="h-[80vh] flex justify-between items-center">
          <div className="w-3xl">
            <h1 className="text-5xl font-bold">Accelerates your workflow</h1>
            <p className="text-2xl font-medium">
              Our task management app simplifies your workflow, making it easier
              to organize and prioritize your tasks.
            </p>
            <Button size={"lg"}>Sign Up</Button>
          </div>
          <div className="grow">
            <img src="lp001.svg" className="size-96 mx-auto" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
