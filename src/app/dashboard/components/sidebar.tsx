"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import {
  BookMarked,
  Bot,
  FileText,
  Home,
  Notebook,
  Settings,
  Timer,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/dashboard/subjects", icon: BookMarked, label: "My Subjects" },
    { href: "/dashboard/study", icon: Bot, label: "AI Study Assistant" },
    { href: "/dashboard/answer-generator", icon: FileText, label: "Answer Sheet Generator" },
    { href: "/dashboard/notes", icon: Notebook, label: "Notes & PDF Builder" },
    { href: "/dashboard/focus", icon: Timer, label: "Focus Mode" },
    { href: "/dashboard/progress", icon: TrendingUp, label: "Progress" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <>
    <SidebarRail />
    <SidebarHeader>
        <div className={cn("flex items-center gap-2 p-3", { "justify-center": state === 'collapsed' })}>
            <Logo />
        </div>
    </SidebarHeader>
    <SidebarContent>
      <SidebarMenu>
        {navLinks.map((link) => (
          <SidebarMenuItem key={link.href}>
            <SidebarMenuButton
                asChild
                isActive={pathname === link.href}
                tooltip={link.label}
                className={cn(
                    "dark:hover:shadow-glow-primary dark:data-[active=true]:shadow-glow-primary transition-shadow relative",
                    {"data-[active=true]:bg-primary/10": pathname === link.href}
                )}
            >
                <Link href={link.href}>
                    {pathname === link.href && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-primary rounded-r-full"></span>}
                    <link.icon className="h-5 w-5" />
                    <span>{link.label}</span>
                </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarContent>
    <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings" isActive={pathname === '/dashboard/settings'}>
                    <Link href="/dashboard/settings">
                        <Settings className="h-5 w-5" />
                        <span>Settings</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarFooter>
    </>
  );
}
