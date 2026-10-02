export default function Loading() {
  return (
    <div
      className="mx-auto w-full max-w-6xl px-6 pt-24 pb-12 sm:px-10 sm:pt-32 animate-pulse"
      aria-label="Loading page content"
    >
      <div className="h-4 w-28 rounded bg-foreground/10 mb-6" />
      <div className="h-12 w-64 rounded-lg bg-foreground/10 mb-4" />
      <div className="h-4 w-96 max-w-full rounded bg-foreground/5 mb-8" />
      <div className="h-64 w-full rounded-2xl bg-foreground/5" />
    </div>
  );
}
