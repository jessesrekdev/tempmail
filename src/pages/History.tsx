import { useState, useEffect } from 'react';
import { Trash2, Mail, ArrowRight, Calendar, ChevronDown, ChevronUp, Inbox, Copy, Check, Clock, MoreVertical } from 'lucide-react';
import { useTempMail, TempEmail, EmailMessage } from '../hooks/useTempMail';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { ConfirmDialog } from '../components/ConfirmDialog';

interface HistoryItem extends TempEmail {
  messages?: EmailMessage[];
}

export const History = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const { setCurrentEmail } = useTempMail();
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [showClearDialog, setShowClearDialog] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('temp_mail_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setMenuOpenId(null);
    if (menuOpenId) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [menuOpenId]);

  const clearHistory = () => {
    localStorage.removeItem('temp_mail_history');
    setHistory([]);
    toast.success('History cleared');
  };

  const restoreEmail = (email: TempEmail, e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpenId(null);
    setCurrentEmail(email);
    localStorage.setItem('temp_mail_current', JSON.stringify(email));
    toast.success(`Switched to ${email.address}`);
    navigate('/');
  };

  const copyEmail = (address: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(address);
    setCopiedId(address);
    toast.success('Email copied');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const deleteHistoryItem = (address: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpenId(null);
    if (confirm('Delete this email from history?')) {
      const newHistory = history.filter(h => h.address !== address);
      setHistory(newHistory);
      localStorage.setItem('temp_mail_history', JSON.stringify(newHistory));
      toast.success('Email removed from history');
    }
  };

  const toggleExpand = (address: string) => {
    setMenuOpenId(null);
    setExpandedId(expandedId === address ? null : address);
  };

  const toggleMenu = (address: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpenId(menuOpenId === address ? null : address);
  };

  const viewMessage = (msgId: string | number) => {
    navigate(`/message/${msgId}`);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto overflow-x-hidden w-full">
      <ConfirmDialog
        isOpen={showClearDialog}
        onClose={() => setShowClearDialog(false)}
        onConfirm={clearHistory}
        title="Clear History?"
        message="Are you sure you want to delete all your generated email history? This action cannot be undone."
        confirmText="Clear History"
        isDangerous={true}
      />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            History
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Your previously generated email addresses.
          </p>
        </div>
        
        {history.length > 0 && (
          <button
            onClick={() => setShowClearDialog(true)}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm font-medium self-start md:self-auto border border-transparent hover:border-red-100 dark:hover:border-red-900/30"
          >
            <Trash2 size={16} />
            <span>Clear History</span>
          </button>
        )}
      </div>

      <div className="grid gap-4 w-full">
        {history.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock size={40} className="text-gray-300 dark:text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No history yet</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
              Generate your first temporary email to see it listed here.
            </p>
          </div>
        ) : (
          history.map((email, index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={`${email.address}-${index}`}
              className="bg-white dark:bg-[#111] rounded-xl border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-md transition-all group relative w-full"
            >
              <div 
                className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4 cursor-pointer hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors rounded-xl"
                onClick={() => toggleExpand(email.address)}
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Mail size={18} className="sm:w-5 sm:h-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 grid gap-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <h3 className="font-mono font-medium text-gray-900 dark:text-white text-base sm:text-lg truncate flex-1">
                      {email.address}
                    </h3>
                    <button
                      onClick={(e) => copyEmail(email.address, e)}
                      className="flex-shrink-0 p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                      title="Copy email"
                    >
                      {copiedId === email.address ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Calendar size={14} className="flex-shrink-0" />
                      <span className="truncate hidden sm:inline">
                        {format(new Date(email.createdAt), 'MMM d, yyyy • h:mm a')}
                      </span>
                      <span className="truncate sm:hidden">
                        {format(new Date(email.createdAt), 'MMM d • h:mm a')}
                      </span>
                    </div>
                    {email.messages && email.messages.length > 0 && (
                      <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-medium whitespace-nowrap">
                        <Inbox size={14} className="flex-shrink-0" />
                        <span>{email.messages.length} messages</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  {/* Desktop Actions */}
                  <div className="hidden lg:flex items-center gap-2">
                    <button
                      onClick={(e) => restoreEmail(email, e)}
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-white/5 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400 rounded-lg transition-all"
                      title="Switch to this email"
                    >
                      <span>Use</span>
                      <ArrowRight size={16} />
                    </button>
                    
                    <button
                      onClick={(e) => deleteHistoryItem(email.address, e)}
                      className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                      title="Delete from history"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Mobile/Tablet Menu */}
                  <div className="lg:hidden relative">
                    <button
                      onClick={(e) => toggleMenu(email.address, e)}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <MoreVertical size={20} />
                    </button>
                    
                    <AnimatePresence>
                      {menuOpenId === email.address && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl border border-gray-200 dark:border-white/10 z-50 overflow-hidden"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="p-1">
                            <button
                              onClick={(e) => restoreEmail(email, e)}
                              className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                            >
                              <ArrowRight size={16} className="text-indigo-500" />
                              Switch to this
                            </button>
                            <button
                              onClick={(e) => deleteHistoryItem(email.address, e)}
                              className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="p-2 text-gray-400 transition-transform duration-200">
                    {expandedId === email.address ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {expandedId === email.address && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-black/20 overflow-hidden rounded-b-xl"
                  >
                    {email.messages && email.messages.length > 0 ? (
                      <div className="divide-y divide-gray-100 dark:divide-white/5">
                        {email.messages.map((msg) => (
                          <div 
                            key={msg.id}
                            onClick={() => viewMessage(msg.id)}
                            className="p-4 pl-[4.5rem] hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer transition-colors group/msg"
                          >
                            <div className="flex justify-between items-start gap-4 mb-1">
                              <span className="font-medium text-gray-900 dark:text-white text-sm truncate flex-1">
                                {msg.from}
                              </span>
                              <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
                                {format(new Date(msg.date), 'MMM d, h:mm a')}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300 truncate group-hover/msg:text-gray-900 dark:group-hover/msg:text-gray-100 transition-colors">
                              {msg.subject || '(No Subject)'}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm flex flex-col items-center gap-2">
                        <Inbox size={24} className="opacity-20" />
                        <p>No messages stored for this email.</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

function HistoryIcon({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}
