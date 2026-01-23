
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Upload, FileType, AlertTriangle, CheckCircle, Image, Film, FileText } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function MediaValidationPage() {
  const { toast } = useToast();
  const [uploads, setUploads] = useState([]);

  const validateFile = (file) => {
    const errors = [];
    const validTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/webm', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      errors.push('Invalid file format');
    }
    if (file.type.startsWith('image/') && file.size > 5 * 1024 * 1024) {
        errors.push('Image exceeds 5MB limit');
    }
    if (file.type.startsWith('video/') && file.size > 50 * 1024 * 1024) {
        errors.push('Video exceeds 50MB limit');
    }
    if ((file.type.includes('pdf') || file.type.includes('document')) && file.size > 10 * 1024 * 1024) {
        errors.push('Document exceeds 10MB limit');
    }
    return errors;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validationErrors = validateFile(file);
    const newItem = {
        id: Date.now(),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        type: file.type,
        isValid: validationErrors.length === 0,
        errors: validationErrors,
        uploadDate: new Date().toLocaleString()
    };

    setUploads(prev => [newItem, ...prev]);
    
    if (newItem.isValid) {
        toast({ title: 'Asset validated successfully', className: 'bg-green-600 text-white' });
    } else {
        toast({ title: 'Validation Failed', description: validationErrors.join(', '), variant: 'destructive' });
    }
  };

  const getIcon = (type) => {
    if (type.startsWith('image/')) return <Image className="h-5 w-5" />;
    if (type.startsWith('video/')) return <Film className="h-5 w-5" />;
    return <FileText className="h-5 w-5" />;
  };

  return (
    <>
      <Helmet>
        <title>rotaru.qa-ui-practice-hub | Portfolio Media Checker</title>
        <meta name="description" content="Validate your portfolio media files" />
      </Helmet>

      <PageHeader title="Portfolio Media Checker" subtitle="Validate your portfolio media files" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-broken-links-container">
        
        <div className="bg-card border rounded-lg p-6 space-y-6" data-testid="section-images">
          <div className="text-center p-8 border-2 border-dashed rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
             <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
             <h3 className="text-lg font-semibold mb-2">Upload Portfolio Asset</h3>
             <p className="text-sm text-muted-foreground mb-4 max-w-xs mx-auto">
                Supports Project Images (JPG/PNG), Videos (MP4/WebM), and Documents (PDF/DOC)
             </p>
             <input 
                type="file" 
                id="file-upload" 
                className="hidden" 
                onChange={handleFileUpload}
                accept=".jpg,.jpeg,.png,.mp4,.webm,.pdf,.doc,.docx"
                data-testid="image-valid"
             />
             <Button asChild>
                <label htmlFor="file-upload" className="cursor-pointer">Select Media File</label>
             </Button>
          </div>
          
          <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 text-sm space-y-2">
            <h4 className="font-semibold text-blue-800">Validation Rules:</h4>
            <ul className="list-disc list-inside text-blue-700 space-y-1">
              <li>Images: Max 5MB, JPG/PNG</li>
              <li>Videos: Max 50MB, MP4/WebM</li>
              <li>Documents: Max 10MB, PDF/DOC</li>
            </ul>
          </div>
          
          <div style={{ display: 'none' }} data-testid="image-placeholder"></div>
        </div>

        <div className="bg-card border rounded-lg p-6 flex flex-col h-full" data-testid="section-downloads">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileType className="h-5 w-5" /> Validation Report
          </h2>
          
          <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px]">
            {uploads.length > 0 ? uploads.map(item => (
                <div key={item.id} className={`p-4 rounded-lg border flex items-start gap-4 transition-all ${item.isValid ? 'bg-green-50/50 border-green-200' : 'bg-red-50/50 border-red-200'}`}>
                    <div className={`p-2 rounded-full ${item.isValid ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {getIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                            <h4 className="font-medium truncate pr-2">{item.name}</h4>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.isValid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {item.isValid ? 'Valid' : 'Invalid'}
                            </span>
                        </div>
                        <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                            <span>{item.size}</span>
                            <span>•</span>
                            <span>{item.uploadDate}</span>
                        </div>
                        {!item.isValid ? (
                            <div className="mt-2 flex items-center gap-2 text-xs text-red-600 font-medium">
                                <AlertTriangle className="h-3 w-3" />
                                {item.errors.join(', ')}
                            </div>
                        ) : (
                            <div className="mt-2 flex items-center gap-2 text-xs text-green-600 font-medium">
                                <CheckCircle className="h-3 w-3" />
                                Ready for portfolio
                            </div>
                        )}
                    </div>
                </div>
            )) : (
                <div className="flex flex-col items-center justify-center h-48 text-muted-foreground border-2 border-dashed rounded-lg">
                    <FileType className="h-8 w-8 mb-2 opacity-50" />
                    <p>No files validated yet</p>
                </div>
            )}
          </div>
          
          <div className="hidden">
            <Button data-testid="button-download-valid">Hidden</Button>
            <Button data-testid="button-download-broken">Hidden</Button>
          </div>
        </div>
      </div>
    </>
  );
}
