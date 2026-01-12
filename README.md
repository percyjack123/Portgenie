# 🚀 PortGenie — AI-Powered Portfolio Builder for Developers

PortGenie is a **full-stack AI-assisted web application** that enables developers and students to **create, customize, and publish modern web portfolios** through a guided workflow — without writing design code.

Unlike static portfolio generators, PortGenie combines **structured user input + AI-driven layout planning** to produce clean, responsive, web-ready portfolios.

---

## 🎯 Why PortGenie?

Most portfolio tools either:
- Force rigid templates  
- Require design skills  
- Or generate low-quality static pages  

**PortGenie solves this by:**
- Separating **content**, **design**, and **AI decisions**
- Giving users full control over data
- Using AI only where it adds real value
- Remaining production-safe when AI limits are hit

This project demonstrates **real-world engineering judgment**, not just feature building.

---

## ✨ Core Features

### 🔐 Authentication & User Management
- Firebase Authentication (Email / Password)
- Persistent login sessions
- Editable user profile with instant UI updates
- Profile photo upload via file picker (local persistence)

---

### 🧠 AI-Assisted Portfolio Planning
- AI determines:
  - Layout type
  - Section ordering
  - Headline / tagline
- Smart fallback system when AI quota is exceeded
- AI never blocks core functionality

---

### 🧱 Portfolio Creation Wizard
Step-by-step flow to input:
- Skills
- Projects (titles only — schema-safe)
- Experience
- Education
- Certificates
- External links

Each step is validated and stored cleanly.

---

### 👁️ Live Portfolio Preview
- Mini preview before publishing
- Real portfolio view after creation
- Responsive, modern web layout
- Profile photo + tagline displayed prominently

---

### 🎨 Layout & Theme System
- Layouts driven by configuration, not hard-coded JSX
- Theme system supports:
  - Background color
  - Text color
  - Accent color
- Easy to extend for future themes

---

### 🗑️ Portfolio Management
- View created portfolios from dashboard
- Delete portfolios safely
- Clean MongoDB schema validation

---

## 🏗️ Architecture Overview

Frontend (React + Tailwind)
│
├── AuthContext (Firebase Auth + Local Profile State)
├── Wizard Flow (Steps 1–5)
├── Portfolio Renderer (Config-driven)
│
Backend (Node + Express)
│
├── REST APIs
├── MongoDB (Mongoose)
├── AI Planner Service
│
External Services
│
├── Firebase Authentication
└── OpenAI API (with quota-safe fallback)

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Context API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Services
- Firebase Authentication
- OpenAI API

---

## 📂 Project Structure

portgenie/
├── frontend/
│ ├── components/
│ ├── pages/
│ ├── context/
│ ├── layouts/
│ └── utils/
│
├── backend/
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ └── services/
│
├── .gitignore
└── README.md
