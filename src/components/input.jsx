import { useController } from 'react-hook-form';

export default function Input({ type, label, name, control, placeholder }) {
  const { field, fieldState } = useController({ name, control });

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-full"
      />
      {fieldState.error && (
        <p className="mt-1 text-sm font-medium italic text-red-500">
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
}
