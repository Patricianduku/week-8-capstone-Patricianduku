# Tuliza: Find Your Calm

Tuliza is a privacy-first mental wellness companion built for Kenyan youth, students, and communities. Track your mood, journal your thoughts, and connect with supportive communities. Our mission is to empower Kenyan youth and communities with safe, stigma-free mental health support.

## Features
- **Private Mood Journal**: Log your mood daily, add notes, and track your mental health trends. Only you can see your entries.
- **Anonymous Support Rooms**: Join themed chat rooms and connect with others anonymously. Moderated for safety.
- **Kenyan Helplines & Resources**: Access real, working Kenyan mental health contacts and emergency support.
- **Affirmations & Daily Tips**: Receive daily encouragement and mental health tips.
- **Role-Based Access & Admin Panel**: Admins can promote users and manage premium access.
- **Premium Subscription**: Unlock extra features and therapist Q&A via M-Pesa integration.
- **Language Support**: Switch between English and Swahili (Kiswahili) throughout the app.
- **Mobile Responsive & Dark Mode**: Modern, accessible UI for all devices.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, i18next
- **Backend**: Node.js, Express, MongoDB, JWT Auth
- **Real-time**: Socket.io for chat
- **Payments**: M-Pesa integration (Premium)

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Patricianduku/week-8-capstone-Patricianduku.git
   cd week-8-capstone-Patricianduku
   ```
2. **Install dependencies:**
   - For client:
     ```sh
     cd client
     npm install
     ```
   - For server:
     ```sh
     cd ../server
     npm install
     ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env` in the server directory and fill in your MongoDB URI and JWT secret.
4. **Run the app:**
   - Start the backend:
     ```sh
     npm start
     ```
   - Start the frontend:
     ```sh
     cd ../client
     npm run dev
     ```
5. **Visit** `http://localhost:5173` in your browser.
## video URL:https://www.loom.com/share/625abdfd06e541b3854d8845910aa709?sid=8903eab0-8f3e-42c8-9efe-e838f1c2bbcf
## Contributing
- Fork the repo and create a feature branch.
- Make your changes and submit a pull request.
- For translation updates, add new keys to both English and Swahili in `client/src/i18n.js`.

## License
MIT 