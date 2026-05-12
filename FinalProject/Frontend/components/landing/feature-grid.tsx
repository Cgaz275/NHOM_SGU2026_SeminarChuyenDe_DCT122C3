const features = [
  {
    title: "Reusable structure",
    description:
      "The page is broken into focused components so each section stays easy to update.",
  },
  {
    title: "Shared visual language",
    description:
      "Background effects, cards, and spacing are grouped into consistent patterns.",
  },
  {
    title: "Minimal page entry",
    description:
      "The route file stays small and simply composes the landing page building blocks.",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="grid gap-4 md:grid-cols-3">
      {features.map((feature) => (
        <article
          key={feature.title}
          className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6"
        >
          <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
          <p className="mt-3 text-sm leading-7 text-white/60">
            {feature.description}
          </p>
        </article>
      ))}
    </section>
  );
}
