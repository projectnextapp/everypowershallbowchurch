import { useEffect, useState } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import './About.css';

const ABOUT_IMAGES = [
  'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1445633629932-0029acc44e88?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1476234251651-f353703a034d?q=80&w=900&auto=format&fit=crop',
];

const PILLARS = [
  { title: 'Our Mandate', text: 'Raising a generation that walks in dominion and authority through Christ.' },
  { title: 'Our Worship', text: 'Passionate, Spirit-led worship that ushers in the presence of God every service.' },
  { title: 'Our Community', text: 'A loving family that prays, grows and does life together in the Word.' },
];

function AboutCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % ABOUT_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + ABOUT_IMAGES.length) % ABOUT_IMAGES.length);
  const next = () => setIndex((i) => (i + 1) % ABOUT_IMAGES.length);

  return (
    <div className="about-carousel">
      {ABOUT_IMAGES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt="Church congregation"
          className={i === index ? 'active' : ''}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}

      <button className="carousel-arrow carousel-arrow-left" onClick={prev} aria-label="Previous image">‹</button>
      <button className="carousel-arrow carousel-arrow-right" onClick={next} aria-label="Next image">›</button>

      <div className="carousel-dots">
        {ABOUT_IMAGES.map((src, i) => (
          <button
            key={src}
            className={i === index ? 'active' : ''}
            aria-label={`Go to image ${i + 1}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const [imageRef, imageVisible] = useScrollReveal();
  const [copyRef, copyVisible] = useScrollReveal();

  return (
    <section className="about section" id="about">
      <div className="container about-inner">
        <div
          ref={imageRef}
          className={`about-image reveal reveal-left ${imageVisible ? 'is-visible' : ''}`}
        >
          <AboutCarousel />
          <div className="about-image-badge">
            <strong>25+</strong>
            <span>Years Of Ministry</span>
          </div>
        </div>

        <div
          ref={copyRef}
          className={`about-copy reveal reveal-right ${copyVisible ? 'is-visible' : ''}`}
        >
          <p className="eyebrow">Who We Are</p>
          <h2 className="section-heading">
            A House Of Prayer For
            <br />
            All Nations
          </h2>
          <p className="about-text">
            Every Power Shall Bow Church of Christ is a Bible-believing, Spirit-filled
            family committed to raising disciples who dominate in every sphere of
            life. We exist to see lives transformed by the power of the gospel and
            every knee bow to the Lordship of Jesus Christ.
          </p>

          <ul className="about-pillars">
            {PILLARS.map((p, i) => (
              <li
                key={p.title}
                className={`reveal reveal-up ${copyVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: copyVisible ? `${0.15 + i * 0.12}s` : '0s' }}
              >
                <span className="pillar-dot" aria-hidden="true" />
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <a href="#events" className="btn btn-red">Learn More About Us</a>
        </div>
      </div>
    </section>
  );
}
