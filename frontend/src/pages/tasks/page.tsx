import Taskbar from "@/components/Taskbar";
import TaskList from "@/components/TaskList";

export default function Tasks() {
  return (
    <div className="min-h-dvh px-6 space-y-4">
      <Taskbar />
      <TaskList />
    </div>
  );
}
