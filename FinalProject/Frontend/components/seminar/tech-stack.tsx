import { SectionHeading } from "@/components/ui/section-heading";
import { SkillTag } from "@/components/ui/skill-tag";

const skillRows = [
  [
    { label: "Motion Graphic", className: "-rotate-12" },
    { label: "Firebase", className: "-rotate-6" },
    { label: "n8n", className: "rotate-8" },
  ],
  [
    { label: "AI Agent", className: "rotate-3" },
    { label: "3D modeling", className: "-rotate-6" },
    { label: "Next JS & Tailwind", className: "rotate-[-8deg]" },
  ],
  [
    { label: "Visual Effect", className: "rotate-6" },
    { label: "Graphic Design", className: "rotate-4" },
    { label: "Digital Twin AI Chat", className: "-rotate-3" },
  ],
];

export function TechStack() {
  return (
    <section id="about" className="section-shell py-12 sm:py-16 lg:py-20">
      <SectionHeading
        title="We leverage a diverse and modern technological foundation"
        titleClassName="!max-w-4xl lg:!max-w-6xl"
        className="pl-4 sm:pl-6 lg:pl-10"
      />

      <div className="mt-7 mx-auto flex h-full w-full max-w-6xl flex-col rounded-[2rem] bg-[var(--seminar-blue)] px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] min-h-[20rem] sm:min-h-[22rem] sm:px-8 sm:py-8 lg:min-h-[24rem]">
        <p className="max-w-3xl text-sm leading-7 text-white/95 sm:text-base">
          Our expertise spans across cutting-edge web development, intelligent AI
          automation, and immersive visual design. By integrating these diverse
          technologies, we build seamless digital experiences that are as
          high-performing as they are visually stunning.
        </p>

        <div className="mt-auto flex flex-col items-start gap-3 pt-2">
          {skillRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex flex-wrap items-center justify-start gap-3 ${
                rowIndex === 1 ? "sm:translate-x-3" : ""
              } ${rowIndex === 2 ? "sm:-translate-x-2" : ""}`.trim()}
            >
              {row.map((skill) => (
                <SkillTag key={skill.label} label={skill.label} className={skill.className} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
