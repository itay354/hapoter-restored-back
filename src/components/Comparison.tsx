import React from 'react';
import { Clock, DollarSign, Zap, TrendingDown } from 'lucide-react';

const Comparison: React.FC = () => {
  // נתוני השוואה מעודכנים - חישוב לפי 350 ₪ לשעה למעצב
  const comparisonData = [
    { 
      service: 'עיצוב מצגת עסקית', 
      traditionalHours: '24 שעות', 
      aiHours: '3 שעות', 
      timeSavings: 87.5,
      traditionalPrice: 8400, // 24 × 350
      aiPrice: 800, 
      priceSavings: 90
    },
    { 
      service: 'עיצוב תמונות', 
      traditionalHours: '8 שעות', 
      aiHours: '1 שעה', 
      timeSavings: 87.5,
      traditionalPrice: 2800, // 8 × 350
      aiPrice: 300, 
      priceSavings: 89
    },
    { 
      service: 'עריכת וידאו (3 דקות)', 
      traditionalHours: '20 שעות', 
      aiHours: '5 שעות', 
      timeSavings: 75,
      traditionalPrice: 7000, // 20 × 350
      aiPrice: 1000, 
      priceSavings: 86
    },
    { 
      service: 'עיצוב לוגו', 
      traditionalHours: '24 שעות', 
      aiHours: '3 שעות', 
      timeSavings: 87.5,
      traditionalPrice: 8400, // 24 × 350
      aiPrice: 700, 
      priceSavings: 92
    },
    { 
      service: 'עיצוב ברושור (5 עמודים)', 
      traditionalHours: '16 שעות', 
      aiHours: '2 שעות', 
      timeSavings: 87.5,
      traditionalPrice: 5600, // 16 × 350
      aiPrice: 950, 
      priceSavings: 83
    },
    { 
      service: 'מחקר ורעיונות תוכן', 
      traditionalHours: '12 שעות', 
      aiHours: '1.5 שעות', 
      timeSavings: 87.5,
      traditionalPrice: 4200, // 12 × 350
      aiPrice: 450, 
      priceSavings: 89
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-peach-50 relative overflow-hidden">
      {/* אלמנטים גיאומטריים פשוטים */}
      <div className="absolute top-20 right-20 w-24 h-24 bg-royal-200 rounded-full opacity-30"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-coral-200 rounded-full opacity-30"></div>
      
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

        {/* טבלת השוואה פשוטה */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative max-w-6xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-l from-royal-600 to-coral-500 text-white">
                  <th className="px-4 py-4 text-right font-medium">סוג השירות</th>
                  <th className="px-3 py-4 text-center font-medium">זמן מסורתי</th>
                  <th className="px-3 py-4 text-center font-medium">זמן עם AI</th>
                  <th className="px-3 py-4 text-center font-medium">מחיר מסורתי</th>
                  <th className="px-3 py-4 text-center font-medium">מחיר עם AI</th>
                  <th className="px-3 py-4 text-center font-medium">חיסכון</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((item, index) => (
                  <tr 
                    key={index} 
                    className={`${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } hover:bg-blue-50 transition-colors border-b border-gray-100`}
                  >
                    <td className="px-4 py-4 font-medium text-gray-900">{item.service}</td>
                    <td className="px-3 py-4 text-center text-gray-600 text-sm">{item.traditionalHours}</td>
                    <td className="px-3 py-4 text-center">
                      <span className="font-semibold text-coral-600 bg-coral-100 px-2 py-1 rounded text-sm">
                        {item.aiHours}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-center">
                      <span className="text-gray-400 line-through text-sm">
                        ₪{item.traditionalPrice.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-center">
                      <span className="font-semibold text-royal-600 bg-royal-100 px-2 py-1 rounded text-sm">
                        ₪{item.aiPrice.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-center">
                      <span className="inline-flex items-center bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-medium">
                        <TrendingDown className="h-3 w-3 ml-1" />
                        {item.priceSavings}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* הערות חשובות */}
          <div className="bg-gray-50 p-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Zap className="h-4 w-4 text-coral-500 ml-2" />
                <p><strong>חישוב המחירים:</strong> מבוסס על תעריף ממוצע של 350 ₪ לשעה למעצב.ת מקצועי.ת</p>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-royal-500 ml-2" />
                <p><strong>זמני העבודה:</strong> מחושבים לפי שעות עבודה בפועל, ללא זמני המתנה והתייעצויות</p>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-green-500 ml-2" />
                <p><strong>המחירים המצוינים:</strong> הם להערכה ועשויים להשתנות בהתאם לדרישות הספציפיות של הפרויקט</p>
              </div>
            </div>
          </div>
        </div>

        {/* סיכום מאוזן */}
        <div className="mt-16 text-center">
          <div className="flex justify-center items-center space-x-12 space-x-reverse mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-coral-600 mb-2">~85%</div>
              <div className="text-sm text-gray-600 font-medium">חיסכון זמן ממוצע</div>
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-royal-300 to-coral-300"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-royal-600 mb-2">~88%</div>
              <div className="text-sm text-gray-600 font-medium">חיסכון כסף ממוצע</div>
            </div>
          </div>
          
          <a 
            href="#contact" 
            className="inline-block bg-gradient-to-l from-royal-600 to-coral-500 hover:from-royal-700 hover:to-coral-600 text-white font-medium px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            קבלו הצעת מחיר מותאמת אישית
          </a>
        </div>
      </div>
    </section>
  );
};

export default Comparison;