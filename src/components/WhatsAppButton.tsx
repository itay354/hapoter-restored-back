import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = '+972542001020';
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      {/* 3D Button effect */}
      <div className="absolute inset-0 bg-green-700 opacity-0 group-hover:opacity-30 rounded-full transform group-hover:translate-y-1 transition-all duration-300"></div>
      
      <div className="relative flex items-center">
        <MessageCircle className="h-6 w-6 ml-2" />
        <span className="font-medium">לחצו והתייעצו</span>
      </div>
    </a>
  );
};

export default WhatsAppButton;