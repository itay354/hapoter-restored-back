import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { ContentProvider } from './components/ContentManager';
import './index.css';

console.log('Starting application...');

const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

if (!rootElement) {
  console.error('Root element not found!');
  document.body.innerHTML = '<h1 style="color: red; text-align: center; margin-top: 50px;">שגיאה: לא נמצא אלמנט root</h1>';
} else {
  console.log('Creating React root...');
  const root = createRoot(rootElement);
  console.log('Rendering App...');
  
  try {
    root.render(
      <React.StrictMode>
        <HelmetProvider>
          <ContentProvider>
            <App />
          </ContentProvider>
        </HelmetProvider>
      </React.StrictMode>
    );
    console.log('App rendered successfully!');
  } catch (error) {
    console.error('Failed to render app:', error);
    document.body.innerHTML = '<h1 style="color: red; text-align: center; margin-top: 50px;">שגיאה בטעינת האפליקציה</h1>';
  }
}