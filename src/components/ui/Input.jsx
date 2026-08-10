import { forwardRef } from 'react';

const Input = forwardRef((props, ref) => {
  const { id, error, label, ...rest } = props;
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        className={`focus-visible:outline-focus-ring border ${error ? 'border-danger' : 'border-border'}`}
        ref={ref}
        {...rest}
      />
      {error && <p>{error}</p>}
    </div>
  );
});

export default Input;
