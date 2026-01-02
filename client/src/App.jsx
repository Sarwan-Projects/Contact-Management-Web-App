import { useState, useEffect } from 'react'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import Toast from './components/Toast'

const API_URL = 'https://contact-management-web-app.onrender.com/api'

function App() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState({ show: false, message: '', type: '' })
  const [sortOrder, setSortOrder] = useState('newest')
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    fetchContacts()
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_URL}/contacts`)
      const data = await response.json()
      if (data.success) {
        setContacts(data.data)
      }
    } catch (error) {
      showToast('Failed to fetch contacts', 'error')
    } finally {
      setLoading(false)
    }
  }

  const addContact = async (contactData) => {
    try {
      const response = await fetch(`${API_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData)
      })
      const data = await response.json()
      
      if (data.success) {
        setContacts(prev => [data.data, ...prev])
        showToast('Contact added successfully!', 'success')
        return { success: true }
      } else {
        const errorMsg = data.errors 
          ? data.errors.map(e => e.message).join(', ')
          : data.message
        showToast(errorMsg, 'error')
        return { success: false, errors: data.errors }
      }
    } catch (error) {
      showToast('Failed to add contact', 'error')
      return { success: false }
    }
  }

  const deleteContact = async (id) => {
    try {
      const response = await fetch(`${API_URL}/contacts/${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      
      if (data.success) {
        setContacts(prev => prev.filter(contact => contact._id !== id))
        showToast('Contact deleted successfully!', 'success')
      } else {
        showToast(data.message, 'error')
      }
    } catch (error) {
      showToast('Failed to delete contact', 'error')
    }
  }

  const showToast = (message, type) => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000)
  }

  const sortedContacts = [...contacts].sort((a, b) => {
    if (sortOrder === 'newest') return new Date(b.createdAt) - new Date(a.createdAt)
    if (sortOrder === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt)
    if (sortOrder === 'name') return a.name.localeCompare(b.name)
    return 0
  })

  // Theme classes
  const theme = {
    bg: darkMode 
      ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
      : 'bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700',
    card: darkMode 
      ? 'bg-slate-800/50 border-slate-700/50' 
      : 'bg-white/90 border-white/20',
    cardInner: darkMode 
      ? 'bg-slate-700/30 border-slate-600/50 hover:border-blue-500/50 hover:bg-slate-700/50' 
      : 'bg-white/60 border-purple-200/50 hover:border-purple-400/50 hover:bg-white/80',
    text: 'text-white',
    textSecondary: darkMode ? 'text-slate-400' : 'text-purple-100',
    textMuted: darkMode ? 'text-slate-500' : 'text-purple-200',
    input: darkMode 
      ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400' 
      : 'bg-white/80 border-purple-200 text-gray-800 placeholder-gray-400',
    inputFocus: darkMode ? 'focus:ring-blue-500' : 'focus:ring-purple-400',
    button: darkMode 
      ? 'from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-blue-500/25' 
      : 'from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-500/25',
    badge: darkMode ? 'bg-blue-500' : 'bg-purple-500',
    footerBorder: darkMode ? 'border-slate-800' : 'border-white/20',
    cardText: darkMode ? 'text-white' : 'text-gray-800',
    labelText: darkMode ? 'text-slate-300' : 'text-gray-700',
  }

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors duration-500`}>
      <div className="min-h-screen p-4 sm:p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header with Theme Toggle */}
          <header className="relative text-center py-6 sm:py-8 md:py-10">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`absolute top-0 right-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${darkMode ? 'bg-slate-800/70' : 'bg-white/25'} backdrop-blur-md border ${darkMode ? 'border-slate-600' : 'border-white/40'} transition-all duration-500 ease-out hover:scale-110 active:scale-95 overflow-hidden`}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <svg 
                  className={`w-5 h-5 sm:w-6 sm:h-6 absolute transition-all duration-500 ease-out ${darkMode ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="4" className="fill-yellow-400 stroke-yellow-500" strokeWidth="2"/>
                  <path className="stroke-yellow-400" strokeLinecap="round" strokeWidth="2" d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.41 1.41M8.34 15.66l-1.41 1.41m12.14 0l-1.41-1.41M8.34 8.34L6.93 6.93"/>
                </svg>
                <svg 
                  className={`w-5 h-5 sm:w-6 sm:h-6 absolute transition-all duration-500 ease-out ${darkMode ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path className="fill-slate-700" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              </div>
            </button>

            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-3xl sm:text-4xl">📇</span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                Contact Manager
              </h1>
            </div>
            <p className={`${theme.textSecondary} text-base sm:text-lg`}>Manage your contacts efficiently</p>
          </header>

          {/* Main Content */}
          <main className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-4 sm:gap-6 items-start">
            {/* Form Section */}
            <section className="lg:sticky lg:top-6">
              <ContactForm onSubmit={addContact} darkMode={darkMode} theme={theme} />
            </section>

            {/* List Section */}
            <section className={`${theme.card} backdrop-blur-sm rounded-2xl p-4 sm:p-6 border transition-colors duration-500 min-h-[500px] flex flex-col`}>
              <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 pb-4 border-b ${darkMode ? 'border-slate-700/50' : 'border-purple-200/30'}`}>
                <h2 className={`text-lg sm:text-xl font-semibold ${theme.cardText} flex items-center gap-3 transition-colors duration-500`}>
                  Contacts
                  <span className={`${theme.badge} text-white text-xs px-3 py-1 rounded-full font-medium transition-colors duration-500`}>
                    {contacts.length}
                  </span>
                </h2>
                <select 
                  className={`w-full sm:w-auto px-4 py-2.5 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 cursor-pointer transition-all duration-300 ${
                    darkMode 
                      ? 'bg-slate-700 border-slate-600 text-white focus:ring-blue-500' 
                      : 'bg-white border-purple-200 text-gray-700 focus:ring-purple-400'
                  } border`}
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">By Name</option>
                </select>
              </div>
              
              <div className="flex-1 overflow-y-auto max-h-[60vh] pr-1 custom-scrollbar">
                <ContactList 
                  contacts={sortedContacts} 
                  onDelete={deleteContact}
                  loading={loading}
                  darkMode={darkMode}
                  theme={theme}
                />
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className={`mt-6 py-3 border-t ${theme.footerBorder} transition-colors duration-500`}>
            <div className="flex flex-col items-center text-center">
              <p className={`${theme.textSecondary} text-sm transition-colors duration-500`}>Built with ❤️ using MERN</p>
              <p className={`${theme.textMuted} text-xs transition-colors duration-500`}>© 2025 All rights reserved</p>
            </div>
          </footer>
        </div>
      </div>

      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast({ show: false, message: '', type: '' })}
          darkMode={darkMode}
        />
      )}
    </div>
  )
}

export default App
