# Client Lead Management System (Mini CRM)

A full-stack CRM application built for managing client leads.

## 🔗 Live Demo
[View Live App](https://future-fs-02-okxa.onrender.com/) 

## 📌 Features
- 🔐 Secure admin login with JWT authentication
- 📋 View all leads in a clean table
- ➕ Add leads with name, email, and source
- 🔄 Update lead status: New → Contacted → Converted
- 📝 Add notes and follow-ups per lead
- 🗑️ Delete leads
- 📊 Live stats dashboard (total, new, contacted, converted)

## 🛠️ Tech Stack
| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Auth | JWT (JSON Web Tokens) |
| Deployment | Render |

## 🚀 Run Locally
1. `git clone https://github.com/YourUsername/CRM-LEAD-MANAGEMENT
2. `npm install`
3. Create `.env` file with your MongoDB URI and credentials
4. `npm run dev`
5. Open `http://localhost:5000`

## 📁 Project Structure
CRM-LEAD-MANAGEMENT/
├── backend/
│   ├── models/Lead.js
│   ├── routes/auth.js
│   ├── routes/leads.js
│   └── middleware/auth.js
├── frontend/
│   ├── index.html
│   ├── dashboard.html
│   ├── css/style.css
│   └── js/ (auth.js, dashboard.js)
├── server.js
├── package.json
└── README.md


