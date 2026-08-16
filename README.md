# ✦ CareerAI — AI-Powered Career Guidance Platform

CareerAI is an AI-powered career guidance platform that helps students analyze their career readiness, identify skill gaps, create personalized learning roadmaps, and practice technical interviews.

## 🌐 Live Project

* **Live Website:** https://careerai-snowy.vercel.app/
* **GitHub Repository:** https://github.com/likithanagesh38-a11y/CareerAI
* **Backend API:** https://careerai-backend-fb1l.onrender.com
* **Demo Video:** https://www.loom.com/share/c9feff8d4a8046dfa3b0ed2858933f60
## ✨ Features

### 🎯 Career Analyzer

* Calculates career readiness score
* Identifies current strengths
* Finds skill gaps
* Recommends skills
* Generates personalized career advice

### 🛣️ Personalized Roadmap

Generates exactly 5 learning steps based on the user's target role and current skills.

### 🧠 Skill Gap Analysis

Identifies the skills required for the selected career that the student needs to improve.

### 🤖 AI Interview Question Generator

Generates interview questions based on the target job role and current skills.

### 🎤 AI Interview Coach

Evaluates interview answers and provides:

* Score out of 10
* Strengths
* Improvements
* Better answer

## 🛠️ Technologies Used

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js
* CORS
* dotenv

### AI

* Google Gemini API

### Deployment

* Vercel — Frontend
* Render — Backend
* GitHub — Source Code

## 🏗️ Architecture

```text
User
 ↓
Vercel Frontend
 ↓
Node.js + Express Backend
 ↓
Google Gemini AI
 ↓
Personalized Career Results
```

## 📂 Project Structure

```text
CareerAI/
│
├── api/
│   └── server.js
│
├── index.html
├── style.css
├── script.js
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ API Endpoints

| Method | Endpoint                  | Purpose                     |
| ------ | ------------------------- | --------------------------- |
| POST   | `/api/analyze`            | Career analysis             |
| POST   | `/api/interview-question` | Generate interview question |
| POST   | `/api/interview`          | Evaluate interview answer   |
| GET    | `/`                       | Backend health check        |

## 🔐 Environment Variable

Create a `.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Never upload your API key to GitHub.

## 💻 Run Locally

```bash
git clone https://github.com/likithanagesh38-a11y/CareerAI.git
cd CareerAI
npm install
npm start
```

The backend runs on:

```text
http://localhost:5000
```

Open `index.html` using a local development server.

## 🔄 How It Works

1. User enters their career information.
2. Frontend sends the information to the backend.
3. Backend sends a structured prompt to Gemini AI.
4. Gemini generates personalized results.
5. Backend validates the response.
6. Frontend displays the career analysis and interview guidance.

## 🔮 Future Enhancements

* User authentication
* Resume analysis
* Job recommendations
* Progress tracking
* Interview history
* Course recommendations
* Career dashboard
* LinkedIn profile analysis

## 👩‍💻 Developer

**Likitha Nagesh Moger**

Computer Science and Engineering Student

## 📜 License

This project is developed for educational and academic purposes.

© 2026 CareerAI
