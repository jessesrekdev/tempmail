import { motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Toaster } from 'sonner';
import { ReactNode } from 'react';
import { CommunityPopup } from './CommunityPopup';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <Sidebar />
      <main className="md:ml-64 min-h-screen p-4 md:p-8 pt-20 md:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          {children}
        </motion.div>
      </main>
      <Toaster position="top-right" theme="system" richColors closeButton />
      <CommunityPopup />
    </div>
  );
};
