import { FileText, Shield, AlertCircle, Scale } from 'lucide-react';

export const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center mx-auto text-indigo-600 dark:text-indigo-400">
          <FileText size={32} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Please read these terms carefully before using our temporary email service.
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="grid gap-8">
        {/* Section 1 */}
        <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/5 p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl text-blue-600 dark:text-blue-400 flex-shrink-0">
              <Scale size={24} />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">1. Acceptance of Terms</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                By accessing and using TempMail, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this service, you shall be subject to any posted guidelines or rules applicable to such services.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/5 p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/10 rounded-xl text-indigo-600 dark:text-indigo-400 flex-shrink-0">
              <Shield size={24} />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">2. Use License</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Permission is granted to temporarily use the materials (information or software) on TempMail's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="grid gap-2 text-gray-600 dark:text-gray-300 list-disc pl-5">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software</li>
                <li>Remove any copyright or other proprietary notations</li>
                <li>Transfer the materials to another person or "mirror" the materials</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/5 p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/10 rounded-xl text-amber-600 dark:text-amber-400 flex-shrink-0">
              <AlertCircle size={24} />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">3. Disclaimer</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                The materials on TempMail's website are provided on an 'as is' basis. TempMail makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Further, TempMail does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
              </p>
            </div>
          </div>
        </div>
        {/* Section 4 */}
        <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/5 p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/10 rounded-xl text-purple-600 dark:text-purple-400 flex-shrink-0">
              <FileText size={24} />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">4. Contact & Credits</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                This application is developed and maintained by <strong>Jesse Srek Dev</strong>.
              </p>
              <div className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400">
                <p>Email: jessesrek@gmail.com</p>
                <p>Telegram: t.me/jesse_pro</p>
                <p>Instagram: @its_crazydev</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
