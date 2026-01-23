
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { validateEmail } from '@/utils/validators';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const states = ['California', 'Texas', 'New York', 'Florida'];
const citiesByState = {
  'California': ['Los Angeles', 'San Francisco', 'San Diego'],
  'Texas': ['Houston', 'Austin', 'Dallas'],
  'New York': ['New York City', 'Buffalo', 'Rochester'],
  'Florida': ['Miami', 'Orlando', 'Tampa']
};

export default function PracticeFormPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    mobile: '',
    dob: '',
    subjects: [],
    hobbies: [],
    picture: null,
    address: '',
    state: '',
    city: ''
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter(v => v !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      if (name === 'state') {
        setFormData(prev => ({ ...prev, city: '' }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = 'Required';
    if (!formData.lastName) newErrors.lastName = 'Required';
    if (!formData.email) newErrors.email = 'Required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.gender) newErrors.gender = 'Required';
    if (!formData.mobile) newErrors.mobile = 'Required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setShowModal(true);
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      mobile: '',
      dob: '',
      subjects: [],
      hobbies: [],
      picture: null,
      address: '',
      state: '',
      city: ''
    });
    setErrors({});
  };

  return (
    <>
      <Helmet>
        <title>Practice Form - UI Practice Hub</title>
        <meta name="description" content="Practice complex form validation" />
      </Helmet>

      <PageHeader title="Practice Form" subtitle="Complete form with validation and submission" />

      <div className="bg-card border rounded-lg p-6 shadow-sm max-w-3xl mx-auto" data-testid="section-form-container">
        <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-practice">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                aria-required="true"
                aria-invalid={!!errors.firstName}
                data-testid="input-first-name"
              />
              {errors.firstName && <p className="text-sm text-destructive mt-1" data-testid="error-first-name">{errors.firstName}</p>}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                aria-required="true"
                aria-invalid={!!errors.lastName}
                data-testid="input-last-name"
              />
              {errors.lastName && <p className="text-sm text-destructive mt-1" data-testid="error-last-name">{errors.lastName}</p>}
            </div>
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
              className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
              aria-required="true"
              aria-invalid={!!errors.email}
              data-testid="input-email"
            />
            {errors.email && <p className="text-sm text-destructive mt-1" data-testid="error-email">{errors.email}</p>}
          </div>

          <fieldset data-testid="group-gender">
            <legend className="text-sm font-medium mb-2">Gender *</legend>
            <div className="flex gap-4">
              {['Male', 'Female', 'Other'].map(g => (
                <label key={g} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleChange}
                    data-testid={`radio-${g.toLowerCase()}`}
                  />
                  <span>{g}</span>
                </label>
              ))}
            </div>
            {errors.gender && <p className="text-sm text-destructive mt-1" data-testid="error-gender">{errors.gender}</p>}
          </fieldset>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium mb-2">
                Mobile *
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                aria-required="true"
                data-testid="input-mobile"
              />
              {errors.mobile && <p className="text-sm text-destructive mt-1" data-testid="error-mobile">{errors.mobile}</p>}
            </div>

            <div>
              <label htmlFor="dob" className="block text-sm font-medium mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                data-testid="input-dob"
              />
            </div>
          </div>

          <fieldset data-testid="group-hobbies">
            <legend className="text-sm font-medium mb-2">Hobbies</legend>
            <div className="flex gap-4">
              {['Sports', 'Reading', 'Music'].map(h => (
                <label key={h} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="hobbies"
                    value={h}
                    checked={formData.hobbies.includes(h)}
                    onChange={handleChange}
                    data-testid={`checkbox-${h.toLowerCase()}`}
                  />
                  <span>{h}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="state" className="block text-sm font-medium mb-2">
                State
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                data-testid="select-state"
              >
                <option value="">Select State</option>
                {states.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-2">
                City
              </label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={!formData.state}
                className="w-full px-3 py-2 border rounded-lg bg-background text-foreground disabled:opacity-50"
                data-testid="select-city"
              >
                <option value="">Select City</option>
                {formData.state && citiesByState[formData.state]?.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" data-testid="button-submit-form">Submit</Button>
            <Button type="button" variant="outline" onClick={handleReset} data-testid="button-reset-form">Reset</Button>
          </div>
        </form>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent data-testid="modal-form-success">
          <DialogHeader>
            <DialogTitle>Form Submitted Successfully</DialogTitle>
          </DialogHeader>
          <div className="space-y-2" data-testid="modal-body-content">
            <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Gender:</strong> {formData.gender}</p>
            <p><strong>Mobile:</strong> {formData.mobile}</p>
            {formData.dob && <p><strong>DOB:</strong> {formData.dob}</p>}
            {formData.hobbies.length > 0 && <p><strong>Hobbies:</strong> {formData.hobbies.join(', ')}</p>}
            {formData.state && <p><strong>State:</strong> {formData.state}</p>}
            {formData.city && <p><strong>City:</strong> {formData.city}</p>}
          </div>
          <Button onClick={() => setShowModal(false)} data-testid="button-close-modal">Close</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
