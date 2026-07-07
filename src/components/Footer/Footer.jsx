import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Decorative top illumination layer to complement the dark theme */}
      <div className="footer-top-accent" />

      <div className="container footer-inner">
        <div className="footer-brand">
          <strong>Every Power Shall Bow</strong>
          <span>Church of Christ</span>
          <p>A house of prayer for all nations, raising a generation that walks in dominion through Christ.</p>
          <div className="footer-socials">
            <a href="#facebook" aria-label="Facebook">🌐</a>
            <a href="#youtube" aria-label="YouTube">📺</a>
            <a href="#instagram" aria-label="Instagram">📸</a>
          </div>
        </div>

        <div className="footer-col">
          <h5>Quick Links</h5>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#testimonies">Testimonies</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Service Times</h5>
          <ul>
            <li>
              <strong>Sunday Worship</strong>
              <span>8:00 AM — Main Sanctuary</span>
            </li>
            <li>
              <strong>Holy Ghost Hour</strong>
              <span>Tuesday · 8:00 AM & 10:AM</span>
            </li>
            <li>
              <strong>Prophetic Night</strong>
              <span>First Friday · 10:00 PM</span>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Contact</h5>
          <ul>
            <li>
              <small>Call Us</small>
              <a href="tel:+2348000000000">+234 8029079035</a>
            </li>
            <li>
              <small>Email</small>
              <a href="mailto:info@epsbchurch.org">info@epsbchurch.org</a>
            </li>
            <li>
              <small>Location</small>
              <span>12 Sabituyi CLose, Off Akunne Street, Oluti, Lagos</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} Every Power Shall Bow Church of Christ. All rights reserved.</p>
          <a href="#top" className="back-to-top" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
