import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, FileText, Calendar, User, Clock, Maximize2, Minimize2 } from 'lucide-react';
import { useTempMail } from '../hooks/useTempMail';
import { format } from 'date-fns';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';
import { cn } from '../utils/utils';

export const MessageView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { messages, readMessage, loading } = useTempMail(false); // Disable auto-refresh while reading
  const [message, setMessage] = useState<any>(null);
  const [loadingMessage, setLoadingMessage] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const loadMessage = async () => {
      if (!id) return;
      
      setLoadingMessage(true);
      // Try to find in existing messages first
      const foundMsg = messages.find(m => String(m.id) === id);
      
      if (foundMsg) {
        setMessage(foundMsg);
        setLoadingMessage(false);
      } else {
        // If not found (e.g. direct link or refresh), try to fetch
        const msg = await readMessage(id);
        if (msg) {
          setMessage(msg);
        }
        setLoadingMessage(false);
      }
    };

    loadMessage();
  }, [id, messages]);

  const toggleExpand = () => setIsExpanded(!isExpanded);

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

  const sender = message ? getSenderInfo(message.from) : { name: '', email: '' };

  if (loadingMessage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 size={40} className="animate-spin text-indigo-600 mb-4" />
        <p className="text-gray-500">Loading message...</p>
      </div>
    );
  }

  if (!message) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
          <FileText size={32} className="opacity-40" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Message not found</h2>
        <p className="text-gray-500 mb-6">The message you are looking for does not exist or has expired.</p>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back to Inbox</span>
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn("mx-auto space-y-6 transition-all duration-300", isExpanded ? "max-w-full" : "max-w-4xl")}
    >
      {/* Header Navigation */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors text-gray-600 dark:text-gray-300"
          aria-label="Back to inbox"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white truncate flex-1">
          {message.subject || '(No Subject)'}
        </h1>
        <button
          onClick={toggleExpand}
          className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors text-gray-600 dark:text-gray-300 hidden md:block"
          title={isExpanded ? "Collapse view" : "Expand view"}
        >
          {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </button>
      </div>

      {/* Message Meta */}
      <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/5 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-lg">
              {sender.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">
                {sender.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {sender.email && <span>{sender.email}</span>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-lg self-start sm:self-auto">
            <Calendar size={14} />
            <span>{format(new Date(message.date), 'MMM d, yyyy • h:mm a')}</span>
          </div>
        </div>

        {/* Message Body */}
        <div className={cn(
          "message-content-wrapper bg-white rounded-lg overflow-hidden border border-gray-200 dark:border-white/10 shadow-inner",
          isExpanded ? "min-h-[80vh]" : "min-h-[600px]"
        )}>
           {/* 
             We use an iframe to isolate styles completely. 
             This ensures the email's CSS doesn't break our app, 
             and our app's CSS doesn't break the email.
           */}
           {message.htmlBody ? (
             <iframe
               title="Email Content"
               srcDoc={DOMPurify.sanitize(message.htmlBody, {
                 // Allow full HTML structure for emails
                 WHOLE_DOCUMENT: true,
                 ADD_TAGS: ['style', 'link', 'meta', 'head', 'body', 'html'],
                 ADD_ATTR: ['target'] 
               })}
               className="w-full h-full border-0 block bg-white"
               style={{ minHeight: isExpanded ? '80vh' : '600px', backgroundColor: 'white' }}
               sandbox="allow-same-origin" // Prevent scripts but allow styles
               onLoad={(e) => {
                 // Auto-resize height
                 const iframe = e.target as HTMLIFrameElement;
                 if (iframe.contentWindow) {
                   // Inject base styles to ensure readability
                   const style = iframe.contentDocument?.createElement('style');
                   if (style) {
                     style.textContent = `
                       :root {
                         color-scheme: light;
                       }
                       body { 
                         font-family: system-ui, -apple-system, sans-serif; 
                         margin: 0; 
                         padding: 20px;
                         color: #1f2937;
                         background-color: #ffffff;
                       }
                       a { color: #4f46e5; }
                       img { max-width: 100%; height: auto; }
                       /* Ensure content is visible */
                       * { max-width: 100%; }
                     `;
                     iframe.contentDocument?.head.appendChild(style);
                   }
                   
                   // Adjust height if not expanded mode (expanded mode uses fixed height with scroll)
                   if (!isExpanded) {
                     const height = iframe.contentDocument?.documentElement.scrollHeight || 600;
                     iframe.style.height = `${Math.max(height + 40, 600)}px`;
                   }
                 }
               }}
             />
           ) : (
             <div className="p-6 whitespace-pre-wrap font-sans text-gray-800 min-h-[200px]">
               {message.body || message.textBody || '(No content)'}
             </div>
           )}
        </div>

        {/* Attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5">
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
              <FileText size={16} /> Attachments
            </h4>
            <div className="flex flex-wrap gap-2">
              {message.attachments.map((att: any, idx: number) => (
                <div 
                  key={idx}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-white/5 rounded-lg text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10"
                >
                  <FileText size={14} />
                  <span className="truncate max-w-[150px]">{att.filename}</span>
                  <span className="text-xs opacity-50">({Math.round(att.size / 1024)} KB)</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
