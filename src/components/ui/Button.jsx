const variants = {
  primary: 'bg-accent text-accent-foreground hover:bg-accent-hover',
};

const Button = ({ variant = 'primary', className = '', size, children, ...props }) => {
  return (
    <button className={`rounded-md px-4 py-2 ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
export default Button;
