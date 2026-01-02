function Toast({ message, type, onClose, darkMode }) {
  const styles = {
    success: darkMode 
      ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' 
      : 'bg-emerald-50 border-emerald-300 text-emerald-700',
    error: darkMode 
      ? 'bg-red-500/10 border-red-500/50 text-red-400' 
      : 'bg-red-50 border-red-300 text-red-700',
    warning: darkMode 
      ? 'bg-amber-500/10 border-amber-500/50 text-amber-400' 
      : 'bg-amber-50 border-amber-300 text-amber-700'
  }

  const icons = { success: '✓', error: '✕', warning: '⚠' }
  const iconBg = { success: 'bg-emerald-500', error: 'bg-red-500', warning: 'bg-amber-500' }

  return (
    <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 rounded-xl border backdrop-blur-sm shadow-xl animate-slide-up z-50 max-w-[calc(100vw-2rem)] sm:max-w-sm ${styles[type]}`}>
      <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full ${iconBg[type]} text-white flex items-center justify-center text-xs font-bold flex-shrink-0`}>
        {icons[type]}
      </span>
      <span className="text-xs sm:text-sm font-medium flex-1">{message}</span>
      <button 
        onClick={onClose}
        className="text-lg opacity-60 hover:opacity-100 transition-opacity ml-2"
      >
        ×
      </button>
    </div>
  )
}

export default Toast
