import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { LandSearch } from '@/components/dashboard/LandSearch';
import { LandRecordViewer } from '@/components/dashboard/LandRecordViewer';
import { DocumentVerification } from '@/components/dashboard/DocumentVerification';
import { NotificationList } from '@/components/dashboard/NotificationList';
import { LoanCalculator } from '@/components/dashboard/LoanCalculator';
import { SchemeRecommendations } from '@/components/dashboard/SchemeRecommendations';
import { useApp } from '@/contexts/AppContext';
import { dashboardStats } from '@/data/mockData';
import {
  Map,
  FileCheck,
  Clock,
  Wallet,
  Gift,
  IndianRupee,
  Leaf,
  TrendingUp,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DashboardPage: React.FC = () => {
  const { currentUser } = useApp();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="rounded-2xl gradient-field p-6 text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
              <Leaf className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {currentUser.name}!</h1>
              <p className="text-primary-foreground/80">
                Manage your land records, verify documents, and explore government schemes.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Land Area"
            value={dashboardStats.totalLandArea}
            icon={Map}
            variant="primary"
            trend={{ value: 12, positive: true }}
          />
          <StatCard
            title="Verified Documents"
            value={dashboardStats.verifiedDocuments}
            subtitle={`${dashboardStats.pendingDocuments} pending`}
            icon={FileCheck}
            variant="success"
          />
          <StatCard
            title="Active Loans"
            value={dashboardStats.activeLoans}
            subtitle={`Next EMI: ${dashboardStats.upcomingEmi}`}
            icon={Wallet}
            variant="warning"
          />
          <StatCard
            title="Eligible Schemes"
            value={dashboardStats.eligibleSchemes}
            icon={Gift}
            variant="accent"
          />
        </div>

        {/* Land Search */}
        <LandSearch />

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="overview" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="records" className="gap-2">
              <Map className="h-4 w-4" />
              Land Records
            </TabsTrigger>
            <TabsTrigger value="documents" className="gap-2">
              <FileCheck className="h-4 w-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="loans" className="gap-2">
              <Wallet className="h-4 w-4" />
              Loans
            </TabsTrigger>
            <TabsTrigger value="schemes" className="gap-2">
              <Gift className="h-4 w-4" />
              Schemes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <LandRecordViewer />
                </div>
                <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <SchemeRecommendations />
                </div>
              </div>
              <div className="space-y-6">
                <NotificationList limit={4} />
                <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <DocumentVerification />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="records">
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <LandRecordViewer />
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <DocumentVerification />
            </div>
          </TabsContent>

          <TabsContent value="loans">
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <LoanCalculator />
            </div>
          </TabsContent>

          <TabsContent value="schemes">
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <SchemeRecommendations />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
