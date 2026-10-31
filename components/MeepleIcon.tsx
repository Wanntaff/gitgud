export default function MeepleIcon({
  className = "w-3.5 h-3.5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2a3.2 3.2 0 1 0 0 6.4A3.2 3.2 0 0 0 12 2zm5 7.2c-.8.5-1.9.8-3 .8h-4c-1.1 0-2.2-.3-3-.8-1.5.8-2.6 2.3-2.9 4.1-.3 1.9.4 3.7 1.8 4.7.7.5 1.1 1.3 1.1 2.2V22h4v-3.5a.5.5 0 0 1 1 0V22h4v-1.8c0-.9.4-1.7 1.1-2.2 1.4-1 2.1-2.8 1.8-4.7-.3-1.8-1.4-3.3-2.9-4.1z" />
    </svg>
  );
}
