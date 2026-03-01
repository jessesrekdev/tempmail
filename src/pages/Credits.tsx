import { motion } from 'framer-motion';
import { Instagram, Send, Mail, User, Heart, Code, ExternalLink } from 'lucide-react';

export const Credits = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      <div className="text-center space-y-4">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto text-white shadow-xl shadow-indigo-500/20"
        >
          <Heart size={40} fill="currentColor" />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-gray-900 dark:text-white"
        >
          Credits & Community
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Meet the developer and join our growing community of tech enthusiasts.
        </motion.p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-2 gap-6"
      >
        {/* Developer Card */}
        <motion.div variants={item} className="md:col-span-2">
          <div className="bg-white dark:bg-[#111] rounded-3xl border border-gray-200 dark:border-white/5 p-8 shadow-sm overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Code size={120} />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <div className="w-24 h-24 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                <User size={48} />
              </div>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-medium">
                  Lead Developer
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Jesse Srek Dev</h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-md">
                  Passionate about building beautiful, functional, and user-friendly applications. 
                  Dedicated to creating tools that make digital life easier.
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                  <a href="mailto:jessesrek@gmail.com" className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <Mail size={16} />
                    jessesrek@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Telegram Card */}
        <motion.div variants={item}>
          <a 
            href="https://t.me/jesse_pro" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block h-full bg-[#229ED9]/10 hover:bg-[#229ED9]/20 border border-[#229ED9]/20 rounded-3xl p-8 transition-all hover:scale-[1.02] group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="p-4 bg-[#229ED9] rounded-2xl text-white shadow-lg shadow-[#229ED9]/30">
                <Send size={32} />
              </div>
              <ExternalLink size={24} className="text-[#229ED9] opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Telegram Community</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Join our channel for updates, discussions, and direct support.
            </p>
            <span className="text-[#229ED9] font-medium group-hover:underline">t.me/jesse_pro</span>
          </a>
        </motion.div>

        {/* Instagram Card */}
        <motion.div variants={item}>
          <a 
            href="https://instagram.com/its_crazydev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block h-full bg-gradient-to-br from-purple-500/10 to-orange-500/10 hover:from-purple-500/20 hover:to-orange-500/20 border border-purple-500/20 rounded-3xl p-8 transition-all hover:scale-[1.02] group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="p-4 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-2xl text-white shadow-lg shadow-purple-500/30">
                <Instagram size={32} />
              </div>
              <ExternalLink size={24} className="text-purple-500 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Instagram</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Follow for behind-the-scenes, coding tips, and daily inspiration.
            </p>
            <span className="text-purple-600 dark:text-purple-400 font-medium group-hover:underline">@its_crazydev</span>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};
