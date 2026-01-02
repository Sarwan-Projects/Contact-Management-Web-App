import { useState } from 'react'

function ContactCard({ contact, onDelete, delay, darkMode, theme }) {
  const [deleting, setDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    await onDelete(contact._id)
    setDeleting(false)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
  }

  const avatarColors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-pink-500 to-pink-600',
    'from-emerald-500 to-emerald-600',
    'from-orange-500 to-orange-600',
    'from-cyan-500 to-cyan-600',
    'from-rose-500 to-rose-600',
    'from-indigo-500 to-indigo-600',
  ]
  
  const colorIndex = contact.name.charCodeAt(0) % avatarColors.length

  return (
    <div 
      className={`flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-4 rounded-xl border transition-all duration-300 animate-slide-in ${
        darkMode 
          ? 'bg-slate-700/30 border-slate-600/50 hover:border-blue-500/50 hover:bg-slate-700/50' 
          : 'bg-purple-50/50 border-purple-200/50 hover:border-purple-400/50 hover:bg-purple-50'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Avatar */}
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${avatarColors[colorIndex]} flex items-center justify-center text-white font-semibold text-xs sm:text-sm flex-shrink-0`}>
        {getInitials(contact.name)}
      </div>
      
      {/* Contact Info */}
      <div className="flex-1 min-w-0 w-full sm:w-auto">
        <h3 className={`font-semibold mb-1 sm:mb-2 text-sm sm:text-base transition-colors duration-500 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {contact.name}
        </h3>
        
        <div className="flex flex-col sm:flex-row flex-wrap gap-1 sm:gap-x-4 sm:gap-y-1 mb-2">
          <a 
            href={`mailto:${contact.email}`} 
            className={`text-xs sm:text-sm transition-colors flex items-center gap-1.5 truncate ${
              darkMode ? 'text-slate-400 hover:text-blue-400' : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <span>✉️</span>
            <span className="truncate">{contact.email}</span>
          </a>
          
          <a 
            href={`tel:${contact.phone}`} 
            className={`text-xs sm:text-sm transition-colors flex items-center gap-1.5 ${
              darkMode ? 'text-slate-400 hover:text-blue-400' : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <span>📱</span>
            {contact.phone}
          </a>
        </div>
        
        {contact.message && (
          <p className={`text-xs sm:text-sm italic px-3 py-2 rounded-lg border-l-2 my-2 transition-colors duration-500 ${
            darkMode 
              ? 'text-slate-400 bg-slate-800/50 border-blue-500' 
              : 'text-gray-600 bg-purple-100/50 border-purple-400'
          }`}>
            "{contact.message}"
          </p>
        )}
        
        <span className={`text-xs transition-colors duration-500 ${darkMode ? 'text-slate-500' : 'text-gray-400'}`}>
          {formatDate(contact.createdAt)}
        </span>
      </div>
      
      {/* Delete Action */}
      <div className="flex-shrink-0 self-end sm:self-start">
        {showConfirm ? (
          <div className="flex gap-2">
            <button 
              onClick={handleDelete}
              disabled={deleting}
              className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              {deleting ? '...' : 'Yes'}
            </button>
            <button 
              onClick={() => setShowConfirm(false)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-slate-600 hover:bg-slate-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              No
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setShowConfirm(true)}
            className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg transition-all text-sm sm:text-base ${
              darkMode 
                ? 'hover:bg-red-500/20 text-slate-400 hover:text-red-400' 
                : 'hover:bg-red-100 text-gray-400 hover:text-red-500'
            }`}
            title="Delete contact"
          >
            🗑️
          </button>
        )}
      </div>
    </div>
  )
}

export default ContactCard
