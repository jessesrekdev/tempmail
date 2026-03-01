import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Instagram, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const CommunityPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<'telegram' | 'instagram' | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkPopup = () => {
      // Don't show on credits page
      if (location.pathname === '/credits') return;

      const hasSeenTelegram = localStorage.getItem('popup_telegram_seen');
      const hasSeenInstagram = localStorage.getItem('popup_instagram_seen');

      // Logic: Show Telegram on Home, Instagram on History/Settings, but only once
      if (location.pathname === '/' && !hasSeenTelegram) {
        // Small delay to not be intrusive immediately
        const timer = setTimeout(() => {
          setType('telegram');
          setIsOpen(true);
          localStorage.setItem('popup_telegram_seen', 'true');
        }, 3000);
        return () => clearTimeout(timer);
      } else if ((location.pathname === '/history' || location.pathname === '/settings') && !hasSeenInstagram) {
        const timer = setTimeout(() => {
          setType('instagram');
          setIsOpen(true);
          localStorage.setItem('popup_instagram_seen', 'true');
        }, 2000);
        return () => clearTimeout(timer);
      }
    };

    checkPopup();
  }, [location.pathname]);

  const closePopup = () => setIsOpen(false);

  if (!type) return null;

  const content = {
    telegram: {
      icon: Send,
      color: 'bg-[#229ED9]',
      textColor: 'text-[#229ED9]',
      title: 'Join our Telegram!',
      text: 'Get updates and join the discussion with Jesse Srek Dev.',
      link: 'https://t.me/jesse_pro',
      linkText: 't.me/jesse_pro',
      buttonBg: 'bg-[#229ED9] hover:bg-[#1b8bc2]'
    },
    instagram: {
      icon: Instagram,
      color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500',
      textColor: 'text-purple-600 dark:text-purple-400',
      title: 'Follow on Instagram',
      text: 'Check out @its_crazydev for coding vibes and updates.',
      link: 'https://instagram.com/its_crazydev',
      linkText: '@its_crazydev',
      buttonBg: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
    }
  }[type];

  const Icon = content.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 max-w-sm w-full p-4"
        >
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden relative">
            <button 
              onClick={closePopup}
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors z-10"
            >
              <X size={18} />
            </button>

            <div className="flex gap-4 p-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg ${content.color}`}>
                <Icon size={24} />
              </div>
              <div className="space-y-1 pr-6">
                <h3 className="font-bold text-gray-900 dark:text-white">{content.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-snug">
                  {content.text}
                </p>
                <a 
                  href={content.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block mt-3 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors shadow-md ${content.buttonBg}`}
                  onClick={closePopup}
                >
                  Visit {content.linkText}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
