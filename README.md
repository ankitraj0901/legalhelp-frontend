🌐 LegalHelp Frontend

A modern React + Vite frontend for connecting users with CAs, Lawyers, and Consultants.

🚀 Overview

This is the frontend of the LegalHelp platform.
It provides a modern, fast, and responsive UI for:

User login & registration

Listing Chartered Accountants (CAs)

Assigning CA to a user

Viewing dashboard and profile

Displaying Lawyer & Consultant details

The frontend communicates with the backend (Spring Boot) via REST APIs.

🛠️ Tech Stack

React

Vite

TypeScript

Tailwind CSS

React Router

Axios

🎨 Features

Modern UI built using Tailwind

JWT authentication integration

API-based CA/Lawyer/Consultant listing

Assignment creation UI

Protected routes

Reusable components

🏃 Getting Started
1️⃣ Clone the repository
git clone https://github.com/ankitraj0901/legalhelp-frontend.git
cd legalhelp-frontend

2️⃣ Install dependencies
npm install

3️⃣ Run development server
npm run dev

4️⃣ Build for production
npm run build

🔗 API Configuration

Update backend URL in:

src/services/api.ts

Example:

export const API_BASE_URL = "import.meta.env.VITE_API_URL";

📁 ### **Project Structure**

```txt
src/
├── components/        # Reusable UI components (Navbar, cards, forms)
├── pages/             # Pages (Login, Register, Dashboard, CA List, Assignment)
├── services/          # Axios API calls
├── hooks/             # Custom React hooks
├── context/           # Global context (auth, user)
├── App.tsx            # App entry + routes
└── main.tsx           # React DOM bootstrap
```

📁 ### **Detailed Frontend Structure**

```txt
src/
├── assets/            # Images, icons, logos (optional folder)
│
├── components/        # UI Components used across pages
│   ├── Navbar/
│   ├── Footer/
│   ├── InputField/
│   └── UserCard/
│
├── pages/             # Complete pages rendered by React Router
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   ├── CAList.tsx
│   └── AssignmentPage.tsx
│
├── services/          # All API calls using Axios
│   ├── api.ts         # Base URL config
│   ├── authService.ts
│   ├── caService.ts
│   └── assignmentService.ts
│
├── context/           # Global application state
│   ├── AuthContext.tsx
│   └── UserContext.tsx
│
├── hooks/             # Custom hooks for reuse
│   ├── useAuth.ts
│   └── useFetch.ts
│
├── router/ (optional) # Route configuration (if separated)
│
├── App.tsx            # Root component, route structure
└── main.tsx           # React + Vite entry point

```

⭐ Show Your Support

If you found this project helpful, consider giving it a ⭐ star on GitHub!

📬 Contact

Ankit Raj – Full Stack Developer (Spring Boot + React + ML)
LinkedIn: add your link here
