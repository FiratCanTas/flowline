const IconButton = ({ disabled, className = '', children, ...props }) => {
  return (
    <button
      disabled={disabled}
      className={`hover:bg-surface-2 focus-visible:outline-focus-ring rounded-md p-2 outline-offset-2 ${className} `}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
