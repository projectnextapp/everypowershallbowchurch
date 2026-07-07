import { useEffect, useState } from 'react';
import HeroWebGL from './HeroWebGL';
import './Hero.css';
import bgSunday from '../../assets/images/epsb1.jpg';
import bgPrayer from '../../assets/images/epsbPrayer.jpg';
import bgTestimony from '../../assets/images/epsbtestimony.jpg';

const SLIDES = [
  {
    eyebrow: "Word For The Month Of July 2026",
    title: ['Every Power', 'Shall Bow'],
    badgeTop: "In Jesus'",
    badgeBottom: 'Name',
    scripture: 'Philippians 2:9-11',
    bgImage: bgSunday,
  },
  {
    eyebrow: 'This Sunday',
    title: ['A House Of', 'Prayer'],
    badgeTop: 'Come',
    badgeBottom: 'Worship',
    scripture: 'Isaiah 56:7',
    bgImage: bgPrayer,
  },
  {
    eyebrow: 'Testimony Of The Week',
    title: ['Every Chain', 'Is Broken'],
    badgeTop: 'Set',
    badgeBottom: 'Free',
    scripture: 'John 8:36',
    bgImage: bgTestimony,
  },
];

const AUTOPLAY_MS = 7000;

export default function Hero() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setIndex((i) => (i + 1) % SLIDES.length);

  useEffect(() => {
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[index];

  return (
    <section className="hero" id="home">
      <div className="hero-bg-images">
        {SLIDES.map((s, i) => (
          <div
            key={s.bgImage}
            className={`hero-bg-image ${i === index ? 'active' : ''}`}
            style={{ backgroundImage: `url(${s.bgImage})` }}
          />
        ))}
        <div className="hero-bg-tint" />
      </div>

      <div className="hero-webgl-wrap">
        <HeroWebGL className="hero-webgl" />
      </div>

      <button className="hero-arrow hero-arrow-left" aria-label="Previous slide" onClick={prev}>‹</button>
      <button className="hero-arrow hero-arrow-right" aria-label="Next slide" onClick={next}>›</button>

      <div className="container hero-inner">
        {/* key={index} triggers a complete re-render, restarting animations */}
        <div className="hero-slide" key={index}>
          <p className="eyebrow hero-eyebrow">{slide.eyebrow}</p>
          
          <h1 className="hero-title">
            {slide.title[0]}
            <br />
            {slide.title[1]}
          </h1>

          <span className="hero-badge">
            <span>{slide.badgeTop}</span>
            <strong>{slide.badgeBottom}</strong>
          </span>

          <p className="hero-scripture">{slide.scripture}</p>

          {/* Moved inside .hero-slide to synchronize animation lifecycle */}
          <div className="hero-actions">
            <a href="#prayer" className="btn btn-red">Prayer Request</a>
            <a href="#visit" className="btn btn-outline">Plan A Visit</a>
          </div>
        </div>

        <div className="hero-dots">
          {SLIDES.map((s, i) => (
            <button
              key={s.eyebrow}
              className={i === index ? 'active' : ''}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>

      <div className="hero-fade" />
    </section>
  );
}
