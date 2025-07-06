import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useContent } from './ContentManager';

const Testimonials: React.FC = () => {
  const { content } = useContent();
  
  // פונקציה לטיפול בתמונות שלא נטענות
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // מניעת לופ אין-סופי
    
    // התאמה אישית לפי סוג התמונה
    if (target.alt.includes('נורה שקד')) {
      target.src = "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    } else if (target.alt.includes('מיכל לוי')) {
      target.src = "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    } else if (target.alt.includes('יוסי אברהם')) {
      target.src = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    } else {
      // fallback כללי
      target.src = "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    }
    target.alt = "תמונת ברירת מחדל";
  };
  
  const testimonials = [
    {
      name: 'נורה שקד',
      title: 'מנכ"לית וחברת דירקטוריון',
      content: 'ניגשתי לפוטר איתיי בעצבים ומריטת שיער עקב מקצגת שהייתי חייבת להגיש מחר, והיו לי תמונות שלא טעמו בכלל הגדלים של המצגת שקיבלתי והטקסטים היו מוכנים למחצית וניגשתי לפוטר בכמה שעות, הוא פשוט עשה לי עבודה שאני כבר לא הבנתי בכלל למה אני יושבת עליה כמה ימים ופתר לי את כל העניין של עיצוב הטקסט, סידור התמונות במצגת, של העימוד ושל כל הדברים המתסכלים האלה.',
      rating: 5,
      image: '/assets/nora-shaked.jpg',
    },
    {
      name: 'מיכל לוי',
      title: 'מרצה באוניברסיטה',
      content: 'החלטתי לשדרג את המצגות שלי לקורסים והתוצאה הייתה מעבר למצופה. הסטודנטים התלהבו והחומר הועבר בצורה הרבה יותר ברורה. שירות מעולה!',
      rating: 5,
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      name: 'יוסי אברהם',
      title: 'בעלים, סטודיו לעיצוב',
      content: 'כשיש עומסים אני תמיד פונה להפותר. הם מהירים, אמינים והתוצאות תמיד מעולות. המחיר הוגן והשירות מצוין. שותפים אמיתיים לדרך.',
      rating: 5,
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-peach-50 relative overflow-hidden">
      {/* Geometrical elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-coral-500 opacity-10 transform rotate-45"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-royal-600 opacity-10 transform rotate-45"></div>
      
      {/* 3D Floating Elements */}
      <div className="absolute top-1/3 left-10 w-20 h-20 bg-coral-200 opacity-30 transform rotate-12 animate-float" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute top-2/3 right-10 w-16 h-16 bg-royal-200 opacity-40 transform -rotate-12 animate-float" style={{animationDelay: '1.2s'}}></div>
      
      {/* 3D Cube Corner */}
      <div className="absolute top-20 right-20 w-24 h-24 bg-coral-300 opacity-20 transform skew-x-12 skew-y-12"></div>
      <div className="absolute top-24 right-24 w-24 h-24 bg-royal-300 opacity-10 transform skew-x-12 skew-y-12"></div>
      
      {/* 3D Sphere */}
      <div className="absolute bottom-20 left-20 w-40 h-40 rounded-full opacity-20"
           style={{background: 'radial-gradient(circle, rgba(79,84,255,0.3) 0%, rgba(79,84,255,0) 70%)'}}></div>
      
      {/* 3D Wave */}
      <div className="absolute top-1/2 left-0 right-0 h-24 opacity-10"
           style={{background: 'linear-gradient(45deg, rgba(255,92,74,0.2) 0%, rgba(79,84,255,0.2) 100%)', 
                  clipPath: 'polygon(0% 0%, 5% 10%, 10% 0%, 15% 10%, 20% 0%, 25% 10%, 30% 0%, 35% 10%, 40% 0%, 45% 10%, 50% 0%, 55% 10%, 60% 0%, 65% 10%, 70% 0%, 75% 10%, 80% 0%, 85% 10%, 90% 0%, 95% 10%, 100% 0%, 100% 100%, 0% 100%)'}}></div>
      
      {/* New 3D Elements */}
      {/* 3D Pyramids */}
      <div className="absolute top-1/4 right-1/4 w-0 h-0 
                    border-l-[40px] border-r-[40px] border-b-[80px] 
                    border-l-transparent border-r-transparent border-b-royal-200 
                    opacity-20 transform rotate-12"></div>
                    
      <div className="absolute bottom-1/4 left-1/4 w-0 h-0 
                    border-l-[30px] border-r-[30px] border-b-[60px] 
                    border-l-transparent border-r-transparent border-b-coral-200 
                    opacity-20 transform -rotate-12"></div>
                    
      {/* 3D Cubes */}
      <div className="absolute top-3/4 right-1/3 w-24 h-24 bg-royal-200 transform rotate-45 skew-x-12 skew-y-12 opacity-20"></div>
      <div className="absolute top-3/4 right-1/3 translate-x-4 -translate-y-4 w-24 h-24 bg-coral-200 transform rotate-45 skew-x-12 skew-y-12 opacity-10"></div>
      
      {/* 3D Cylinders */}
      <div className="absolute bottom-1/3 right-20 w-16 h-6 bg-coral-200 rounded-full opacity-30"></div>
      <div className="absolute bottom-1/3 right-20 w-16 h-20 bg-coral-200 opacity-20 transform translate-y-3"></div>
      <div className="absolute bottom-1/3 right-20 w-16 h-6 bg-coral-200 rounded-full opacity-30 transform translate-y-[23px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-royal-600 font-medium mb-2 block">מה אומרים עלינו</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            לקוחות מרוצים
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            אנחנו גאים בעבודה שלנו ובמשוב החיובי שאנו מקבלים מלקוחותינו.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow animate-slide-up relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* 3D Decorative elements */}
              <div className="absolute -top-2 -right-2 w-full h-full bg-royal-200 opacity-0 hover:opacity-10 transition-opacity rounded-xl transform hover:rotate-1"></div>
              <div className="absolute -bottom-2 -left-2 w-full h-full bg-coral-200 opacity-0 hover:opacity-10 transition-opacity rounded-xl transform hover:-rotate-1"></div>
              
              <Quote className="absolute top-4 right-4 h-8 w-8 text-royal-100" />
              
              <div className="flex items-center mb-4 mt-6">
                <div className="w-16 h-16 rounded-full overflow-hidden ml-4 border-4 border-coral-100 relative">
                  {/* 3D Image effect */}
                  <div className="absolute inset-0 rounded-full shadow-inner"></div>
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.title}</p>
                </div>
              </div>
              
              <div className="flex text-yellow-400 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;