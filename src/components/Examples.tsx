import React, { useState } from 'react';

const Examples: React.FC = () => {
  const [activeTab, setActiveTab] = useState('images');

  const examples = {
    images: [
      {
        before: "/assets/tanti%20model%20before.jpg",
        after: "/assets/tanti%20model%20after.jpg",
        title: 'הוספת פרזנטורית לחנות בגדים'
      },
      {
        before: "/assets/be%20there%20-%20before.png",
        after: "/assets/be%20there%20after.png",
        title: "Be There - עיצוב גרפי"
      },
      {
        before: "/assets/player.jpg",
        after: "/assets/generated_image.png",
        title: 'עיבוד תמונה מקצועי'
      },
      {
        before: "/assets/Slide3.PNG",
        after: "/assets/image.png",
        title: "שיפור מצגת עסקית"
      },
      {
        before: "/assets/FB_IMG_1544304445964.jpg",
        after: "/assets/generated_image.png",
        title: "עיבוד תמונה אישית"
      },
      {
        before: "/assets/itay-koronio.jpg",
        after: "/assets/generated_image.png",
        title: "עיבוד תמונה מקצועית"
      }
    ],
    videos: [
      {
        videoUrl: "/assets/services/images-video/videos/garry%20first%20video%20ad.mp4",
        title: "פרסומת גארי גלינר",
        poster: "/assets/logo-with-mockup-garry.jpg"
      },
      {
        videoUrl: "/assets/services/images-video/videos/regular%20model%20turns%20to%20video.mp4",
        title: "הנפשת דוגמנית רגילה",
        poster: "/assets/tanti%20model%20before.jpg"
      },
      {
        videoUrl: "/assets/services/images-video/videos/black%20model%20turned%20to%20video.mp4",
        title: "הנפשת דוגמנית כהת עור",
        poster: "/assets/services/images-video/examples/WhatsApp%20Image%202025-01-11%20at%2022.50.40_3e0b1e38.jpg"
      },
      {
        videoUrl: "/videos/doogmanit-video.mp4",
        title: "הנפשת דוגמנית - הדגמה",
        poster: "/assets/tanti%20model%20after.jpg"
      },
      {
        videoUrl: "/videos/compressed-hapoter-video%20copy.mp4",
        title: "הפותר בפעולה",
        poster: "/assets/itay-koronio.jpg"
      }
    ],
    logos: [
      {
        src: "/assets/logo-transparent-garry.svg",
        title: "לוגו גארי גלינר - שקוף"
      },
      {
        src: "/assets/logo-with-mockup-garry.jpg",
        title: "לוגו גארי גלינר - מוקאפ"
      },
      {
        src: "/assets/-a-modern-and-professional-logo-for--koronyo-studi.svg",
        title: "סטודיו קורוניו - לוגו מודרני"
      },
      {
        src: "/assets/new%20hapoter%20logo%20transparent.png",
        title: "הפותר - לוגו חדש"
      }
    ]
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = "/assets/generated_image.png";
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const target = e.target as HTMLVideoElement;
    console.warn('Video failed to load:', target.src);
    target.style.display = 'none';
    const parent = target.parentElement;
    if (parent && !parent.querySelector('.video-fallback')) {
      const fallbackDiv = document.createElement('div');
      fallbackDiv.className = 'video-fallback w-full h-full bg-gray-100 flex items-center justify-center text-gray-500';
      fallbackDiv.innerHTML = '<div class="text-center"><div class="text-2xl mb-2">🎬</div><div>וידאו לא זמין</div></div>';
      parent.appendChild(fallbackDiv);
    }
  };

  return (
    <section id="examples" className="py-16 md:py-24 bg-peach-100 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-coral-600 font-medium mb-2 block">הדוגמאות שלנו</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            רוצים לראות?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            הנה כמה דוגמאות של לפני ואחרי, שיראו לכם את העוצמה של השילוב בין מומחיות עיצובית ובינה מלאכותית.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex space-x-2 space-x-reverse bg-gray-100 p-1 rounded-lg">
            <button 
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'images' 
                  ? 'bg-white text-royal-600 shadow-sm' 
                  : 'text-gray-600 hover:text-royal-600'
              }`}
              onClick={() => setActiveTab('images')}
            >
              תמונות
            </button>
            <button 
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'videos' 
                  ? 'bg-white text-royal-600 shadow-sm' 
                  : 'text-gray-600 hover:text-royal-600'
              }`}
              onClick={() => setActiveTab('videos')}
            >
              וידאו
            </button>
            <button 
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'logos' 
                  ? 'bg-white text-royal-600 shadow-sm' 
                  : 'text-gray-600 hover:text-royal-600'
              }`}
              onClick={() => setActiveTab('logos')}
            >
              לוגואים
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'images' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {examples.images.map((example, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{example.title}</h3>
                    
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">לפני</p>
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img 
                            src={example.before} 
                            alt={`${example.title} - לפני`}
                            className="w-full h-full object-contain"
                            onError={handleImageError}
                          />
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">אחרי</p>
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img 
                            src={example.after} 
                            alt={`${example.title} - אחרי`}
                            className="w-full h-full object-contain"
                            onError={handleImageError}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'videos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {examples.videos.map((video, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{video.title}</h3>
                    
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <video 
                        controls
                        className="w-full h-full"
                        poster={video.poster}
                        preload="metadata"
                        onError={handleVideoError}
                      >
                        <source src={video.videoUrl} type="video/mp4" />
                        הדפדפן שלך לא תומך בוידאו
                      </video>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'logos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {examples.logos.map((logo, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">{logo.title}</h3>
                    
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                      <img 
                        src={logo.src} 
                        alt={logo.title}
                        className="max-w-full max-h-full object-contain p-2"
                        onError={handleImageError}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">צריכים משהו דומה? אנחנו כאן כדי לעזור!</p>
          <a 
            href="#contact" 
            className="inline-block bg-coral-500 hover:bg-coral-600 text-white font-medium px-8 py-3 rounded-lg transition-colors"
          >
            דברו איתנו עכשיו
          </a>
        </div>
      </div>
    </section>
  );
};

export default Examples;