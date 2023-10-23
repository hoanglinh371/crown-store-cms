import React, { useId } from 'react';

import { useController } from 'react-hook-form';

export default function Select({ label, options, name, control }) {
  const id = useId();
  const { field, fieldState } = useController({
    name,
    control,
  });

  return (
    <div className="form-control w-full max-w-xs">
      <label className="label" htmlFor={id}>
        <span className="label-text">{label}</span>
      </label>
      <select {...field} id={id} className="select select-bordered">
        <option disabled selected>
          Pick one
        </option>
        {options.map((otp) => (
          <option value={otp.id} key={otp.id}>
            {otp.label}
          </option>
        ))}
      </select>
      {fieldState.error && (
        <p className="mt-1 text-sm font-medium italic text-red-500">
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
}
