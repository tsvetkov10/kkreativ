import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0c',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Възникна неочаквана грешка</h2>
          <button 
            type="button" 
            onClick={() => window.location.reload()}
            style={{
              background: '#d4af37',
              border: 'none',
              borderRadius: '8px',
              padding: '0.8rem 1.8rem',
              color: '#0a0a0c',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Презареди страницата
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
