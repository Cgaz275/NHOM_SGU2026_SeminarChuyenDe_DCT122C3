type SkillTagProps = {
  label: string;
  className?: string;
};

export function SkillTag({ label, className = "" }: SkillTagProps) {
  return <span className={`pill-tag ${className}`.trim()}>{label}</span>;
}
