import React, { useState, useRef, useEffect } from 'react';
import { PresentationIcon, Image as ImageIcon, FileText, LayoutDashboard, Lightbulb, Search, Workflow, X } from 'lucide-react';
import { useContent } from './ContentManager';

const Services: React.FC = () => {
  const { content } = useContent();
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0, align: 'center', direction: 'below' });
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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
      image: content.images.presentation1 || "https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
          content.images.presentation2 || "https://images.pexels.com/photos/8867434/pexels-photo-8867434.jpeg"
        ],
        videoUrl: "https://player.vimeo.com/video/76979871?background=1"
      }
    },
    {
      icon: <ImageIcon className="h-12 w-12 text-white" />,
      title: 'הפקת תמונות ווידאו',
      description: 'עיבוד תמונות, עריכת וידאו, אנימציות ואפקטים ויזואליים איכותיים ומקצועיים.',
      image: content.images.image1 || "/assets/model-before.jpg",
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
          content.images.video1 || "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
        ],
        videoUrl: "https://player.vimeo.com/video/225408543?background=1"
      }
    },
    {
      icon: <Lightbulb className="h-12 w-12 text-white" />,
      title: 'רעיונות ותוכן',
      description: 'ייעוץ יצירתי, פיתוח קונספטים ורעיונות, וכתיבת תוכן מקצועי.',
      image: content.images.video3 || "https://images.pexels.com/photos/3184434/pexels-photo-3184434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      bgColor: 'bg-royal-600',
      detailedContent: {
        description: 'שירותי הרעיונות והתוכן שלנו מסייעים לך להגיע לרעיונות חדשניים ולהציג אותם בצורה מקצועית ומשכנעת. אנחנו משלבים חשיבה יצירתית עם ניתוח נתונים ומחקר כדי לפתח קונספטים שמדברים לקהל היעד שלך.',
        bulletPoints: [
          "פיתוח קונספטים ורעיונות יצירתיים",
          "כתיבת תוכן שיווקי ועסקי",
          "פיתוח אסטרטגיות תוכן",
          "ניתוח נתונים ומחקר לפיתוח רעיונות מבוססי מידע"
        ],
        images: [
          content.images.video3 || "https://images.pexels.com/photos/3184434/pexels-photo-3184434.jpeg",
          content.images.video4 || "/assets/model-after.jpg"
        ],
        videoUrl: "https://player.vimeo.com/video/225408543?background=1"
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
          "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        ],
        videoUrl: "https://player.vimeo.com/video/370756449?background=1"
      }
    }
  ];

  useEffect(() => {
    if (selectedService !== null && serviceRefs.current[selectedService]) {
      const serviceCard = serviceRefs.current[selectedService];
      const rect = serviceCard.getBoundingClientRect();
      const containerRect = serviceCard.closest('.container')?.getBoundingClientRect();
      
      if (containerRect) {
        // חישוב מיקום יחסי לקונטיינר
        const cardCenterX = rect.left + rect.width / 2 - containerRect.left;
        const cardTop = rect.top - containerRect.top;
        const cardBottom = rect.bottom - containerRect.top;
        
        // קביעת יישור על פי מיקום הקוביה ברשת
        let align = 'center';
        const isLeftSide = (selectedService % 2) === 0;
        
        if (isLeftSide) {
          align = 'right';
        } else {
          align = 'left';
        }
        
        // בדיקה אם זו קוביה בשורה התחתונה (אינדקסים 2 ו-3)
        const isBottomRow = selectedService >= 2;
        const direction = isBottomRow ? 'above' : 'below';
        
        setModalPosition({
          top: direction === 'above' ? cardTop - 20 : cardBottom + 20,
          left: cardCenterX,
          align,
          direction
        });
      }
    }
  }, [selectedService]);

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
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

                {/* אינדיקטור חיבור לקוביה שנבחרה */}
                {selectedService === index && (
                  <div className={`absolute left-1/2 transform -translate-x-1/2 z-40 ${
                    modalPosition.direction === 'above' ? '-top-2' : '-bottom-2'
                  }`}>
                    <div className="w-4 h-4 bg-royal-600 transform rotate-45"></div>
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Detailed view - ממוקם ביחס לקוביה שנבחרה */}
        {selectedService !== null && (
          <div 
            className="absolute bg-white rounded-xl shadow-2xl p-6 transition-all duration-500 animate-fade-in z-20"
            style={{
              top: modalPosition.direction === 'above' 
                ? `${modalPosition.top - 400}px` // הציג מעל הקוביה
                : `${modalPosition.top}px`, // הציג מתחת לקוביה
              left: modalPosition.align === 'center' ? `${modalPosition.left}px` : 
                   modalPosition.align === 'right' ? `${modalPosition.left - 200}px` : 
                   `${modalPosition.left - 600}px`,
              transform: modalPosition.align === 'center' ? 'translateX(-50%)' : 'translateX(0)',
              width: 'min(800px, 90vw)',
              maxHeight: '400px' // גובה קבוע ללא גלילה
            }}
          >
            {/* חץ מחבר לקוביה */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 z-30 ${
              modalPosition.direction === 'above' ? '-bottom-2' : '-top-2'
            }`}>
              <div className={`w-4 h-4 bg-white transform rotate-45 ${
                modalPosition.direction === 'above' 
                  ? 'border-b border-r border-gray-200' 
                  : 'border-t border-l border-gray-200'
              }`}></div>
            </div>

            {/* קו מחבר לקוביה */}
            <div 
              className="absolute bg-royal-600 rounded-full z-10"
              style={{
                width: '3px',
                height: '20px',
                [modalPosition.direction === 'above' ? 'bottom' : 'top']: '-20px',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            ></div>

            {/* 3D Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-royal-100 opacity-20 transform rotate-45 translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-coral-100 opacity-20 transform rotate-45 -translate-x-20 translate-y-20"></div>
            
            {/* Close button with X icon */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                closeDetailedView();
              }}
              className="absolute top-4 right-4 w-10 h-10 bg-coral-500 text-white rounded-full flex items-center justify-center z-10 hover:bg-coral-600 transition-colors shadow-md"
              aria-label="סגור"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="relative z-10 h-full overflow-hidden">
              <h3 className="text-2xl font-bold text-royal-600 mb-3">
                {services[selectedService].title}
              </h3>
              
              <p className="text-gray-700 mb-4 text-sm">
                {services[selectedService].detailedContent.description}
              </p>
              
              <div className="bg-royal-50 p-4 rounded-lg mb-4">
                <h4 className="font-bold text-lg text-royal-600 mb-2">יתרונות השירות:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  {services[selectedService].detailedContent.bulletPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
              
              {/* Additional images - קטנות יותר */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {services[selectedService].detailedContent.images.slice(0, 2).map((img, i) => (
                  <div key={i} className="rounded-lg overflow-hidden shadow-md transform transition-transform hover:scale-105">
                    <img 
                      src={img} 
                      alt={`דוגמה ${i+1} עבור ${services[selectedService].title}`} 
                      className="w-full h-20 object-cover"
                      onError={handleImageError}
                    />
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <a 
                  href="#contact" 
                  className="inline-block bg-royal-600 hover:bg-royal-700 text-white font-medium px-6 py-2 rounded-lg transition-colors text-sm"
                >
                  <span>קבלו הצעת מחיר לשירות זה</span>
                </a>
              </div>
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