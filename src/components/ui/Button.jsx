import { sizes, variants } from './buttonStyles';

const Button = ({ variant = 'primary', className = '', size = 'md', children, ...props }) => {
  return (
    <button
      className={`focus-visible:outline-focus-ring rounded-md outline-offset-2 disabled:pointer-events-none disabled:opacity-50 ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
