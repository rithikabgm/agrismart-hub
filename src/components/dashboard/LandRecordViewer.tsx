import React, { useState } from 'react';
import { LandRecord } from '@/types';
import { mockLandRecords } from '@/data/mockData';
import { Map, User, Ruler, Wheat, MapPin, CheckCircle, Clock, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export const LandRecordViewer: React.FC = () => {
  const [selectedRecord, setSelectedRecord] = useState<LandRecord | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Map className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Land Records</h3>
        </div>
        <Badge variant="secondary">{mockLandRecords.length} Records</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockLandRecords.map((record, index) => (
          <div
            key={record.id}
            className="rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:shadow-card-hover animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Survey #{record.surveyNumber}</p>
                <h4 className="font-semibold">{record.ownerName}</h4>
              </div>
              <Badge
                variant={record.verified ? 'default' : 'secondary'}
                className={cn(
                  record.verified
                    ? 'bg-info text-info-foreground'
                    : 'bg-sunlight text-sunlight-foreground'
                )}
              >
                {record.verified ? (
                  <><CheckCircle className="mr-1 h-3 w-3" /> Verified</>
                ) : (
                  <><Clock className="mr-1 h-3 w-3" /> Pending</>
                )}
              </Badge>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Ruler className="h-4 w-4" />
                <span>{record.landSize} {record.landUnit}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Wheat className="h-4 w-4" />
                <span>{record.cropType}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{record.location}, {record.district}</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => setSelectedRecord(record)}
              >
                <Eye className="mr-1 h-4 w-4" />
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Land Record Detail Modal */}
      <Dialog open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Land Record Details</DialogTitle>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-6">
              {/* Map Placeholder */}
              <div className="relative h-48 overflow-hidden rounded-lg bg-gradient-to-br from-field-light to-secondary">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Map className="mx-auto h-12 w-12 text-primary/50" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Interactive Map View
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Lat: {selectedRecord.coordinates.lat}, Lng: {selectedRecord.coordinates.lng}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Owner Information</h4>
                  <div className="rounded-lg bg-secondary/30 p-3 space-y-2">
                    <p className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{selectedRecord.ownerName}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Owner ID: {selectedRecord.ownerId}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Land Details</h4>
                  <div className="rounded-lg bg-secondary/30 p-3 space-y-2">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Size:</span>{' '}
                      <span className="font-medium">{selectedRecord.landSize} {selectedRecord.landUnit}</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Crops:</span>{' '}
                      <span className="font-medium">{selectedRecord.cropType}</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Survey:</span>{' '}
                      <span className="font-medium">{selectedRecord.surveyNumber}</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-3 md:col-span-2">
                  <h4 className="font-semibold text-primary">Location</h4>
                  <div className="rounded-lg bg-secondary/30 p-3">
                    <p className="text-sm">
                      {selectedRecord.location}, {selectedRecord.district}, {selectedRecord.state}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Registered on: {new Date(selectedRecord.registrationDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
