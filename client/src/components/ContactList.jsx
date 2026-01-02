import ContactCard from './ContactCard'

function ContactList({ contacts, onDelete, loading, darkMode, theme }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-16">
        <div className={`w-10 h-10 border-3 ${darkMode ? 'border-slate-600 border-t-blue-500' : 'border-purple-200 border-t-purple-500'} rounded-full spinner mb-4`}></div>
        <p className={theme.textSecondary}>Loading contacts...</p>
      </div>
    )
  }

  if (contacts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center px-4">
        <div className="text-5xl sm:text-6xl mb-4 opacity-80">📭</div>
        <h3 className={`text-base sm:text-lg font-semibold ${theme.text} mb-2`}>No contacts yet</h3>
        <p className={`${theme.textSecondary} text-sm`}>Add your first contact using the form</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {contacts.map((contact, index) => (
        <ContactCard 
          key={contact._id} 
          contact={contact} 
          onDelete={onDelete}
          delay={index * 50}
          darkMode={darkMode}
          theme={theme}
        />
      ))}
    </div>
  )
}

export default ContactList
