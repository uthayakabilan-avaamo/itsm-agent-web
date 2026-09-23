export default function AssistantFab() {
  return (
    <a
      href="/assistant"
      aria-label="Open AI assistant"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg shadow-primary-600/30 transition-colors hover:bg-primary-700"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8a8.1 8.1 0 0 1-2.6-.43L4 21l1.47-3.68A7.96 7.96 0 0 1 4 12Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
