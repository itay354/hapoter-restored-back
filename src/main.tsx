import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { ContentProvider } from './components/ContentManager';
import './index.css';

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh',
          padding: '20px',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#ef4444', marginBottom: '20px' }}>שגיאה בטעינת האפליקציה</h1>
          <p style={{ color: '#6b7280', marginBottom: '20px' }}>
            {this.state.error?.message || 'אירעה שגיאה לא צפויה'}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              padding: '10px 20px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            רענן דף
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  document.body.innerHTML = '<h1 style="color: red; text-align: center; margin-top: 50px;">שגיאה: לא נמצא אלמנט root</h1>';
} else {
  const root = createRoot(rootElement);
  
  try {
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <HelmetProvider>
            <ContentProvider>
              <App />
            </ContentProvider>
          </HelmetProvider>
        </ErrorBoundary>
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Failed to render app:', error);
    document.body.innerHTML = '<h1 style="color: red; text-align: center; margin-top: 50px;">שגיאה בטעינת האפליקציה</h1>';
  }
}