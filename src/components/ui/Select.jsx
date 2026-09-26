import { forwardRef } from 'react';

const Select = forwardRef((props, ref) => {
  const { id, label, error, className = '', children, ...rest } = props;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <select
        id={id}
        className={`focus-visible:outline-focus-ring w-full rounded-md border px-3 py-2 text-sm ${error ? 'border-danger' : 'border-border'} ${className}`}
        ref={ref}
        {...rest}
      >
        {children}
      </select>
      {error && <p className="text-danger text-xs">{error}</p>}
    </div>
  );
});

export default Select;
