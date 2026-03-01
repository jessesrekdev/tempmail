import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, RefreshCw, Check, Inbox, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useTempMail, EmailMessage } from '../hooks/useTempMail';
import { cn } from '../utils/utils';
import { format } from 'date-fns';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const { settings } = useApp();
  const { currentEmail, messages, loading, refreshing, generateEmail, fetchMessages } = useTempMail(settings.autoRefresh);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = () => {
    if (currentEmail) {
      navigator.clipboard.writeText(currentEmail.address);
      setCopied(true);
      toast.success('Email copied to clipboard', {
        icon: <Check className="text-green-500" size={18} />,
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRefresh = () => {
    fetchMessages();
    toast.info('Checking for new messages...', {
      icon: <RefreshCw className="animate-spin text-blue-500" size={18} />,
    });
  };

  const handleGenerateNew = () => {
    generateEmail();
    toast.success('New email address generated', {
      icon: <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <RefreshCw className="text-indigo-500" size={18} />
      </motion.div>,
    });
  };

  const handleOpenMessage = (msg: EmailMessage) => {
    navigate(`/message/${msg.id}`);
  };

  const getSenderInfo = (from: string) => {
    if (!from) return { name: 'Unknown', email: '' };
    
    // Check for format: "Name" <email> or Name <email>
    const emailMatch = from.match(/<([^>]+)>/);
    if (emailMatch) {
      const email = emailMatch[1];
      const name = from.replace(/<[^>]+>/, '').replace(/"/g, '').trim();
      return { name: name || email, email };
    }
    
    // Fallback if no brackets
    return { name: from, email: '' };
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          Temporary Email
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Secure, anonymous, and free disposable email address.
        </p>
      </div>

      {/* Email Card */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-30 group-hover:opacity-50 blur transition duration-500"></div>
        <div className="relative bg-white dark:bg-[#111] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl border border-gray-100 dark:border-white/5 transition-all duration-300">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
            
            <div className="flex-1 w-full min-w-0">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">
                Your Email Address
              </label>
              <div className="py-2">
                {loading ? (
                  <div className="h-8 w-64 bg-gray-200 dark:bg-white/5 animate-pulse rounded"></div>
                ) : (
                  <div className="relative group/email cursor-pointer inline-block max-w-full" onClick={handleCopy}>
                    <span className="text-xl sm:text-2xl lg:text-3xl font-mono font-bold text-gray-900 dark:text-white tracking-tight truncate block">
                      {currentEmail?.address || 'Generating...'}
                    </span>
                    <span className="absolute -top-8 left-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover/email:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      Click to copy
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-start lg:justify-end flex-shrink-0">
              <button
                onClick={handleCopy}
                disabled={loading}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-green-700 hover:bg-green-800 text-white rounded-xl text-sm font-medium transition-all active:scale-95 shadow-md shadow-green-900/20 whitespace-nowrap"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              
              <button
                onClick={handleGenerateNew}
                disabled={loading}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-xl text-sm font-medium transition-all active:scale-95 shadow-md shadow-gray-900/20 whitespace-nowrap"
                title="Generate New Email"
              >
                <RefreshCw size={18} className={cn(loading && "animate-spin")} />
                <span>New Address</span>
              </button>
            </div>
          </div>
          
          {/* Timer / Status */}
          <div className="mt-8 flex flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-white/5 pt-6">
            <div className="flex items-center gap-2">
               <div className={cn("w-2 h-2 rounded-full flex-shrink-0", settings.autoRefresh ? "bg-green-500 animate-pulse" : "bg-gray-400")}></div>
               <span className="truncate">{settings.autoRefresh ? "Auto-refreshing inbox" : "Auto-refresh paused"}</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Clock size={14} />
              <span>Expires soon</span>
            </div>
          </div>
        </div>
      </div>

      {/* Inbox Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Inbox className="text-indigo-500" />
            <span>Inbox</span>
            <span className="bg-gray-200 dark:bg-white/10 text-xs px-2 py-0.5 rounded-full text-gray-600 dark:text-gray-300">
              {messages.length}
            </span>
          </h2>
          <button 
            onClick={handleRefresh}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <RefreshCw size={14} className={cn(refreshing && "animate-spin")} />
            Refresh
          </button>
        </div>

        <div className="bg-white dark:bg-[#111] rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 overflow-hidden min-h-[300px]">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[300px] text-gray-400 space-y-4">
              <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center">
                <Inbox size={32} className="opacity-50" />
              </div>
              <p>Your inbox is empty</p>
              <p className="text-xs max-w-xs text-center opacity-60">
                Waiting for incoming emails. They will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-white/5">
              <AnimatePresence>
                {messages.map((msg) => {
                  const sender = getSenderInfo(msg.from);
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      onClick={() => handleOpenMessage(msg)}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors group border-b border-gray-50 dark:border-white/5 last:border-0"
                    >
                      <div className="flex items-start gap-4">
                        {/* Profile Icon */}
                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex-shrink-0 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-lg">
                          {sender.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                             <div className="min-w-0">
                                <div className="font-semibold text-gray-900 dark:text-white truncate text-sm">
                                  {sender.name}
                                </div>
                                {sender.email && (
                                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                     {sender.email}
                                  </div>
                                )}
                             </div>
                             <span className="text-xs text-gray-400 whitespace-nowrap ml-2 flex-shrink-0">
                               {format(new Date(msg.date), 'h:mm a')}
                             </span>
                          </div>
                          
                          <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate group-hover:text-indigo-500 transition-colors">
                            {msg.subject || '(No Subject)'}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-500 truncate mt-1">
                             {msg.textBody ? msg.textBody.substring(0, 80) : 'Click to view full message content...'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
