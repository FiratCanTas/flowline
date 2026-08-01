const variants = {
  primary: 'bg-accent text-accent-foreground',
  neutral: 'bg-surface-2 text-text-muted',
  danger: 'bg-danger text-danger-foreground',
};

// No `size` prop: badge is a fixed-size status label

const Badge = ({ variant = 'neutral', className = '', children, ...props }) => {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
export default Badge;
