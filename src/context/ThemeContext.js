import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode debe usarse dentro de ThemeModeProvider');
  }
  return context;
};

export const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState('dark');

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
