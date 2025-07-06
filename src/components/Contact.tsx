import React from 'react';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-peach-50 to-white relative overflow-hidden">
      {/* Subtle geometric background elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-coral-100 rounded-full opacity-20"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-royal-100 rounded-full opacity-15"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="text-royal-600 font-medium mb-2 block">צרו קשר</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            מוכנים להתחיל?
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            דברו איתנו - נחזור אליכם תוך מקסימום שעתיים
          </p>
          <p className="text-sm text-gray-500">
            אנחנו זמינים לכל שאלה, הצעת מחיר או התייעצות מקצועית
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header with gradient */}
            <div className="bg-gradient-to-l from-royal-600 to-coral-500 px-8 py-6">
              <h3 className="text-2xl font-bold text-white text-center">
                פרטי התקשרות
              </h3>
            </div>
            
            {/* Contact Information */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Contact Methods */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">יצירת קשר</h4>
                  
                  <div className="flex items-center group">
                    <div className="w-12 h-12 bg-coral-100 rounded-lg flex items-center justify-center ml-4 group-hover:bg-coral-200 transition-colors">
                      <Phone className="h-6 w-6 text-coral-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">טלפון/ווטסאפ</p>
                      <a 
                        href="tel:+972542001020" 
                        className="text-royal-600 hover:text-royal-700 transition-colors font-medium"
                      >
                        +972542001020
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center group">
                    <div className="w-12 h-12 bg-royal-100 rounded-lg flex items-center justify-center ml-4 group-hover:bg-royal-200 transition-colors">
                      <Mail className="h-6 w-6 text-royal-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">אימייל</p>
                      <a 
                        href="mailto:hello@itayux.com" 
                        className="text-royal-600 hover:text-royal-700 transition-colors font-medium"
                      >
                        hello@itayux.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center group">
                    <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center ml-4 group-hover:bg-sky-200 transition-colors">
                      <MapPin className="h-6 w-6 text-sky-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">מיקום</p>
                      <p className="text-gray-600">ישראל - שירות מקוון</p>
                    </div>
                  </div>
                </div>
                
                {/* Working Hours */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">שעות פעילות</h4>
                  
                  <div className="bg-gradient-to-br from-peach-50 to-coral-50 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-coral-500 rounded-lg flex items-center justify-center ml-3">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-semibold text-gray-900">זמינות מלאה</span>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700">ראשון - חמישי</span>
                        <span className="font-medium text-gray-900">10:00 - 23:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">שישי</span>
                        <span className="font-medium text-gray-900">10:00 - 14:00, 19:00 - 23:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">שבת</span>
                        <span className="font-medium text-gray-900">10:00 - 14:00, 19:00 - 23:00</span>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-coral-200">
                        <p className="text-xs text-gray-600 italic">
                          * נעמוד בלוחות זמנים דחופים גם מחוץ לשעות אלו
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Response Badge */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full ml-2 animate-pulse"></div>
                      <span className="text-green-800 font-medium text-sm">
                        תגובה מהירה - תוך שעתיים
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Call to Action */}
              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-gray-600 mb-4">
                  יש לכם פרויקט דחוף? אל תחכו - פנו אלינו עכשיו!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="https://wa.me/+972542001020" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                  >
                    <Phone className="h-5 w-5 ml-2" />
                    ווטסאפ מיידי
                  </a>
                  <a 
                    href="mailto:hello@itayux.com"
                    className="inline-flex items-center justify-center bg-royal-600 hover:bg-royal-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                  >
                    <Mail className="h-5 w-5 ml-2" />
                    שלחו אימייל
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;