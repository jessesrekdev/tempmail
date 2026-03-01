import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../utils/utils';

export interface EmailMessage {
  id: number | string;
  from: string;
  subject: string;
  date: string;
  body?: string;
  textBody?: string;
  htmlBody?: string;
}

export interface TempEmail {
  address: string;
  login: string;
  domain: string;
  createdAt: number;
}

export const useTempMail = (autoRefresh: boolean = true) => {
  const [currentEmail, setCurrentEmail] = useState<TempEmail | null>(() => {
    const saved = localStorage.getItem('temp_mail_current');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [messages, setMessages] = useState<EmailMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate a new email
  const generateEmail = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/mailbox`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log('Generate Email Response:', data);
      
      if (data && data.email) {
        const address = data.email;
        const [login, domain] = address.split('@');
        const newEmail: TempEmail = {
          address,
          login,
          domain,
          createdAt: Date.now(),
        };
        setCurrentEmail(newEmail);
        localStorage.setItem('temp_mail_current', JSON.stringify(newEmail));
        
        // Add to history
        const history = JSON.parse(localStorage.getItem('temp_mail_history') || '[]');
        // Ensure history items have messages array
        const newHistoryItem = { ...newEmail, messages: [] };
        const updatedHistory = [newHistoryItem, ...history].slice(0, 50); // Keep last 50
        localStorage.setItem('temp_mail_history', JSON.stringify(updatedHistory));
        
        setMessages([]);
      }
    } catch (err) {
      setError('Failed to generate email');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch messages for current email
  const fetchMessages = async (silent = false) => {
    if (!currentEmail) return;
    
    if (!silent) setRefreshing(true);
    try {
      const response = await fetch(`${API_BASE_URL}/mailbox/${currentEmail.address}/messages`, {
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Fetch Messages Response:', data);
        
        // API returns { email, count, messages: [...] }
        // Ensure messagesList is an array
        let messagesList = [];
        if (Array.isArray(data)) {
           messagesList = data;
        } else if (data && Array.isArray(data.messages)) {
           messagesList = data.messages;
        }

        // Map tempy.email format to our internal format
        const mappedMessages: EmailMessage[] = messagesList.map((msg: any) => ({
          id: msg.id,
          from: msg.from,
          subject: msg.subject,
          date: msg.received_at || new Date().toISOString(),
          body: msg.body_text,
          textBody: msg.body_text,
          htmlBody: msg.body_html || msg.html, // Check for html variants
        }));
        setMessages(mappedMessages);

        // Update history with new messages for this email
        const history = JSON.parse(localStorage.getItem('temp_mail_history') || '[]');
        const updatedHistory = history.map((item: any) => {
          if (item.address === currentEmail.address) {
            return { ...item, messages: mappedMessages };
          }
          return item;
        });
        localStorage.setItem('temp_mail_history', JSON.stringify(updatedHistory));
      }
    } catch (err) {
      console.error('Failed to fetch messages', err);
    } finally {
      if (!silent) setRefreshing(false);
    }
  };

  // Read a specific message
  // For tempy.email, we already have the full message content in the list, 
  // but we'll keep this function signature for compatibility and just return the local message if found.
  const readMessage = async (id: number | string) => {
    if (!currentEmail) return null;
    // Find message in local state since API returns full objects in list
    const msg = messages.find(m => m.id === id);
    if (msg) return msg;
    
    // Fallback: re-fetch messages
    await fetchMessages(true);
    return messages.find(m => m.id === id) || null;
  };

  // Initial load
  useEffect(() => {
    if (!currentEmail) {
      generateEmail();
    } else {
      fetchMessages();
    }
  }, []); 

  // Auto refresh interval
  useEffect(() => {
    if (!currentEmail || !autoRefresh) return;

    const interval = setInterval(() => {
      fetchMessages(true);
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [currentEmail?.address, autoRefresh]);

  return {
    currentEmail,
    messages,
    loading,
    refreshing,
    error,
    generateEmail,
    fetchMessages,
    readMessage,
    setCurrentEmail,
  };
};
