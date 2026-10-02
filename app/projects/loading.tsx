export default function ProjectsLoading() {
  return (
    <div
      className="mx-auto w-full max-w-5xl px-5 pt-24 pb-16 sm:px-10 sm:pt-36 animate-pulse"
      aria-label="Loading projects"
    >
      <div className="flex items-start gap-4 mb-12 sm:mb-20">
        <div className="h-[3.5rem] w-[2px] bg-[#e60012]" />
        <div className="space-y-2">
          <div className="h-12 w-48 rounded-lg bg-foreground/10" />
          <div className="h-4 w-72 rounded bg-foreground/5" />
        </div>
      </div>
      <div className="space-y-12">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-4 py-8 border-t border-foreground/10">
            <div className="h-4 w-16 rounded bg-foreground/10" />
            <div className="h-8 w-3/4 rounded-lg bg-foreground/10" />
            <div className="h-4 w-1/2 rounded bg-foreground/5" />
            <div className="h-64 sm:h-80 w-full rounded-xl bg-foreground/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
