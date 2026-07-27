const variants = {
  primary: 'bg-accent text-accent-foreground hover:bg-accent-hover',
  secondary: 'bg-surface-1 text-text border border-border hover:bg-surface-2',
  ghost: 'text-text hover:bg-surface-2',
};

const Button = ({ variant = 'primary', className = '', size, children, ...props }) => {
  return (
    <button className={`rounded-md px-4 py-2 ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
export default Button;
