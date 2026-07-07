import './Events.css';
import bgSunday from '../../assets/images/mk.jpg';
import bgPrayer from '../../assets/images/ss.jpg';
import bgTestimony from '../../assets/images/bs.jpg';

const EVENTS = [
  {
    title: 'Sunday Worship Service',
    date: 'Every Sunday · 8:00 AM',
    text: 'Join us for a Spirit-filled time of worship, the Word and fellowship.',
    img: bgSunday,
  },
  {
    title: 'Midweek Bible Study',
    date: 'Every Wednesday · 6:00 PM',
    text: 'Deep, practical teaching to build your faith and equip you for life.',
    img: bgPrayer,
  },
  {
    title: 'Prophetic Prayer Night',
    date: 'Last Friday · 10:00 PM',
    text: 'An all-night encounter of prayer, prophecy and breakthrough.',
    img: bgTestimony,
  },
];

export default function Events() {
  return (
    <section className="events section" id="events">
      <div className="container">
        <div className="events-header">
          <div>
            <p className="eyebrow bounce-item">Join Us</p>
            <h2 className="section-heading bounce-item delay-1">Upcoming Events</h2>
          </div>
          <a href="#events" className="btn btn-outline-red bounce-item delay-2">View Full Calendar</a>
        </div>

        <div className="events-grid">
          {EVENTS.map((e, index) => (
            <article className="event-card" key={e.title}>
              <div className="event-image-container">
                {/* Parallax background wrapper */}
                <div 
                  className="event-parallax-bg" 
                 style={{ backgroundImage: `url(${e.img})` }}

                />
              </div>
              <div className="event-body">
                <p className="event-date bounce-item">{e.date}</p>
                <h4 className="bounce-item delay-1">{e.title}</h4>
                <p className="event-text bounce-item delay-2">{e.text}</p>
                <a href="#events" className="event-link bounce-item delay-3">Learn More →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
