import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  // MenubarRadioGroup,
  // MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import TaskModal from "@/pages/tasks/task-modal";
import { Button } from "./ui/button";
import { RefreshCw } from "lucide-react";
import useTaskStore from "@/store/useTaskStore";
import useAuthStore from "@/store/useAuthStore";

export default function Taskbar() {
  const authorId = parseInt(useAuthStore((state) => state.session?.id) || "0");
  let isLoading = useAuthStore((state) => state.isLoading);
  const { getTask, setFeatures } = useTaskStore.getState();
  let features = useTaskStore((state) => state.features);
  return (
    <Menubar className="border-0">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Find</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Search the web</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Find...</MenubarItem>
              <MenubarItem>Find Next</MenubarItem>
              <MenubarItem>Find Previous</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          {/* <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>
            Always Show Full URLs
          </MenubarCheckboxItem>
          <MenubarSeparator /> */}
          {/* <MenubarItem inset>
            Reload <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem> */}
          <MenubarCheckboxItem
            checked={!!features.sorting}
            onClick={() => {
              setFeatures({ sorting: !features.sorting });
            }}
          >
            Enable sorting
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarCheckboxItem
            checked={!!features.editButton}
            onClick={() => {
              setFeatures({ editButton: !features.editButton });
            }}
          >
            Show edit button
          </MenubarCheckboxItem>
          <MenubarCheckboxItem
            checked={!!features.deleteButton}
            onClick={() => {
              setFeatures({ deleteButton: !features.deleteButton });
            }}
          >
            Show delete button
          </MenubarCheckboxItem>
          {/* <MenubarItem inset>Hide Sidebar</MenubarItem> */}
        </MenubarContent>
      </MenubarMenu>
      <span className="grow flex justify-end items-center gap-2">
        <Button
          variant={"outline"}
          onClick={() => {
            getTask(authorId);
          }}
        >
          <RefreshCw className={`${isLoading ? "animate-spin" : ""}`} />
        </Button>
        <TaskModal type="POST" />
      </span>
    </Menubar>
  );
}
