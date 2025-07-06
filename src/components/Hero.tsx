import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Zap, Clock, Award } from 'lucide-react';
import { useContent } from './ContentManager';

const Hero: React.FC = () => {
  const { content } = useContent();
  const [isMuted, setIsMuted] = React.useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  
  // פונקציה לטיפול בוידאו שלא נטען
  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const target = e.target as HTMLVideoElement;
    const parent = target.parentElement;
    
    if (parent) {
      // הסתרת הוידאו ויצירת תמונת fallback
      target.style.display = 'none';
      
      if (!parent.querySelector('.video-fallback')) {
        const fallbackImg = document.createElement('img');
        fallbackImg.className = 'video-fallback w-full h-auto';
        fallbackImg.src = content.images.hero || "/assets/generated_image (1).png";
        fallbackImg.alt = "המנהל שהופך ממבולבל למבסוט";
        fallbackImg.style.filter = 'brightness(1.05) contrast(1.02)';
        parent.appendChild(fallbackImg);
      }
    }
  };
  
  // פונקציה לטיפול בכפתור הקול
  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };
  
  return (
    <section className="relative overflow-hidden pt-8 bg-peach-100">
      {/* Geometric shapes for background */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-coral-500 rounded-full opacity-90 z-0"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-sky-200 rounded-full opacity-80 z-0"></div>
      <div className="absolute bottom-10 right-20 w-48 h-48 bg-royal-600 rounded-full opacity-80 z-0"></div>
      
      {/* 3D Cube - Top Left */}
      <div className="absolute top-40 left-20 w-16 h-16 bg-royal-400 opacity-40 transform rotate-45 skew-x-12 skew-y-12 z-0"></div>
      <div className="absolute top-36 left-24 w-16 h-16 bg-coral-300 opacity-30 transform rotate-45 skew-x-12 skew-y-2 z-0"></div>
      <div className="absolute top-32 left-28 w-16 h-16 bg-sky-200 opacity-20 transform rotate-45 skew-x-2 skew-y-12 z-0"></div>
      
      {/* 3D Pyramid - Bottom Right */}
      <div className="absolute bottom-32 right-10 w-0 h-0 border-l-[30px] border-r-[30px] border-b-[60px] border-l-transparent border-r-transparent border-b-royal-400 opacity-40 z-0"></div>
      <div className="absolute bottom-40 right-30 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[40px] border-l-transparent border-r-transparent border-b-coral-300 opacity-30 z-0"></div>
      
      {/* New 3D Elements */}
      <div className="absolute top-1/4 right-1/4 w-40 h-40 rounded-full opacity-20"
           style={{background: 'radial-gradient(circle, rgba(79,84,255,0.3) 0%, rgba(79,84,255,0) 70%)'}}></div>
      
      <div className="absolute bottom-1/4 left-1/4 w-60 h-60 rounded-full opacity-20"
           style={{background: 'radial-gradient(circle, rgba(255,92,74,0.3) 0%, rgba(255,92,74,0) 70%)'}}></div>
           
      {/* 3D Cylinders */}
      <div className="absolute bottom-1/3 left-10 w-24 h-8 bg-royal-200 rounded-full opacity-30"></div>
      <div className="absolute bottom-1/3 left-10 w-24 h-20 bg-royal-200 opacity-20 transform translate-y-4"></div>
      <div className="absolute bottom-1/3 left-10 w-24 h-8 bg-royal-200 rounded-full opacity-30 transform translate-y-24"></div>
      
      <div className="absolute top-1/3 right-10 w-16 h-6 bg-coral-200 rounded-full opacity-30"></div>
      <div className="absolute top-1/3 right-10 w-16 h-16 bg-coral-200 opacity-20 transform translate-y-3"></div>
      <div className="absolute top-1/3 right-10 w-16 h-6 bg-coral-200 rounded-full opacity-30 transform translate-y-[19px]"></div>
      
      {/* 3D Floating Elements */}
      <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-sky-200 opacity-40 transform rotate-45 animate-float" style={{animationDelay: '0.7s'}}></div>
      <div className="absolute bottom-1/2 left-1/3 w-10 h-10 bg-coral-200 opacity-40 transform rotate-12 animate-float" style={{animationDelay: '1.2s'}}></div>
      
      <div className="container mx-auto px-4 pt-32 pb-16 md:pt-40 md:pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 lg:order-2">
            <div className="relative">
              {/* וידאו הפותר - מנהל לחוץ שהופך למבסוט */}
              <div className="rounded-xl overflow-hidden w-full max-w-2xl mx-auto shadow-xl relative">
                <video 
                  ref={videoRef}
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  className="w-full h-auto object-cover rounded-xl"
                  style={{
                    filter: 'brightness(1.05) contrast(1.02)',
                    backgroundColor: 'white'
                  }}
                  onError={handleVideoError}
                >
                  <source src="/videos/compressed hapoter video.mp4" type="video/mp4" />
                  הדפדפן שלך לא תומך בפורמט הוידאו.
                </video>
                
                {/* כפתור קול/השתקה */}
                <button
                  onClick={toggleMute}
                  className="absolute top-4 left-4 w-12 h-12 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-all duration-300 z-30 group"
                  aria-label={isMuted ? "הפעל קול" : "השתק קול"}
                >
                  {/* 3D Button effect */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 rounded-full transform group-hover:translate-y-0.5"></div>
                  
                  <div className="relative">
                    {isMuted ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </div>
                </button>
                
                {/* Overlay למקרה שהוידאו לא נטען */}
                <div className="absolute inset-0 bg-black bg-opacity-10 pointer-events-none"></div>
                
                {/* Magic Sparkle Effect - אפקט ניצוצות קסם */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="w-40 h-40 bg-royal-200 rounded-full opacity-0 animate-ping-slow"></div>
                </div>
                
                {/* גלים של לחץ בצד שמאל (מנהל לחוץ) */}
                <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
                  <div className="absolute -top-5 -right-5 w-20 h-20 bg-red-400 rounded-full opacity-10 animate-pulse-slow"></div>
                  <div className="absolute top-1/4 -right-5 w-16 h-16 bg-red-400 rounded-full opacity-15 animate-pulse-slow" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute top-1/2 -right-5 w-12 h-12 bg-red-400 rounded-full opacity-20 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
                </div>
                
                {/* אפקט זרימה של קלות בצד ימין (מנהל מבסוט) */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                  <div className="absolute top-1/4 left-0 w-1/2 h-16 bg-royal-200 opacity-10 rounded-full transform -skew-x-30 animate-sweep"></div>
                  <div className="absolute top-1/2 left-0 w-1/2 h-12 bg-royal-200 opacity-15 rounded-full transform -skew-x-30 animate-sweep" style={{animationDelay: '1s'}}></div>
                  <div className="absolute top-3/4 left-0 w-1/2 h-8 bg-royal-200 opacity-20 rounded-full transform -skew-x-30 animate-sweep" style={{animationDelay: '2s'}}></div>
                </div>
                
                {/* Play/Pause Indicator */}
                <div className="absolute -bottom-8 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-xs opacity-70 pointer-events-none">
                  🎬 הפותר בפעולה
                </div>
                
                {/* אינדיקטור מצב קול */}
                <div className="absolute -bottom-8 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-xs opacity-70 pointer-events-none">
                  {isMuted ? "🔇" : "🔊"}
                </div>
              </div>
              
              {/* Royal blue wave decoration */}
              <div className="absolute -left-10 top-1/2 -translate-y-1/2 -z-10">
                <div className="w-32 h-8 bg-royal-600"></div>
                <div className="w-24 h-8 bg-royal-600 -mt-1"></div>
                <div className="w-16 h-8 bg-royal-600 -mt-1"></div>
                <div className="w-8 h-8 bg-royal-600 -mt-1"></div>
              </div>
              
              {/* Small circular element */}
              <div className="absolute -bottom-6 right-10 w-20 h-20 bg-sky-100 rounded-full"></div>
              <div className="absolute -bottom-6 right-10 w-16 h-16 bg-coral-500 rounded-full z-10"></div>
            </div>
          </div>
          
          <div className="lg:col-span-6 lg:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              <span className="text-royal-600">{content.heroHeading}</span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 mb-8">
              {content.heroSubheading}
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              תקועים עם הכנת מצגת למחר? צריכים סרטון פרסומת מהיר? מחקרים? אנליזה? אנחנו מספקים פתרונות עיצוב, מחקר, תוכן ואנליזה מהירים ואיכותיים באמצעות טכנולוגיית AI מתקדמת. עם הפותר, תקבלו תוצאות מעולות במהירות ובמחירים זולים בהרבה משיטות העיצוב המסורתיות
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse mb-10">
              <a 
                href="#contact" 
                className="bg-coral-500 hover:bg-coral-600 text-white font-medium px-8 py-3 rounded-lg transition-colors text-center"
              >
                דברו איתנו
              </a>
              <a 
                href="#examples" 
                className="bg-white hover:bg-gray-100 text-royal-600 font-medium px-8 py-3 rounded-lg border border-royal-600 transition-colors text-center"
              >
                צפו בדוגמאות
              </a>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 sm:space-x-reverse">
              <div className="flex items-center">
                <Zap className="h-5 w-5 text-coral-500 ml-2" />
                <span className="text-gray-700">מהירות</span>
              </div>
              <div className="flex items-center">
                <Award className="h-5 w-5 text-coral-500 ml-2" />
                <span className="text-gray-700">איכות</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-coral-500 ml-2" />
                <span className="text-gray-700">24/7 זמינות</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;