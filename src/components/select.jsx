import { useController } from 'react-hook-form';

export default function Select({ label, options, name, control }) {
  const { field, fieldState } = useController({
    name,
    control,
  });

  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <select {...field} className="select select-bordered">
        <option disabled selected>
          Pick one
        </option>
        {options.map((otp) => (
          <option key={otp.value}>{otp.label}</option>
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
