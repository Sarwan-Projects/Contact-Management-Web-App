# Contact Management Web App

A full-stack MERN application for managing contacts with a modern, responsive UI built with Tailwind CSS.

## 🚀 Live Demo
- **Frontend**: [To be updated after deployment]
- **Backend API**: [To be updated after deployment]

## 📁 Project Structure

```
contact-management-app/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContactForm.jsx   # Form with validation
│   │   │   ├── ContactList.jsx   # Contacts display
│   │   │   ├── ContactCard.jsx   # Individual contact card
│   │   │   └── Toast.jsx         # Notification component
│   │   ├── App.jsx               # Main app component
│   │   ├── index.css             # Tailwind imports
│   │   └── main.jsx              # Entry point
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                     # Node.js + Express Backend
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   └── Contact.js            # Mongoose schema
│   ├── routes/
│   │   └── contacts.js           # API routes
│   ├── server.js                 # Express server
│   └── package.json
│
└── README.md
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js 18 (Vite) |
| Styling | Tailwind CSS 3.4 |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas |
| Validation | express-validator |
| State | React useState |

## ✅ Features Implemented

### Core Requirements
- [x] Contact Form - Name (required), Email (valid), Phone (required), Message (optional)
- [x] Client-side validation with error messages
- [x] POST API to store contact data
- [x] GET API to fetch stored contacts
- [x] MongoDB schema with validation
- [x] Display contacts in list without page reload
- [x] Responsive layout for all devices
- [x] Submit button disabled when form is invalid

### Bonus Features
- [x] Delete contact with confirmation
- [x] Success/error toast notifications
- [x] Reusable components (ContactCard, Toast, ContactForm, ContactList)
- [x] Basic sorting (newest, oldest, by name)
- [x] Dark/Light mode toggle

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/contacts | Fetch all contacts |
| POST | /api/contacts | Create new contact |
| DELETE | /api/contacts/:id | Delete a contact |

### Create Contact
```http
POST /api/contacts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "message": "Optional message"
}
```

### Response Format
```json
{
  "success": true,
  "data": { ... }
}
```

## 🗄️ Database Schema

```javascript
{
  name: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, match: /email-regex/ },
  phone: { type: String, required: true, match: /phone-regex/ },
  message: { type: String, maxlength: 500 },
  createdAt: { type: Date, default: Date.now }
}
```

## 🚀 Local Development

### Prerequisites
- Node.js v14+
- MongoDB Atlas account

### Installation

```bash
# Clone repository
git clone https://github.com/Sarwan-Projects/Contact-Management-Web-App.git
cd Contact-Management-Web-App

# Install backend dependencies
cd server && npm install

# Install frontend dependencies
cd ../client && npm install
```

### Running Locally

```bash
# Terminal 1 - Backend
cd server && npm start

# Terminal 2 - Frontend
cd client && npm run dev
```

## 🌐 Deployment

### Backend on Render
1. Go to render.com → New → Web Service
2. Connect GitHub repository
3. Settings:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Environment Variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: production

### Frontend on Vercel
1. Go to vercel.com → New Project
2. Import GitHub repository
3. Settings:
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Post-Deployment
Update API_URL in `client/src/App.jsx` with your Render backend URL.

## 👨‍💻 Author

**Sarwan**

---
*Built for interview assessment - January 2025*
