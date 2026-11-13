import ProductGridSkeleton from "@/components/ProductGridSkeleton";

export default function Loading() {
  return (
    <main className="pt-[60px] md:pt-[70px] bg-surface min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-16">
        <div className="h-8 w-48 rounded bg-brand-black/[0.06] animate-pulse mb-3" />
        <div className="h-4 w-72 rounded bg-brand-black/[0.06] animate-pulse mb-10" />
        <ProductGridSkeleton count={9} />
      </div>
    </main>
  );
}
