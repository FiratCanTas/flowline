const EmptyState = ({ children, className = '', ...props }) => {
  return (
    <p
      className={`text-text-muted flex w-full items-center justify-center text-center text-sm ${className}`}
      {...props}
    >
      {children}
    </p>
  );
};

export default EmptyState;
