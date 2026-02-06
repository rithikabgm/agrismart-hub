import React from 'react';
import { GovernmentScheme } from '@/types';
import { mockSchemes } from '@/data/mockData';
import {
  Gift,
  Wallet,
  Shield,
  GraduationCap,
  Tractor,
  CheckCircle,
  Calendar,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const categoryIcons = {
  subsidy: Wallet,
  loan: Gift,
  insurance: Shield,
  training: GraduationCap,
  equipment: Tractor,
};

const categoryColors = {
  subsidy: 'bg-info/10 text-info border-info/30',
  loan: 'bg-primary/10 text-primary border-primary/30',
  insurance: 'bg-accent/10 text-accent border-accent/30',
  training: 'bg-sunlight/10 text-sunlight-dark border-sunlight/30',
  equipment: 'bg-earth-light text-earth border-earth/30',
};

export const SchemeRecommendations: React.FC = () => {
  const eligibleSchemes = mockSchemes.filter((s) => s.isEligible);
  const otherSchemes = mockSchemes.filter((s) => !s.isEligible);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Government Schemes</h3>
        </div>
        <Badge variant="secondary" className="gap-1">
          <Sparkles className="h-3 w-3" />
          AI Recommended
        </Badge>
      </div>

      {/* Eligible Schemes */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-info" />
          You're Eligible For ({eligibleSchemes.length} schemes)
        </h4>
        <div className="grid gap-4 md:grid-cols-2">
          {eligibleSchemes.map((scheme, index) => {
            const Icon = categoryIcons[scheme.category];
            return (
              <div
                key={scheme.id}
                className="rounded-xl border border-info/30 bg-info/5 p-5 shadow-card transition-all duration-300 hover:shadow-card-hover animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={cn('rounded-lg border p-2', categoryColors[scheme.category])}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge className="bg-info text-info-foreground">Eligible</Badge>
                </div>

                <h4 className="font-semibold mb-2">{scheme.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">{scheme.description}</p>

                <div className="rounded-lg bg-background/50 p-3 mb-4">
                  <p className="text-xs text-muted-foreground mb-1">Benefits</p>
                  <p className="text-sm font-medium text-primary">{scheme.benefits}</p>
                </div>

                {scheme.deadline && (
                  <div className="flex items-center gap-1 text-xs text-sunlight-dark mb-4">
                    <Calendar className="h-3 w-3" />
                    Apply by {scheme.deadline}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    Apply Now
                  </Button>
                  <Button size="sm" variant="outline">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Other Schemes */}
      {otherSchemes.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">
            Other Available Schemes
          </h4>
          <div className="grid gap-4 md:grid-cols-2">
            {otherSchemes.map((scheme) => {
              const Icon = categoryIcons[scheme.category];
              return (
                <div
                  key={scheme.id}
                  className="rounded-xl border border-border bg-card p-5 opacity-75"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={cn('rounded-lg border p-2', categoryColors[scheme.category])}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline">Not Eligible</Badge>
                  </div>

                  <h4 className="font-semibold mb-2">{scheme.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{scheme.description}</p>

                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Eligibility Criteria:</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {scheme.eligibility.map((e, i) => (
                        <li key={i} className="flex items-center gap-1">
                          • {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
