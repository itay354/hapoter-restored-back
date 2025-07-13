import React, { useState, useEffect } from 'react';

interface Logo {
  id: string;
  src: string;
  alt: string;
  name: string;
}

const logos: Logo[] = [
  { 
    id: '1', 
    src: '/assets/logo-transparent-garry.svg', 
    alt: 'גארי גלינר - לוגו שקוף', 
    name: 'גארי גלינר - מאמן כושר'
  },
  { 
    id: '2', 
    src: '/assets/logo-with-mockup-garry.jpg', 
    alt: 'גארי גלינר - לוגו עם מוקאפ', 
    name: 'גארי גלינר - מוקאפ'
  },
  { 
    id: '3', 
    src: '/assets/-a-modern-and-professional-logo-for--koronyo-studi.svg', 
    alt: 'סטודיו קורוניו - לוגו מודרני', 
    name: 'סטודיו קורוניו'
  },
  { 
    id: '4', 
    src: '/assets/generated_image.png', 
    alt: 'תמונה שנוצרה באמצעות AI', 
    name: 'דוגמה ליצירת AI'
  },
];

const LogoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const logoGroups = [];
  for (let i = 0; i < logos.length; i += 2) {
    logoGroups.push(logos.slice(i, i + 2));
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, logoId: string) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    
    console.warn(`Failed to load logo: ${target.src}`);
    
    target.style.display = 'none';
    
    const parent = target.parentElement;
    if (parent && !parent.querySelector('.fallback-text')) {
      const fallbackDiv = document.createElement('div');
      fallbackDiv.className = 'fallback-text flex items-center justify-center w-full h-full bg-gray-100 text-gray-500 text-sm rounded';
      fallbackDiv.style.minHeight = '120px';
      fallbackDiv.textContent = 'לוגו לא זמין';
      parent.appendChild(fallbackDiv);
    }
  };

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = logos.map((logo) => {
        return new Promise<string>((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            setLoadedImages(prev => new Set([...prev, logo.id]));
            resolve(logo.id);
          };
          img.onerror = () => {
            console.warn(`Failed to load logo: ${logo.src}`);
            reject(logo.id);
          };
          img.src = logo.src;
        });
      });

      try {
        await Promise.allSettled(imagePromises);
      } catch (error) {
        console.warn('Some images failed to load:', error);
      } finally {
        setIsLoading(false);
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (!isLoading && logoGroups.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % logoGroups.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isLoading, logoGroups.length]);

  const navigateToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-xl overflow-hidden p-8 relative">
        <div className="flex justify-center items-center h-40">
          <div className="text-gray-400 flex items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-royal-600 ml-2"></div>
            טוען לוגואים...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden p-8 relative">
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            עיצוב לוגואים
          </h3>
          <p className="text-gray-600">
            דוגמאות מהעבודות שלנו עבור לקוחות שונים - {logos.length} לוגואים במאגר
          </p>
        </div>
        
        <div className="relative overflow-hidden mb-6" style={{ height: '400px' }}>
          <div 
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ 
              transform: `translateX(-${currentIndex * 100}%)`,
              width: `${logoGroups.length * 100}%`
            }}
          >
            {logoGroups.map((group, groupIndex) => (
              <div 
                key={groupIndex} 
                className="flex-shrink-0 grid grid-cols-2 gap-8 h-full items-center justify-center px-4"
                style={{ width: `${100 / logoGroups.length}%` }}
              >
                {group.map((logo) => (
                  <div key={logo.id} className="flex flex-col items-center justify-center">
                    <div className="relative mb-4 group">
                      <div className="relative bg-white p-3 rounded-lg shadow-md border border-gray-100 transform group-hover:scale-105 transition-transform">
                        {loadedImages.has(logo.id) ? (
                          <img
                            src={logo.src}
                            alt={logo.alt}
                            className="max-h-48 max-w-64 object-contain mx-auto"
                            onError={(e) => handleImageError(e, logo.id)}
                            loading="lazy"
                          />
                        ) : (
                          <div className="max-h-48 max-w-64 mx-auto flex items-center justify-center bg-gray-100 rounded min-h-[120px]">
                            <div className="text-gray-400 text-sm">טוען...</div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">{logo.name}</h4>
                      <p className="text-xs text-gray-500">עיצוב לוגו מקצועי</p>
                    </div>
                  </div>
                ))}
                
                {group.length === 1 && (
                  <div className="flex flex-col items-center justify-center opacity-30">
                    <div className="relative mb-4">
                      <div className="bg-gray-100 p-6 rounded-lg border-2 border-dashed border-gray-300 w-36 h-24 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">פרויקט הבא</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold text-gray-400 mb-1 text-sm">בקרוב...</h4>
                      <p className="text-xs text-gray-400">לוגו חדש</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mb-4">
          <p className="text-sm text-gray-500">
            שקף {currentIndex + 1} מתוך {logoGroups.length} | סך הכל {logos.length} לוגואים | נטענו: {loadedImages.size}
          </p>
        </div>
        
        <div className="flex justify-center space-x-2 space-x-reverse mb-6 overflow-x-auto scrollbar-hide">
          {logoGroups.map((_, index) => (
            <button
              key={index}
              onClick={() => navigateToSlide(index)}
              className={`w-8 h-8 rounded-full transition-colors relative flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                index === currentIndex
                  ? 'bg-royal-600 text-white'
                  : 'bg-gray-300 hover:bg-gray-400 text-gray-600'
              }`}
            >
              <span className="relative">{index + 1}</span>
            </button>
          ))}
        </div>
        
        <div className="flex justify-center space-x-4 space-x-reverse mb-6">
          <button
            onClick={() => navigateToSlide((currentIndex - 1 + logoGroups.length) % logoGroups.length)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors text-sm"
          >
            ← הקודם
          </button>
          <button
            onClick={() => navigateToSlide((currentIndex + 1) % logoGroups.length)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors text-sm"
          >
            הבא →
          </button>
        </div>
        
        <div className="text-center">
          <a 
            href="#contact" 
            className="inline-block bg-royal-600 hover:bg-royal-700 text-white font-medium px-6 py-3 rounded-lg transition-colors relative"
          >
            <span className="relative">רוצים לוגו דומה? צרו קשר</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;