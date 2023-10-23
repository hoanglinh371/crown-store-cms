import React, { useId } from 'react';

import { useController } from 'react-hook-form';

export default function Textarea({ label, name, control, placeholder }) {
  const id = useId();
  const { field, fieldState } = useController({
    name,
    control,
  });

  return (
    <div className="form-control">
      <label className="label" htmlFor={id}>
        <span className="label-text">{label}</span>
      </label>
      <textarea
        id={id}
        {...field}
        className="textarea textarea-bordered h-24"
        placeholder={placeholder}
      />
      {fieldState.error && (
        <p className="mt-1 text-sm font-medium italic text-red-500">
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
}
