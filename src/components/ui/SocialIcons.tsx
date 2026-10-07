/**
 * Lucide führt keine Marken-/Social-Logos. Statt ungenauer SVG-Pfade aus dem
 * Gedächtnis zu riskieren, nutzen wir dezente, markenfreie Monogramm-Badges,
 * die zum eleganten Farbschema passen.
 */
export function SocialBadge({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-current text-[10px] font-semibold uppercase tracking-wide ${className}`}
      aria-hidden="true"
    >
      {label}
    </span>
  );
}
