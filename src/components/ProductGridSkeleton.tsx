export default function ProductGridSkeleton({
  count = 6,
}: {
  count?: number;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square rounded-xl bg-brand-black/[0.06]" />
          <div className="h-4 w-2/3 rounded bg-brand-black/[0.06] mt-4" />
          <div className="h-3 w-1/3 rounded bg-brand-black/[0.06] mt-2" />
        </div>
      ))}
    </div>
  );
}
