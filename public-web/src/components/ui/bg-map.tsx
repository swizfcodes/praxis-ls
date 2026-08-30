import { cn } from "@/lib/cn";

/**
 * Decorative inline map for hero bands. It is deliberately not a geographic
 * claim: the simplified route lines are texture, not a map of a shipment.
 */
export function BgMap({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1200 520"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.04]",
        className,
      )}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g strokeWidth="1">
        <path d="M30 110h1140M30 260h1140M30 410h1140" />
        <path d="M180 30v460M420 30v460M660 30v460M900 30v460" />
      </g>
      <g strokeWidth="1.5" strokeDasharray="4 9">
        <path d="M80 360C220 80 380 80 530 250s270 170 580-80" />
        <path d="M90 170c190 80 270 250 470 210s340-170 550-90" />
        <path d="M260 440c110-110 180-150 300-110s200 20 350-190" />
      </g>
      <g fill="currentColor" stroke="none">
        <circle cx="80" cy="360" r="5" />
        <circle cx="530" cy="250" r="5" />
        <circle cx="1110" cy="170" r="5" />
        <circle cx="90" cy="170" r="4" />
        <circle cx="560" cy="380" r="4" />
        <circle cx="1110" cy="290" r="4" />
      </g>
    </svg>
  );
}
