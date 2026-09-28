const Loading = ({ className = '' }) => {
  return (
    <div
      role="status"
      className={`flex w-full flex-col items-center justify-center gap-2 ${className}`}
    >
      <div className="border-border border-t-accent h-6 w-6 animate-spin rounded-full border-2" />
      <p className="text-text-muted text-sm">Loading...</p>
    </div>
  );
};

export default Loading;
