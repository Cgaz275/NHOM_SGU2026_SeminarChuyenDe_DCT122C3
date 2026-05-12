export function Masterpiece() {
  return (
    <section id="projects" className="section-shell py-10 sm:py-14 lg:py-18">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-heading">
          Every masterpiece begins with a single step
        </h2>

        <div className="mt-8 overflow-hidden rounded-[2rem] bg-[#d9d9d9] shadow-[0_18px_55px_rgba(0,0,0,0.3)]">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/1292960f90e034d3d4e486c68c045bd531792134?width=981"
            alt="Blue abstract lighting installation"
            className="h-[18rem] w-full object-cover sm:h-[24rem] lg:h-[30rem]"
          />
        </div>

        <p className="section-copy mx-auto mt-6 max-w-3xl text-center">
          One step at a time, our team approaches every task with meticulous
          planning. We ensure a seamless workflow to deliver comprehensive
          results with absolute precision.
        </p>
      </div>
    </section>
  );
}
