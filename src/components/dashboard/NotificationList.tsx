import React from 'react';
import { Notification } from '@/types';
import { useApp } from '@/contexts/AppContext';
import { Bell, CheckCircle, AlertTriangle, Info, XCircle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

const typeIcons = {
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
  error: XCircle,
};

const typeStyles = {
  success: 'bg-info/10 border-info/30 text-info',
  warning: 'bg-sunlight/10 border-sunlight/30 text-sunlight-dark',
  info: 'bg-primary/10 border-primary/30 text-primary',
  error: 'bg-destructive/10 border-destructive/30 text-destructive',
};

export const NotificationList: React.FC<{ limit?: number }> = ({ limit }) => {
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useApp();

  const displayNotifications = limit ? notifications.slice(0, limit) : notifications;

  return (
    <div className="rounded-xl border border-border bg-card shadow-card animate-fade-in">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <span className="rounded-full bg-destructive px-2 py-0.5 text-xs text-destructive-foreground">
              {unreadCount} new
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            Mark all read
          </Button>
        )}
      </div>

      <div className="divide-y divide-border">
        {displayNotifications.map((notification) => {
          const Icon = typeIcons[notification.type];
          return (
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={cn(
                'flex cursor-pointer items-start gap-3 p-4 transition-colors hover:bg-secondary/50',
                !notification.read && 'bg-primary/5'
              )}
            >
              <div className={cn('rounded-lg border p-2', typeStyles[notification.type])}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <p className={cn('text-sm font-medium', !notification.read && 'font-semibold')}>
                    {notification.title}
                  </p>
                  {!notification.read && (
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse-slow" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {limit && notifications.length > limit && (
        <div className="border-t border-border p-3">
          <Button variant="ghost" className="w-full gap-2">
            View all notifications <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
