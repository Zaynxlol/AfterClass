import { UserNav } from "@/components/user-nav";
import { DashboardSidebar } from "./components/sidebar";
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Flame, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <DashboardSidebar />
      </Sidebar>
      <SidebarInset className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-xl px-4 sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
             <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 font-semibold text-orange-500">
                <Flame className="w-5 h-5"/>
                <span>5</span>
            </div>
            <Button variant="ghost" size="icon" className="w-8 h-8">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
            </Button>
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
