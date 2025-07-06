import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useContent } from './ContentManager';
import ExampleCard from './ExampleCard';

const Examples: React.FC = () => {
  const { content } = useContent();
  const [activeTab, setActiveTab] = useState('images');
  const [dividerPositions, setDividerPositions] = useState<{ [key: string]: number }>({});
  
  // יצירת EXAMPLES_DATA דינמי שמשתמש בתמונות מה-ContentManager
  const EXAMPLES_DATA = useMemo(() => ({
    // טאב תמונות - עודכן לתמונות Tanti Model
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
    // טאב וידאו - עודכן עם תמונות Tanti Model
    videos: [
      {
        before: content.images.image1 || "/assets/tanti model before.jpg",
        after: content.images.image2 || "/assets/tanti model after.jpg",
        title: "עריכת וידאו",
        type: "video",
        videoUrl: "/videos/first-model.mp4#t=3"
      },
      {
        before: content.images.before3 || "/assets/tanti model before.jpg",
        after: content.images.after3 || "/assets/tanti model after.jpg",
        title: "הנפשת תמונה לוידאו - הדמיית Tanti Model",
        type: "video",
        videoUrl: "/videos/doogmanit-video.mp4#t=3"
      },
    ],
    // טאב יצירת מוקאפים - משתמש בתמונות דינמיות מ-ContentManager
    mockups: [
      {
        before: content.images.before1 || "/assets/player.jpg",
        after: content.images.after1 || "/assets/generated_image.png",
        title: "יצירת מוקאפים"
      },
      // הדוגמה של גארי - עם המוקאפ המקורי עם המשקולות
      {
        before: "/assets/logo-transparent-garry.svg",
        after: "/assets/logo-with-mockup-garry.jpg",
        title: "עיצוב לוגו והטמעתו כמוקאפ על משקולת"
      },
      // הדוגמה של Be There - עם הקובץ החדש שהעלית
      {
        before: content.images.before3 || "/assets/be there - before.png",
        after: content.images.after3 || "/assets/be there after.png",
        title: "מערכת השמת כ\"א - מסקיצה למוקאפ"
      }
    ],
    // טאב לוגואים - עובד עם הקרוסלה
    logos: []
  }), [content.images]); // תלוי בתמונות מה-content
  
  // Initialize divider positions - רק פעם אחת כשה-EXAMPLES_DATA משתנה
  useEffect(() => {
    const initialPositions: { [key: string]: number } = {};
    
    Object.keys(EXAMPLES_DATA).forEach(category => {
      if (category !== 'logos') {
        EXAMPLES_DATA[category as keyof typeof EXAMPLES_DATA].forEach((example, index) => {
          const key = `${category}-${index}`;
          initialPositions[key] = 50; // Start at middle (50%)
        });
      }
    });
    
    setDividerPositions(initialPositions);
  }, [EXAMPLES_DATA]); // תלוי ב-EXAMPLES_DATA

  // Handle divider position change - useCallback למניעת re-creation
  const handleDividerChange = useCallback((category: string, index: number, position: number) => {
    const key = `${category}-${index}`;
    setDividerPositions(prev => ({
      ...prev,
      [key]: position
    }));
  }, []);

  // Memoize current examples to prevent unnecessary re-renders
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
      
      {/* 3D Isometric Shapes */}
      <div className="absolute top-1/4 right-10 w-24 h-24 bg-coral-300 transform rotate-45 skew-x-12 skew-y-12 opacity-30"></div>
      <div className="absolute top-1/4 right-16 w-24 h-24 bg-royal-300 transform rotate-45 skew-x-12 skew-y-12 opacity-20"></div>
      <div className="absolute top-1/4 right-22 w-24 h-24 bg-sky-200 transform rotate-45 skew-x-12 skew-y-12 opacity-10"></div>
      
      {/* 3D Spheres with gradients */}
      <div className="absolute bottom-1/4 left-10 w-40 h-40 rounded-full opacity-20" 
           style={{background: 'radial-gradient(circle, rgba(234,158,140,0.4) 0%, rgba(234,158,140,0) 70%)'}}></div>
      <div className="absolute bottom-1/4 left-20 w-60 h-60 rounded-full opacity-20"
           style={{background: 'radial-gradient(circle, rgba(79,84,255,0.3) 0%, rgba(79,84,255,0) 70%)'}}></div>
           
      {/* 3D Floating cubes */}
      <div className="absolute top-1/3 right-10 w-16 h-16 bg-coral-200 transform rotate-45 skew-x-12 skew-y-12 opacity-30 animate-float" style={{animationDelay: '0.7s'}}></div>
      <div className="absolute bottom-1/3 left-10 w-12 h-12 bg-coral-200 transform rotate-45 skew-x-12 skew-y-12 opacity-30 animate-float" style={{animationDelay: '1.4s'}}></div>
      
      {/* 3D Cylinders */}
      <div className="absolute top-1/4 right-10 w-20 h-8 bg-sky-200 rounded-full opacity-30"></div>
      <div className="absolute top-1/4 right-10 w-20 h-24 bg-sky-200 opacity-20 transform translate-y-4"></div>
      <div className="absolute top-1/4 right-10 w-20 h-8 bg-sky-200 rounded-full opacity-30 transform translate-y-28"></div>
      
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
            {/* 3D Tab effect */}
            <div className="absolute inset-0 bg-royal-200 opacity-10 rounded-lg transform -rotate-1"></div>
            <div className="absolute inset-0 bg-coral-200 opacity-10 rounded-lg transform rotate-1"></div>
            
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
              {/* 3D Card effects */}
              <div className="absolute -top-4 -right-4 w-full h-full bg-royal-200 opacity-10 rounded-xl transform rotate-1"></div>
              <div className="absolute -bottom-4 -left-4 w-full h-full bg-coral-200 opacity-10 rounded-xl transform -rotate-1"></div>
              
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
                      <img
                        src="/assets/logo-itay.png"
                        alt="איתי קורוניו - לוגו"
                        className="max-w-16 max-h-16 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                    <h4 className="font-semibold text-sm text-center">איתי קורוניו</h4>
                    <p className="text-xs text-gray-500 text-center">יועץ UX</p>
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
                    {/* 3D Button effect */}
                    <div className="absolute inset-0 bg-royal-800 opacity-0 hover:opacity-30 rounded-lg transform translate-y-1"></div>
                    <span className="relative">רוצים לוגו דומה? צרו קשר</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {currentExamples.map((example, index) => {
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
                    {/* 3D Card effects */}
                    <div className="absolute -top-4 -right-4 w-full h-full bg-royal-200 opacity-0 hover:opacity-10 transition-opacity rounded-xl transform hover:rotate-1"></div>
                    <div className="absolute -bottom-4 -left-4 w-full h-full bg-coral-200 opacity-0 hover:opacity-10 transition-opacity rounded-xl transform hover:-rotate-1"></div>
                    
                    <div className="p-6 relative">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">{example.title}</h3>
                      
                      <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-gray-100">
                        {/* 3D frame effect */}
                        <div className="absolute -top-2 -right-2 w-full h-full bg-royal-200 opacity-0 group-hover:opacity-10 transition-opacity rounded-lg transform group-hover:rotate-1"></div>
                        <div className="absolute -bottom-2 -left-2 w-full h-full bg-coral-200 opacity-0 group-hover:opacity-10 transition-opacity rounded-lg transform group-hover:-rotate-1"></div>
                        
                        <video 
                          controls
                          preload="metadata"
                          className="w-full h-full object-contain"
                          onLoadedMetadata={(e) => {
                            // הגדרת הפריים השלישי כ-thumbnail
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

                        {/* Video description overlay */}
                        <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
                          <p className="text-sm">
                            {index === 0 ? 
                              '🎬 Tanti Model - וידאו מקורי של הפרויקט' :
                              '🎬 Tanti Model Project - הדמיית פרויקט חדשני'
                            }
                          </p>
                        </div>
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
            {/* 3D Button effect */}
            <div className="absolute inset-0 bg-coral-600 opacity-0 hover:opacity-30 rounded-lg transform translate-y-1"></div>
            <span className="relative">דברו איתנו עכשיו</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Examples;