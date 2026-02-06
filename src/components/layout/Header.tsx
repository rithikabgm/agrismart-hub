import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Bell, Search, Menu, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types';

export const Header: React.FC = () => {
  const { currentUser, setCurrentRole, unreadCount, sidebarOpen, setSidebarOpen } = useApp();

  const roles: { role: UserRole; label: string }[] = [
    { role: 'farmer', label: '🌾 Farmer' },
    { role: 'officer', label: '🏛️ Government Officer' },
    { role: 'admin', label: '⚙️ Admin' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 right-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur-sm px-6 transition-all duration-300',
        sidebarOpen ? 'left-64' : 'left-20'
      )}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search land records, documents..."
            className="w-80 pl-9 bg-secondary/50 border-0 focus-visible:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Role Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <UserIcon className="h-4 w-4" />
              <span className="hidden sm:inline capitalize">{currentUser.role}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {roles.map((r) => (
              <DropdownMenuItem
                key={r.role}
                onClick={() => setCurrentRole(r.role)}
                className={cn(currentUser.role === r.role && 'bg-secondary')}
              >
                {r.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>

        {/* User Avatar */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
          {currentUser.name.charAt(0)}
        </div>
      </div>
    </header>
  );
};
