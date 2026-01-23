
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function BrokenLinksImagesPage() {
  const { toast } = useToast();

  const handleDownload = (fileName, exists) => {
    if (exists) {
      toast({ title: `Downloading ${fileName}...` });
    } else {
      toast({ title: 'File not found', description: 'The requested file does not exist', variant: 'destructive' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Broken Links & Images - UI Practice Hub</title>
        <meta name="description" content="Practice handling broken resources" />
      </Helmet>

      <PageHeader title="Broken Links & Images" subtitle="Practice error handling for missing resources" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-broken-links-container">
        <div className="bg-card border rounded-lg p-6 space-y-4" data-testid="section-images">
          <h2 className="text-lg font-semibold">Valid Image</h2>
          <img
            src="/assets/valid-image.png"
            alt="Valid placeholder"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'block';
            }}
            className="w-full max-w-xs rounded-lg"
            data-testid="image-valid"
          />
          <div style={{ display: 'none' }} className="p-4 bg-muted rounded-lg" data-testid="image-placeholder">
            <p className="text-sm text-muted-foreground">Image failed to load</p>
          </div>
        </div>

        <div className="bg-card border rounded-lg p-6 space-y-4" data-testid="section-downloads">
          <h2 className="text-lg font-semibold">Download Actions</h2>
          <div className="space-y-3">
            <Button onClick={() => handleDownload('sample.pdf', true)} className="w-full gap-2" data-testid="button-download-valid">
              <Download className="h-4 w-4" />
              Download Valid File
            </Button>
            <Button onClick={() => handleDownload('missing.pdf', false)} className="w-full gap-2" variant="outline" data-testid="button-download-broken">
              <Download className="h-4 w-4" />
              Download Missing File
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
