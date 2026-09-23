import { Link } from 'react-router';
import { sizes, variants } from './buttonStyles';

const LinkButton = ({
  to,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  return (
    <Link
      className={`focus-visible:outline-focus-ring rounded-md outline-offset-2 ${variants[variant]} ${sizes[size]} ${className}`}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
