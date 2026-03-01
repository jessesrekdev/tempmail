import { Moon, Sun, Bell, RefreshCw, Trash2, Volume2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';
import { useState } from 'react';
import { ConfirmDialog } from '../components/ConfirmDialog';

export const Settings = () => {
  const { theme, toggleTheme, settings, updateSettings, clearData } = useApp();
  const [showClearDialog, setShowClearDialog] = useState(false);

  const handleClearData = () => {
    clearData();
    toast.success('All data cleared');
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <ConfirmDialog
        isOpen={showClearDialog}
        onClose={() => setShowClearDialog(false)}
        onConfirm={handleClearData}
        title="Clear All Data?"
        message="This will permanently delete all your generated email history, settings, and local storage data. This action cannot be undone."
        confirmText="Yes, Clear Everything"
        isDangerous={true}
      />

      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your app preferences.
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <section className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-white/5">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Appearance</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300">
                  {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark theme</p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-white/5">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Preferences</h2>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-white/5">
            
            {/* Auto Refresh */}
            <div className="p-6 flex items-center justify-between opacity-60 cursor-not-allowed">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                  <RefreshCw size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Auto Refresh</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Automatically check for new emails</p>
                </div>
              </div>
              <button
                disabled
                className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none bg-indigo-600 cursor-not-allowed"
              >
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
            </div>

            {/* Notifications */}
            <div className="p-6 flex items-center justify-between opacity-60 cursor-not-allowed">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400">
                  <Bell size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Notifications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Show toast notifications</p>
                </div>
              </div>
              <button
                disabled
                className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none bg-indigo-600 cursor-not-allowed"
              >
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-white dark:bg-[#111] rounded-2xl border border-red-100 dark:border-red-900/20 overflow-hidden">
          <div className="p-6 border-b border-red-100 dark:border-red-900/20 bg-red-50/50 dark:bg-red-900/10">
            <h2 className="text-lg font-semibold text-red-600 dark:text-red-400">Danger Zone</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                  <Trash2 size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Clear All Data</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Remove all local storage data</p>
                </div>
              </div>
              <button
                onClick={() => setShowClearDialog(true)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Clear Data
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
