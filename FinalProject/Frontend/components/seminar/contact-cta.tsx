export function ContactCTA() {
  return (
    <section
      id="contact"
      className="contact-cta-section bg-[var(--seminar-blue)] py-16 sm:py-20 lg:py-24"
    >
      <div aria-hidden="true" className="digital-twin-contact-blend" />
      <div className="section-shell relative z-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="mx-auto max-w-4xl text-center text-[clamp(2.6rem,10vw,5.6rem)] font-light leading-[0.95] tracking-[-0.06em] text-white uppercase">
            We&apos;d love to
            <br />
            hear from you!
          </h2>

          <div className="mt-12 grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            <div className="overflow-hidden rounded-[1.75rem] bg-[#d9d9d9] shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/be422b08b3472e368b45d948ae92dd45f8740074?width=463"
                alt="Blue illuminated hands"
                className="h-[15rem] w-full object-cover sm:h-[18rem] lg:h-[16rem]"
              />
            </div>

            <div className="text-white">
              <h3 className="text-3xl font-medium leading-tight sm:text-4xl">
                Let&apos;s Stay
                <br />
                Connected
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
                We&apos;re always looking for new opportunities to collaborate and
                innovate. Whether you have a specific project in mind or just want
                to talk about the future of tech and design, we&apos;d love to hear
                from you.
              </p>

              <form className="mt-6 max-w-xl" action="#">
                <label className="sr-only" htmlFor="email-address">
                  Email address
                </label>
                <div className="input-pill">
                  <input
                    id="email-address"
                    type="email"
                    placeholder="Type your E-mail here..."
                    className="input-field"
                  />
                  <button type="submit" className="input-button">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}