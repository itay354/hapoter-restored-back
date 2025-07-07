import React from 'react';
import { Instagram, Facebook, Twitter, Linkedin, Mail, Phone, Lock } from 'lucide-react';
import { useContent } from './ContentManager';

const Footer: React.FC = () => {
  const { openAdminLogin } = useContent();

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
        textDiv.className = 'logo-text text-2xl font-bold text-white';
        textDiv.textContent = 'הפותר';
        parent.appendChild(textDiv);
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Geometric background elements */}
      <div className="absolute top-0 left-0 w-full h-4 bg-coral-500"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-royal-600 rounded-full opacity-10"></div>
      <div className="absolute top-20 left-20 w-24 h-24 bg-coral-500 rounded-full opacity-10"></div>
      
      {/* 3D Geometric elements */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-coral-500 transform rotate-45 skew-x-12 skew-y-12 opacity-10"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-royal-600 transform rotate-45 skew-x-12 skew-y-12 opacity-10"></div>
      
      {/* 3D Sphere with gradient */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full opacity-10"
           style={{background: 'radial-gradient(circle, rgba(255,92,74,0.3) 0%, rgba(255,92,74,0) 70%)'}}></div>
      
      {/* 3D Pyramid */}
      <div className="absolute bottom-1/2 right-1/4 w-0 h-0 
                      border-l-[30px] border-r-[30px] border-b-[60px] 
                      border-l-transparent border-r-transparent border-b-coral-500 
                      opacity-5 transform rotate-12"></div>
      
      {/* New 3D Elements */}
      {/* 3D Floating cubes */}
      <div className="absolute top-1/3 right-10 w-16 h-16 bg-royal-600 transform rotate-45 skew-x-12 skew-y-12 opacity-10 animate-float" style={{animationDelay: '0.6s'}}></div>
      <div className="absolute bottom-1/3 left-10 w-14 h-14 bg-coral-500 transform rotate-45 skew-x-12 skew-y-12 opacity-10 animate-float" style={{animationDelay: '1.1s'}}></div>
      
      {/* 3D Spheres with gradients */}
      <div className="absolute top-2/3 right-1/3 w-48 h-48 rounded-full opacity-10" 
           style={{background: 'radial-gradient(circle, rgba(79,84,255,0.3) 0%, rgba(79,84,255,0) 70%)'}}></div>
      <div className="absolute bottom-2/3 left-1/3 w-56 h-56 rounded-full opacity-10"
           style={{background: 'radial-gradient(circle, rgba(255,92,74,0.3) 0%, rgba(255,92,74,0) 70%)'}}></div>
      
      {/* 3D Cylinders */}
      <div className="absolute top-1/4 left-10 w-16 h-6 bg-coral-500 rounded-full opacity-10"></div>
      <div className="absolute top-1/4 left-10 w-16 h-20 bg-coral-500 opacity-5 transform translate-y-3"></div>
      <div className="absolute top-1/4 left-10 w-16 h-6 bg-coral-500 rounded-full opacity-10 transform translate-y-[23px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div>
            <div className="flex flex-col items-center mb-4 w-fit">
              <img 
                src="/assets/new hapoter logo transparent.png" 
                alt="הפותר - לוגו חדש" 
                className="h-20 w-auto drop-shadow-md"
                onError={handleLogoError}
              />
              <div className="text-white text-sm font-medium mt-1 text-center">
                הפותר
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              סוגרים לך פינה בעבודות עיצוב ותוכן דחופות באמצעות טכנולוגיית AI מתקדמת.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">שירותים</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-coral-500 transition-colors">עיצוב מצגות</a></li>
              <li><a href="#" className="text-gray-400 hover:text-coral-500 transition-colors">עיצוב תמונות</a></li>
              <li><a href="#" className="text-gray-400 hover:text-coral-500 transition-colors">עריכת וידאו</a></li>
              <li><a href="#" className="text-gray-400 hover:text-coral-500 transition-colors">עיצוב מסמכים</a></li>
              <li><a href="#" className="text-gray-400 hover:text-coral-500 transition-colors">עיצוב גרפי</a></li>
              <li><a href="#" className="text-gray-400 hover:text-coral-500 transition-colors">רעיונות ותוכן</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">קישורים מהירים</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-coral-500 transition-colors">דף הבית</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-coral-500 transition-colors">היתרונות שלנו</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-coral-500 transition-colors">שירותים</a></li>
              <li><a href="#examples" className="text-gray-400 hover:text-coral-500 transition-colors">דוגמאות</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-coral-500 transition-colors">ממליצים</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-coral-500 transition-colors">צור קשר</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">צרו קשר</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center ml-3 relative">
                  {/* 3D Icon effect */}
                  <div className="absolute inset-0 rounded-full bg-gray-900 opacity-30 transform translate-x-1 translate-y-1"></div>
                  <div className="relative">
                    <Mail className="h-4 w-4 text-coral-500" />
                  </div>
                </div>
                <a href="mailto:hello@itayux.com" className="text-gray-400 hover:text-coral-500 transition-colors">
                  hello@itayux.com
                </a>
              </li>
              <li className="flex items-center mt-3">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center ml-3 relative">
                  <div className="absolute inset-0 rounded-full bg-gray-900 opacity-30 transform translate-x-1 translate-y-1"></div>
                  <div className="relative">
                    <Phone className="h-4 w-4 text-coral-500" />
                  </div>
                </div>
                <a href="tel:+972542001020" className="text-gray-400 hover:text-coral-500 transition-colors">
                  +972542001020
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-800 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 md:mb-0">© 2025 הפותר. כל הזכויות שמורות.</p>
          <div className="flex space-x-6 space-x-reverse items-center">
            <a href="#" className="text-gray-500 hover:text-coral-500 transition-colors">תנאי שימוש</a>
            <a href="#" className="text-gray-500 hover:text-coral-500 transition-colors">מדיניות פרטיות</a>
            <button 
              onClick={openAdminLogin}
              className="text-gray-500 hover:text-gray-300 transition-colors flex items-center"
              aria-label="כניסת מנהל"
            >
              <Lock className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;