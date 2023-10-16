import { useController } from 'react-hook-form';

export default function Textarea({
  label, name, control, placeholder,
}) {
  const { field, fieldState } = useController({
    name,
    control,
  });

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <textarea
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
