import { NavLink, useLocation } from 'react-router-dom';
import { Mail, History, Settings, FileText, Shield, Menu, X, Sun, Moon, Heart } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { cn } from '../utils/utils';

export const Sidebar = () => {
  const { theme, toggleTheme } = useApp();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: '/', icon: Mail, label: 'Generator' },
    { to: '/history', icon: History, label: 'History' },
    { to: '/settings', icon: Settings, label: 'Settings' },
    { to: '/credits', icon: Heart, label: 'Credits' },
    { to: '/terms', icon: FileText, label: 'Terms' },
    { to: '/privacy', icon: Shield, label: 'Privacy' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <Mail size={18} />
          </div>
          <span className="text-gray-900 dark:text-white">TempMail</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={toggleMenu} className="p-2 text-gray-600 dark:text-gray-300">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 bg-white dark:bg-zinc-900 z-40 md:hidden pt-20 px-4"
          >
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                      isActive
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
                    )
                  }
                >
                  <link.icon size={20} />
                  <span className="font-medium">{link.label}</span>
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-gray-50/50 dark:bg-black/20 border-r border-gray-200 dark:border-white/5 backdrop-blur-xl z-50">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <Mail size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">TempMail</span>
        </div>

        <nav className="flex-1 px-4 py-4 flex flex-col gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                )
              }
            >
              <link.icon size={20} className="relative z-10" />
              <span className="font-medium relative z-10">{link.label}</span>
              {/* Hover Effect Background */}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-200 dark:border-white/5">
          <div className="flex items-center justify-between mb-4 px-2">
             <span className="text-sm text-gray-500 dark:text-gray-400">Theme</span>
             <button 
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-white/10 rounded-full transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-600 text-center">
            v1.0.0 • No Logs
          </div>
        </div>
      </div>
    </>
  );
};
