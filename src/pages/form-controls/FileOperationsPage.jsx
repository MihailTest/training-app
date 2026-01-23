
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import { Button } from '@/components/ui/button';
import { Download, Upload, FileText, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function FileOperationsPage() {
  const { toast } = useToast();
  const [files, setFiles] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newFile = {
        id: Date.now(),
        name: file.name,
        size: (file.size / 1024).toFixed(2) + ' KB',
        type: file.type || 'Unknown',
        date: new Date().toLocaleDateString()
      };
      setFiles(prev => [newFile, ...prev]);
      toast({ title: "Document uploaded successfully" });
    }
  };

  const handleDelete = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    toast({ title: "Document deleted", variant: "destructive" });
  };

  const downloadTemplate = (type) => {
    // Simulate download
    toast({ title: `Downloading ${type} template...` });
  };

  return (
    <>
      <Helmet>
        <title>Document Management System - UI Practice Hub</title>
        <meta name="description" content="Upload, manage, and download your documents" />
      </Helmet>

      <PageHeader title="Document Management System" subtitle="Upload, manage, and download your documents" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-upload-download-container">
        <ControlPanel title="Document Operations">
          <div className="space-y-6">
            <div className="p-4 border-2 border-dashed rounded-lg bg-muted/30 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <label htmlFor="fileUpload" className="block text-sm font-medium mb-2 cursor-pointer text-primary hover:underline">
                Click to upload PDF, Word, or Excel
              </label>
              <input
                type="file"
                id="fileUpload"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                className="hidden"
                data-testid="input-file-upload"
              />
              <p className="text-xs text-muted-foreground mt-1">Max file size: 10MB</p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium">Download Templates</h3>
              <div className="grid grid-cols-1 gap-2">
                <Button variant="outline" onClick={() => downloadTemplate('PDF')} className="justify-start gap-2" data-testid="button-download-sample">
                  <Download className="h-4 w-4" /> PDF Template
                </Button>
                <Button variant="outline" onClick={() => downloadTemplate('Word')} className="justify-start gap-2">
                  <FileText className="h-4 w-4" /> Word Template
                </Button>
              </div>
            </div>
          </div>
        </ControlPanel>

        <ResultPanel title={`My Documents (${files.length})`}>
          {files.length > 0 ? (
            <div className="space-y-3" data-testid="file-info-display">
              {files.map(file => (
                <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 bg-primary/10 rounded">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.size} • {file.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600" onClick={() => toast({ title: `Previewing ${file.name}` })}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600" onClick={() => toast({ title: `Downloading ${file.name}` })}>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600" onClick={() => handleDelete(file.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-muted-foreground" data-testid="text-no-file">
              <FileText className="h-8 w-8 mb-2 opacity-50" />
              <p>No documents uploaded</p>
            </div>
          )}
        </ResultPanel>
      </div>
    </>
  );
}
