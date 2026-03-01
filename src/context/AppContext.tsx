import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface Settings {
  autoRefresh: boolean;
  notifications: boolean;
  soundEnabled: boolean;
}

interface UserProfile {
  username: string;
  avatarUrl: string | null;
}

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  profile: UserProfile;
  updateProfile: (newProfile: Partial<UserProfile>) => void;
  clearData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('temp_mail_theme');
    return (saved as Theme) || 'light'; // Default to light
  });

  // Settings
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('temp_mail_settings');
    return saved ? JSON.parse(saved) : { autoRefresh: true, notifications: true, soundEnabled: false };
  });

  // Profile
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('temp_mail_profile');
    return saved ? JSON.parse(saved) : { username: 'Anonymous User', avatarUrl: null };
  });

  useEffect(() => {
    localStorage.setItem('temp_mail_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('temp_mail_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('temp_mail_profile', JSON.stringify(profile));
  }, [profile]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateProfile = (newProfile: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...newProfile }));
  };

  const clearData = () => {
    localStorage.removeItem('temp_mail_history');
    localStorage.removeItem('temp_mail_current');
    localStorage.removeItem('temp_mail_profile');
    localStorage.removeItem('temp_mail_settings');
    // Reset state
    setSettings({ autoRefresh: true, notifications: true, soundEnabled: false });
    setProfile({ username: 'Anonymous User', avatarUrl: null });
    window.location.reload();
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, settings, updateSettings, profile, updateProfile, clearData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
