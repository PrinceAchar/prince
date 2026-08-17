"use client";

interface VariantSelectorProps {
  groups: { name: string; values: string[] }[];
  selected: Record<string, string>;
  onSelect: (name: string, value: string) => void;
}

export default function VariantSelector({ groups, selected, onSelect }: VariantSelectorProps) {
  return (
    <div className="space-y-4 mb-5">
      {groups.map((group) => (
        <div key={group.name}>
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-brand-black/40 mb-2">
            {group.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {group.values.map((value) => {
              const active = selected[group.name] === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => onSelect(group.name, value)}
                  className={`px-4 py-2 text-[12px] font-semibold uppercase tracking-wider rounded-full border transition-colors ${
                    active
                      ? "bg-red border-red text-white"
                      : "border-brand-black/15 text-brand-black hover:border-red hover:text-red"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
