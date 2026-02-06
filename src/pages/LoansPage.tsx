import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LoanCalculator } from '@/components/dashboard/LoanCalculator';

const LoansPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Loans & Finance</h1>
          <p className="text-muted-foreground">
            Calculate EMIs, manage loans, and track your financial progress
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <LoanCalculator />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LoansPage;
