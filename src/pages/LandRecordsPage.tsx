import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LandSearch } from '@/components/dashboard/LandSearch';
import { LandRecordViewer } from '@/components/dashboard/LandRecordViewer';

const LandRecordsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Land Records</h1>
          <p className="text-muted-foreground">
            View and manage all land records in your account
          </p>
        </div>
        <LandSearch />
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <LandRecordViewer />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LandRecordsPage;
