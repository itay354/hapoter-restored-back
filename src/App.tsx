import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Features from './components/Features';
import Services from './components/Services';
import Process from './components/Process';
import Examples from './components/Examples';
import Comparison from './components/Comparison';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import SEOHelmet from './components/SEOHelmet';
import { useContent } from './components/ContentManager';

const AppContent: React.FC = () => {
  const { content } = useContent();
  
  console.log('App component rendering with content:', content);
  
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <SEOHelmet 
        title={content.title}
        description={content.description}
      />
      <Navbar />
      <Hero />
      <AboutMe />
      <Features />
      <Services />
      <Process />
      <Examples />
      <Comparison />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

function App() {
  console.log('App component loaded successfully!');
  
  return <AppContent />;
}

export default App;