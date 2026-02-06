import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole, Notification } from '@/types';
import { mockUsers, mockNotifications } from '@/data/mockData';

interface AppContextType {
  currentUser: User;
  setCurrentRole: (role: UserRole) => void;
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const setCurrentRole = (role: UserRole) => {
    const user = mockUsers.find((u) => u.role === role);
    if (user) setCurrentUser(user);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentRole,
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
