import React, { useState, useEffect, useRef } from 'react';
import { Upload, Image as ImageIcon, X, Lock } from 'lucide-react';

// ממשק לניהול קונפיגורציית תוכן
interface ContentConfig {
  title: string;
  description: string;
  heroHeading: string;
  heroSubheading: string;
  aboutTitle: string;
  aboutDescription: string;
  images: {
    [key: string]: string; // מפתח: שם התמונה, ערך: URL או base64
  };
}

// ערכים ברירת מחדל - עודכנו עם נתיבי תמונות נכונים
const defaultContent: ContentConfig = {
  title: 'הפותר - סוגרים לך פינה בעבודות עיצוב ותוכן דחופות',
  description: 'אנחנו מספקים פתרונות עיצוב, מחקר, תוכן ואנליזה מהירים ואיכותיים באמצעות טכנולוגיית AI מתקדמת.',
  heroHeading: 'הפותר',
  heroSubheading: 'סוגרים לך פינה בעבודות עיצוב ותוכן דחופות',
  aboutTitle: 'מיהו הפותר?',
  aboutDescription: 'מתמחה בעיצוב, תוכן ופתרונות יצירתיים המשלבים טכנולוגיית בינה מלאכותית מתקדמת',
  images: {
    hero: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&dpr=1",
    about: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
    // רק תמונות חיוניות - צמצום משמעותי
    image1: "/assets/tanti model before.jpg",
    image2: "/assets/tanti model after.jpg",
    // תמונות מוקאפים - רק הכרחיות
    before1: "/assets/player.jpg", // לפני - דגם בסיסי
    after1: "/assets/generated_image.png", // אחרי - מוקאפ מעוצב
    before3: "/assets/be there - before.png",
    after3: "/assets/be there after.png",
  }
};

// IndexedDB helper functions
const DB_NAME = 'hapoterisrael_db';
const DB_VERSION = 1;
const TEXT_STORE = 'text_content';
const IMAGES_STORE = 'images';

// יצירת מסד הנתונים
const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = (event) => {
      console.error('IndexedDB error:', event);
      reject('Error opening database');
    };
    
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // יצירת מחסן לנתוני טקסט
      if (!db.objectStoreNames.contains(TEXT_STORE)) {
        db.createObjectStore(TEXT_STORE, { keyPath: 'id' });
      }
      
      // יצירת מחסן לתמונות
      if (!db.objectStoreNames.contains(IMAGES_STORE)) {
        db.createObjectStore(IMAGES_STORE, { keyPath: 'key' });
      }
    };
  });
};

// שמירת נתוני טקסט
const saveTextContent = async (content: Partial<ContentConfig>): Promise<void> => {
  try {
    const db = await initDB();
    const transaction = db.transaction([TEXT_STORE], 'readwrite');
    const store = transaction.objectStore(TEXT_STORE);
    
    // שמירת הנתונים עם מזהה קבוע
    const textContent = { ...content, id: 'site_text_content' };
    store.put(textContent);
    
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = (event) => reject(event);
    });
  } catch (error) {
    console.error('Error saving text content:', error);
    // Fallback to localStorage
    try {
      localStorage.setItem('siteTextContent', JSON.stringify(content));
    } catch (e) {
      console.error('Failed to save to localStorage as fallback', e);
    }
  }
};

// טעינת נתוני טקסט
const loadTextContent = async (): Promise<Partial<ContentConfig> | null> => {
  try {
    const db = await initDB();
    const transaction = db.transaction([TEXT_STORE], 'readonly');
    const store = transaction.objectStore(TEXT_STORE);
    const request = store.get('site_text_content');
    
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = (event) => reject(event);
    });
  } catch (error) {
    console.error('Error loading text content:', error);
    // Fallback to localStorage
    try {
      const savedContent = localStorage.getItem('siteTextContent');
      return savedContent ? JSON.parse(savedContent) : null;
    } catch (e) {
      console.error('Failed to load from localStorage as fallback', e);
      return null;
    }
  }
};

// שמירת תמונה
const saveImage = async (key: string, imageData: string): Promise<void> => {
  try {
    const db = await initDB();
    const transaction = db.transaction([IMAGES_STORE], 'readwrite');
    const store = transaction.objectStore(IMAGES_STORE);
    
    store.put({ key, data: imageData });
    
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = (event) => reject(event);
    });
  } catch (error) {
    console.error('Error saving image:', error);
  }
};

