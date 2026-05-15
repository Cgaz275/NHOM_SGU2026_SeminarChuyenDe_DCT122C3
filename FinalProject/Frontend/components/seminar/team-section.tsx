import { SectionHeading } from "@/components/ui/section-heading";

const teamImages = [
  {
    src: "/team_members/khanh.jpeg",
    alt: "Khanh portrait",
    className: "-translate-y-1",
  },
  {
    src: "/team_members/cga.png",
    alt: "CGA portrait",
    className: "translate-y-5",
  },
  {
    src: "/team_members/mun.jpeg",
    alt: "Mun portrait",
    className: "-translate-y-2",
  },
  {
    src: "/team_members/grok.png",
    alt: "Grok portrait",
    className: "translate-y-1",
  },
  {
    src: "/team_members/D.jpeg",
    alt: "D portrait",
    className: "-translate-y-4",
  },
  {
    src: "/team_members/Gemini.png",
    alt: "Gemini portrait",
    className: "translate-y-0",
  },
];

export function TeamSection() {
  return (
    <section
      id="digital-twin"
      className="digital-twin-section section-shell py-12 sm:py-16 lg:py-20"
    >
      <div className="digital-twin-content">
        <SectionHeading
        align="center"
        title="Get to know more about us"
        description="Let’s chat together with AI Digital Twin mode."
        className="mx-auto max-w-3xl"
      />

      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
        {teamImages.map((item) => (
          <article
            key={item.src}
            className={`aspect-[2/3] overflow-hidden rounded-[1.45rem] bg-[#d9d9d9] shadow-[0_16px_40px_rgba(0,0,0,0.25)] ${item.className}`.trim()}
          >
            <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
          </article>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <a href="#contact" className="outline-pill px-5 py-3 text-[0.68rem]">
          Chat with Digital Twin
        </a>
      </div>
      </div>
    </section>
  );
}