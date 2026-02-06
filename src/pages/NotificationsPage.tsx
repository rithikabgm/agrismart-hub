import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { NotificationList } from '@/components/dashboard/NotificationList';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Bell, Check } from 'lucide-react';

const NotificationsPage: React.FC = () => {
  const { markAllAsRead, unreadCount } = useApp();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">
              Stay updated with document verifications, scheme approvals, and more
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead} className="gap-2">
              <Check className="h-4 w-4" />
              Mark all as read
            </Button>
          )}
        </div>
        <NotificationList />
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;
