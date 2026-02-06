import React, { useState, useMemo } from 'react';
import { Wallet, Calculator, TrendingUp, Calendar, IndianRupee, PiggyBank } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { mockLoans } from '@/data/mockData';
import { cn } from '@/lib/utils';

export const LoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(7.5);
  const [tenure, setTenure] = useState(36);

  const emi = useMemo(() => {
    const monthlyRate = interestRate / 12 / 100;
    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
  }, [loanAmount, interestRate, tenure]);

  const totalPayable = emi * tenure;
  const totalInterest = totalPayable - loanAmount;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Wallet className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Loans & Finance</h3>
      </div>

      {/* EMI Calculator */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center gap-2 mb-6">
          <Calculator className="h-5 w-5 text-accent" />
          <h4 className="font-semibold">EMI Calculator</h4>
        </div>

        <div className="space-y-6">
          {/* Loan Amount */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Loan Amount</label>
              <span className="text-sm font-semibold text-primary">
                ₹{loanAmount.toLocaleString()}
              </span>
            </div>
            <Slider
              value={[loanAmount]}
              onValueChange={([val]) => setLoanAmount(val)}
              min={50000}
              max={2000000}
              step={10000}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>₹50,000</span>
              <span>₹20,00,000</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Interest Rate (p.a.)</label>
              <span className="text-sm font-semibold text-primary">{interestRate}%</span>
            </div>
            <Slider
              value={[interestRate]}
              onValueChange={([val]) => setInterestRate(val)}
              min={4}
              max={15}
              step={0.5}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>4%</span>
              <span>15%</span>
            </div>
          </div>

          {/* Tenure */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Tenure (Months)</label>
              <span className="text-sm font-semibold text-primary">{tenure} months</span>
            </div>
            <Slider
              value={[tenure]}
              onValueChange={([val]) => setTenure(val)}
              min={6}
              max={84}
              step={6}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>6 months</span>
              <span>84 months</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-primary/10 p-4 text-center">
            <p className="text-xs text-muted-foreground">Monthly EMI</p>
            <p className="text-2xl font-bold text-primary">₹{emi.toLocaleString()}</p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-4 text-center">
            <p className="text-xs text-muted-foreground">Total Interest</p>
            <p className="text-xl font-bold text-accent">₹{totalInterest.toLocaleString()}</p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-4 text-center">
            <p className="text-xs text-muted-foreground">Total Payable</p>
            <p className="text-xl font-bold">₹{totalPayable.toLocaleString()}</p>
          </div>
        </div>

        <Button className="mt-4 w-full">Apply for Loan</Button>
      </div>

      {/* Active Loans */}
      <div className="space-y-3">
        <h4 className="font-semibold flex items-center gap-2">
          <PiggyBank className="h-4 w-4" />
          Your Active Loans
        </h4>
        <div className="space-y-3">
          {mockLoans.map((loan) => {
            const progressPercent = (loan.paidEmis / loan.totalEmis) * 100;
            return (
              <div
                key={loan.id}
                className="rounded-xl border border-border bg-card p-5 shadow-card"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Loan #{loan.id}</p>
                    <p className="font-semibold">{loan.purpose}</p>
                  </div>
                  <span
                    className={cn(
                      'rounded-full px-2 py-1 text-xs font-medium',
                      loan.status === 'active'
                        ? 'bg-info/10 text-info'
                        : loan.status === 'completed'
                        ? 'bg-success/10 text-success-foreground'
                        : 'bg-destructive/10 text-destructive'
                    )}
                  >
                    {loan.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Principal</p>
                    <p className="font-medium">₹{loan.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">EMI</p>
                    <p className="font-medium">₹{loan.emi.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Interest</p>
                    <p className="font-medium">{loan.interestRate}%</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">EMI Progress</span>
                    <span className="font-medium">
                      {loan.paidEmis} / {loan.totalEmis} paid
                    </span>
                  </div>
                  <Progress value={progressPercent} className="h-2" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
