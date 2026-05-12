import BinaryMatrix from './binary-matrix';

export default function TeamIntro() {
  return (
    <section className="about-split-panel">
      <div className="about-split-panel-left">
        <BinaryMatrix />
      </div>
      <div className="about-split-panel-right">
        <div className="about-intro-text">
          <h2 className="intro-kicker">Our Most</h2>
          <h3 className="intro-highlight">Experienced Developer</h3>
          <h2 className="intro-secondary">Team Member</h2>
          <p className="intro-description">
            Our team is a powerhouse of highly skilled experts, each a master of their craft. While we maintain a lean and compact size, our strength lies in our agility and precision. We pride ourselves on a meticulous approach to every detail, ensuring that being 'small' never means compromising on quality or speed.
          </p>
        </div>
      </div>
    </section>
  );
}
