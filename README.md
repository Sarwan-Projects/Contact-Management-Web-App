# Contact Manager

A simple contact management app I built to learn the MERN stack. Nothing fancy, just a clean way to store and manage contacts.

## Live Demo

- Frontend: https://contact-master-pro.vercel.app
- Backend: https://contact-management-web-app.onrender.com

## What it does

- Add contacts with name, email, phone, and optional message
- View all your contacts in a nice list
- Delete contacts you don't need
- Sort by newest, oldest, or alphabetically
- Dark/light mode because why not

## Tech I used

- React + Vite for the frontend
- Tailwind CSS for styling
- Node.js + Express for the API
- MongoDB for storing data

## Project structure

```
├── client/          # React frontend
│   └── src/
│       ├── components/
│       │   ├── ContactForm.jsx
│       │   ├── ContactList.jsx
│       │   ├── ContactCard.jsx
│       │   └── Toast.jsx
│       └── App.jsx
│
└── server/          # Express backend
    ├── config/db.js
    ├── models/Contact.js
    ├── routes/contacts.js
    └── server.js
```

## API endpoints

| Method | Route | What it does |
|--------|-------|--------------|
| GET | /api/contacts | Get all contacts |
| POST | /api/contacts | Add a contact |
| DELETE | /api/contacts/:id | Remove a contact |

## Running locally

```bash
# Backend
cd server
npm install
npm start

# Frontend (new terminal)
cd client
npm install
npm run dev
```

Backend runs on port 5000, frontend on 5173.

## Contact schema

```js
{
  name: String,      // required
  email: String,     // required, validated
  phone: String,     // required
  message: String,   // optional
  createdAt: Date
}
```

---

Made by Sarwan
