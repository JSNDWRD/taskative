import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon, Pencil } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import useTaskStore, { type Task } from "@/store/useTaskStore";
import useAuthStore from "@/store/useAuthStore";

export default function TaskModal({
  type,
  values,
}: {
  type: "POST" | "PUT";
  values?: Task;
}) {
  const { postTask, getTask, putTask } = useTaskStore.getState();
  const authorId = useAuthStore((state) => state.session?.id) || "0";

  const [open, setOpen] = useState({
    start: false,
    end: false,
    modal: false,
  });

  const [task, setTask] = useState<Task>({
    id: values?.id,
    authorId: parseInt(authorId),
    title: type == "PUT" ? values?.title || "" : "",
    status: type == "PUT" ? values?.status : "NOT_STARTED",
    priority: type == "PUT" ? values?.priority : "LOW",
    startAt: type == "PUT" ? new Date(values?.startAt || "") : undefined,
    endAt: type == "PUT" ? new Date(values?.endAt || "") : undefined,
  });
  return (
    <Dialog
      open={open.modal}
      onOpenChange={() => {
        setOpen((prev) => ({ ...prev, modal: !open.modal }));
      }}
    >
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" size={"default"}>
            {type == "POST" && "New Task"}
            {type == "PUT" && <Pencil />}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New task</DialogTitle>
            <DialogDescription>
              Fill your task's detail below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title-1">Title</Label>
              <Input
                id="title-1"
                name="title"
                defaultValue="Task X"
                value={task.title}
                onChange={(e) => {
                  setTask((prev) => ({ ...prev, title: e.target.value }));
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <Label htmlFor="status-1">Status</Label>
                <Select
                  value={task.status}
                  onValueChange={(
                    e: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED"
                  ) => {
                    setTask((prev) => ({ ...prev, status: e }));
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="NOT_STARTED">Not Started</SelectItem>
                      <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label htmlFor="priority-1">Priority</Label>
                <Select
                  value={task.priority}
                  onValueChange={(e: "LOW" | "MEDIUM" | "HIGH") => {
                    setTask((prev) => ({ ...prev, priority: e }));
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Priority</SelectLabel>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-3">
                <Label htmlFor="date-1">Start</Label>
                <Popover
                  open={open.start}
                  onOpenChange={() => {
                    setOpen((prev) => ({ ...prev, start: !open.start }));
                  }}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date-1"
                      className="w-full justify-between font-normal"
                    >
                      {task.startAt
                        ? task.startAt.toDateString().substring(4)
                        : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      hidden={{ after: new Date(task.endAt ? task.endAt : "") }}
                      selected={task.startAt}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setTask((prev) => ({
                          ...prev,
                          startAt: new Date(date || ""),
                        }));
                        setOpen((prev) => ({ ...prev, start: false }));
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="date-2">End</Label>
                <Popover
                  open={open.end}
                  onOpenChange={() =>
                    setOpen((prev) => ({ ...prev, end: !open.end }))
                  }
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date-2"
                      className="w-full justify-between font-normal"
                    >
                      {task.endAt
                        ? task.endAt.toDateString().substring(4)
                        : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      hidden={{
                        before: new Date(task.startAt ? task.startAt : ""),
                      }}
                      selected={task.endAt}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setTask((prev) => ({
                          ...prev,
                          endAt: new Date(date || ""),
                        }));
                        setOpen((prev) => ({ ...prev, end: false }));
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={() => {
                if (type == "POST") {
                  postTask(task);
                }
                if (type == "PUT") {
                  putTask(task);
                }
                setOpen((prev) => ({ ...prev, modal: !open.modal }));
                setTimeout(() => {
                  getTask(parseInt(authorId));
                }, 1000);
              }}
            >
              {type == "POST" && "Add Task"}
              {type == "PUT" && "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
