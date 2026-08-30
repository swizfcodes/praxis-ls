import * as React from "react";
import { cn } from "@/lib/cn";
import { IconTile } from "@/components/ui/icon-tile";

type Icon = React.ComponentType<{ size?: number; className?: string }>;

/**
 * One radio choice presented as a card. The native input owns the interaction;
 * the card is only its visible label, so keyboard navigation and the announced
 * position in the group remain the browser's job.
 */
export function SelectCard({
  name,
  value,
  checked,
  icon: Icon,
  title,
  description,
  onChange,
  className,
}: {
  name: string;
  value: string;
  checked: boolean;
  icon: Icon;
  title: React.ReactNode;
  description: React.ReactNode;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
}) {
  return (
    <label className={cn("group relative block cursor-pointer", className)}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        className={cn(
          "flex h-full flex-col rounded-[var(--radius)] border p-4 transition-all duration-200",
          "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[rgb(var(--brand-orange))]",
          checked
            ? "border-[rgb(var(--brand-orange))] bg-[rgb(var(--brand-orange)/0.06)] shadow-[var(--pick-ring)]"
            : "hover:border-[rgb(var(--ink)/0.25)] hover:bg-[rgb(var(--ink)/0.03)]",
        )}
      >
        <IconTile icon={Icon} active={checked} className="mb-3" />
        <span
          className={cn("font-medium leading-snug", checked && "font-semibold")}
        >
          {title}
        </span>
        <span className="mt-1 text-sm text-muted-foreground">
          {description}
        </span>
      </span>
    </label>
  );
}
