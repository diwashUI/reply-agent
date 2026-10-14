/** SahayakOS brand mark. PNG with a white background — the rounded badge keeps
    it clean on dark surfaces (footer) as well as light ones. */
export default function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <img
      src="/sahayakos-logo.png"
      alt="SahayakOS logo"
      className={`${className} rounded-2xl bg-white object-cover`}
    />
  );
}
