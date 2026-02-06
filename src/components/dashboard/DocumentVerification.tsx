import React, { useState, useCallback } from 'react';
import { FileCheck, Upload, FileText, CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Document } from '@/types';
import { mockDocuments } from '@/data/mockData';

interface VerificationResult {
  status: 'verified' | 'rejected' | 'pending';
  confidenceScore: number;
  details: string[];
}

export const DocumentVerification: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [progress, setProgress] = useState(0);

  const simulateVerification = useCallback(async () => {
    setVerifying(true);
    setProgress(0);

    // Simulate AI verification process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setProgress(i);
    }

    // Random result for demo
    const isVerified = Math.random() > 0.3;
    const confidence = isVerified ? 85 + Math.random() * 15 : 30 + Math.random() * 30;

    setResult({
      status: isVerified ? 'verified' : 'rejected',
      confidenceScore: Math.round(confidence * 10) / 10,
      details: isVerified
        ? [
            'Document format verified',
            'Signature authentication passed',
            'Seal recognition successful',
            'Text extraction complete',
          ]
        : [
            'Document quality too low',
            'Signature could not be verified',
            'Please upload a clearer image',
          ],
    });

    setVerifying(false);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setResult(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
      setResult(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <FileCheck className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">AI Document Verification</h3>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={cn(
          'relative rounded-xl border-2 border-dashed p-8 text-center transition-colors',
          uploadedFile ? 'border-primary bg-primary/5' : 'border-muted-foreground/30 hover:border-primary/50'
        )}
      >
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
        <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
        <p className="mt-4 font-medium">
          {uploadedFile ? uploadedFile.name : 'Drop your land documents here'}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Supports PDF, JPG, PNG up to 10MB
        </p>
      </div>

      {uploadedFile && !result && (
        <Button
          onClick={simulateVerification}
          disabled={verifying}
          className="w-full"
        >
          {verifying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Document...
            </>
          ) : (
            <>
              <FileCheck className="mr-2 h-4 w-4" />
              Verify with AI
            </>
          )}
        </Button>
      )}

      {verifying && (
        <div className="space-y-2 animate-fade-in">
          <div className="flex justify-between text-sm">
            <span>AI Analysis Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            {progress >= 20 && <span className="animate-fade-in">✓ Extracting text</span>}
            {progress >= 40 && <span className="animate-fade-in">✓ Detecting signatures</span>}
            {progress >= 60 && <span className="animate-fade-in">✓ Verifying seals</span>}
            {progress >= 80 && <span className="animate-fade-in">✓ Cross-referencing</span>}
          </div>
        </div>
      )}

      {result && (
        <div
          className={cn(
            'rounded-xl border p-6 animate-grow',
            result.status === 'verified'
              ? 'border-info/30 bg-info/5'
              : 'border-destructive/30 bg-destructive/5'
          )}
        >
          <div className="flex items-center gap-3">
            {result.status === 'verified' ? (
              <CheckCircle className="h-8 w-8 text-info" />
            ) : (
              <XCircle className="h-8 w-8 text-destructive" />
            )}
            <div>
              <h4 className="font-semibold">
                {result.status === 'verified' ? 'Document Verified' : 'Verification Failed'}
              </h4>
              <p className="text-sm text-muted-foreground">
                Confidence Score: {result.confidenceScore}%
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {result.details.map((detail, index) => (
              <p key={index} className="flex items-center gap-2 text-sm">
                {result.status === 'verified' ? (
                  <CheckCircle className="h-4 w-4 text-info" />
                ) : (
                  <XCircle className="h-4 w-4 text-destructive" />
                )}
                {detail}
              </p>
            ))}
          </div>

          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setUploadedFile(null);
              setResult(null);
            }}
          >
            Verify Another Document
          </Button>
        </div>
      )}

      {/* Recent Documents */}
      <div className="space-y-3">
        <h4 className="font-medium text-muted-foreground">Recent Verifications</h4>
        <div className="space-y-2">
          {mockDocuments.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between rounded-lg bg-secondary/30 p-3"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.uploadDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {doc.confidenceScore && (
                  <span className="text-xs text-muted-foreground">
                    {doc.confidenceScore}%
                  </span>
                )}
                {doc.status === 'verified' && (
                  <CheckCircle className="h-5 w-5 text-info" />
                )}
                {doc.status === 'pending' && (
                  <Clock className="h-5 w-5 text-sunlight" />
                )}
                {doc.status === 'rejected' && (
                  <XCircle className="h-5 w-5 text-destructive" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
