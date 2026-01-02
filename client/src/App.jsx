import { useState, useEffect } from 'react'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import Toast from './components/Toast'

const API_URL = 'http://localhost:5000/api'

function App() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState({ show: false, message: '', type: '' })
  const [sortOrder, setSortOrder] = useState('newest')
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    fetchContacts()
    // Check saved theme preference
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
    text: darkMode ? 'text-white' : 'text-gray-800',
    textSecondary: darkMode ? 'text-slate-400' : 'text-purple-100',
    textMuted: darkMode ? 'text-slate-500' : 'text-purple-200',
    input: darkMode 
      ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400' 
      : 'bg-white/80 border-purple-200 text-gray-800 placeholder-gray-400',
    inputFocus: darkMode ? 'focus:ring-blue-500' : 'focus:ring-purple-400',
    button: darkMode 
      ? 'from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-blue-500/25' 
      : 'from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-500/25',
    select: darkMode 
      ? 'bg-slate-700/50 border-slate-600 text-slate-300' 
      : 'bg-white/80 border-purple-200 text-gray-700',
    badge: darkMode ? 'bg-blue-500' : 'bg-purple-500',
    footerBorder: darkMode ? 'border-slate-800' : 'border-white/20',
  }

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors duration-300`}>
      <div className="min-h-screen p-4 sm:p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header with Theme Toggle */}
          <header className="relative text-center py-6 sm:py-8 md:py-12">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`absolute top-0 right-0 p-3 rounded-xl ${darkMode ? 'bg-slate-800/50 hover:bg-slate-700/50' : 'bg-white/20 hover:bg-white/30'} backdrop-blur-sm border ${darkMode ? 'border-slate-700' : 'border-white/30'} transition-all duration-300 hover:scale-105`}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? (
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-3xl sm:text-4xl">📇</span>
              <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${theme.text} tracking-tight`}>
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
            <section className={`${theme.card} backdrop-blur-sm rounded-2xl p-4 sm:p-6 border transition-colors duration-300`}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 pb-4 border-b ${darkMode ? 'border-slate-700/50' : 'border-purple-200/50'}">
                <h2 className={`text-lg sm:text-xl font-semibold ${theme.text} flex items-center gap-3`}>
                  Contacts
                  <span className={`${theme.badge} text-white text-xs px-3 py-1 rounded-full font-medium`}>
                    {contacts.length}
                  </span>
                </h2>
                <select 
                  className={`w-full sm:w-auto px-4 py-2 ${theme.select} border rounded-lg text-sm focus:outline-none focus:ring-2 ${theme.inputFocus} focus:border-transparent cursor-pointer transition-colors duration-300`}
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">By Name</option>
                </select>
              </div>
              
              <ContactList 
                contacts={sortedContacts} 
                onDelete={deleteContact}
                loading={loading}
                darkMode={darkMode}
                theme={theme}
              />
            </section>
          </main>

          {/* Footer */}
          <footer className={`mt-8 pt-4 pb-2 border-t ${theme.footerBorder}`}>
            <div className="flex flex-col items-center text-center gap-0.5">
              <p className={`${theme.textSecondary} text-sm`}>Built with ❤️ using MERN</p>
              <p className={`${theme.textMuted} text-xs`}>© 2025 All rights reserved</p>
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
