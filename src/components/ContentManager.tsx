import React, { createContext, useContext, useState, ReactNode } from 'react';
import { X, Upload, Save, Lock } from 'lucide-react';

// Types
interface ContentData {
  title: string;
  description: string;
  aboutTitle: string;
  aboutDescription: string;
  images: {
    [key: string]: string;
  };
}

interface ContentContextType {
  content: ContentData;
  updateContent: (newContent: Partial<ContentData>) => void;
  openAdminLogin: () => void;
}

// Default content
const defaultContent: ContentData = {
  title: 'הפותר - סוגרים לך פינה בעבודות עיצוב ותוכן דחופות',
  description: 'אנחנו מספקים פתרונות עיצוב, מחקר, תוכן ואנליזה מהירים ואיכותיים באמצעות טכנולוגיית AI מתקדמת.',
  aboutTitle: 'מיהו הפותר',
  aboutDescription: 'איתי קורוניו הוא מומחה מוביל בתחום העיצוב והחווית משתמש, עם ניסיון של למעלה מ-15 שנים בתחום ה-UX/UI.',
  images: {
    hero: '/assets/FB_IMG_1544304445964.jpg',
    about: '/assets/itay-koronio.jpg',
    image1: '/assets/tanti model before.jpg',
    image2: '/assets/tanti model after.jpg',
    before1: '/assets/player.jpg',
    after1: '/assets/generated_image.png',
    before2: '/assets/Slide3.PNG',
    after2: '/assets/image copy copy.png',
    before3: '/assets/be there - before.png',
    after3: '/assets/be there after.png',
    presentation1: '/assets/Slide3.PNG'
  }
};

// Context
const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Provider component
export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content] = useState<ContentData>(defaultContent);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  const updateContent = (newContent: Partial<ContentData>) => {
    console.log('Content updated:', newContent);
    // בעתיד כאן תהיה לוגיקה לשמירה
  };

  const openAdminLogin = () => {
    setIsAdminLoginOpen(true);
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, openAdminLogin }}>
      {children}
      {isAdminLoginOpen && (
        <AdminLogin 
          onClose={() => setIsAdminLoginOpen(false)} 
          onSuccess={() => setIsAdminLoginOpen(false)}
        />
      )}
    </ContentContext.Provider>
  );
};

// Hook to use content
export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    return {
      content: defaultContent,
      updateContent: () => {},
      openAdminLogin: () => {}
    };
  }
  return context;
};

// Admin Login Component
const AdminLogin: React.FC<{ 
  onClose: () => void;
  onSuccess: () => void;
}> = ({ onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (password === 'hapoter2024admin') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('סיסמה שגויה');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  if (isAuthenticated) {
    return <AdminPanel onClose={onSuccess} />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">כניסה לאזור האדמין</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              סיסמה
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-500"
              placeholder="הזן סיסמה"
              autoFocus
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-royal-600 text-white py-2 px-4 rounded-md hover:bg-royal-700 transition-colors flex items-center justify-center gap-2"
          >
            <Lock className="h-4 w-4" />
            כניסה
          </button>
        </div>
      </div>
    </div>
  );
};

// Admin Panel Component
const AdminPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { content, updateContent } = useContent();
  const [activeTab, setActiveTab] = useState<'content' | 'images'>('content');
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = () => {
    updateContent(editedContent);
    alert('התוכן נשמר בהצלחה!');
  };

  const handleImageUpload = (key: string, file: File) => {
    try {
      const imageUrl = URL.createObjectURL(file);
      setEditedContent(prev => ({
        ...prev,
        images: {
          ...prev.images,
          [key]: imageUrl
        }
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">ניהול תוכן</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'content'
                ? 'border-b-2 border-royal-600 text-royal-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            עריכת תוכן
          </button>
          <button
            onClick={() => setActiveTab('images')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'images'
                ? 'border-b-2 border-royal-600 text-royal-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            ניהול תמונות
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  כותרת ראשית
                </label>
                <input
                  type="text"
                  value={editedContent.title || ''}
                  onChange={(e) => setEditedContent(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  תיאור
                </label>
                <textarea
                  value={editedContent.description || ''}
                  onChange={(e) => setEditedContent(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  כותרת About
                </label>
                <input
                  type="text"
                  value={editedContent.aboutTitle || ''}
                  onChange={(e) => setEditedContent(prev => ({ ...prev, aboutTitle: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  תיאור About
                </label>
                <textarea
                  value={editedContent.aboutDescription || ''}
                  onChange={(e) => setEditedContent(prev => ({ ...prev, aboutDescription: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'images' && (
            <ImageUploader
              images={editedContent.images || {}}
              onImageUpload={handleImageUpload}
            />
          )}
        </div>

        <div className="p-6 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            ביטול
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-royal-600 text-white rounded-md hover:bg-royal-700 transition-colors flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            שמור שינויים
          </button>
        </div>
      </div>
    </div>
  );
};

// Image Uploader Component
const ImageUploader: React.FC<{
  images: { [key: string]: string };
  onImageUpload: (key: string, file: File) => void;
}> = ({ images = {}, onImageUpload }) => {
  const handleFileChange = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(key, file);
    }
  };

  const imageKeys = [
    { key: 'hero', label: 'תמונת Hero' },
    { key: 'about', label: 'תמונת About' },
    { key: 'image1', label: 'תמונה 1 (לפני)' },
    { key: 'image2', label: 'תמונה 2 (אחרי)' },
    { key: 'before1', label: 'לפני 1' },
    { key: 'after1', label: 'אחרי 1' },
    { key: 'before2', label: 'לפני 2' },
    { key: 'after2', label: 'אחרי 2' },
    { key: 'before3', label: 'לפני 3' },
    { key: 'after3', label: 'אחרי 3' },
    { key: 'presentation1', label: 'מצגת 1' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {imageKeys.map(({ key, label }) => {
        const imageUrl = images[key] || '';
        
        return (
          <div key={key} className="border rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {label}
            </label>
            
            {imageUrl && (
              <div className="mb-3">
                <img
                  src={imageUrl}
                  alt={label}
                  className="w-full h-32 object-cover rounded-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            )}
            
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(key, e)}
                className="hidden"
                id={`upload-${key}`}
              />
              <label
                htmlFor={`upload-${key}`}
                className="flex items-center justify-center w-full p-3 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-royal-500 transition-colors"
              >
                <Upload className="h-5 w-5 text-gray-400 ml-2" />
                <span className="text-sm text-gray-600">העלה תמונה</span>
              </label>
            </div>
            
            {imageUrl && (
              <p className="text-xs text-gray-500 mt-2 truncate">
                {imageUrl.startsWith('blob:') ? 'תמונה חדשה הועלתה' : imageUrl}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AdminPanel;