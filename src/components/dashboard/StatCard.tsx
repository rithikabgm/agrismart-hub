import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; positive: boolean };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'accent';
  className?: string;
}

const variantStyles = {
  default: 'bg-card border-border',
  primary: 'bg-primary/5 border-primary/20',
  success: 'bg-success/10 border-success/20',
  warning: 'bg-sunlight-light border-sunlight/30',
  accent: 'bg-accent/5 border-accent/20',
};

const iconStyles = {
  default: 'bg-secondary text-secondary-foreground',
  primary: 'bg-primary text-primary-foreground',
  success: 'bg-info text-info-foreground',
  warning: 'bg-sunlight text-sunlight-foreground',
  accent: 'bg-accent text-accent-foreground',
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
  className,
}) => {
  return (
    <div
      className={cn(
        'rounded-xl border p-5 shadow-card transition-all duration-300 hover:shadow-card-hover animate-fade-in',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <p
              className={cn(
                'text-xs font-medium',
                trend.positive ? 'text-info' : 'text-destructive'
              )}
            >
              {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}% from last month
            </p>
          )}
        </div>
        <div className={cn('rounded-lg p-3', iconStyles[variant])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};
