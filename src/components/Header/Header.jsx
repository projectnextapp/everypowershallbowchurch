import { useState, useEffect } from 'react';
import './Header.css';
import logo from '../../assets/images/epsbLogo.png';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Testimonies', href: '#testimonies' },
];

// Temporary placeholder logo — swap for the church's real logo image when ready.
// const LOGO_URL = 'https://placehold.co/80x80/1a1210/e8c765?text=EPSB&font=montserrat';
const LOGO_URL = logo;


export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleLinkClick = (href) => {
    setActiveHref(href);
    setMenuOpen(false);
  };

  const Logo = () => (
    <a className="brand" href="#home" onClick={() => handleLinkClick('#home')}>
      <img className="brand-logo" src={LOGO_URL} alt="Every Power Shall Bow Church of Christ logo" />
      <span className="brand-text">
        <strong>Every Power Shall Bow</strong>
        <small>Church of Christ</small>
      </span>
    </a>
  );

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-inner">
        <Logo />

        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`}>
          <div className="nav-brand">
            <Logo />
          </div>

          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={activeHref === link.href ? 'active' : ''}
                  onClick={() => handleLinkClick(link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#give" className="btn btn-red nav-give" onClick={() => handleLinkClick('#give')}>
            Give Online
          </a>
        </nav>

        {menuOpen && (
          <button className="nav-overlay" aria-label="Close menu" onClick={() => setMenuOpen(false)} />
        )}

        <button
          className={`menu-toggle ${menuOpen ? 'is-active' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
