import { useState } from 'react'

const initialFormState = { name: '', email: '', phone: '', message: '' }
const initialErrors = { name: '', email: '', phone: '' }

function ContactForm({ onSubmit, darkMode, theme }) {
  const [formData, setFormData] = useState(initialFormState)
  const [errors, setErrors] = useState(initialErrors)
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const validateName = (name) => {
    if (!name.trim()) return 'Name is required'
    if (name.length > 100) return 'Name cannot exceed 100 characters'
    return ''
  }

  const validateEmail = (email) => {
    if (!email.trim()) return 'Email is required'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return 'Please enter a valid email'
    return ''
  }

  const validatePhone = (phone) => {
    if (!phone.trim()) return 'Phone number is required'
    const phoneRegex = /^[\d\s\-\+\(\)]{10,15}$/
    if (!phoneRegex.test(phone)) return 'Enter valid phone (10-15 digits)'
    return ''
  }

  const validateField = (name, value) => {
    switch (name) {
      case 'name': return validateName(value)
      case 'email': return validateEmail(value)
      case 'phone': return validatePhone(value)
      default: return ''
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }))
  }

  const isFormValid = () => {
    return !validateName(formData.name) && !validateEmail(formData.email) && !validatePhone(formData.phone)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone)
    }
    
    setErrors(newErrors)
    setTouched({ name: true, email: true, phone: true })
    
    if (Object.values(newErrors).some(error => error)) return

    setSubmitting(true)
    const result = await onSubmit(formData)
    
    if (result.success) {
      setFormData(initialFormState)
      setErrors(initialErrors)
      setTouched({})
    }
    setSubmitting(false)
  }

  const getInputClasses = (fieldName) => {
    const hasError = errors[fieldName] && touched[fieldName]
    const baseClasses = `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${theme.inputFocus} focus:border-transparent transition-all duration-300`
    
    if (hasError) {
      return `${baseClasses} border-red-500 ${darkMode ? 'bg-red-500/10 text-white' : 'bg-red-50 text-gray-800'}`
    }
    
    return `${baseClasses} ${theme.input} ${darkMode ? 'hover:border-slate-500' : 'hover:border-purple-300'}`
  }

  return (
    <div className={`${theme.card} backdrop-blur-sm rounded-2xl p-4 sm:p-6 border transition-colors duration-300`}>
      <div className="mb-4 sm:mb-6">
        <h2 className={`text-lg sm:text-xl font-semibold ${theme.text} mb-1`}>Add New Contact</h2>
        <p className={`${theme.textSecondary} text-sm`}>Fill in the details below</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className={`block text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-gray-700'} mb-2`}>
            Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter full name"
            className={getInputClasses('name')}
          />
          {errors.name && touched.name && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <span>⚠</span> {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-gray-700'} mb-2`}>
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter email address"
            className={getInputClasses('email')}
          />
          {errors.email && touched.email && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <span>⚠</span> {errors.email}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className={`block text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-gray-700'} mb-2`}>
            Phone <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter phone number"
            className={getInputClasses('phone')}
          />
          {errors.phone && touched.phone && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <span>⚠</span> {errors.phone}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className={`block text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-gray-700'} mb-2`}>
            Message <span className={`${darkMode ? 'text-slate-500' : 'text-gray-400'} text-xs font-normal`}>(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message..."
            rows="3"
            className={`w-full px-4 py-3 ${theme.input} border rounded-lg focus:outline-none focus:ring-2 ${theme.inputFocus} focus:border-transparent transition-all duration-300 ${darkMode ? 'hover:border-slate-500' : 'hover:border-purple-300'} resize-none`}
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={!isFormValid() || submitting}
          className={`w-full py-3 sm:py-3.5 px-6 bg-gradient-to-r ${theme.button} text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0`}
        >
          {submitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full spinner"></div>
              Adding...
            </>
          ) : (
            <>
              <span className="text-xl leading-none">+</span>
              Add Contact
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default ContactForm
