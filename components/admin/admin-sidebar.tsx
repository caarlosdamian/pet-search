'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  PawPrint,
  ClipboardList,
  Settings,
  LogOut,
  Building2,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar';

interface AdminSidebarProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    role: string;
    organizationId?: string;
  };
  organization?: {
    id: string;
    name: string;
    logo?: string;
  } | null;
}

export default function AdminSidebar({
  user,
  organization,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path
      ? pathname === path
      : pathname.endsWith(`${path}/`);
  };

  const isSuperAdmin = user.role === 'admin';

  return (
    <SidebarProvider defaultOpen className="">
      <Sidebar variant="floating" className="relative top-0 left-0">
        <SidebarHeader className="border-b border-gray-200 p-4">
          <Link href="/admin" className="flex items-center gap-2">
            <PawPrint className="h-6 w-6 text-rose-600" />
            <div className="flex flex-col">
              <span className="text-xl font-bold">PawFinder Admin</span>
              {organization && (
                <span className="text-xs text-gray-500">
                  {organization.name}
                </span>
              )}
            </div>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/admin')}>
                <Link href="/admin">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/admin/pets')}>
                <Link href="/admin/pets">
                  <PawPrint />
                  <span>Pets</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/admin/applications')}
              >
                <Link href="/admin/applications">
                  <ClipboardList />
                  <span>Applications</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {isSuperAdmin && (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/admin/organizations')}
                  >
                    <Link href="/admin/organizations">
                      <Building2 />
                      <span>Organizations</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/admin/users')}
                  >
                    <Link href="/admin/users">
                      <Users />
                      <span>Users</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            )}

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/admin/settings')}>
                <Link href="/admin/settings">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t border-gray-200 p-4">
          <div className="mb-2 text-xs text-gray-500">
            {user.name} (
            {user.role === 'org_admin' ? 'Organization Admin' : 'Super Admin'})
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </button>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
