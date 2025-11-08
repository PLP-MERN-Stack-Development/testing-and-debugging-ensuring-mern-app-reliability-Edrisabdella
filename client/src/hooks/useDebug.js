import { useState, useEffect, useRef } from 'react';

export const useDebug = (componentName) => {
  const [debugInfo, setDebugInfo] = useState({
    renders: 0,
    props: {},
    state: {},
    errors: []
  });

  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    setDebugInfo(prev => ({
      ...prev,
      renders: renderCount.current
    }));

    // Log in development only
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔍 ${componentName} - Render #${renderCount.current}`);
    }
  });

  const logError = (error, errorInfo) => {
    const errorEntry = {
      timestamp: new Date().toISOString(),
      error: error.toString(),
      stack: error.stack,
      componentStack: errorInfo?.componentStack
    };

    setDebugInfo(prev => ({
      ...prev,
      errors: [...prev.errors, errorEntry]
    }));

    console.error(`🚨 ${componentName} Error:`, errorEntry);
  };

  const updateProps = (props) => {
    setDebugInfo(prev => ({
      ...prev,
      props
    }));
  };

  const updateState = (state) => {
    setDebugInfo(prev => ({
      ...prev,
      state
    }));
  };

  return {
    debugInfo,
    logError,
    updateProps,
    updateState
  };
};