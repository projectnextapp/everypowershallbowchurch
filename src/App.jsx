import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Events from './components/Events/Events';
import Testimonies from './components/Testimonies/Testimonies';
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <About />
      <Events />
      <Testimonies />
      <Footer />
    </div>
  );
}
