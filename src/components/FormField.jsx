import React from 'react';

function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  rows,
  containerClass,
  inputProps = {},
  labelProps = {},
}) {
  return (
    <div className={containerClass}>
      <label htmlFor={id} {...labelProps}>{label}</label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          rows={rows}
          required={required}
          value={value}
          onChange={onChange}
          {...inputProps}
        />
      ) : (
        <input
          type={type}
          id={id}
          required={required}
          value={value}
          onChange={onChange}
          {...inputProps}
        />
      )}
    </div>
  );
}

export default FormField;

