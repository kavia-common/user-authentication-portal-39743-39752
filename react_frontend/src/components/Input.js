/* PUBLIC_INTERFACE */
/**
 * Accessible input component with label, error, and helper text.
 */
import React from 'react';

export default function Input({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  autoComplete,
  error,
  helperText,
  ...rest
}) {
  const describedBy = [];
  if (helperText) describedBy.push(`${id}-help`);
  if (error) describedBy.push(`${id}-error`);

  return (
    <div className="form-control">
      <label className="label" htmlFor={id}>
        {label} {required && <span className="required" aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        className={`input ${error ? 'input-error' : ''}`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy.join(' ') || undefined}
        {...rest}
      />
      {helperText && (
        <div id={`${id}-help`} className="helper-text" aria-live="polite">
          {helperText}
        </div>
      )}
      {error && (
        <div id={`${id}-error`} className="error-text" role="alert" aria-live="assertive">
          {error}
        </div>
      )}
    </div>
  );
}
