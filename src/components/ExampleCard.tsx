import React, { useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ExampleCardProps {
  example: {
    before: string;
    after: string;
    title: string;
  };
  activeTab: string;
  index: number;
  dividerPosition: number;
  onDividerPositionChange: (position: number) => void;
}

const ExampleCard: React.FC<ExampleCardProps> = React.memo(({
  example,
  activeTab,
  index,
  dividerPosition,
  onDividerPositionChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = React.useState(false);

  // Handle mouse/touch events for dragging - useCallback למניעת re-creation
  const handleDragStart = useCallback(() => {
    setDragging(true);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDragging(false);
  }, []);

  const handleDrag = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging || !containerRef.current) return;
    
    let clientX: number;
    
    if ('touches' in e) {
      // Touch event
      clientX = e.touches[0].clientX;
    } else {
      // Mouse event
      clientX = e.clientX;
    }
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const containerWidth = rect.width;
    
    // Calculate percentage (0-100)
    let percentage = (x / containerWidth) * 100;
    
    // Clamp between 0 and 100
    percentage = Math.max(0, Math.min(100, percentage));
    
    onDividerPositionChange(percentage);
  }, [dragging, onDividerPositionChange]);

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-up relative"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* 3D Card effects */}
      <div className="absolute -top-4 -right-4 w-full h-full bg-royal-200 opacity-0 hover:opacity-10 transition-opacity rounded-xl transform hover:rotate-1"></div>
      <div className="absolute -bottom-4 -left-4 w-full h-full bg-coral-200 opacity-0 hover:opacity-10 transition-opacity rounded-xl transform hover:-rotate-1"></div>
      
      <div className="p-6 relative">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">{example.title}</h3>
        
        <div 
          ref={containerRef}
          className="relative w-full aspect-video overflow-hidden rounded-lg cursor-ew-resize bg-white"
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onMouseMove={handleDrag}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
          onTouchCancel={handleDragEnd}
          onTouchMove={handleDrag}
        >
          {/* 3D frame effect */}
          <div className="absolute -top-2 -right-2 w-full h-full bg-royal-200 opacity-0 group-hover:opacity-10 transition-opacity rounded-lg transform group-hover:rotate-1"></div>
          <div className="absolute -bottom-2 -left-2 w-full h-full bg-coral-200 opacity-0 group-hover:opacity-10 transition-opacity rounded-lg transform group-hover:-rotate-1"></div>
          
          {/* Image containers with high-quality loading */}
          <div className="absolute top-0 left-0 w-full h-full bg-white flex items-center justify-center">
            {/* Loading placeholder */}
            <div className="animate-pulse flex flex-col items-center justify-center">
              <div className="h-8 w-8 bg-gray-300 rounded-full mb-2"></div>
              <div className="h-2 w-24 bg-gray-300 rounded"></div>
            </div>
          </div>
          
          {/* Before Image - Right side (visible past the divider) */}
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white p-4">
            <img 
              src={example.before} 
              alt={`${example.title} - לפני`} 
              className="max-w-full max-h-full object-contain bg-white"
              style={{
                filter: 'brightness(1.05) contrast(1.02)',
                backgroundColor: 'white'
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "https://placehold.co/800x600?text=תמונת+לפני+לא+זמינה";
              }}
            />
          </div>
          
          {/* After Image - Left side (masked by the divider) - הגדלת התמונה */}
          <div 
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white p-1"
            style={{ 
              clipPath: `polygon(0 0, ${dividerPosition}% 0, ${dividerPosition}% 100%, 0 100%)`
            }}
          >
            <img 
              src={example.after} 
              alt={`${example.title} - אחרי`} 
              className="max-w-full max-h-full object-contain bg-white"
              style={{
                filter: 'brightness(1.05) contrast(1.02)',
                backgroundColor: 'white'
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "https://placehold.co/800x600?text=תמונת+אחרי+לא+זמינה";
              }}
            />
          </div>

          {/* Draggable divider line */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize transition-all duration-100 flex items-center justify-center"
            style={{ 
              left: `${dividerPosition}%`,
              transform: 'translateX(-50%)',
              boxShadow: '0 0 10px rgba(0,0,0,0.3)',
              zIndex: 10
            }}
          >
            {/* Add draggable handle indicator */}
            <div className="h-12 w-12 rounded-full bg-white shadow-md flex items-center justify-center opacity-80 transform hover:scale-110 transition-all">
              <div className="flex">
                <ArrowLeft className="h-4 w-4 text-gray-700" />
                <ArrowRight className="h-4 w-4 text-gray-700" />
              </div>
            </div>
          </div>

          {/* Before/After labels */}
          <div className="absolute bottom-4 right-4 px-4 py-2 bg-coral-500 text-white rounded-full text-sm font-medium z-20">
            לפני
          </div>
          
          <div className="absolute bottom-4 left-4 px-4 py-2 bg-royal-600 text-white rounded-full text-sm font-medium z-20">
            אחרי
          </div>

          {/* Drag instruction */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full whitespace-nowrap z-20">
            גררו את הקו לצפייה בשינוי
          </div>
        </div>
      </div>
    </div>
  );
});

ExampleCard.displayName = 'ExampleCard';

export default ExampleCard;