import { useState, useEffect } from 'react';
import './Testimonies.css';

const TESTIMONIES = [
  {
    name: "Brother Emmanuel",
    role: "Church Member",
    title: "Healed From Chronic Illness",
    quote: "For two years I struggled with constant pain. After the prophetic prayer night, the power of God hit me, and I walked out completely free. All glory to Jesus!",
    date: "July 2026"
  },
  {
    name: "Sister Deborah",
    role: "Choir Leader",
    title: "Financial Breakthrough",
    quote: "We were facing immediate eviction from our family house. After submitting a prayer request, I received an unexpected job promotion that covered our debts entirely.",
    date: "June 2026"
  },
  {
    name: "Brother Samuel",
    role: "Youth Ministry",
    title: "Restoration of Family",
    quote: "My family was broken and fractured for over five years. Through consistent intercession and fellowship here, God touched my parents' hearts and restored peace.",
    date: "May 2026"
  }
];

const AUTOPLAY_MS = 8000;

export default function Testimonies() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + TESTIMONIES.length) % TESTIMONIES.length);
  const next = () => setIndex((i) => (i + 1) % TESTIMONIES.length);

  useEffect(() => {
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, []);

  const current = TESTIMONIES[index];

  return (
    <section className="testimonies section" id="testimonies">
      <div className="container testimonies-inner">
        
        <div className="testimonies-header">
          <p className="eyebrow bounce-item">Testimonies</p>
          <h2 className="section-heading bounce-item delay-1">Every Chain Is Broken</h2>
        </div>

        {/* key={index} forces full remount to cleanly trigger entry animations */}
        <div className="testimony-display" key={index}>
          <div className="testimony-quote-icon">“</div>
          
          <h3 className="testimony-title bounce-item">{current.title}</h3>
          <p className="testimony-quote bounce-item delay-1">"{current.quote}"</p>
          
          <div className="testimony-meta bounce-item delay-2">
            <strong className="testimony-name">{current.name}</strong>
            <span className="testimony-role">{current.role} · {current.date}</span>
          </div>
        </div>

        {/* Carousel Navigation Controllers */}
        <div className="testimonies-controls">
          <button className="testimony-arrow" aria-label="Previous testimony" onClick={prev}>‹</button>
          
          <div className="testimony-dots">
            {TESTIMONIES.map((_, i) => (
              <button
                key={i}
                className={`testimony-dot ${i === index ? 'active' : ''}`}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>

          <button className="testimony-arrow" aria-label="Next testimony" onClick={next}>›</button>
        </div>

      </div>
    </section>
  );
}
