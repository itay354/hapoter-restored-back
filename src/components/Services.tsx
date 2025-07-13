import React, { useState, useRef, useEffect } from 'react';
import { PresentationIcon, Image as ImageIcon, FileText, LayoutDashboard, Lightbulb, Search, Workflow, X } from 'lucide-react';
import { useContent } from './ContentManager';

const Services: React.FC = () => {
  const { content } = useContent();
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0, width: 0 });
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const getAllMediaFiles = () => {
    const mediaFiles: Array<{
      type: string;
      url: string;
      title: string;
      alt: string;
    }> = [];
    
    Object.entries(content.images).forEach(([key, url]) => {
      if (url && url.trim()) {
        mediaFiles.push({
          type: url.includes('.mp4') || url.includes('video') ? 'video' : 'image',
          url: url,
          title: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
          alt: `${key} - תמונה מהמערכת`
        });
      }
    });
    
    const additionalVideos = [
      {
        type: 'video',
        url: '/videos/first-model.mp4',
        title: 'דגם ראשון - סרטון',
        alt: 'סרטון הדמיה ראשון'
      },
      {
        type: 'video',
        url: '/videos/doogmanit-video.mp4',
        title: 'הנפשת דוגמנית',
        alt: 'סרטון הנפשת דוגמנית'
      },
      {
        type: 'video',
        url: '/videos/compressed-hapoter-video copy.mp4',
        title: 'וידאו הפותר',
        alt: 'סרטון הפותר המרכזי'
      }
    ];
    
    mediaFiles.push(...additionalVideos);
    
    return mediaFiles;
  };

  useEffect(() => {
    if (selectedService !== null && serviceRefs.current[selectedService]) {
      const serviceCard = serviceRefs.current[selectedService];
      const rect = serviceCard.getBoundingClientRect();
      const containerRect = serviceCard.closest('.container')?.getBoundingClientRect();
      
      if (containerRect) {
        const cardLeft = rect.left - containerRect.left;
        const cardBottom = rect.bottom - containerRect.top;
        const cardWidth = rect.width;
        
        const isBottomRow = selectedService >= 2;
        
        setPopupPosition({
          top: isBottomRow ? cardBottom - 520 : cardBottom + 20,
          left: cardLeft,
          width: cardWidth
        });
      }
    }
  }, [selectedService]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = "https://images.pexels.com/photos/3379942/pexels-photo-3379942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    target.alt = "תמונת ברירת מחדל לשירות";
  };
  
  const services = [
    {
      icon: <PresentationIcon className="h-12 w-12 text-white" />,
      title: 'עיצוב מצגות',
      description: 'מצגות עסקיות, לימודיות ואישיות בעיצוב מקצועי ובהתאמה אישית.',
      image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      bgColor: 'bg-coral-500',
      detailedContent: {
        description: 'אנו מתמחים ביצירת מצגות עסקיות ואקדמיות בעיצוב מקצועי, מרשים ומותאם אישית. באמצעות שילוב AI עם מומחיות עיצובית, אנו יוצרים מצגות שלא רק נראות מצוין, אלא גם מעבירות את המסר שלך בצורה אפקטיבית.',
        bulletPoints: [
          "עיצוב מקצועי ומותאם למיתוג",
          "מבנה מצגת מקצועי ואפקטיבי",
          "חומרים ויזואליים מרשימים ואיכותיים",
          "אנימציות ומעברים מקצועיים"
        ],
        images: [
          content.images.presentation1 || "https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg",
          "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1"
        ],
        videoUrl: ""
      }
    },
    {
      icon: <ImageIcon className="h-12 w-12 text-white" />,
      title: 'הפקת תמונות ווידאו',
      description: 'עיבוד תמונות, עריכת וידאו, אנימציות ואפקטים ויזואליים איכותיים ומקצועיים.',
      image: "https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      bgColor: 'bg-royal-600',
      detailedContent: {
        description: 'שירותי הפקת תמונות ווידאו שלנו מציעים מגוון רחב של פתרונות, החל מעיבוד תמונות, רטוש והסרת רקע ועד לעריכת וידאו מקצועית והוספת אנימציות. בעזרת טכנולוגיית AI מתקדמת, אנחנו יכולים להפוך כל תוכן ויזואלי למושלם במהירות וביעילות.',
        bulletPoints: [
          "עיבוד תמונות ורטוש מקצועי",
          "הסרת רקע והחלפת רקע בדיוק גבוה",
          "עריכת וידאו ואנימציות",
          "אפקטים מיוחדים וסינכרון אודיו מקצועי"
        ],
        images: [
          content.images.image1 || "/assets/model-before.jpg",
          "https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1"
        ],
        videoUrl: ""
      }
    },
    {
      icon: <Lightbulb className="h-12 w-12 text-white" />,
      title: 'מחקר, רעיונאות ותוכן',
      description: 'מחקר מעמיק, ייעוץ יצירתי, פיתוח קונספטים ורעיונות, וכתיבת תוכן מקצועי.',
      image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      bgColor: 'bg-royal-600',
      detailedContent: {
        description: 'שירותי המחקר, הרעיונות והתוכן שלנו מסייעים לך להגיע לרעיונות חדשניים מבוססי מחקר ולהציג אותם בצורה מקצועית ומשכנעת. אנחנו משלבים מחקר מעמיק עם חשיבה יצירתית ועם ניתוח נתונים כדי לפתח קונספטים שמדברים לקהל היעד שלך.',
        bulletPoints: [
          "מחקר מקיף ואיסוף מידע מקצועי מתחומים רלוונטיים",
          "פיתוח קונספטים ורעיונות יצירתיים",
          "כתיבת תוכן שיווקי ועסקי",
          "פיתוח אסטרטגיות תוכן",
          "ניתוח נתונים ומחקר לפיתוח רעיונות מבוססי מידע"
        ],
        images: [
          "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
          "https://images.pexels.com/photos/3184434/pexels-photo-3184434.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1"
        ],
        videoUrl: ""
      }
    },
    {
      icon: <Workflow className="h-12 w-12 text-white" />,
      title: 'אפיון UX',
      description: 'ארכיטקטורת מידע, תרשימי זרימה ובדיקות שמישות לחווית משתמש מיטבית.',
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      bgColor: 'bg-coral-500',
      detailedContent: {
        description: 'שירותי אפיון ה-UX שלנו מסייעים לך לתכנן את חווית המשתמש בצורה מיטבית. אנחנו מספקים פתרונות כוללים הכוללים ארכיטקטורת מידע, תרשימי זרימה ובדיקות שמישות, המאפשרים לך לבנות מוצרים ושירותים שעונים בדיוק על צרכי המשתמשים שלך.',
        bulletPoints: [
          "ארכיטקטורת מידע ותכנון מבנה אתרים ואפליקציות",
          "שרטוט תרשימי זרימה מפורטים ותהליכי משתמש",
          "ביצוע בדיקות שמישות וניתוח התנהגות משתמשים",
          "המלצות מפורטות לשיפור חווית המשתמש"
        ],
        images: [
          "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
          "https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1"
        ],
        videoUrl: ""
      }
    }
  ];

  const handleServiceClick = (index: number) => {
    setSelectedService(index === selectedService ? null : index);
  };

  const closeDetailedView = () => {
    setSelectedService(null);
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-peach-100 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-royal-600 font-medium mb-2 block">השירותים שלנו</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            פתרונות עיצוב מקצועיים בעזרת AI
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            אנחנו משתמשים בטכנולוגיית AI מתקדמת כדי ליצור עיצובים מהירים יותר, יפים יותר וחדשניים יותר. 
            לימדנו והתאמנו מגוון מנועי LLM להתמודד עם משימות UX ו-UI מורכבות.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-8">
          {services.map((service, index) => (
            <React.Fragment key={index}>
              <div 
                ref={(el) => (serviceRefs.current[index] = el)}
                className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up cursor-pointer relative
                            ${selectedService === index ? 'ring-4 ring-royal-300 ring-opacity-50 transform scale-105 z-30' : 
                              selectedService !== null ? 'opacity-80 scale-95' : 'hover:shadow-md hover:bg-gray-50'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleServiceClick(index)}
              >
                <div className="relative">
                  <div className="aspect-video">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-contain"
                      onError={handleImageError}
                    />
                  </div>
                  <div className={`${service.bgColor} rounded-full p-4 absolute -bottom-6 right-6 relative`}>
                    <div className="relative">
                      {service.icon}
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-10 bg-white">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
                
                {selectedService === index && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 z-40">
                    <div className="w-8 h-8 bg-white transform rotate-45 border-b border-r border-gray-200 shadow-lg"></div>
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>

        {selectedService !== null && (
          <div 
            className="absolute bg-white rounded-xl shadow-2xl p-8 transition-all duration-500 animate-fade-in z-50"
            style={{
              top: selectedService >= 2 ? `${popupPosition.top - 100}px` : `${popupPosition.top + 20}px`,
              left: `${Math.max(popupPosition.left - 100, 20)}px`,
              width: `${Math.min(Math.max(popupPosition.width * 2.2, 800), window.innerWidth - 40)}px`,
              maxWidth: 'calc(100vw - 40px)',
              height: '450px',
              maxHeight: '70vh',
              marginBottom: '50px',
              zIndex: 9999
            }}
          >
            <div className={`absolute left-1/2 transform -translate-x-1/2 z-30 ${
              selectedService >= 2 ? '-bottom-4' : '-top-4'
            }`}>
              <div className={`w-8 h-8 bg-white transform rotate-45 shadow-lg ${
                selectedService >= 2 
                  ? 'border-b border-r border-gray-200' 
                  : 'border-t border-l border-gray-200'
              }`}></div>
            </div>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                closeDetailedView();
              }}
              className="absolute -top-4 -right-4 w-14 h-14 bg-coral-500 text-white rounded-full flex items-center justify-center z-50 hover:bg-coral-600 transition-colors shadow-xl border-4 border-white"
              aria-label="סגור"
            >
              <X className="h-7 w-7" />
            </button>
            
            <div className="relative z-10 h-full">
              {(selectedService === 1 || selectedService === 3) ? (
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
                  <div className="lg:col-span-3 flex flex-col">
                    <h3 className="text-3xl font-bold text-royal-600 mb-4">
                      {services[selectedService].title}
                    </h3>
                    
                    <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                      {services[selectedService].detailedContent.description}
                    </p>
                    
                    <div className="bg-royal-50 p-6 rounded-lg mb-6 flex-grow">
                      <h4 className="font-bold text-xl text-royal-600 mb-4">יתרונות השירות:</h4>
                      <ul className="list-disc list-inside space-y-3 text-gray-700 text-base">
                        {services[selectedService].detailedContent.bulletPoints.map((point, i) => (
                          <li key={i} className="leading-relaxed pl-2">{point}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="text-center mt-auto pt-4">
                      <a 
                        href="#contact" 
                        className="inline-block bg-royal-600 hover:bg-royal-700 text-white font-medium px-8 py-3 rounded-lg transition-colors text-lg relative"
                      >
                        <span className="relative">קבלו הצעת מחיר לשירות זה</span>
                      </a>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2 flex flex-col h-full">
                    <h4 className="font-bold text-xl text-royal-600 mb-4">כל התמונות והסרטונים במערכת:</h4>
                    
                    <div className="flex-grow overflow-hidden bg-gray-50 rounded-lg p-3 border border-gray-200" style={{height: '300px'}}>
                      <div 
                        className="h-full overflow-y-scroll space-y-4 pr-2" 
                        style={{
                          scrollbarWidth: 'thin', 
                          scrollbarColor: '#6366f1 #e2e8f0'
                        }}
                      >
                        {getAllMediaFiles().map((media, i) => (
                          <div key={i} className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative bg-white border border-gray-100">
                            <div className="relative">
                              {media.type === 'video' ? (
                                <div className="relative">
                                  <video 
                                    className="w-full h-40 object-cover"
                                    controls={false}
                                    muted
                                    preload="metadata"
                                    poster={media.url.replace('.mp4', '.jpg')}
                                    onError={(e) => {
                                      const target = e.target as HTMLVideoElement;
                                      target.style.display = 'none';
                                      const parent = target.parentElement;
                                      if (parent && !parent.querySelector('.video-fallback')) {
                                        const fallbackDiv = document.createElement('div');
                                        fallbackDiv.className = 'video-fallback w-full h-40 bg-gray-100 flex items-center justify-center text-gray-500 text-sm flex-col';
                                        fallbackDiv.innerHTML = '🎬<br>קובץ וידאו';
                                        parent.appendChild(fallbackDiv);
                                      }
                                    }}
                                  >
                                    <source src={media.url} type="video/mp4" />
                                  </video>
                                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                                    🎬 וידאו
                                  </div>
                                </div>
                              ) : (
                                <img 
                                  src={media.url} 
                                  alt={media.alt} 
                                  className="w-full h-40 object-contain bg-white"
                                  onError={handleImageError}
                                />
                              )}
                              <div className="p-2">
                                <p className="text-xs font-medium text-gray-700 truncate" title={media.title}>
                                  {media.title}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {media.type === 'video' ? 'וידאו' : 'תמונה'}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {getAllMediaFiles().length === 0 && (
                          <div className="text-center text-gray-400 py-8">
                            <div className="text-2xl mb-2">📁</div>
                            <p className="text-sm">אין תמונות או סרטונים זמינים</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-3 text-xs text-gray-500 text-center bg-white rounded px-2 py-1">
                      <p>סך הכל: {getAllMediaFiles().length} קבצי מדיה</p>
                      <p className="text-gray-400">⬇️ גללו כאן לצפייה ⬇️</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
                  <div className="lg:col-span-3 flex flex-col">
                    <h3 className="text-3xl font-bold text-royal-600 mb-4">
                      {services[selectedService].title}
                    </h3>
                    
                    <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                      {services[selectedService].detailedContent.description}
                    </p>
                    
                    <div className="bg-royal-50 p-4 rounded-lg mb-4 overflow-hidden">
                      <h4 className="font-bold text-xl text-royal-600 mb-4">יתרונות השירות:</h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                        {services[selectedService].detailedContent.bulletPoints.map((point, i) => (
                          <li key={i} className="leading-tight pl-1">{point}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="text-center mt-auto pt-4">
                      <a 
                        href="#contact" 
                        className="inline-block bg-royal-600 hover:bg-royal-700 text-white font-medium px-6 py-2 rounded-lg transition-colors text-base relative"
                      >
                        <span className="relative">קבלו הצעת מחיר לשירות זה</span>
                      </a>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2 flex flex-col">
                    <h4 className="font-bold text-xl text-royal-600 mb-4">דוגמאות מהעבודות שלנו:</h4>
                    <div className="space-y-4 flex-grow">
                      {services[selectedService].detailedContent.images.map((img, i) => (
                        <div key={i} className="rounded-lg overflow-hidden shadow-md transform transition-transform hover:scale-105 relative">
                          <div className="relative">
                            <img 
                              src={img} 
                              alt={`דוגמה ${i+1} עבור ${services[selectedService].title}`} 
                              className="w-full h-40 object-cover"
                              onError={handleImageError}
                            />
                          </div>
                        </div>
                      ))}
                      
                      {services[selectedService].detailedContent.images.length < 3 && (
                        <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 h-40 flex items-center justify-center">
                          <div className="text-center text-gray-400">
                            <div className="text-2xl mb-2">🎨</div>
                            <p className="text-sm">עוד דוגמאות<br />בקרוב...</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <a 
            href="#contact" 
            className="inline-block bg-royal-600 hover:bg-royal-700 text-white font-medium px-8 py-3 rounded-lg transition-colors relative"
          >
            <span className="relative">קבלו הצעת מחיר</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;