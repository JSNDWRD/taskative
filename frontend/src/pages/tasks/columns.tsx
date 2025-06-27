import type { Task } from "@/store/useTaskStore";
import { type ColumnDef } from "@tanstack/react-table";
import TaskModal from "./task-modal";
import useAuthStore from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import useTaskStore from "@/store/useTaskStore";
import { Trash2 } from "lucide-react";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: "No",
    cell: ({ row }) => {
      return <p className="ms-2">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const formatted =
        (status == "NOT_STARTED" && "Not Started") ||
        (status == "IN_PROGRESS" && "In Progress") ||
        (status == "COMPLETED" && "Completed");
      return <p>{formatted}</p>;
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority");
      const formatted =
        (priority == "NOT_SET" && "Not Set") ||
        (priority == "LOW" && "Low") ||
        (priority == "MEDIUM" && "Medium") ||
        (priority == "HIGH" && "High");
      return <p>{formatted}</p>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const startDate = new Date(row.getValue("startAt"));
      const endDate =
        row.getValue("endAt") !== null ? new Date(row.getValue("endAt")) : null;
      const startDateString = startDate.toDateString().substring(4);
      const endDateString = endDate?.toDateString().substring(4);
      return (
        <p>
          {startDateString}
          {endDate !== null ? ` - ${endDateString}` : ""}
        </p>
      );
    },
  },
  {
    accessorKey: "startAt",
    header: "Start At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("startAt"));
      const dateString = date.toDateString().substring(4);
      return <p>{dateString}</p>;
    },
  },
  {
    accessorKey: "endAt",
    header: "End At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("endAt"));
      const dateString = date.toDateString().substring(4);
      return <p>{dateString}</p>;
    },
  },
  {
    accessorKey: "edit",
    header: "",
    cell: ({ row }) => {
      const authorId = useAuthStore((state) => state.session?.id);
      let features = useTaskStore((state) => state.features);
      const deleteTask = useTaskStore((state) => state.deleteTask);
      const task: Task = {
        authorId: authorId ? parseInt(authorId) : 0,
        title: row.getValue("title"),
        id: row.getValue("id"),
        status: row.getValue("status"),
        priority: row.getValue("priority"),
        startAt: row.getValue("startAt"),
        endAt: row.getValue("endAt"),
      };
      return (
        <div className="flex gap-2 items-center">
          {features.editButton && <TaskModal type="PUT" values={task} />}
          {features.deleteButton && (
            <Button
              variant={"outline"}
              onClick={() => {
                deleteTask(row.getValue("id"));
              }}
            >
              <Trash2 />
            </Button>
          )}
        </div>
      );
    },
  },
];
