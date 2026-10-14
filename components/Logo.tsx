/** ReplyAgent mark: a speech bubble mid-reply. No emoji, crisp at any size. */
export default function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="#0d9488" />
      <path
        d="M9 11h22a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H20l-6.5 5.5V25H9a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3z"
        fill="#ffffff"
      />
      <circle cx="15.5" cy="18" r="1.8" fill="#0d9488" />
      <circle cx="20" cy="18" r="1.8" fill="#0d9488" />
      <circle cx="24.5" cy="18" r="1.8" fill="#0d9488" />
    </svg>
  );
}