// טעינת תמונות
const loadImages = async (): Promise<{ [key: string]: string }> => {
  try {
    const db = await initDB();
    const transaction = db.transaction([IMAGES_STORE], 'readonly');
    const store = transaction.objectStore(IMAGES_STORE);
    const request = store.getAll();
    
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        const images: { [key: string]: string } = {};
        request.result.forEach((item: { key: string, data: string }) => {
          images[item.key] = item.data;
        });
        resolve(images);
      };
      request.onerror = (event) => reject(event);
    });
  } catch (error) {
    console.error('Error loading images:', error);
    return {};
  }
};

// מחיקת מסד הנתונים (למקרה של ריסט)
const deleteDatabase = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DB_NAME);
    request.onsuccess = () => resolve();
    request.onerror = () => reject();
  });
};

// פונקציה ליצירת timeout promise
const createTimeoutPromise = (ms: number) => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Operation timed out')), ms);
  });
};

// יוצר Context עבור ניהול התוכן
const ContentContext = React.createContext<{
  content: ContentConfig;
  updateContent?: (newContent: Partial<ContentConfig>) => void;
  updateImage?: (key: string, imageData: string) => void;
  resetStorage?: () => void;
  exportData?: () => void;
  importData?: (jsonData: string) => void;
  isAdmin?: boolean;
  setIsAdmin?: React.Dispatch<React.SetStateAction<boolean>>;
  loginAdmin?: (password: string) => boolean;
  openAdminLogin?: () => void;
}>({
  content: defaultContent,
});

