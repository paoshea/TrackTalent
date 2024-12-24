import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import { FormField } from './shared/FormField';
import { ResumeUploader } from './ResumeUploader';
import { LoadingSpinner } from './shared/LoadingSpinner';
import { useApplicationSubmit } from '../hooks/useApplicationSubmit';
import { useFormValidation } from '../hooks/useFormValidation';

const steps = [
  {
    id: 'personal',
    title: 'Personal Information'
  },
  {
    id: 'resume',
    title: 'Resume & Experience'
  },
  {
    id: 'questions',
    title: 'Additional Questions'
  }
];

export function JobApplicationForm({ jobId }: { jobId: string }) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    resume: null as File | null,
    coverLetter: '',
    linkedin: '',
    experience: '',
    portfolio: '',
    referral: ''
  });

  const { submitApplication, isSubmitting } = useApplicationSubmit();
  const { validateStep, errors } = useFormValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < steps.length - 1) {
      if (validateStep(currentStep, formData)) {
        setCurrentStep(curr => curr + 1);
      }
    } else {
      try {
        await submitApplication(jobId, formData);
        navigate('/applications');
      } catch (error) {
        console.error('Failed to submit application:', error);
      }
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="First Name"
                error={errors.firstName}
                required
              >
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={e => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </FormField>

              <FormField
                label="Last Name"
                error={errors.lastName}
                required
              >
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={e => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </FormField>
            </div>

            <FormField
              label="Email"
              error={errors.email}
              required
            >
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </FormField>

            <FormField
              label="Phone"
              error={errors.phone}
              required
            >
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </FormField>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <ResumeUploader
              onFileSelect={file => setFormData(prev => ({ ...prev, resume: file }))}
            />

            <FormField
              label="Cover Letter"
              error={errors.coverLetter}
            >
              <textarea
                rows={6}
                value={formData.coverLetter}
                onChange={e => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Why are you interested in this position?"
              />
            </FormField>

            <FormField
              label="LinkedIn Profile"
              error={errors.linkedin}
            >
              <input
                type="url"
                value={formData.linkedin}
                onChange={e => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="https://linkedin.com/in/username"
              />
            </FormField>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <FormField
              label="Relevant Experience"
              error={errors.experience}
              required
            >
              <textarea
                rows={4}
                value={formData.experience}
                onChange={e => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Describe your relevant experience for this role"
              />
            </FormField>

            <FormField
              label="Portfolio/Website"
              error={errors.portfolio}
            >
              <input
                type="url"
                value={formData.portfolio}
                onChange={e => setFormData(prev => ({ ...prev, portfolio: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="https://yourportfolio.com"
              />
            </FormField>

            <FormField
              label="How did you hear about us?"
              error={errors.referral}
            >
              <input
                type="text"
                value={formData.referral}
                onChange={e => setFormData(prev => ({ ...prev, referral: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </FormField>
          </div>
        );
    }
  };

  if (isSubmitting) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <nav aria-label="Progress">
          <ol className="flex items-center">
            {steps.map((step, index) => (
              <li key={step.id} className={`relative ${index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
                <div className="flex items-center">
                  <div className={`
                    h-8 w-8 flex items-center justify-center rounded-full
                    ${index < currentStep ? 'bg-indigo-600' :
                      index === currentStep ? 'bg-indigo-600' : 'bg-gray-300'}
                  `}>
                    <span className="text-white">{index + 1}</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-sm font-medium text-gray-900">{step.title}</span>
                  </div>
                </div>
                {index !== steps.length - 1 && (
                  <div className="absolute top-4 left-8 -ml-px w-20 h-0.5 bg-gray-300" />
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        {renderStepContent()}

        <div className="mt-8 flex justify-between">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={() => setCurrentStep(curr => curr - 1)}
              className="flex items-