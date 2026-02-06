import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DocumentVerification } from '@/components/dashboard/DocumentVerification';

const DocumentsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">AI Document Verification</h1>
          <p className="text-muted-foreground">
            Upload and verify your land documents using AI-powered authentication
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <DocumentVerification />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DocumentsPage;
