
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import ResetButton from '@/components/common/ResetButton';
import { Button } from '@/components/ui/button';

export default function TextInputPage() {
  const [formData, setFormData] = useState({
    fullName: '', // Mapped to Movie Title
    email: '', // Mapped to Director Name
    currentAddress: '', // Mapped to Review Text
    permanentAddress: '', // Mapped to Rating & Year display
    rating: '',
    releaseYear: ''
  });
  const [output, setOutput] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Movie Title is required';
    if (!formData.email.trim()) newErrors.email = 'Director Name is required';
    if (!formData.currentAddress || formData.currentAddress.length < 20) {
        newErrors.currentAddress = 'Review must be at least 20 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const additionalInfo = `Rating: ${formData.rating || 'N/A'}/10 | Year: ${formData.releaseYear || 'N/A'}`;

    setOutput({
        ...formData,
        permanentAddress: additionalInfo
    });
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      currentAddress: '',
      permanentAddress: '',
      rating: '',
      releaseYear: ''
    });
    setOutput(null);
    setErrors({});
  };

  return (
    <>
      <Helmet>
        <title>rotaru.qa-ui-practice-hub | Movie Review Submission</title>
        <meta name="description" content="Submit your movie reviews and ratings" />
      </Helmet>

      <PageHeader
        title="Movie Review Submission"
        subtitle="Share your thoughts on the latest films"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-text-box-container">
        <ControlPanel title="Review Form">
          <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-text-box">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                Movie Title *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter movie title"
                className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                aria-required="true"
                data-testid="input-full-name"
              />
              {errors.fullName && (
                <p className="text-sm text-destructive mt-1" data-testid="error-full-name">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Director Name
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter director's name"
                className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                data-testid="input-email"
              />
               {errors.email && (
                <p className="text-sm text-destructive mt-1" data-testid="error-email">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="currentAddress" className="block text-sm font-medium mb-2">
                Review Text * (Min 20 chars)
              </label>
              <textarea
                id="currentAddress"
                name="currentAddress"
                value={formData.currentAddress}
                onChange={handleChange}
                placeholder="Write your review here..."
                rows={3}
                className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                data-testid="input-current-address"
              />
               {errors.currentAddress && (
                <p className="text-sm text-destructive mt-1">
                  {errors.currentAddress}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium mb-2">
                    Rating (1-10)
                  </label>
                  <input
                    type="number"
                    id="rating"
                    name="rating"
                    min="1"
                    max="10"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  />
                  <textarea 
                    id="permanentAddress"
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleChange}
                    className="hidden" 
                    data-testid="input-permanent-address"
                  />
                </div>
                <div>
                   <label htmlFor="releaseYear" className="block text-sm font-medium mb-2">
                    Release Year
                  </label>
                  <input
                    type="number"
                    id="releaseYear"
                    name="releaseYear"
                    value={formData.releaseYear}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" data-testid="button-submit-form">Submit Review</Button>
              <ResetButton onClick={handleReset} />
            </div>
          </form>
        </ControlPanel>

        <ResultPanel title="Review Summary">
          {output ? (
            <div className="space-y-3" data-testid="result-panel-output">
              <div className="border-l-4 border-primary pl-4">
                <div className="text-sm text-muted-foreground">Movie Title</div>
                <div className="font-medium" data-testid="output-full-name">{output.fullName}</div>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <div className="text-sm text-muted-foreground">Director</div>
                <div className="font-medium" data-testid="output-email">{output.email || 'N/A'}</div>
              </div>
              {output.currentAddress && (
                <div className="border-l-4 border-primary pl-4">
                  <div className="text-sm text-muted-foreground">Review</div>
                  <div className="font-medium" data-testid="output-current-address">{output.currentAddress}</div>
                </div>
              )}
              <div className="border-l-4 border-primary pl-4">
                <div className="text-sm text-muted-foreground">Details</div>
                <div className="font-medium" data-testid="output-permanent-address">{output.permanentAddress}</div>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground" data-testid="text-no-data">No review submitted yet</p>
          )}
        </ResultPanel>
      </div>
    </>
  );
}