// Provider לניהול התוכן
export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ContentConfig>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // טעינת נתונים בעת טעינת האפליקציה
  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      
      // ניקוי אוטומטי של דאטהביס ישן לביצועים טובים יותר
      try {
        await deleteDatabase();
        console.log('Database cleared for optimization');
      } catch (e) {
        console.log('Database clear not needed');
      }
      
      try {
        // יצירת promise שיסתיים תוך 5 שניות
        const loadingPromise = (async () => {
          // טעינת נתוני טקסט
          const textContent = await loadTextContent();
          
          // טעינת תמונות
          const images = await loadImages();
          
          return { textContent, images };
        })();
        
        // שימוש ב-Promise.race כדי להבטיח שהטעינה תסתיים תוך זמן מוגדר
        const timeoutPromise = createTimeoutPromise(5000);
        
        const result = await Promise.race([loadingPromise, timeoutPromise]);
        
        // אם הגענו לכאן, הטעינה הצליחה
        const { textContent, images } = result as { textContent: any, images: any };
        
        // שילוב נתונים
        if (textContent || Object.keys(images).length > 0) {
          setContent(prev => ({
            ...prev,
            ...(textContent || {}),
            images: { 
              ...prev.images, 
              ...images 
            }
          }));
        }
      } catch (e) {
        console.error('Failed to load content (using default content):', e);
        // אם הטעינה נכשלה או הסתיימה בזמן קצוב, נשתמש בתוכן ברירת המחדל
        setContent(defaultContent);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadContent();
    
    // בדיקה אם המשתמש כבר מחובר כמנהל
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []); // dependency array ריק - רק פעם אחת

  // פונקציית התחברות
  const loginAdmin = (password: string): boolean => {
    // בסביבת פיתוח, סיסמה פשוטה לצורך הדגמה
    if (password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  // פונקציה לפתיחת תיבת התחברות
  const openAdminLogin = () => {
    document.getElementById('admin-login')?.classList.remove('hidden');
  };

  // עדכון נתוני טקסט
  const updateContent = async (newContent: Partial<ContentConfig>) => {
    setContent(prev => {
      const updatedContent = { ...prev, ...newContent };
      
      // שמירת נתוני טקסט
      const textOnlyContent = { ...newContent };
      delete textOnlyContent.images;
      saveTextContent(textOnlyContent).catch(err => 
        console.error('Error saving text content:', err)
      );
      
      return updatedContent;
    });
  };

  // עדכון תמונה
  const updateImage = async (key: string, imageData: string) => {
    // שמירת התמונה ב-IndexedDB
    await saveImage(key, imageData);
    
    // עדכון ה-state
    setContent(prev => ({
      ...prev,
      images: { ...prev.images, [key]: imageData }
    }));
  };
  
  // איפוס כל הנתונים המאוחסנים
  const resetStorage = async () => {
    try {
      // מחיקת מסד הנתונים
      await deleteDatabase();
      // מחיקת נתונים מ-localStorage
      localStorage.removeItem('siteTextContent');
      localStorage.removeItem('isAdmin');
      
      // החזרת ברירת המחדל
      setContent(defaultContent);
      
      // יצירת מסד נתונים חדש
      await initDB();
      
      return true;
    } catch (error) {
      console.error('Error resetting storage:', error);
      return false;
    }
  };
  
  // ייצוא כל הנתונים לקובץ JSON
  const exportData = () => {
    const dataToExport = JSON.stringify(content);
    const blob = new Blob([dataToExport], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hapoterisrael_content_backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // ייבוא נתונים מקובץ JSON
  const importData = async (jsonData: string) => {
    try {
      const parsedData = JSON.parse(jsonData) as ContentConfig;
      
      // בדיקת תקינות הנתונים המיובאים
      if (!parsedData.title || !parsedData.heroHeading) {
        throw new Error('Invalid data format');
      }
      
      // שמירת נתוני טקסט
      const textContent = { ...parsedData };
      delete textContent.images;
      await saveTextContent(textContent);
      
      // שמירת תמונות
      if (parsedData.images) {
        for (const [key, data] of Object.entries(parsedData.images)) {
          if (typeof data === 'string' && data.startsWith('data:')) {
            await saveImage(key, data);
          }
        }
      }
      
      // עדכון ה-state
      setContent(parsedData);
      
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  };

  // אם עדיין טוען, מציג טעינה
  if (isLoading) {
    return <div>טוען...</div>;
  }

  return (
    <ContentContext.Provider value={{ 
      content, 
      updateContent, 
      updateImage,
      resetStorage,
      exportData,
      importData,
      isAdmin,
      setIsAdmin,
      loginAdmin,
      openAdminLogin
    }}>
      {children}
      {/* Admin Login Modal - moved to here from the component body */}
      <div id="admin-login" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <AdminLoginForm />
      </div>
    </ContentContext.Provider>
  );
};

// טופס התחברות אדמין
const AdminLoginForm: React.FC = () => {
  const [password, setPassword] = useState('');
  const { loginAdmin } = useContent();

  const handleLogin = () => {
    if (loginAdmin?.(password)) {
      document.getElementById('admin-login')?.classList.add('hidden');
    } else {
      alert('סיסמה שגויה');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg w-80">
      <h3 className="text-lg font-bold mb-4">כניסת מנהל</h3>
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        placeholder="סיסמה" 
        className="w-full border p-2 rounded mb-4"
      />
      <div className="flex justify-between">
        <button 
          onClick={handleLogin}
          className="bg-royal-600 text-white px-4 py-2 rounded"
        >
          כניסה
        </button>
        <button 
          onClick={() => document.getElementById('admin-login')?.classList.add('hidden')}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          ביטול
        </button>
      </div>
    </div>
  );
};

// Hook לשימוש בתוכן
export const useContent = () => React.useContext(ContentContext);

// פונקציה להקטנת גודל תמונה (שומרת על איכות גבוהה יותר)
const resizeImage = (imageUrl: string, maxWidth: number, maxHeight: number, quality: number = 0.7): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      
      // בדיקה האם התמונה גדולה מדי ודורשת הקטנה
      let needsResize = width > maxWidth || height > maxHeight || img.src.startsWith('data:');
      
      // אם התמונה קטנה מספיק, נחזיר אותה כמו שהיא
      if (!needsResize) {
        resolve(imageUrl);
        return;
      }
      
      // חישוב יחס שמירת הפרופורציות
      if (width > maxWidth) {
        const ratio = maxWidth / width;
        width = maxWidth;
        height = height * ratio;
      }
      
      if (height > maxHeight) {
        const ratio = maxHeight / height;
        height = maxHeight;
        width = width * ratio;
      }
      
      // יצירת קנבס ושרטוט התמונה בגודל החדש
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      
      // שיפור איכות הציור בקנבס
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      ctx.drawImage(img, 0, 0, width, height);
      
      // המרה לפורמט base64 עם איכות מותאמת
      const resizedImage = canvas.toDataURL('image/jpeg', quality);
      resolve(resizedImage);
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    img.src = imageUrl;
  });
};

// רכיב העלאת תמונות
const ImageUploader: React.FC<{ 
  imageKey: string; 
  imageUrl: string; 
  
  label: string;
  onUpload: (key: string, data: string) => void;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  isBeforeAfter?: boolean;
}> = ({ 
  imageKey, 
  imageUrl, 
  label, 
  onUpload, 
  maxWidth = 800, 
  maxHeight = 600, 
  quality = 0.6,
  isBeforeAfter = false
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // פונקציה לטיפול בתמונות שלא נטענות
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // מניעת לופ אין-סופי
    
    // fallback לתמונה כללית
    target.src = "https://placehold.co/600x400?text=תמונה+לא+זמינה";
    target.alt = "תמונת ברירת מחדל";
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    setError(null);
    setProgress(10); // התחלת התקדמות
    
    try {
      const reader = new FileReader();
      
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          // עדכון התקדמות הטעינה - 50% מסך התהליך
          const percentLoaded = Math.round((event.loaded / event.total) * 50);
          setProgress(percentLoaded);
        }
      };
      
      reader.onloadend = async () => {
        if (typeof reader.result === 'string') {
          try {
            setProgress(60); // התחלת עיבוד התמונה
            
            // שמירה על איכות גבוהה יותר עבור תמונות לפני/אחרי
            const resizeQuality = isBeforeAfter ? 0.75 : quality;
            
            // הקטנת התמונה לפני שמירה תוך שמירה על איכות גבוהה
            const resizedImage = await resizeImage(reader.result, maxWidth, maxHeight, resizeQuality);
            setProgress(90);
            
            onUpload(imageKey, resizedImage);
            setProgress(100);
          } catch (err) {
            console.error('Error resizing image:', err);
            setError('שגיאה בעיבוד התמונה');
          }
          setIsUploading(false);
        }
      };
      
      reader.onerror = () => {
        console.error('Error reading file');
        setError('שגיאה בקריאת הקובץ');
        setIsUploading(false);
      };
      
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Error processing image:', err);
      setError('שגיאה בעיבוד התמונה');
      setIsUploading(false);
    }
  };

  const getFileSize = (url: string): number => {
    // אם זה URL חיצוני, לא ניתן להעריך את הגודל
    if (url.startsWith('http')) return 0;
    
    // אם זה base64, ניתן להעריך בקירוב
    if (url.startsWith('data:')) {
      // חישוב גודל קובץ בקירוב: 3/4 מאורך המחרוזת עבור base64
      const base64Length = url.split(',')[1]?.length || 0;
      return Math.round((base64Length * 3) / 4); // בייטים
    }
    
    return 0;
  };
  
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return 'לא ידוע';
    
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };
  
  const fileSize = getFileSize(imageUrl);

  return (
    <div className={`border rounded-lg p-2 mb-3 ${isBeforeAfter ? 'bg-gray-50' : ''}`}>
      <div className="flex justify-between items-center mb-2">
        <label className={`text-sm font-medium ${isBeforeAfter ? 'text-royal-600' : ''}`}>{label}</label>
        <div className="flex items-center">
          {fileSize > 0 && (
            <span className="text-xs text-gray-500 ml-2">{formatFileSize(fileSize)}</span>
          )}
          <label className={`cursor-pointer ${isBeforeAfter ? 'bg-royal-600' : 'bg-royal-600'} hover:bg-royal-700 text-white px-2 py-1 rounded text-xs flex items-center`}>
            <Upload className="h-3 w-3 ml-1" />
            העלאה
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
      
      <div className="relative aspect-video bg-gray-100 rounded overflow-hidden flex items-center justify-center">
        {isUploading ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-4/5 h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-royal-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-600">טוען... {progress}%</div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-sm">{error}</div>
        ) : (
          <>
            {imageUrl.includes('.mp4') ? (
              <video 
                src={imageUrl}
                className="max-w-full max-h-full object-contain"
                controls={false}
                muted
                preload="none"
                poster="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1"
                onError={(e) => {
                  const target = e.target as HTMLVideoElement;
                  console.error('Video preview failed:', imageUrl);
                  target.style.display = 'none';
                  
                  // הצג טקסט fallback
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.video-fallback-text')) {
                    const fallbackDiv = document.createElement('div');
                    fallbackDiv.className = 'video-fallback-text flex items-center justify-center w-full h-full bg-gray-100 text-gray-500 text-sm rounded';
                    fallbackDiv.innerHTML = '🎬<br>קובץ וידאו';
                    parent.appendChild(fallbackDiv);
                  }
                }}
              >
                קובץ וידאו לא נטען
              </video>
            ) : (
              <img 
                src={imageUrl} 
                alt={label}
                className="max-w-full max-h-full object-contain"
                onError={handleImageError}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

// ממשק ניהול תוכן בסיסי - רק למנהלי האתר
const ContentManager: React.FC = () => {
  const { content, updateContent, updateImage, resetStorage, exportData, importData, isAdmin, setIsAdmin } = useContent();
  const [activeTab, setActiveTab] = useState('text'); // 'text', 'images', 'mockups', או 'settings'
  const [importFile, setImportFile] = useState<File | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleReset = async () => {
    if (window.confirm('האם אתה בטוח שברצונך לאפס את כל הנתונים? פעולה זו אינה הפיכה!')) {
      const success = await resetStorage?.();
      if (success) {
        showNotification('האתר אופס בהצלחה', 'success');
      } else {
        showNotification('אירעה שגיאה באיפוס האתר', 'error');
      }
    }
  };

  const handleExport = () => {
    exportData?.();
    showNotification('הנתונים יוצאו בהצלחה', 'success');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImportFile(file);
    }
  };

  const handleImport = async () => {
    if (!importFile) {
      showNotification('יש לבחור קובץ תחילה', 'error');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target?.result as string;
        const success = await importData?.(content);
        
        if (success) {
          showNotification('הנתונים יובאו בהצלחה', 'success');
          setImportFile(null);
        } else {
          showNotification('אירעה שגיאה בייבוא הנתונים', 'error');
        }
      };
      reader.readAsText(importFile);
    } catch (error) {
      console.error('Error reading import file:', error);
      showNotification('אירעה שגיאה בקריאת הקובץ', 'error');
    }
  };

  if (!isAdmin) {
    return null; // הרכיב לא מציג כלום אם המשתמש אינו מנהל
  }

  return (
    <div className="fixed top-20 left-6 z-40 bg-white shadow-lg rounded-lg p-4 max-w-xs">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">ניהול תוכן</h3>
        <button 
          onClick={() => {
            localStorage.removeItem('isAdmin');
            setIsAdmin?.(false);
          }}
          className="text-gray-500 hover:text-red-500"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      {notification && (
        <div className={`mb-4 p-2 rounded text-white text-sm ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {notification.message}
        </div>
      )}
      
      <div className="flex mb-4 border-b overflow-x-auto">
        <button 
          className={`px-3 py-2 ${activeTab === 'text' ? 'border-b-2 border-royal-600 text-royal-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('text')}
        >
          טקסט
        </button>
        <button 
          className={`px-3 py-2 ${activeTab === 'images' ? 'border-b-2 border-royal-600 text-royal-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('images')}
        >
          <div className="flex items-center">
            <ImageIcon className="h-4 w-4 ml-1" />
            תמונות
          </div>
        </button>
        <button 
          className={`px-3 py-2 ${activeTab === 'mockups' ? 'border-b-2 border-royal-600 text-royal-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('mockups')}
        >
          <div className="flex items-center">
            מוקאפים
          </div>
        </button>
        <button 
          className={`px-3 py-2 ${activeTab === 'settings' ? 'border-b-2 border-royal-600 text-royal-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('settings')}
        >
          <div className="flex items-center">
            הגדרות
          </div>
        </button>
      </div>
      
      {activeTab === 'text' && (
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          <div>
            <label className="block text-sm font-medium mb-1">כותרת האתר</label>
            <input 
              type="text" 
              value={content.title} 
              onChange={(e) => updateContent?.({ title: e.target.value })}
              className="w-full border p-2 rounded text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">תיאור האתר</label>
            <textarea 
              value={content.description} 
              onChange={(e) => updateContent?.({ description: e.target.value })}
              className="w-full border p-2 rounded text-sm"
              rows={2}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">כותרת גיבור</label>
            <input 
              type="text" 
              value={content.heroHeading} 
              onChange={(e) => updateContent?.({ heroHeading: e.target.value })}
              className="w-full border p-2 rounded text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">תת-כותרת גיבור</label>
            <input 
              type="text" 
              value={content.heroSubheading} 
              onChange={(e) => updateContent?.({ heroSubheading: e.target.value })}
              className="w-full border p-2 rounded text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">כותרת אודות</label>
            <input 
              type="text" 
              value={content.aboutTitle} 
              onChange={(e) => updateContent?.({ aboutTitle: e.target.value })}
              className="w-full border p-2 rounded text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">תיאור אודות</label>
            <textarea 
              value={content.aboutDescription} 
              onChange={(e) => updateContent?.({ aboutDescription: e.target.value })}
              className="w-full border p-2 rounded text-sm"
              rows={2}
            />
          </div>
        </div>
      )}
      
      {activeTab === 'images' && (
        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
          <h4 className="font-medium text-sm mb-2">עמוד ראשי</h4>
          <ImageUploader 
            imageKey="hero" 
            imageUrl={content.images.hero}
            label="תמונת כותרת"
            onUpload={updateImage || (() => {})}
          />
          
          <ImageUploader 
            imageKey="about" 
            imageUrl={content.images.about}
            label="תמונת מנכ״ל"
            onUpload={updateImage || (() => {})}
          />
          
          <h4 className="font-medium text-sm mt-4 mb-2">מצגות</h4>
          <div className="grid grid-cols-2 gap-2">
            <ImageUploader 
              imageKey="presentation1" 
              imageUrl={content.images.presentation1}
              label="מצגת 1"
              onUpload={updateImage || (() => {})}
            />
            <ImageUploader 
              imageKey="presentation2" 
              imageUrl={content.images.presentation2}
              label="מצגת 2"
              onUpload={updateImage || (() => {})}
            />
            <ImageUploader 
              imageKey="presentation3" 
              imageUrl={content.images.presentation3}
              label="מצגת 3"
              onUpload={updateImage || (() => {})}
            />
            <ImageUploader 
              imageKey="presentation4" 
              imageUrl={content.images.presentation4}
              label="מצגת 4"
              onUpload={updateImage || (() => {})}
            />
          </div>
          
          <h4 className="font-medium text-sm mt-4 mb-2">תמונות - לפני ואחרי</h4>
          <div className="bg-coral-50 p-3 rounded-lg mb-2">
            <p className="text-xs text-coral-700 mb-2">Tanti Model - שינוי דוגמנית לפי דרישה</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ImageUploader 
              imageKey="image1" 
              imageUrl={content.images.image1}
              label="לפני - Tanti Model מקורי"
              onUpload={updateImage || (() => {})}
            />
            <ImageUploader 
              imageKey="image2" 
              imageUrl={content.images.image2}
              label="אחרי - Tanti Model אחרי שינוי"
              onUpload={updateImage || (() => {})}
            />
            <ImageUploader 
              imageKey="image3" 
              imageUrl={content.images.image3}
              label="תמונה 3"
              onUpload={updateImage || (() => {})}
            />
            <ImageUploader 
              imageKey="image4" 
              imageUrl={content.images.image4}
              label="תמונה 4"
              onUpload={updateImage || (() => {})}
            />
          </div>
          
          <h4 className="font-medium text-sm mt-4 mb-2">רעיונאות ותוכן</h4>
          <div className="bg-green-50 p-3 rounded-lg mb-2">
            <p className="text-xs text-green-700 mb-2">תמונה לשירות רעיונאות ותוכן - אדם כותב רעיונות</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ImageUploader 
              imageKey="video3" 
              imageUrl={content.images.video3}
              label="רעיונאות ותוכן"
              onUpload={updateImage || (() => {})}
            />
            <ImageUploader 
              imageKey="video1" 
              imageUrl={content.images.video1}
              label="וידאו 1"
              onUpload={updateImage || (() => {})}
            />
            <ImageUploader 
              imageKey="video2" 
              imageUrl={content.images.video2}
              label="וידאו 2"
              onUpload={updateImage || (() => {})}
            />
            <ImageUploader 
              imageKey="video4" 
              imageUrl={content.images.video4}
              label="Tanti Model אחרי"
              onUpload={updateImage || (() => {})}
            />
          </div>
        </div>
      )}
      
      {activeTab === 'mockups' && (
        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
          <div className="bg-gray-100 p-3 rounded-lg mb-4">
            <h4 className="font-medium text-sm mb-2 text-royal-600">תמונות יצירת מוקאפים</h4>
            <p className="text-xs text-gray-600 mb-3">
              טאב יצירת מוקאפים - לפני ואחרי
            </p>
          </div>
          
          <div className="border-2 border-royal-100 rounded-lg p-3 mb-4">
            <h5 className="font-medium text-sm mb-2 text-royal-600">טאב יצירת מוקאפים</h5>
            <ImageUploader 
              imageKey="before1" 
              imageUrl={content.images.before1}
              label="לפני - דגם בסיסי"
              onUpload={updateImage || (() => {})}
              maxWidth={800}
              maxHeight={600}
              quality={0.7}
              isBeforeAfter={true}
            />
            <ImageUploader 
              imageKey="after1" 
              imageUrl={content.images.after1}
              label="אחרי - מוקאפ מעוצב"
              onUpload={updateImage || (() => {})}
              maxWidth={800}
              maxHeight={600}
              quality={0.7}
              isBeforeAfter={true}
            />
            <p className="text-xs text-gray-500 mt-1">
              הדוגמה מציגה איך אנחנו יוצרים מוקאפים מקצועיים ומרשימים למוצרים שונים
            </p>
          </div>
          
          <div className="border-2 border-coral-100 rounded-lg p-3 mb-4">
            <h5 className="font-medium text-sm mb-2 text-coral-600">Be There - מסקיצה למוקאפ</h5>
            <ImageUploader 
              imageKey="before3" 
              imageUrl={content.images.before3}
              label="לפני - סקיצה חדשה של Be There"
              onUpload={updateImage || (() => {})}
              maxWidth={800}
              maxHeight={600}
              quality={0.7}
              isBeforeAfter={true}
            />
            <ImageUploader 
              imageKey="after3" 
              imageUrl={content.images.after3}
              label="אחרי - מוקאפ חדש של Be There"
              onUpload={updateImage || (() => {})}
              maxWidth={800}
              maxHeight={600}
              quality={0.7}
              isBeforeAfter={true}
            />
            <p className="text-xs text-gray-500 mt-1">
              דוגמה חדשה של יצירת מוקאפ מקצועי מסקיצה ראשונית - Be There
            </p>
          </div>
          
          <div className="text-xs text-gray-500 mt-2">
            <p>אחסון: IndexedDB (עד ~10MB מותאם לביצועים)</p>
            <p>איכות תמונה: 70% (מותאם למהירות)</p>
            <p>רזולוציה מקסימלית: 800x600</p>
          </div>
        </div>
      )}
      
      {activeTab === 'settings' && (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-2">גיבוי ושחזור</h4>
            <div className="space-y-2">
              <button 
                onClick={handleExport}
                className="w-full bg-royal-600 text-white py-2 px-4 rounded text-sm hover:bg-royal-700"
              >
                ייצוא נתונים
              </button>
              
              <div className="border rounded p-2">
                <p className="text-sm mb-2">ייבוא נתונים מקובץ:</p>
                <input 
                  type="file" 
                  accept=".json"
                  onChange={handleImportFile}
                  className="text-xs mb-2"
                />
                <button 
                  onClick={handleImport}
                  className={`w-full py-1 px-2 rounded text-sm ${
                    importFile 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!importFile}
                >
                  {importFile ? 'טען קובץ' : 'בחר קובץ תחילה'}
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-2 text-red-600">מסוכן</h4>
            <button 
              onClick={handleReset}
              className="w-full bg-red-600 text-white py-2 px-4 rounded text-sm hover:bg-red-700"
            >
              איפוס האתר
            </button>
            <p className="text-xs text-gray-500 mt-1">
              פעולה זו תמחק את כל הנתונים המאוחסנים ותחזיר את האתר למצב ברירת המחדל.
            </p>
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-xs text-gray-500">
              נפח אחסון: <span className="font-medium">~10MB</span> (IndexedDB)
            </p>
            <p className="text-xs text-gray-500">
              מידע נשמר בדפדפן המקומי ונשמר בין סשנים
            </p>
          </div>
        </div>
      )}
      
      <div className="mt-4 text-xs text-gray-500 text-center">
        {activeTab === 'text' 
          ? 'שינויי טקסט נשמרים אוטומטית' 
          : activeTab === 'images'
            ? 'תמונות נשמרות לצמיתות באחסון המקומי' 
            : activeTab === 'mockups'
              ? 'תמונות מוקאפים - איכות גבוהה'
              : 'גבה את הנתונים שלך באופן קבוע'}
      </div>
    </div>
  );
};

export default ContentManager;