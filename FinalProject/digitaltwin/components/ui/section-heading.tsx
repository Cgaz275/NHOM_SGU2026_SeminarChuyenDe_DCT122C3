type SectionHeadingProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  title,
  description,
  eyebrow,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignmentClass = align === "center" ? "section-heading-center" : "";

  return (
    <div className={`${alignmentClass} ${className}`.trim()}>
      {eyebrow ? <p className="section-kicker mb-3">{eyebrow}</p> : null}
      <h2 className="section-heading">{title}</h2>
      {description ? (
        <p className="section-copy mx-auto mt-4 max-w-3xl">{description}</p>
      ) : null}
    </div>
  );
}
