import LinkButton from '../components/ui/LinkButton';

const NotFound = () => {
  return (
    <div className="bg-bg flex h-dvh items-center justify-center">
      <div className="flex flex-col gap-4 text-center">
        <p className="text-text-muted text-6xl font-bold">404</p>
        <p className="text-xl font-semibold">Page not found</p>
        <LinkButton variant="secondary" to="/">
          Return to home page
        </LinkButton>
      </div>
    </div>
  );
};
export default NotFound;
