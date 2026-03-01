import { Shield, Lock, Eye, Server, Cookie } from 'lucide-react';

export const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
          <Shield size={32} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          We believe in privacy by design. Here's how we handle your data.
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/5 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-900/10 rounded-xl text-indigo-600 dark:text-indigo-400 w-fit mb-4">
            <Eye size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Personal Data</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We do not collect any personal information. The service is designed to be completely anonymous. We do not require registration, email addresses, or phone numbers.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/5 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="p-3 bg-rose-50 dark:bg-rose-900/10 rounded-xl text-rose-600 dark:text-rose-400 w-fit mb-4">
            <Server size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Data Retention</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Emails are temporarily stored on public API servers and are automatically deleted after a short period. We have no control over this retention period.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/5 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="p-3 bg-amber-50 dark:bg-amber-900/10 rounded-xl text-amber-600 dark:text-amber-400 w-fit mb-4">
            <Lock size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Local Storage</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We use your browser's Local Storage to save your preferences and email history. This data never leaves your device and can be cleared at any time via Settings.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/5 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl text-blue-600 dark:text-blue-400 w-fit mb-4">
            <Cookie size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Cookies</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We do not use tracking cookies or third-party analytics that track your behavior across other websites.
          </p>
        </div>
        {/* Card 5 */}
        <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/5 p-6 shadow-sm hover:shadow-md transition-shadow md:col-span-2">
          <div className="p-3 bg-green-50 dark:bg-green-900/10 rounded-xl text-green-600 dark:text-green-400 w-fit mb-4">
            <Shield size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Contact Us</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            If you have any questions about this Privacy Policy, please contact the developer:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
              <span className="block text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Developer</span>
              <span className="font-medium text-gray-900 dark:text-white">Jesse Srek Dev</span>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
              <span className="block text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Email</span>
              <a href="mailto:jessesrek@gmail.com" className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                jessesrek@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-8 text-center">
        <p className="text-gray-600 dark:text-gray-300">
          Have questions about your privacy? Contact us at <span className="text-indigo-600 dark:text-indigo-400 font-medium">jessesrek@gmail.com</span>
        </p>
      </div>
    </div>
  );
};
