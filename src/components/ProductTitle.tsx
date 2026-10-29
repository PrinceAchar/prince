// Renders a Shopify product title, splitting any trailing parenthetical
// (e.g. "Mango Pickle (with Seed & Authentic Punjabi Taste)") so the bracket
// text drops to its own line in a smaller, muted font.
export default function ProductTitle({
  title,
  subClassName = "",
}: {
  title: string;
  subClassName?: string;
}) {
  const match = title.match(/^(.*?)\s*[（(]\s*([^）)]+)\s*[）)]\s*$/);

  if (!match) return <>{title}</>;

  const main = match[1].trim();
  const sub = match[2].trim();

  return (
    <>
      {main}
      <span
        className={`block font-normal leading-snug text-gray text-[0.72em] ${subClassName}`}
      >
        {sub}
      </span>
    </>
  );
}
