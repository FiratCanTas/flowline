import { forwardRef } from 'react';

const Input = forwardRef((props, ref) => {
  const { id, error, label, ...rest } = props;
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      <input
        className={`focus-visible:outline-focus-ring w-full rounded-md border px-3 py-2 text-sm ${error ? 'border-danger' : 'border-border'}`}
        ref={ref}
        id={id}
        {...rest}
      />
      {error && <p className="text-danger text-xs">{error}</p>}
    </div>
  );
});

export default Input;
