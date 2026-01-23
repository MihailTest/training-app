
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import ResetButton from '@/components/common/ResetButton';
import { Button } from '@/components/ui/button';
import { validateEmail } from '@/utils/validators';

export default function TextBoxPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    currentAddress: '',
    permanentAddress: ''
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setOutput(formData);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      currentAddress: '',
      permanentAddress: ''
    });
    setOutput(null);
    setErrors({});
  };

  return (
    <>
      <Helmet>
        <title>Text Box - UI Practice Hub</title>
        <meta name="description" content="Practice text input validation and form submission" />
      </Helmet>

      <PageHeader
        title="Text Box"
        subtitle="Practice form inputs with validation"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-text-box-container">
        <ControlPanel title="Input Form">
          <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-text-box">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                aria-required="true"
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                data-testid="input-full-name"
              />
              {errors.fullName && (
                <p id="fullName-error" className="text-sm text-destructive mt-1" data-testid="error-full-name">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                data-testid="input-email"
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-destructive mt-1" data-testid="error-email">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="currentAddress" className="block text-sm font-medium mb-2">
                Current Address
              </label>
              <textarea
                id="currentAddress"
                name="currentAddress"
                value={formData.currentAddress}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                data-testid="input-current-address"
              />
            </div>

            <div>
              <label htmlFor="permanentAddress" className="block text-sm font-medium mb-2">
                Permanent Address
              </label>
              <textarea
                id="permanentAddress"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                data-testid="input-permanent-address"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" data-testid="button-submit-form">Submit</Button>
              <ResetButton onClick={handleReset} />
            </div>
          </form>
        </ControlPanel>

        <ResultPanel title="Submitted Data">
          {output ? (
            <div className="space-y-3" data-testid="result-panel-output">
              <div className="border-l-4 border-primary pl-4">
                <div className="text-sm text-muted-foreground">Name</div>
                <div className="font-medium" data-testid="output-full-name">{output.fullName}</div>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <div className="text-sm text-muted-foreground">Email</div>
                <div className="font-medium" data-testid="output-email">{output.email}</div>
              </div>
              {output.currentAddress && (
                <div className="border-l-4 border-primary pl-4">
                  <div className="text-sm text-muted-foreground">Current Address</div>
                  <div className="font-medium" data-testid="output-current-address">{output.currentAddress}</div>
                </div>
              )}
              {output.permanentAddress && (
                <div className="border-l-4 border-primary pl-4">
                  <div className="text-sm text-muted-foreground">Permanent Address</div>
                  <div className="font-medium" data-testid="output-permanent-address">{output.permanentAddress}</div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground" data-testid="text-no-data">No data submitted yet</p>
          )}
        </ResultPanel>
      </div>
    </>
  );
}
