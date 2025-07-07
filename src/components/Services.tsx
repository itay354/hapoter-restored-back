import React, { useState, useRef, useEffect } from 'react';
import { PresentationIcon, Image as ImageIcon, FileText, LayoutDashboard, Lightbulb, Search, Workflow, X } from 'lucide-react';
import { useContent } from './ContentManager';

const Services: React.FC = () => {
  const { content } = useContent();
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0, width: 0 });
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // פונקציה להכנת מערך התמונות והסרטונים מהמערכת
  const getAllMediaFiles = () => {
    const mediaFiles = [];
    
    // הוספת תמונות מ-content.images
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
    
    // הוספת וידאוים נוספים
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

  // חישוב מיקום הפופאפ על פי הקוביה שנבחרה
  useEffect(() => {
    if (selectedService !== null && serviceRefs.current[selectedService]) {
      const serviceCard = serviceRefs.current[selectedService];
      const rect = serviceCard.getBoundingClientRect();
      const containerRect = serviceCard.closest('.container')?.getBoundingClientRect();
      
      if (containerRect) {
        // חישוב מיקום יחסי לקונטיינר
        const cardLeft = rect.left - containerRect.left;
        const cardBottom = rect.bottom - containerRect.top;
        const cardWidth = rect.width;
        
        // בדיקה אם זו קוביה תחתונה (אינדקסים 2,3)
        const isBottomRow = selectedService >= 2;
        
        setPopupPosition({
          top: isBottomRow ? cardBottom - 520 : cardBottom + 20, // למעלה או למטה + מרווח מותאם
          left: cardLeft,
          width: cardWidth
        });
      }
    }
  }, [selectedService]);

  // פונקציה לטיפול בתמונות שלא נטענות
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // מניעת לופ אין-סופי
    
    // fallback לתמונה כללית
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
      {/* 3D Geometric shapes */}
      <div className="absolute top-0 left-0 w-0 h-0 border-l-[120px] border-t-[120px] border-l-transparent border-t-coral-100 opacity-50"></div>
      <div className="absolute top-40 right-10 w-32 h-32 bg-royal-100 rounded-tl-3xl rounded-br-3xl opacity-30 transform rotate-12"></div>
      
      {/* 3D Floating Cubes */}
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-coral-200 opacity-40 transform rotate-45 animate-float"></div>
      <div className="absolute bottom-40 right-40 w-12 h-12 bg-royal-200 opacity-30 transform rotate-12 animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-20 left-20 w-20 h-20 bg-sky-200 opacity-20 transform -rotate-12 animate-float" style={{animationDelay: '1.5s'}}></div>
      
      {/* 3D Pyramids */}
      <div className="absolute bottom-10 left-10 w-0 h-0 border-l-[40px] border-r-[40px] border-b-[80px] border-l-transparent border-r-transparent border-b-coral-200 opacity-30 transform"></div>
      <div className="absolute top-1/2 left-1/3 w-0 h-0 border-l-[30px] border-r-[30px] border-b-[60px] border-l-transparent border-r-transparent border-b-royal-200 opacity-20 transform rotate-45"></div>
      
      {/* New 3D Elements */}
      {/* 3D Spheres with gradients */}
      <div className="absolute top-1/3 right-1/3 w-48 h-48 rounded-full opacity-20" 
           style={{background: 'radial-gradient(circle, rgba(234,158,140,0.3) 0%, rgba(234,158,140,0) 70%)'}}></div>
      <div className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full opacity-20"
           style={{background: 'radial-gradient(circle, rgba(79,84,255,0.2) 0%, rgba(79,84,255,0) 70%)'}}></div>
      
      {/* 3D Stacked Cubes */}
      <div className="absolute top-2/3 left-10 w-20 h-20 bg-royal-200 transform rotate-45 skew-x-12 skew-y-12 opacity-20"></div>
      <div className="absolute top-2/3 left-14 w-20 h-20 bg-coral-200 transform rotate-45 skew-x-12 skew-y-12 opacity-15"></div>
      <div className="absolute top-2/3 left-18 w-20 h-20 bg-sky-200 transform rotate-45 skew-x-12 skew-y-12 opacity-10"></div>
      
      {/* 3D Cylinders */}
      <div className="absolute bottom-1/4 right-10 w-20 h-8 bg-coral-200 rounded-full opacity-30"></div>
      <div className="absolute bottom-1/4 right-10 w-20 h-16 bg-coral-200 opacity-20 transform translate-y-4"></div>
      <div className="absolute bottom-1/4 right-10 w-20 h-8 bg-coral-200 rounded-full opacity-30 transform translate-y-20"></div>
      
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

        {/* גריד 2x2 - תמיד 2 עמודות בדסקטופ */}
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
                {/* 3D Card effects */}
                <div className="absolute -top-2 -right-2 w-full h-full bg-royal-200 opacity-0 hover:opacity-10 transition-opacity rounded-xl transform hover:rotate-1"></div>
                <div className="absolute -bottom-2 -left-2 w-full h-full bg-coral-200 opacity-0 hover:opacity-10 transition-opacity rounded-xl transform hover:-rotate-1"></div>
                
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
                    {/* 3D Icon effect with shadow */}
                    <div className="absolute inset-0 rounded-full bg-black opacity-10 transform translate-x-1 translate-y-1"></div>
                    <div className="relative">
                      {service.icon}
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-10 bg-white">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
                
                {/* אינדיקטור חיבור - חץ למטה */}
                {selectedService === index && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 z-40">
                    <div className="w-8 h-8 bg-white transform rotate-45 border-b border-r border-gray-200 shadow-lg"></div>
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Detailed view - ממוקם מתחת לקוביה שנבחרה */}
        {selectedService !== null && (
          <div 
            className="absolute bg-white rounded-xl shadow-2xl p-8 transition-all duration-500 animate-fade-in z-50"
            style={{
              top: `${popupPosition.top}px`,
              left: `${popupPosition.left}px`,
              width: `${Math.max(popupPosition.width * 2.2, 800)}px`,
              maxWidth: '90vw',
              height: '500px',
              marginBottom: '50px'
            }}
          >
            {/* חץ מחבר דינמי */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 z-30 ${
              selectedService >= 2 ? '-bottom-4' : '-top-4'
            }`}>
              <div className={`w-8 h-8 bg-white transform rotate-45 shadow-lg ${
                selectedService >= 2 
                  ? 'border-b border-r border-gray-200' 
                  : 'border-t border-l border-gray-200'
              }`}></div>
            </div>

            {/* 3D Decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-royal-100 opacity-15 transform rotate-45 translate-x-12 -translate-y-12"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-coral-100 opacity-15 transform rotate-45 -translate-x-12 translate-y-12"></div>
            
            {/* Close button with X icon */}
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
              {/* תצוגה מיוחדת עבור "הפקת תמונות ווידאו" ו"אפיון UX" */}
              {(selectedService === 1 || selectedService === 3) ? (
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
                  {/* עמודת תוכן - 3/5 מהמקום */}
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
                        {/* 3D Button effect */}
                        <div className="absolute inset-0 bg-royal-800 opacity-0 hover:opacity-30 rounded-lg transform translate-y-1"></div>
                        <span className="relative">קבלו הצעת מחיר לשירות זה</span>
                      </a>
                    </div>
                  </div>
                  
                  {/* עמודת תמונות וסרטונים - 2/5 מהמקום עם גלילה פנימית */}
                  <div className="lg:col-span-2 flex flex-col h-full">
                    <h4 className="font-bold text-xl text-royal-600 mb-4">כל התמונות והסרטונים במערכת:</h4>
                    
                    {/* אזור הגלילה */}
                    <div className="flex-grow overflow-hidden bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="h-full overflow-y-auto space-y-4 pr-3" style={{scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 #f1f5f9'}}>
                        {getAllMediaFiles().map((media, i) => (
                          <div key={i} className="rounded-lg overflow-hidden shadow-md transform transition-transform hover:scale-102 relative bg-white border border-gray-100">
                            {/* 3D Image effect */}
                            <div className="absolute -top-1 -right-1 w-full h-full bg-royal-200 opacity-0 hover:opacity-20 transition-opacity rounded-lg transform rotate-1"></div>
                            <div className="relative">
                              {media.type === 'video' ? (
                                <div className="relative">
                                  <video 
                                    className="w-full h-48 object-cover"
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
                                        fallbackDiv.className = 'video-fallback w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500 text-sm flex-col';
                                        fallbackDiv.innerHTML = '🎬<br>קובץ וידאו';
                                        parent.appendChild(fallbackDiv);
                                      }
                                    }}
                                  >
                                    <source src={media.url} type="video/mp4" />
                                  </video>
                                  {/* סמל וידאו */}
                                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                                    🎬 וידאו
                                  </div>
                                </div>
                              ) : (
                                <img 
                                  src={media.url} 
                                  alt={media.alt} 
                                  className="w-full h-48 object-contain bg-white"
                                  onError={handleImageError}
                                />
                              )}
                              <div className="p-3">
                                <p className="text-sm font-medium text-gray-700 line-clamp-2" title={media.title}>
                                  {media.title}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {media.type === 'video' ? 'וידאו' : 'תמונה'}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* הודעה אם אין תמונות */}
                        {getAllMediaFiles().length === 0 && (
                          <div className="text-center text-gray-400 py-8">
                            <div className="text-2xl mb-2">📁</div>
                            <p className="text-sm">אין תמונות או סרטונים זמינים</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* מידע על הגלילה */}
                    <div className="mt-3 text-xs text-gray-500 text-center bg-white rounded px-2 py-1">
                      <p>סך הכל: {getAllMediaFiles().length} קבצי מדיה</p>
                      <p className="text-gray-400">גללו למעלה ולמטה לצפייה בכל הקבצים</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* תצוגה רגילה עבור שאר השירותים */
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
                  {/* עמודת תוכן - 3/5 מהמקום */}
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
                        {/* 3D Button effect */}
                        <div className="absolute inset-0 bg-royal-800 opacity-0 hover:opacity-30 rounded-lg transform translate-y-1"></div>
                        <span className="relative">קבלו הצעת מחיר לשירות זה</span>
                      </a>
                    </div>
                  </div>
                  
                  {/* עמודת תמונות רגילה - 2/5 מהמקום */}
                  <div className="lg:col-span-2 flex flex-col">
                    <h4 className="font-bold text-xl text-royal-600 mb-4">דוגמאות מהעבודות שלנו:</h4>
                    <div className="space-y-4 flex-grow">
                      {services[selectedService].detailedContent.images.map((img, i) => (
                        <div key={i} className="rounded-lg overflow-hidden shadow-md transform transition-transform hover:scale-105 relative">
                          {/* 3D Image effect */}
                          <div className="absolute -top-1 -right-1 w-full h-full bg-royal-200 opacity-0 hover:opacity-20 transition-opacity rounded-lg transform rotate-1"></div>
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
                      
                      {/* תמונה נוספת אם יש פחות מ-3 תמונות */}
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
            {/* 3D Button effect */}
            <div className="absolute inset-0 bg-royal-800 opacity-0 hover:opacity-30 rounded-lg transform translate-y-1"></div>
            <span className="relative">קבלו הצעת מחיר</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;