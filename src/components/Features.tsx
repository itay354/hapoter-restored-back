import React from 'react';
import { Zap, Clock, Award, Sparkles, Settings, PenTool, Image, Video } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Zap className="h-10 w-10 text-white" />,
      title: 'מהירות על-אנושית',
      description: 'באמצעות בינה מלאכותית אנחנו מזרזים את תהליך העיצוב פי 10 מהרגיל, תוך שמירה על איכות.',
      bgColor: 'bg-coral-500'
    },
    {
      icon: <Settings className="h-10 w-10 text-white" />,
      title: 'התאמה אישית',
      description: 'כל פרויקט מותאם בדיוק לצרכים שלכם, עם חופש מלא לבקש שינויים והתאמות.',
      bgColor: 'bg-coral-500'
    },
    {
      icon: <PenTool className="h-10 w-10 text-white" />,
      title: 'טכנולוגיה מתקדמת',
      description: 'שימוש במודלים מתקדמים של בינה מלאכותית שמאפשרים יצירת עיצובים ייחודיים.',
      bgColor: 'bg-royal-600'
    },
    {
      icon: <Award className="h-10 w-10 text-white" />,
      title: 'איכות ללא פשרות',
      description: 'אנחנו מקפידים על סטנדרטים גבוהים - כל עיצוב שיוצא מאיתנו ראוי לתיק העבודות שלנו.',
      bgColor: 'bg-royal-600'
    },
    {
      icon: <Image className="h-10 w-10 text-white" />,
      title: 'עיצוב ויזואלי',
      description: 'תמונות ומצגות מרהיבות שמתאימות בדיוק למסר שאתם רוצים להעביר, בכל פורמט שתבחרו.',
      bgColor: 'bg-coral-500'
    },
    {
      icon: <Video className="h-10 w-10 text-white" />,
      title: 'וידאו ואנימציה',
      description: 'סרטונים ואנימציות איכותיות שמסבירות את המסר שלכם בצורה חיה וקליטה.',
      bgColor: 'bg-royal-600'
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-peach-50 relative overflow-hidden">
      {/* Geometric background elements */}
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-coral-500 rounded-full opacity-20"></div>
      <div className="absolute top-20 right-20 w-24 h-24 bg-royal-600 rounded-full opacity-20"></div>
      
      {/* 3D Cube - Bottom Left */}
      <div className="absolute bottom-20 left-20 w-20 h-20 bg-sky-200 transform rotate-12 skew-y-12 opacity-30 z-0"></div>
      <div className="absolute bottom-16 left-24 w-20 h-20 bg-royal-400 transform rotate-12 skew-x-12 opacity-20 z-0"></div>
      <div className="absolute bottom-12 left-28 w-20 h-20 bg-coral-300 transform rotate-12 skew-y-12 opacity-10 z-0"></div>
      
      {/* 3D Cylinder - Top Right */}
      <div className="absolute top-20 right-40 w-24 h-10 bg-coral-300 rounded-full opacity-30"></div>
      <div className="absolute top-30 right-40 w-24 h-24 bg-coral-300 opacity-20"></div>
      <div className="absolute top-54 right-40 w-24 h-10 bg-coral-300 rounded-full opacity-30"></div>
      
      {/* 3D Prism - Center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-royal-200 opacity-10 rotate-45 skew-x-12"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-20 bg-coral-200 opacity-10 -rotate-12"></div>
      
      {/* New 3D Geometric elements */}
      <div className="absolute top-1/4 right-1/4 w-0 h-0 
                    border-l-[40px] border-r-[40px] border-b-[80px] 
                    border-l-transparent border-r-transparent border-b-royal-200 
                    opacity-20 transform rotate-12"></div>
                    
      <div className="absolute bottom-1/4 left-1/4 w-0 h-0 
                    border-l-[30px] border-r-[30px] border-b-[60px] 
                    border-l-transparent border-r-transparent border-b-coral-200 
                    opacity-20 transform -rotate-12"></div>
                    
      {/* 3D Floating Elements */}
      <div className="absolute top-40 right-10 w-16 h-16 bg-sky-200 opacity-30 transform rotate-45 animate-float" style={{animationDelay: '0.8s'}}></div>
      <div className="absolute bottom-40 left-10 w-12 h-12 bg-coral-200 opacity-30 transform rotate-12 animate-float" style={{animationDelay: '1.3s'}}></div>
      
      {/* 3D Spheres */}
      <div className="absolute top-1/3 right-1/3 w-40 h-40 rounded-full opacity-20"
           style={{background: 'radial-gradient(circle, rgba(79,84,255,0.3) 0%, rgba(79,84,255,0) 70%)'}}></div>
      
      <div className="absolute bottom-1/3 left-1/3 w-60 h-60 rounded-full opacity-20"
           style={{background: 'radial-gradient(circle, rgba(255,92,74,0.3) 0%, rgba(255,92,74,0) 70%)'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-royal-600 ml-2" />
            <span className="text-royal-600 font-medium">היתרונות שלנו</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            איך אנחנו משנים את חוקי המשחק באמצעות בינה מלאכותית?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            הטכנולוגיה המתקדמת שלנו מאפשרת לנו להיות מהירים יותר, יצירתיים יותר ויעילים יותר - בדיוק מה שאתם צריכים כשהזמן דוחק.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 animate-slide-up relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* 3D Corner decoration */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-royal-100 opacity-30 transform rotate-45 translate-x-10 -translate-y-10"></div>
              </div>
              
              <div className="flex">
                <div className={`${feature.bgColor} p-6 rounded-full m-5 relative`}>
                  {/* Add a subtle 3D effect to icons */}
                  <div className="absolute inset-0 rounded-full bg-black opacity-10 transform translate-x-1 translate-y-1"></div>
                  <div className="relative">
                    {feature.icon}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;