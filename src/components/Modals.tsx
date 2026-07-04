import { X, Settings, HelpCircle, Mail, Globe, Shield, Smartphone, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: ModalProps) {
  const [language, setLanguage] = useState<'English (US)' | 'Amharic'>('English (US)');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-md bg-[#111] border border-white/10 rounded-t-3xl sm:rounded-2xl h-[80dvh] sm:h-[600px] flex flex-col relative"
        >
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <div className="flex items-center gap-3 text-lg font-bold text-white">
              <div className="p-2 bg-white/5 rounded-xl text-emerald-400">
                <Settings className="w-5 h-5" />
              </div>
              Settings
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Preferences</h3>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden relative">
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="font-medium text-slate-200">Language</div>
                      <div className="text-xs text-slate-500">{language}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                    className="text-emerald-400 text-sm font-medium hover:text-emerald-300"
                  >
                    Change
                  </button>
                </div>
                
                {showLanguageMenu && (
                  <div className="absolute top-16 right-4 bg-[#222] border border-white/10 rounded-xl shadow-xl z-10 w-40 overflow-hidden">
                    <button 
                      onClick={() => { setLanguage('English (US)'); setShowLanguageMenu(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-white/10 flex items-center justify-between"
                    >
                      English (US) {language === 'English (US)' && <Check className="w-4 h-4 text-emerald-400" />}
                    </button>
                    <button 
                      onClick={() => { setLanguage('Amharic'); setShowLanguageMenu(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-white/10 flex items-center justify-between"
                    >
                      Amharic {language === 'Amharic' && <Check className="w-4 h-4 text-emerald-400" />}
                    </button>
                  </div>
                )}
                
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="font-medium text-slate-200">App Theme</div>
                      <div className="text-xs text-slate-500">{isDarkMode ? 'Dark Mode' : 'Light Mode'} (Preview)</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`w-12 h-7 rounded-full relative transition-colors duration-300 ${isDarkMode ? 'bg-emerald-500' : 'bg-slate-600'}`}
                  >
                    <motion.div 
                      layout
                      initial={false}
                      animate={{ x: isDarkMode ? 22 : 4 }}
                      className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm"
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Security</h3>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                  className="w-full flex items-center justify-between p-4 border-b border-white/10 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Shield className={`w-5 h-5 ${is2FAEnabled ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <div className="text-left">
                      <div className="font-medium text-slate-200">Two-Factor Auth</div>
                      <div className="text-xs text-slate-500">Add extra security</div>
                    </div>
                  </div>
                  <div className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                    is2FAEnabled 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {is2FAEnabled ? 'Enabled' : 'Disabled'}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function SupportModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-md bg-[#111] border border-white/10 rounded-t-3xl sm:rounded-2xl h-[85dvh] sm:h-[650px] flex flex-col"
        >
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <div className="flex items-center gap-3 text-lg font-bold text-white">
              <div className="p-2 bg-white/5 rounded-xl text-blue-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              Support & Help
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex flex-col sm:flex-row gap-4">
              <div className="p-2 bg-blue-500/20 rounded-xl h-fit text-blue-400 self-start">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-blue-100 mb-1">Contact Us</h3>
                <p className="text-sm text-blue-200/70 mb-3">
                  Need help with your account or withdrawals? Our support team is available 24/7.
                </p>
                <a 
                  href="mailto:support@obobirr.com"
                  className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-xl transition-colors"
                >
                  Email Support
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Frequently Asked Questions</h3>
              
              <div className="space-y-3">
                {[
                  { q: "How do I withdraw my earnings?", a: "You can withdraw your earnings from the 'Withdraw' tab once you reach the minimum threshold of 500 ETB. Payments are processed within 24-48 hours." },
                  { q: "How do referrals work?", a: "Share your unique invite link from the 'Invite' tab. When someone joins and completes their first task, you earn a 10 ETB bonus." },
                  { q: "Why are my tasks pending?", a: "Some tasks require manual verification by our team, which usually takes up to 24 hours. Please ensure you completed all requirements." }
                ].map((faq, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <h4 className="font-medium text-slate-200 mb-2">{faq.q}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
