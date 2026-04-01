import { SectionHeading } from "@/components/ui/section-heading";

const teamImages = [
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/19cafb30dc51fbddf5f9628f4b9fabb6a88debff?width=431",
    alt: "Team portrait 1",
    className: "-translate-y-1",
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/aae2c19febac693d34f0c1e5f1889bf8afd39b4d?width=486",
    alt: "Team portrait 2",
    className: "translate-y-5",
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/60b62612d4005b4ba1d0827c938cf286cd2d8f7f?width=294",
    alt: "Team portrait 3",
    className: "-translate-y-2",
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/92c0ba2ccb474d575948e98e31d0f3f5db707bc3?width=281",
    alt: "Team portrait 4",
    className: "translate-y-1",
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/1e0d51ccb21f575cda361c1778ce6fed2db4146b?width=314",
    alt: "Team portrait 5",
    className: "-translate-y-4",
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/be422b08b3472e368b45d948ae92dd45f8740074?width=463",
    alt: "Team portrait 6",
    className: "translate-y-0",
  },
];

export function TeamSection() {
  return (
    <section id="digital-twin" className="section-shell py-12 sm:py-16 lg:py-20">
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
    </section>
  );
}
