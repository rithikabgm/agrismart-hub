import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SchemeRecommendations } from '@/components/dashboard/SchemeRecommendations';

const SchemesPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Government Schemes</h1>
          <p className="text-muted-foreground">
            Explore eligible schemes and apply for benefits based on your profile
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <SchemeRecommendations />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SchemesPage;
