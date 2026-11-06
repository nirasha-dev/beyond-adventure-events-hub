import React, { useEffect, useRef } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import './RegistrationDialog.css';

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Reset All',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const confirmBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    confirmBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="dialog-backdrop" onClick={onCancel} role="presentation">
      <div
        className="dialog-panel"
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '440px' }}
      >
        <div className="dialog-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={20} color="var(--color-danger)" aria-hidden="true" />
            <h3 id="confirm-dialog-title" className="dialog-title" style={{ fontSize: '1.2rem' }}>
              {title}
            </h3>
          </div>
          <button
            type="button"
            className="dialog-close-btn"
            onClick={onCancel}
            aria-label="Close confirmation dialog"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="dialog-body" style={{ gap: '16px' }}>
          <p id="confirm-dialog-message" style={{ fontSize: '0.9rem', color: 'var(--color-charcoal)', marginBottom: 0 }}>
            {message}
          </p>

          <div className="form-actions" style={{ justifyContent: 'flex-end', paddingTop: '8px' }}>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onCancel}
            >
              {cancelLabel}
            </button>
            <button
              ref={confirmBtnRef}
              type="button"
              className="btn btn-primary"
              style={{ backgroundColor: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}
              onClick={onConfirm}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

