import React from 'react';
import { Clock, DollarSign, Zap, TrendingDown } from 'lucide-react';

const Comparison: React.FC = () => {
  // נתוני השוואה מחודשים
  const comparisonData = [
    { 
      service: 'עיצוב מצגת עסקית', 
      traditionalHours: '24 שעות', 
      aiHours: '3 שעות', 
      timeSavings: 87.5,
      traditionalPrice: 3500, 
      aiPrice: 800, 
      priceSavings: 77
    },
    { 
      service: 'עיצוב תמונות', 
      traditionalHours: '8 שעות', 
      aiHours: '1 שעה', 
      timeSavings: 87.5,
      traditionalPrice: 1200, 
      aiPrice: 300, 
      priceSavings: 75
    },
    { 
      service: 'עריכת וידאו (3 דקות)', 
      traditionalHours: '15-30 שעות', 
      aiHours: '4-6 שעות', 
      timeSavings: 80,
      traditionalPrice: '3,000-5,000', 
      aiPrice: '800-1,200', 
      priceSavings: 75
    },
    { 
      service: 'עיצוב לוגו', 
      traditionalHours: '24 שעות (3 ימי עבודה)', 
      aiHours: '3 שעות', 
      timeSavings: 87.5,
      traditionalPrice: 2500, 
      aiPrice: 700, 
      priceSavings: 72
    },
    { 
      service: 'עיצוב ברושור (5 עמודים)', 
      traditionalHours: '16 שעות', 
      aiHours: '2 שעות', 
      timeSavings: 87.5,
      traditionalPrice: '3,500-4,000', 
      aiPrice: 950, 
      priceSavings: 73
    },
    { 
      service: 'רעיונות ותוכן שיווקי', 
      traditionalHours: '12 שעות', 
      aiHours: '1.5 שעות', 
      timeSavings: 87.5,
      traditionalPrice: 1800, 
      aiPrice: 450, 
      priceSavings: 75
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-peach-50 relative overflow-hidden">
      {/* 3D Geometric background elements */}
      <div className="absolute top-0 right-0 w-full h-16 bg-coral-500 opacity-10 transform -skew-y-3"></div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-royal-600 opacity-10 transform skew-y-3"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-royal-200 rounded-full opacity-30"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-coral-200 rounded-full opacity-30"></div>
      
      {/* 3D Isometric Shape */}
      <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-royal-200 transform rotate-45 skew-x-12 skew-y-12 opacity-20"></div>
      <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-coral-200 transform rotate-45 skew-x-12 skew-y-12 opacity-20"></div>
      
      {/* New 3D Elements */}
      {/* 3D Pyramids */}
      <div className="absolute top-1/4 left-1/4 w-0 h-0 
                    border-l-[40px] border-r-[40px] border-b-[80px] 
                    border-l-transparent border-r-transparent border-b-royal-200 
                    opacity-20 transform rotate-12"></div>
                    
      <div className="absolute bottom-1/4 right-1/4 w-0 h-0 
                    border-l-[30px] border-r-[30px] border-b-[60px] 
                    border-l-transparent border-r-transparent border-b-coral-200 
                    opacity-20 transform -rotate-12"></div>
      
      {/* 3D Floating cubes */}
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-royal-200 transform rotate-45 skew-x-12 skew-y-12 opacity-30 animate-float" style={{animationDelay: '0.6s'}}></div>
      <div className="absolute bottom-1/2 right-10 w-12 h-12 bg-coral-200 transform rotate-45 skew-x-12 skew-y-12 opacity-30 animate-float" style={{animationDelay: '1.1s'}}></div>
      
      {/* 3D Spheres with gradients */}
      <div className="absolute top-2/3 right-1/3 w-48 h-48 rounded-full opacity-20" 
           style={{background: 'radial-gradient(circle, rgba(234,158,140,0.3) 0%, rgba(234,158,140,0) 70%)'}}></div>
      <div className="absolute bottom-2/3 left-1/3 w-64 h-64 rounded-full opacity-20"
           style={{background: 'radial-gradient(circle, rgba(79,84,255,0.2) 0%, rgba(79,84,255,0) 70%)'}}></div>
      
      {/* 3D Cylinders */}
      <div className="absolute top-1/4 right-10 w-20 h-8 bg-royal-200 rounded-full opacity-30"></div>
      <div className="absolute top-1/4 right-10 w-20 h-16 bg-royal-200 opacity-20 transform translate-y-4"></div>
      <div className="absolute top-1/4 right-10 w-20 h-8 bg-royal-200 rounded-full opacity-30 transform translate-y-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-royal-600 font-medium mb-2 block">חיסכון בזמן ובכסף</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            למה לשלם יותר ולחכות זמן רב?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            בזכות שילוב טכנולוגיות AI מתקדמות ומומחיות עיצובית, אנחנו מספקים תוצאות מהירות יותר וזולות יותר - בלי להתפשר על האיכות.
          </p>
        </div>

        {/* Unified Comparison Table */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            <Clock className="inline-block ml-2 text-coral-500" />
            <DollarSign className="inline-block ml-2 text-coral-500" />
            השוואת זמן ומחיר: שיטה מסורתית מול טכנולוגיית AI (נתונים מעודכנים 2024)
          </h3>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
            {/* 3D Table effects */}
            <div className="absolute -top-4 -right-4 w-full h-full bg-royal-200 opacity-10 rounded-xl transform rotate-1"></div>
            <div className="absolute -bottom-4 -left-4 w-full h-full bg-coral-200 opacity-10 rounded-xl transform -rotate-1"></div>
            
            <div className="overflow-x-auto relative">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-l from-royal-600 to-coral-500 text-white">
                    <th className="px-6 py-4 text-right font-medium">סוג השירות</th>
                    <th className="px-4 py-4 text-center font-medium">זמן - שיטה מסורתית</th>
                    <th className="px-4 py-4 text-center font-medium">זמן - עם AI</th>
                    <th className="px-4 py-4 text-center font-medium">חיסכון בזמן</th>
                    <th className="px-4 py-4 text-center font-medium">מחיר - שיטה מסורתית</th>
                    <th className="px-4 py-4 text-center font-medium">מחיר - עם AI</th>
                    <th className="px-4 py-4 text-center font-medium">חיסכון בכסף</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((item, index) => (
                    <tr 
                      key={index} 
                      className={`${
                        index % 2 === 0 ? 'bg-peach-50' : 'bg-white'
                      } hover:bg-coral-50 transition-colors duration-300 border-b border-peach-100`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">{item.service}</td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-gray-500 text-sm">{item.traditionalHours}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="font-semibold text-coral-600 bg-coral-100 px-3 py-1 rounded-full text-sm">
                          {item.aiHours}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          <Clock className="h-3 w-3 ml-1" />
                          {item.timeSavings}%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-gray-400 line-through text-sm">
                          ₪{typeof item.traditionalPrice === 'number' ? item.traditionalPrice.toLocaleString() : item.traditionalPrice}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="font-semibold text-royal-600 bg-royal-100 px-3 py-1 rounded-full text-sm">
                          ₪{typeof item.aiPrice === 'number' ? item.aiPrice.toLocaleString() : item.aiPrice}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          <TrendingDown className="h-3 w-3 ml-1" />
                          {item.priceSavings}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-gradient-to-l from-peach-100 to-coral-50 p-6 border-t border-peach-200">
              <div className="flex items-center text-gray-600 mb-2">
                <Zap className="h-5 w-5 text-coral-500 ml-2" />
                <p className="text-sm">המחירים והזמנים הם להערכה בלבד ועשויים להשתנות בהתאם לדרישות הספציפיות של הפרויקט.</p>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 text-royal-500 ml-2" />
                <p className="text-sm">הזמן מחושב לפי שעות עבודה בפועל, ללא זמני המתנה.</p>
              </div>
            </div>
          </div>
        </div>

        {/* סיכום מאוזן */}
        <div className="mt-16 text-center">
          <div className="flex justify-center items-center space-x-12 space-x-reverse mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-coral-600 mb-2">~87%</div>
              <div className="text-sm text-gray-600 font-medium">חיסכון זמן ממוצע</div>
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-royal-300 to-coral-300"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-royal-600 mb-2">~75%</div>
              <div className="text-sm text-gray-600 font-medium">חיסכון כסף ממוצע</div>
            </div>
          </div>
          
          <a 
            href="#contact" 
            className="inline-block bg-gradient-to-l from-royal-600 to-coral-500 hover:from-royal-700 hover:to-coral-600 text-white font-medium px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg relative"
          >
            {/* 3D Button effect */}
            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 rounded-xl transform translate-y-1"></div>
            <span className="relative">קבלו הצעת מחיר מותאמת אישית</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Comparison;