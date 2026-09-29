const ErrorMessage = ({ children, className = '', ...props }) => {
  return (
    <p
      role="alert"
      className={`text-danger flex w-full items-center justify-center text-center text-sm ${className}`}
      {...props}
    >
      {children}
    </p>
  );
};

export default ErrorMessage;
