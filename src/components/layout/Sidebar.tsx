import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useApp } from '@/contexts/AppContext';
import {
  LayoutDashboard,
  Map,
  FileCheck,
  Wallet,
  Gift,
  Bell,
  Settings,
  Leaf,
  ChevronLeft,
  ChevronRight,
  Users,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const farmerNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Map, label: 'Land Records', path: '/land-records' },
  { icon: FileCheck, label: 'Document Verification', path: '/documents' },
  { icon: Wallet, label: 'Loans & Finance', path: '/loans' },
  { icon: Gift, label: 'Government Schemes', path: '/schemes' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
];

const officerNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Map, label: 'All Land Records', path: '/land-records' },
  { icon: FileCheck, label: 'Verify Documents', path: '/documents' },
  { icon: Users, label: 'Farmer Management', path: '/farmers' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
];

const adminNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Users, label: 'User Management', path: '/users' },
  { icon: Map, label: 'All Records', path: '/land-records' },
  { icon: Gift, label: 'Manage Schemes', path: '/schemes' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { currentUser, sidebarOpen, setSidebarOpen, unreadCount } = useApp();

  const navItems =
    currentUser.role === 'admin'
      ? adminNavItems
      : currentUser.role === 'officer'
      ? officerNavItems
      : farmerNavItems;

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out',
        'bg-sidebar text-sidebar-foreground',
        sidebarOpen ? 'w-64' : 'w-20'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary">
            <Leaf className="h-6 w-6 text-sidebar-primary-foreground" />
          </div>
          {sidebarOpen && (
            <div className="animate-fade-in">
              <h1 className="text-lg font-bold leading-tight">AgriSmart</h1>
              <p className="text-xs text-sidebar-foreground/70">AI Land System</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const isNotification = item.path === '/notifications';
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                isActive && 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg',
                !sidebarOpen && 'justify-center px-2'
              )}
            >
              <div className="relative">
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {isNotification && unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
                    {unreadCount}
                  </span>
                )}
              </div>
              {sidebarOpen && <span className="animate-fade-in">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Role Badge */}
      {sidebarOpen && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="rounded-lg bg-sidebar-accent/50 p-3">
            <p className="text-xs text-sidebar-foreground/70">Logged in as</p>
            <p className="font-semibold">{currentUser.name}</p>
            <span className="mt-1 inline-block rounded-full bg-sidebar-primary px-2 py-0.5 text-xs font-medium text-sidebar-primary-foreground capitalize">
              {currentUser.role}
            </span>
          </div>
        </div>
      )}
    </aside>
  );
};
