import { columns } from "@/pages/tasks/columns";
import { DataTable } from "@/pages/tasks/data-table";
import useAuthStore from "@/store/useAuthStore";
import useTaskStore, { type Task } from "@/store/useTaskStore";
import { useEffect } from "react";

export default function TaskList() {
  const authorId = parseInt(useAuthStore((state) => state.session?.id) || "0");
  const getTask = useTaskStore((state) => state.getTask);
  const tasks: Task[] | null = useTaskStore((state) => state.tasks);
  useEffect(() => {
    getTask(authorId);
  }, []);

  return (
    <div>
      {tasks && (
        <DataTable
          columns={columns}
          data={tasks}
          hideColumn={["startAt", "endAt"]}
        />
      )}
    </div>
  );
}
