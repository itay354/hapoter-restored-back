import React, { useState, useCallback, useMemo } from 'react';
import { useContent } from './ContentManager';
import ExampleCard from './ExampleCard';

const Examples: React.FC = () => {
  const { content } = useContent();
  const [activeTab, setActiveTab] = useState('images');
  const [dividerPositions, setDividerPositions] = useState<{ [key: string]: number }>({});
  
  // יצירת EXAMPLES_DATA דינמי שמשתמש בתמונות מה-ContentManager
  const EXAMPLES_DATA = useMemo(() => ({
    images: [
      {
        before: content.images.image1 || "/assets/tanti model before.jpg",
        after: content.images.image2 || "/assets/tanti model after.jpg",
        title: 'אותם בגדים - שינוי דוגמנית לפי דרישה'
      },
      {
        before: "/assets/Slide3.PNG",
        after: "/assets/image copy copy.png", 
        title: "מצגת עסקית - שיפור מקצועי"
      }
    ],
    videos: [
      {
        before: "/assets/logo-transparent-garry.svg",
        after: "/assets/logo-with-mockup-garry.jpg",
        title: "פרסומת גארי גלינר - מלוגו לסרטון",
        type: "video",
        videoUrl: "/assets/services/images-video/videos/garry first video ad.mp4",
        posterImage: "/assets/logo-with-mockup-garry.jpg"
      },
      {
        before: "/assets/tanti model before.jpg",
        after: "/assets/tanti model after.jpg", 
        title: "עיבוד תמונות לוידאו",
        type: "video",
        videoUrl: "/assets/services/images-video/videos/regular model turns to video.mp4",
        posterImage: "/assets/tanti model after.jpg"
      },
      {
        before: "/assets/upscaled_with_blurred_background_3000x3000.jpg",
        after: "/assets/services/images-video/examples/WhatsApp Image 2025-01-11 at 22.50.40_3e0b1e38.jpg",
        title: "הנפשת דמויות",
        type: "video",
        videoUrl: "/assets/services/images-video/videos/black model turned to video.mp4",
        posterImage: "/assets/services/images-video/examples/WhatsApp Image 2025-01-11 at 22.50.40_3e0b1e38.jpg"
      }
    ],
    mockups: [
      {
        before: content.images.before1 || "/assets/player.jpg",
        after: content.images.after1 || "/assets/generated_image.png",
        title: "יצירת מוקאפים"
      },
      {
        before: "/assets/logo-transparent-garry.svg",
        after: "/assets/logo-with-mockup-garry.jpg",
        title: "עיצוב לוגו והטמעתו כמוקאפ על משקולת"
      },
      {
        before: content.images.before3 || "/assets/be there - before.png",
        after: content.images.after3 || "/assets/be there after.png",
        title: "מערכת השמת כ\"א - מסקיצה למוקאפ"
      }
    ],
    logos: []
  }), [content.images]);
  
  // Handle divider position change
  const handleDividerChange = useCallback((category: string, index: number, position: number): void => {
    const key = `${category}-${index}`;
    setDividerPositions(prev => ({
      ...prev,
      [key]: position
    }));
  }, []);

  // Memoize current examples
  const currentExamples = useMemo(() => {
    return EXAMPLES_DATA[activeTab as keyof typeof EXAMPLES_DATA] || [];
  }, [activeTab, EXAMPLES_DATA]);

  return (
    <section id="examples" className="py-16 md:py-24 bg-peach-100 relative overflow-hidden">
      {/* Geometric elements */}
      <div className="absolute top-0 left-0 w-full h-16 bg-royal-600 opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-full h-16 bg-coral-500 opacity-10"></div>
      <div className="absolute top-40 left-10 w-32 h-32 bg-royal-600 rounded-full opacity-10"></div>
      <div className="absolute bottom-40 right-10 w-32 h-32 bg-coral-500 rounded-full opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-coral-600 font-medium mb-2 block">הדוגמאות שלנו</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            רוצים לראות?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            הנה כמה דוגמאות של לפני ואחרי, שיראו לכם את העוצמה של השילוב בין מומחיות עיצובית ובינה מלאכותית.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="flex space-x-2 space-x-reverse bg-gray-100 p-1 rounded-lg relative max-w-full overflow-x-auto scrollbar-hide">
            <button 
              className={`relative z-10 px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'images' 
                  ? 'bg-white text-royal-600 shadow-sm' 
                  : 'text-gray-600 hover:text-royal-600'
              }`}
              onClick={() => setActiveTab('images')}
            >
              תמונות
            </button>
            <button 
              className={`relative z-10 px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'videos' 
                  ? 'bg-white text-royal-600 shadow-sm' 
                  : 'text-gray-600 hover:text-royal-600'
              }`}
              onClick={() => setActiveTab('videos')}
            >
              וידאו
            </button>
            <button 
              className={`relative z-10 px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'mockups' 
                  ? 'bg-white text-royal-600 shadow-sm' 
                  : 'text-gray-600 hover:text-royal-600'
              }`}
              onClick={() => setActiveTab('mockups')}
            >
              <span className="text-sm md:text-base">יצירת מוקאפים</span>
            </button>
            <button 
              className={`relative z-10 px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'logos' 
                  ? 'bg-white text-royal-600 shadow-sm' 
                  : 'text-gray-600 hover:text-royal-600'
              }`}
              onClick={() => setActiveTab('logos')}
            >
              <span className="text-sm md:text-base">לוגואים</span>
            </button>
          </div>
        </div>

        {/* תוכן הטאבים */}
        {activeTab === 'logos' ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl p-8 relative">
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    לוגואים שעיצבנו
                  </h3>
                  <p className="text-gray-600">
                    דוגמאות מעבודות הלוגו שלנו עבור לקוחות שונים
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-20 h-20 mb-3 flex items-center justify-center bg-white rounded-lg shadow-sm">
                      <img
                        src="/assets/logo-transparent-garry.svg"
                        alt="גארי גלינר - לוגו"
                        className="max-w-16 max-h-16 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                    <h4 className="font-semibold text-sm text-center">גארי גלינר</h4>
                    <p className="text-xs text-gray-500 text-center">מאמן כושר</p>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-20 h-20 mb-3 flex items-center justify-center bg-white rounded-lg shadow-sm">
                      <img
                        src="/assets/-a-modern-and-professional-logo-for--koronyo-studi.svg"
                        alt="סטודיו קורוניו - לוגו"
                        className="max-w-16 max-h-16 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                    <h4 className="font-semibold text-sm text-center">סטודיו קורוניו</h4>
                    <p className="text-xs text-gray-500 text-center">עיצוב ופיתוח</p>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-20 h-20 mb-3 flex items-center justify-center bg-white rounded-lg shadow-sm">
                      <div className="w-16 h-16 bg-gradient-to-br from-royal-500 to-coral-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xs">הפותר</span>
                      </div>
                    </div>
                    <h4 className="font-semibold text-sm text-center">הפותר</h4>
                    <p className="text-xs text-gray-500 text-center">שירותי עיצוב</p>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-20 h-20 mb-3 flex items-center justify-center bg-white rounded-lg shadow-sm">
                      <div className="w-16 h-16 bg-gradient-to-br from-royal-500 to-coral-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xs">עוד</span>
                      </div>
                    </div>
                    <h4 className="font-semibold text-sm text-center">פרויקטים נוספים</h4>
                    <p className="text-xs text-gray-500 text-center">בקרוב...</p>
                  </div>
                </div>
                
                <div className="text-center mt-8">
                  <a 
                    href="#contact" 
                    className="inline-block bg-royal-600 hover:bg-royal-700 text-white font-medium px-6 py-3 rounded-lg transition-colors relative"
                  >
                    <span className="relative">רוצים לוגו דומה? צרו קשר</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {currentExamples.map((example: any, index: number) => {
              const exampleKey = `${activeTab}-${index}`;
              const dividerPosition = dividerPositions[exampleKey] || 50;
              
              // וידאו מיוחד עבור דוגמאות וידאו
              if (activeTab === 'videos' && example.type === 'video') {
                return (
                  <div 
                    key={exampleKey}
                    className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-up relative"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="p-6 relative">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">{example.title}</h3>
                      
                      <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-gray-100">
                        <video 
                          controls
                          preload="none"
                          loading="lazy"
                          poster={example.posterImage || example.before}
                          className="w-full h-full object-contain"
                          onLoadedMetadata={(e) => {
                            const video = e.target as HTMLVideoElement;
                            video.currentTime = 3;
                          }}
                          onError={(e) => {
                            const target = e.target as HTMLVideoElement;
                            target.style.display = 'none';
                            console.error('Video failed to load:', example.videoUrl);
                          }}
                        >
                          <source src={example.videoUrl} type="video/mp4" />
                          הדפדפן שלך לא תומך בפורמט הוידאו.
                        </video>
                      </div>
                    </div>
                  </div>
                );
              }
              
              return (
                <ExampleCard 
                  key={exampleKey}
                  example={example}
                  activeTab={activeTab}
                  index={index}
                  dividerPosition={dividerPosition}
                  onDividerPositionChange={(position) => handleDividerChange(activeTab, index, position)}
                />
              );
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">צריכים משהו דומה? אנחנו כאן כדי לעזור!</p>
          <a 
            href="#contact" 
            className="inline-block bg-coral-500 hover:bg-coral-600 text-white font-medium px-8 py-3 rounded-lg transition-colors relative"
          >
            <span className="relative">דברו איתנו עכשיו</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Examples;