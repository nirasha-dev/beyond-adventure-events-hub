import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, AlertCircle, CheckCircle, Backpack, ShieldAlert } from 'lucide-react';
import { Adventure, RegistrationFormData, RegistrationFormErrors } from '../types';
import { FACULTY_OPTIONS, validateRegistrationForm } from '../utils/validation';
import './RegistrationDialog.css';

interface RegistrationDialogProps {
  adventure: Adventure;
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | HTMLElement | null>;
}

export const RegistrationDialog: React.FC<RegistrationDialogProps> = ({
  adventure,
  isOpen,
  onClose,
  triggerRef,
}) => {
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const facultySelectRef = useRef<HTMLSelectElement>(null);
  const ackCheckboxRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    faculty: '',
    acknowledgedDemo: false,
  });

  const [errors, setErrors] = useState<RegistrationFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        fullName: '',
        email: '',
        faculty: '',
        acknowledgedDemo: false,
      });
      setErrors({});
      setIsSubmitted(false);

      // Focus first field
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Handle ESC key and focus restoration
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }

      // Simple focus trap
      if (e.key === 'Tab' && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Lock background scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      // Restore focus to trigger button
      triggerRef?.current?.focus();
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateRegistrationForm(formData);
    setErrors(validation.errors);

    if (!validation.isValid) {
      // Focus first invalid field
      if (validation.errors.fullName) {
        nameInputRef.current?.focus();
      } else if (validation.errors.email) {
        emailInputRef.current?.focus();
      } else if (validation.errors.faculty) {
        facultySelectRef.current?.focus();
      } else if (validation.errors.acknowledgedDemo) {
        ackCheckboxRef.current?.focus();
      }
      return;
    }

    // Submission succeeded - purely client-side simulation.
    // Explicitly NO network call, NO console logging of personal data, NO persistence.
    setIsSubmitted(true);
  };

  const handleGoToChecklist = () => {
    onClose();
    navigate(`/my-kit?event=${adventure.id}`);
  };

  return (
    <div
      className="dialog-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="dialog-panel"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-notice"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="dialog-header">
          <div>
            <span className="dialog-eyebrow">Recruitment Demo</span>
            <h2 id="dialog-title" className="dialog-title">
              {isSubmitted ? 'Demo Registration Complete' : `Try Demo Registration: ${adventure.title}`}
            </h2>
          </div>
          <button
            type="button"
            className="dialog-close-btn"
            onClick={onClose}
            aria-label="Close registration dialog"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="dialog-body">
          {/* Pre-form mandatory disclosure */}
          <div id="dialog-notice" className="dialog-notice-box" role="status">
            <ShieldAlert size={20} className="notice-icon" aria-hidden="true" />
            <div>
              <strong>Demonstration only. Use sample details.</strong>
              <p>
                No information is sent to a server and no actual place is reserved. This form illustrates student registration ergonomics for Nirasha Ranasinghe’s Adventure Club recruitment assignment.
              </p>
            </div>
          </div>

          {isSubmitted ? (
            /* Success confirmation screen */
            <div className="registration-success-view">
              <div className="success-icon-wrapper" aria-hidden="true">
                <CheckCircle size={48} />
              </div>
              <h3 className="success-headline">Sample Registration Simulated Successfully!</h3>
              <p className="success-text">
                Thank you for testing the workflow, <strong>{formData.fullName}</strong>. As this is purely a frontend demonstration for the Adventure Club recruitment task, no personal data was recorded or transmitted.
              </p>

              <div className="success-summary-card">
                <div className="summary-row">
                  <span className="summary-label">Selected Event:</span>
                  <span className="summary-value">{adventure.title}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Illustrative Dates:</span>
                  <span className="summary-value">{adventure.displayDates}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">University Faculty:</span>
                  <span className="summary-value">{formData.faculty}</span>
                </div>
              </div>

              <div className="success-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleGoToChecklist}
                >
                  <Backpack size={16} aria-hidden="true" />
                  <span>Go to my packing checklist</span>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Close preview
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Form */
            <form onSubmit={handleSubmit} noValidate className="registration-form">
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="reg-full-name" className="form-label">
                  Full Name <span className="required-star">*</span>
                </label>
                <input
                  ref={nameInputRef}
                  id="reg-full-name"
                  type="text"
                  className={`form-input ${errors.fullName ? 'has-error' : ''}`}
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                  }
                  placeholder="e.g. Kasun Perera (Sample Student)"
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? 'error-full-name' : undefined}
                  maxLength={80}
                  required
                />
                {errors.fullName && (
                  <p id="error-full-name" className="field-error-message" role="alert">
                    <AlertCircle size={14} aria-hidden="true" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="reg-email" className="form-label">
                  Email Address <span className="required-star">*</span>
                </label>
                <input
                  ref={emailInputRef}
                  id="reg-email"
                  type="email"
                  className={`form-input ${errors.email ? 'has-error' : ''}`}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="e.g. student@kln.ac.lk (Sample Email)"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'error-email' : undefined}
                  required
                />
                {errors.email && (
                  <p id="error-email" className="field-error-message" role="alert">
                    <AlertCircle size={14} aria-hidden="true" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Faculty */}
              <div className="form-group">
                <label htmlFor="reg-faculty" className="form-label">
                  Faculty <span className="required-star">*</span>
                </label>
                <select
                  ref={facultySelectRef}
                  id="reg-faculty"
                  className={`form-select ${errors.faculty ? 'has-error' : ''}`}
                  value={formData.faculty}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, faculty: e.target.value }))
                  }
                  aria-invalid={Boolean(errors.faculty)}
                  aria-describedby={errors.faculty ? 'error-faculty' : undefined}
                  required
                >
                  <option value="">Select your faculty...</option>
                  {FACULTY_OPTIONS.map((fac) => (
                    <option key={fac} value={fac}>
                      {fac}
                    </option>
                  ))}
                </select>
                {errors.faculty && (
                  <p id="error-faculty" className="field-error-message" role="alert">
                    <AlertCircle size={14} aria-hidden="true" />
                    <span>{errors.faculty}</span>
                  </p>
                )}
              </div>

              {/* Checkbox Acknowledgment */}
              <div className="form-group checkbox-group">
                <div className="checkbox-control-wrapper">
                  <input
                    ref={ackCheckboxRef}
                    id="reg-demo-ack"
                    type="checkbox"
                    className="form-checkbox"
                    checked={formData.acknowledgedDemo}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        acknowledgedDemo: e.target.checked,
                      }))
                    }
                    aria-invalid={Boolean(errors.acknowledgedDemo)}
                    aria-describedby={
                      errors.acknowledgedDemo ? 'error-demo-ack' : undefined
                    }
                  />
                  <label htmlFor="reg-demo-ack" className="checkbox-label">
                    I understand this is a recruitment assignment demonstration and no real booking, fee payment or seat reservation takes place.
                  </label>
                </div>
                {errors.acknowledgedDemo && (
                  <p id="error-demo-ack" className="field-error-message" role="alert">
                    <AlertCircle size={14} aria-hidden="true" />
                    <span>{errors.acknowledgedDemo}</span>
                  </p>
                )}
              </div>

              {/* Form Action buttons */}
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Submit demo registration
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

