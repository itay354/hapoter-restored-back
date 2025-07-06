import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // פונקציה לטיפול בלוגו שלא נטען
  const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // מניעת לופ אין-סופי
    
    // נסה את הלוגו החלופי
    if (target.src.includes('new hapoter logo transparent.png')) {
      target.src = "/assets/ChatGPT LOGO.png";
    } else {
      // אם גם זה נכשל, השתמש בטקסט
      target.style.display = 'none';
      const parent = target.parentElement;
      if (parent && !parent.querySelector('.logo-text')) {
        const textDiv = document.createElement('div');
        textDiv.className = 'logo-text text-2xl font-bold text-royal-600';
        textDiv.textContent = 'הפותר';
        parent.appendChild(textDiv);
      }
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      {/* 3D Geometric elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* 3D Small shapes */}
        <div className="absolute top-1/2 left-10 w-6 h-6 bg-coral-200 transform rotate-45 skew-x-12 skew-y-12 opacity-20"></div>
        <div className="absolute top-1/4 right-20 w-8 h-8 bg-royal-200 transform rotate-12 skew-x-12 skew-y-12 opacity-20"></div>
        
        {/* 3D Floating spheres */}
        <div className="absolute top-0 right-1/4 w-16 h-16 rounded-full opacity-20"
             style={{background: 'radial-gradient(circle, rgba(79,84,255,0.2) 0%, rgba(79,84,255,0) 70%)'}}></div>
        <div className="absolute bottom-0 left-1/3 w-20 h-20 rounded-full opacity-20"
             style={{background: 'radial-gradient(circle, rgba(255,92,74,0.2) 0%, rgba(255,92,74,0) 70%)'}}></div>
      </div>
      
      <div className="container mx-auto px-4 flex justify-between items-center relative z-10">
        <div className="flex items-center">
          <a href="#" className="flex flex-col items-center justify-center">
            <img 
              src="/assets/new hapoter logo transparent.png" 
              alt="הפותר - לוגו" 
              className="h-14 w-auto drop-shadow-sm"
              onError={handleLogoError}
            />
            <div 
              className="text-royal-600 font-medium text-center leading-none"
              style={{ 
                marginTop: '-2px',
                fontSize: '11px',
                letterSpacing: '0.3px',
                width: '56px',
                textAlign: 'center'
              }}
            >
              הפותר
            </div>
          </a>
        </div>
        
        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-6 space-x-reverse">
          <button 
            onClick={() => scrollToSection('about')}
            className="text-gray-700 hover:text-coral-500 transition-colors font-medium"
          >
            מיהו הפותר
          </button>
          <button 
            onClick={() => scrollToSection('features')}
            className="text-gray-700 hover:text-coral-500 transition-colors font-medium"
          >
            יתרונות
          </button>
          <button 
            onClick={() => scrollToSection('services')}
            className="text-gray-700 hover:text-coral-500 transition-colors font-medium"
          >
            שירותים
          </button>
          <button 
            onClick={() => scrollToSection('examples')}
            className="text-gray-700 hover:text-coral-500 transition-colors font-medium"
          >
            דוגמאות
          </button>
          <button 
            onClick={() => scrollToSection('testimonials')}
            className="text-gray-700 hover:text-coral-500 transition-colors font-medium"
          >
            ממליצים
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="bg-coral-500 text-white px-6 py-2 rounded-lg hover:bg-coral-600 transition-colors font-medium"
          >
            צור קשר
          </button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg py-4 animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <button 
              onClick={() => {
                scrollToSection('about');
                setIsMenuOpen(false);
              }}
              className="text-gray-700 hover:text-coral-500 py-2 transition-colors text-right"
            >
              מיהו הפותר
            </button>
            <button 
              onClick={() => {
                scrollToSection('features');
                setIsMenuOpen(false);
              }}
              className="text-gray-700 hover:text-coral-500 py-2 transition-colors text-right"
            >
              יתרונות
            </button>
            <button 
              onClick={() => {
                scrollToSection('services');
                setIsMenuOpen(false);
              }}
              className="text-gray-700 hover:text-coral-500 py-2 transition-colors text-right"
            >
              שירותים
            </button>
            <button 
              onClick={() => {
                scrollToSection('examples');
                setIsMenuOpen(false);
              }}
              className="text-gray-700 hover:text-coral-500 py-2 transition-colors text-right"
            >
              דוגמאות
            </button>
            <button 
              onClick={() => {
                scrollToSection('testimonials');
                setIsMenuOpen(false);
              }}
              className="text-gray-700 hover:text-coral-500 py-2 transition-colors text-right"
            >
              ממליצים
            </button>
            <button 
              onClick={() => {
                scrollToSection('contact');
                setIsMenuOpen(false);
              }}
              className="bg-coral-500 text-white px-6 py-2 rounded-lg hover:bg-coral-600 transition-colors text-center"
            >
              צור קשר
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;