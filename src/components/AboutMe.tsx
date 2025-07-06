import React from 'react';
import { Sparkles, Award, BookOpen, Briefcase, Users, GraduationCap } from 'lucide-react';
import { useContent } from './ContentManager';

const AboutMe: React.FC = () => {
  const { content } = useContent();
  
  // פונקציה לטיפול בתמונות שלא נטענות
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // מניעת לופ אין-סופי
    
    // תמונת fallback מוגדרת מראש
    target.src = "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    target.alt = "תמונת ברירת מחדל - איתי קורוניו";
  };
  
  return (
    <section id="about" className="py-16 md:py-24 bg-peach-200 relative overflow-hidden">
      {/* 3D Geometric background elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-royal-600 opacity-10 transform rotate-12 skew-x-12 skew-y-12"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-coral-300 opacity-20 transform -rotate-12 skew-x-12 skew-y-12"></div>
      <div className="absolute top-1/3 right-1/4 w-0 h-0 border-l-[30px] border-r-[30px] border-b-[60px] border-l-transparent border-r-transparent border-b-royal-200 opacity-20 transform rotate-45"></div>
      <div className="absolute bottom-1/3 left-1/3 w-20 h-20 rounded-full bg-coral-200 opacity-30 animate-float" style={{animationDelay: '1.2s'}}></div>
      
      {/* New 3D Elements */}
      {/* 3D Spheres with gradients */}
      <div className="absolute top-1/4 right-1/3 w-48 h-48 rounded-full opacity-20" 
           style={{background: 'radial-gradient(circle, rgba(79,84,255,0.3) 0%, rgba(79,84,255,0) 70%)'}}></div>
      <div className="absolute bottom-1/4 left-1/3 w-56 h-56 rounded-full opacity-20"
           style={{background: 'radial-gradient(circle, rgba(255,92,74,0.3) 0%, rgba(255,92,74,0) 70%)'}}></div>
           
      {/* 3D Floating cubes */}
      <div className="absolute top-1/3 right-10 w-16 h-16 bg-royal-200 transform rotate-45 skew-x-12 skew-y-12 opacity-30 animate-float" style={{animationDelay: '0.7s'}}></div>
      <div className="absolute bottom-1/3 left-10 w-12 h-12 bg-coral-200 transform rotate-45 skew-x-12 skew-y-12 opacity-30 animate-float" style={{animationDelay: '1.4s'}}></div>
      
      {/* 3D Cylinders */}
      <div className="absolute top-1/4 right-10 w-20 h-8 bg-sky-200 rounded-full opacity-30"></div>
      <div className="absolute top-1/4 right-10 w-20 h-24 bg-sky-200 opacity-20 transform translate-y-4"></div>
      <div className="absolute top-1/4 right-10 w-20 h-8 bg-sky-200 rounded-full opacity-30 transform translate-y-28"></div>
      
      <div className="absolute bottom-1/4 left-10 w-16 h-6 bg-royal-200 rounded-full opacity-30"></div>
      <div className="absolute bottom-1/4 left-10 w-16 h-16 bg-royal-200 opacity-20 transform translate-y-3"></div>
      <div className="absolute bottom-1/4 left-10 w-16 h-6 bg-royal-200 rounded-full opacity-30 transform translate-y-[19px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-royal-600 font-medium mb-2 block">{content.aboutTitle}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            איתי קורוניו
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content.aboutDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="rounded-xl overflow-hidden shadow-xl relative">
                {/* 3D Image frame effect */}
                <div className="absolute -top-3 -right-3 w-full h-full bg-royal-200 opacity-20 rounded-xl transform rotate-2"></div>
                <div className="absolute -bottom-3 -left-3 w-full h-full bg-coral-200 opacity-20 rounded-xl transform -rotate-2"></div>
                
                <div className="relative">
                  <img 
                    src={content.images.about || "/assets/itay-koronio.jpg"} 
                    alt="איתי קורוניו" 
                    className="w-full h-auto max-h-[400px] object-contain"
                    onError={handleImageError}
                  />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-royal-100 rounded-full"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-coral-100 rounded-full"></div>
              
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg py-3 px-6">
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 text-coral-500 ml-2" />
                  <span className="font-bold text-gray-900">מייסד ומנכ"ל</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                איתי קורוניו הוא מומחה מוביל בתחום העיצוב והחווית משתמש, עם ניסיון של למעלה מ-15 שנים בתחום ה-UX/UI. כמרצה, יועץ ומנחה בכיר, איתי מלווה חברות וארגונים בתהליכי עיצוב ואפיון שירותים ומוצרים דיגיטליים, ובהובלת תהליכי מחקר וחדשנות מבוססי משתמש.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                איתי ייסד את "הפותר" מתוך הבנה עמוקה של צרכי השוק והיכולת לספק פתרונות מהירים ומדויקים בתחומי העיצוב, התוכן והחדשנות. בשילוב מומחיות בטכנולוגיות AI מתקדמות, איתי מספק מענה מקצועי יוצא דופן ויעיל לאתגרים מורכבים בזמני לחץ.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="flex items-start relative">
                  <div className="absolute -top-1 -right-1 w-full h-full bg-coral-100 opacity-0 hover:opacity-20 rounded-lg transition-opacity transform hover:translate-y-1"></div>
                  
                  <div className="w-10 h-10 bg-coral-100 rounded-full flex items-center justify-center ml-3 relative">
                    <div className="absolute inset-0 rounded-full bg-coral-200 opacity-0 hover:opacity-50 transition-opacity transform hover:translate-y-1"></div>
                    <div className="relative">
                      <Briefcase className="h-5 w-5 text-coral-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">ניסיון</h3>
                    <p className="text-gray-600">15+ שנות ניסיון בתחום ה-UX/UI ועיצוב שירות</p>
                  </div>
                </div>
                
                <div className="flex items-start relative">
                  <div className="absolute -top-1 -right-1 w-full h-full bg-coral-100 opacity-0 hover:opacity-20 rounded-lg transition-opacity transform hover:translate-y-1"></div>
                  
                  <div className="w-10 h-10 bg-coral-100 rounded-full flex items-center justify-center ml-3 relative">
                    <div className="absolute inset-0 rounded-full bg-coral-200 opacity-0 hover:opacity-50 transition-opacity transform hover:translate-y-1"></div>
                    <div className="relative">
                      <Users className="h-5 w-5 text-coral-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">לקוחות</h3>
                    <p className="text-gray-600">יותר מ-500 לקוחות וסטודנטים מרוצים</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-start mt-8">
                <a 
                  href="#contact" 
                  className="bg-royal-600 hover:bg-royal-700 text-white font-medium px-8 py-3 rounded-lg transition-colors inline-flex items-center relative"
                >
                  {/* 3D Button effect */}
                  <div className="absolute inset-0 bg-royal-800 opacity-0 hover:opacity-30 rounded-lg transform translate-y-1"></div>
                  <div className="relative inline-flex items-center">
                    <BookOpen className="h-5 w-5 ml-2" />
                    קבעו פגישת ייעוץ
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;