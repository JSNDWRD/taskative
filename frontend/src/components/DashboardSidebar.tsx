import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, ListTodo, LogOut, Mail, NotebookPen, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useAuthStore from "@/store/useAuthStore";

export default function DashboardSidebar() {
  const navItems = [
    { title: "Home", url: "/", icon: Home },
    { title: "Task Tracker", url: "/app/tasks", icon: ListTodo },
    { title: "Note Taking", url: "/app/notes", icon: NotebookPen },
    { title: "Messages", url: "/app/messages", icon: Mail },
  ];
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button variant={"ghost"}>
          <User />
          <span>{user?.firstName}</span>
        </Button>
        <Button variant={"outline"} onClick={logout}>
          <LogOut />
          <span>Sign out</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
