import React, { useState } from 'react';
import { X } from 'lucide-react';

const Process: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const steps = [
    {
      number: 1,
      backgroundImage: "https://images.pexels.com/photos/1181376/pexels-photo-1181376.jpeg?auto=compress&cs=tinysrgb&w=800",
      text: "פשוט, אתם לוחצים על כפתור הווטסאפ ושולחים אלינו את הגדרת הפרויקט, לוח הזמנים, המגבלות, וכל הקבצים הנדרשים. הפותר הוא שירות חדשני המיועד להציע פתרונות מהירים וייעודיים בתחום העיצוב בעזרת טכנולוגיית בינה מלאכותית. בעידן שבו הזמן הוא משמעותי.",
      shape: "circle",
      title: "הגדרת הצורך",
      detailedContent: {
        description: "בשלב הראשון, אנחנו מבינים בדיוק מה הצורך שלך. האם זו מצגת עסקית? עיצוב לרשתות חברתיות? עריכת וידאו? כל פרויקט מתחיל בהבנה מעמיקה של המטרות, קהל היעד, והאפקט הרצוי.",
        bulletPoints: [
          "הגדרת סוג התוצר הסופי הנדרש",
          "זיהוי קהל היעד והמסר המרכזי",
          "קביעת לוחות זמנים ותקציב",
          "איסוף חומרי רקע ומקורות השראה"
        ],
        images: [
          "https://images.pexels.com/photos/1181376/pexels-photo-1181376.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
        ],
        videoUrl: "https://player.vimeo.com/video/76979871?background=1"
      }
    },
    {
      number: 2,
      backgroundImage: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
      text: "אנו נראה את החומרים ונחזור אליכם תוך שעות ספורות עם תשובה לגבי האם ואיך נוכל לעמוד במשימה",
      shape: "square",
      title: "מבררים האם נוכל לעמוד במשימה",
      detailedContent: {
        description: "בשלב השני, אנחנו מתחילים ליצור את התוכן המתאים. באמצעות שילוב של בינה מלאכותית מתקדמת והמומחיות האנושית שלנו, אנחנו מייצרים תוצרים איכותיים בזמן קצר בהרבה מהמקובל בתעשייה.",
        bulletPoints: [
          "שימוש במודלים מתקדמים של AI ליצירת תוכן ראשוני",
          "שילוב של טכניקות עיצוב מתקדמות",
          "התאמה אישית לצרכים הספציפיים של הפרויקט",
          "אופטימיזציה של התוצר לפלטפורמת היעד"
        ],
        images: [
          "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800"
        ],
        videoUrl: "https://player.vimeo.com/video/225408543?background=1"
      }
    },
    {
      number: 3,
      backgroundImage: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
      text: "זו המומחיות שלנו, בעזרת מעל 35 מנועים שונים נייצר לכם פתרון לבעיה שהצבתם",
      shape: "circle",
      title: "יצירת התוכן",
      detailedContent: {
        description: "בשלב השלישי, אנחנו מבצעים התאמות ושינויים בהתאם למשוב שלך. אנחנו מאמינים בתהליך איטרטיבי שמבטיח שהתוצר הסופי יענה בדיוק על הצרכים והציפיות שלך.",
        bulletPoints: [
          "קבלת משוב מפורט מהלקוח",
          "ביצוע שינויים והתאמות בזמן אמת",
          "שיפור מתמיד של התוצר",
          "שמירה על גמישות ופתיחות לרעיונות חדשים"
        ],
        images: [
          "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
        ],
        videoUrl: "https://player.vimeo.com/video/370756449?background=1"
      }
    },
    {
      number: 4,
      backgroundImage: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800",
      text: "עובדים בלילה, בסוף השבוע, לא חשוב מתי, נשתדל להיות זמינים בשעות לא שעות ובימים לא ימים כדי לבצע את המשימה ולסיים אותה במהירות כפי שהבטחנו.",
      shape: "hexagon",
      title: "נגיש את התוצר",
      detailedContent: {
        description: "בשלב הסופי, אנחנו מספקים את התוצר המוגמר בפורמט המתאים לצרכים שלך. אנחנו מבטיחים שהתוצר הסופי יהיה באיכות גבוהה, מוכן לשימוש, ומותאם בדיוק למטרות שהוגדרו בתחילת התהליך.",
        bulletPoints: [
          "אספקת קבצים בפורמטים הנדרשים",
          "בדיקות איכות קפדניות",
          "הסבר מפורט על אופן השימוש בתוצר",
          "תמיכה טכנית ומקצועית לאחר האספקה"
        ],
        images: [
          "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800"
        ],
        videoUrl: "https://player.vimeo.com/video/175243176?background=1"
      }
    }
  ];

  // Helper function to render the shaped container with background image
  const renderShapedContainer = (step: typeof steps[0], isSelected: boolean = false, index: number) => {
    const baseClasses = `${isSelected ? 'transform transition-all duration-500 scale-75 -translate-y-6' : 'transition-all duration-500'} 
                        ${selectedStep !== null && selectedStep !== index ? 'opacity-50 scale-90' : ''}`;
    
    const backgroundImageStyle = {
      backgroundImage: `url('${step.backgroundImage}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    };
    
    switch (step.shape) {
      case "circle":
        return (
          <div className={baseClasses}>
            <div 
              className="w-64 h-64 mx-auto rounded-full overflow-hidden mb-6 flex items-center justify-center border-4 border-gray-200 shadow-lg relative"
              style={backgroundImageStyle}
            >
              {/* Dark overlay for better text visibility */}
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full"></div>
              
              {/* 3D Background effect */}
              <div className="absolute -bottom-2 -right-2 w-full h-full bg-gray-200 opacity-20 transform translate-x-2 translate-y-2 rounded-full"></div>
              
              {/* Step number badge */}
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-royal-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
                {step.number}
              </div>
            </div>
          </div>
        );
      case "square":
        return (
          <div className={baseClasses}>
            <div 
              className="w-64 h-64 mx-auto overflow-hidden mb-6 flex items-center justify-center border-4 border-gray-200 shadow-lg relative"
              style={backgroundImageStyle}
            >
              {/* Dark overlay for better text visibility */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              
              {/* 3D Background effect */}
              <div className="absolute -bottom-2 -right-2 w-full h-full bg-gray-200 opacity-20 transform translate-x-2 translate-y-2"></div>
              
              {/* Step number badge */}
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-royal-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
                {step.number}
              </div>
            </div>
          </div>
        );
      case "hexagon":
        return (
          <div className={baseClasses}>
            <div className="w-64 h-64 mx-auto overflow-hidden mb-6 relative">
              {/* Hexagon border - separate element with higher z-index and stronger border */}
              <div 
                className="absolute inset-0 border-4 border-gray-300 shadow-lg z-20"
                style={{
                  clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
                }}
              ></div>
              
              {/* Hexagon background with image */}
              <div 
                className="w-full h-full flex items-center justify-center relative z-10"
                style={{
                  clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                  ...backgroundImageStyle
                }}
              >
                {/* Dark overlay for better text visibility */}
                <div 
                  className="absolute inset-0 bg-black bg-opacity-40 z-15" 
                  style={{
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
                  }}
                ></div>
              </div>
              
              {/* 3D Background effect */}
              <div 
                className="absolute -bottom-2 -right-2 w-full h-full bg-gray-200 opacity-20 transform translate-x-2 translate-y-2"
                style={{
                  clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
                }}
              ></div>
              
              {/* Step number badge */}
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-royal-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-30">
                {step.number}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className={baseClasses}>
            <div 
              className="w-64 h-64 mx-auto overflow-hidden mb-6 flex items-center justify-center border-4 border-gray-200 shadow-lg relative"
              style={backgroundImageStyle}
            >
              {/* Dark overlay for better text visibility */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              
              {/* 3D Background effect */}
              <div className="absolute -bottom-2 -right-2 w-full h-full bg-gray-200 opacity-20 transform translate-x-2 translate-y-2"></div>
              
              {/* Step number badge */}
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-royal-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
                {step.number}
              </div>
            </div>
          </div>
        );
    }
  };

  const handleStepClick = (index: number) => {
    setSelectedStep(index);
  };

  const closeDetailedView = () => {
    setSelectedStep(null);
  };

  return (
    <section className="py-16 md:py-24 bg-peach-200 relative overflow-hidden">
      {/* 3D Geometric background elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-royal-100 rounded-tl-3xl rounded-br-3xl opacity-30 transform rotate-12"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-coral-100 rounded-full opacity-20"></div>
      <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-sky-100 transform rotate-45 skew-x-12 skew-y-12 opacity-20"></div>
      
      {/* 3D Floating elements */}
      <div className="absolute bottom-40 right-40 w-20 h-20 bg-royal-100 rounded-full opacity-30 animate-float" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute top-40 left-40 w-16 h-16 bg-coral-100 rounded-full opacity-20 animate-float" style={{animationDelay: '1.5s'}}></div>
      
      {/* New 3D Elements */}
      {/* 3D Pyramids */}
      <div className="absolute top-1/4 right-1/4 w-0 h-0 
                    border-l-[30px] border-r-[30px] border-b-[60px] 
                    border-l-transparent border-r-transparent border-b-royal-200 
                    opacity-20 transform rotate-12"></div>
                    
      <div className="absolute bottom-1/4 left-1/4 w-0 h-0 
                    border-l-[20px] border-r-[20px] border-b-[40px] 
                    border-l-transparent border-r-transparent border-b-coral-200 
                    opacity-20 transform -rotate-12"></div>
                    
      {/* 3D Cubes */}
      <div className="absolute top-3/4 right-10 w-16 h-16 bg-royal-200 transform rotate-45 skew-x-12 skew-y-12 opacity-20"></div>
      <div className="absolute top-3/4 right-16 w-16 h-16 bg-sky-200 transform rotate-45 skew-x-12 skew-y-12 opacity-10"></div>
      
      <div className="absolute bottom-3/4 left-10 w-16 h-16 bg-coral-200 transform rotate-45 skew-x-12 skew-y-12 opacity-20"></div>
      <div className="absolute bottom-3/4 left-16 w-16 h-16 bg-sky-200 transform rotate-45 skew-x-12 skew-y-12 opacity-10"></div>
      
      {/* 3D Spheres */}
      <div className="absolute top-1/2 right-1/3 w-40 h-40 rounded-full opacity-20"
           style={{background: 'radial-gradient(circle, rgba(79,84,255,0.2) 0%, rgba(79,84,255,0) 70%)'}}></div>
      
      <div className="absolute bottom-1/2 left-1/3 w-60 h-60 rounded-full opacity-20"
           style={{background: 'radial-gradient(circle, rgba(255,92,74,0.2) 0%, rgba(255,92,74,0) 70%)'}}></div>
      
      {/* 3D Cylinders */}
      <div className="absolute top-3/4 left-1/4 w-24 h-8 bg-royal-200 rounded-full opacity-30"></div>
      <div className="absolute top-3/4 left-1/4 w-24 h-20 bg-royal-200 opacity-20 transform translate-y-4"></div>
      <div className="absolute top-3/4 left-1/4 w-24 h-8 bg-royal-200 rounded-full opacity-30 transform translate-y-24"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            איך עובד התהליך שלנו?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            לחצו על כל שלב כדי לגלות יותר פרטים על התהליך
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {steps.map((step, index) => (
            <div 
              key={step.number} 
              className={`flex flex-col items-center transition-all duration-500 p-4 rounded-xl cursor-pointer
                         ${selectedStep === index ? 'bg-royal-50 shadow-lg scale-105 z-20' : 
                           selectedStep !== null ? 'opacity-70 scale-95' : 'hover:shadow-md hover:bg-gray-50'}`}
              onClick={() => handleStepClick(index)}
            >
              {/* 3D Decoration elements */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-royal-100 opacity-20 transform rotate-45 translate-x-6 -translate-y-6"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-coral-100 opacity-20 transform rotate-45 -translate-x-6 translate-y-6"></div>
              
              {renderShapedContainer(step, selectedStep === index, index)}
              
              <h3 className={`text-2xl font-bold mb-3 transition-all duration-500
                            ${selectedStep === index ? 'text-royal-600' : 
                              selectedStep !== null ? 'text-gray-500' : 'text-royal-600'}`}>
                {step.title}
              </h3>
              
              <p className={`text-center transition-all duration-500
                           ${selectedStep === index ? 'text-gray-700' : 
                             selectedStep !== null ? 'text-gray-400' : 'text-gray-700'}`}>
                {step.text}
              </p>
            </div>
          ))}
        </div>
        
        {/* Detailed content section */}
        {selectedStep !== null && (
          <div className="bg-white rounded-xl shadow-xl p-8 mt-4 transition-all duration-500 animate-fade-in relative">
            {/* 3D Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-royal-100 opacity-20 transform rotate-45 translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-coral-100 opacity-20 transform rotate-45 -translate-x-20 translate-y-20"></div>
            
            {/* 3D Floating elements */}
            <div className="absolute bottom-20 right-20 w-10 h-10 bg-royal-200 opacity-20 transform rotate-45 animate-float" style={{animationDelay: '0.3s'}}></div>
            <div className="absolute top-20 left-20 w-8 h-8 bg-coral-200 opacity-20 transform rotate-12 animate-float" style={{animationDelay: '0.9s'}}></div>
            
            {/* 3D Spheres */}
            <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full opacity-10"
                 style={{background: 'radial-gradient(circle, rgba(79,84,255,0.2) 0%, rgba(79,84,255,0) 70%)'}}></div>
            
            <div className="absolute bottom-1/3 left-1/4 w-32 h-32 rounded-full opacity-10"
                 style={{background: 'radial-gradient(circle, rgba(255,92,74,0.2) 0%, rgba(255,92,74,0) 70%)'}}></div>
            
            {/* Close button with X icon */}
            <button 
              onClick={closeDetailedView}
              className="absolute top-4 right-4 w-10 h-10 bg-coral-500 text-white rounded-full flex items-center justify-center z-10 hover:bg-coral-600 transition-colors shadow-md"
              aria-label="סגור"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="max-w-4xl mx-auto relative z-10">
              <h3 className="text-3xl font-bold text-royal-600 mb-4 text-center">
                {steps[selectedStep].title} - שלב {steps[selectedStep].number}
              </h3>
              
              <p className="text-lg text-gray-700 mb-6">
                {steps[selectedStep].detailedContent.description}
              </p>
              
              <div className="bg-royal-50 p-6 rounded-lg mb-6 relative">
                {/* 3D corner effect */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-royal-200 opacity-20 transform rotate-45 translate-x-10 -translate-y-10"></div>
                </div>
                
                <h4 className="font-bold text-lg text-royal-600 mb-3">נקודות מפתח:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {steps[selectedStep].detailedContent.bulletPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
              
              {/* Video section */}
              <div className="mb-8 relative">
                {/* 3D frame effect */}
                <div className="absolute -top-2 -right-2 w-full h-full bg-royal-200 opacity-20 rounded-lg transform rotate-1"></div>
                <div className="absolute -bottom-2 -left-2 w-full h-full bg-coral-200 opacity-20 rounded-lg transform -rotate-1"></div>
                
                <div className="relative z-10">
                  <h4 className="font-bold text-lg text-royal-600 mb-3">צפו בתהליך:</h4>
                  <div className="relative pt-[56.25%] rounded-lg overflow-hidden bg-gray-100 shadow-md">
                    <iframe
                      src={steps[selectedStep].detailedContent.videoUrl}
                      className="absolute top-0 left-0 w-full h-full"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      title={`Process video for step ${steps[selectedStep].number}`}
                    ></iframe>
                  </div>
                </div>
              </div>
              
              {/* Additional images */}
              <h4 className="font-bold text-lg text-royal-600 mb-3">תמונות נוספות:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {steps[selectedStep].detailedContent.images.map((img, i) => (
                  <div key={i} className="rounded-lg overflow-hidden shadow-md transform transition-transform hover:scale-105 relative">
                    {/* 3D image frame effect */}
                    <div className="absolute inset-0 bg-royal-200 opacity-0 hover:opacity-20 transition-opacity"></div>
                    <div className="absolute inset-0 border-2 border-coral-200 opacity-0 hover:opacity-30 transition-opacity transform scale-95 hover:scale-100 rounded-lg"></div>
                    
                    <img 
                      src={img} 
                      alt={`Additional image ${i+1} for step ${steps[selectedStep].number}`} 
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Process;