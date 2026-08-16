# CareerAI 🚀

CareerAI is an AI-powered career guidance web application designed to help students understand their career readiness, identify skill gaps, build a personalized learning roadmap, and practice technical interviews.

## 🎯 Problem Statement

Many students are unsure about:

- Which skills are required for their target career
- Which skills they are currently missing
- How job-ready they are
- What they should learn next
- How to prepare for technical interviews

CareerAI addresses these problems using Artificial Intelligence.

## 💡 Solution

CareerAI analyzes a student's:

- Name
- Target job role
- Current skills

The AI then generates:

- Career readiness score
- Current strengths
- Skill gaps
- Recommended skills
- Personalized 5-step roadmap
- Career advice
- Role-specific interview question
- AI interview evaluation

## ✨ Features

### Career Analyzer

Analyzes the student's current skills against their target career.

### Skill Gap Analysis

Identifies skills that the student needs to improve.

### AI Career Score

Generates a career readiness score from 0–100.

### Personalized Roadmap

Generates exactly five learning steps based on the student's target role and skill gaps.

### AI Interview Coach

Generates role-specific interview questions.

### AI Answer Evaluation

Evaluates the student's interview answer and provides:

- Score out of 10
- Strengths
- Improvements
- Better answer

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- Fetch API

### Backend

- Node.js
- Express.js
- CORS
- dotenv

### Artificial Intelligence

- Google Gemini API
- @google/genai

## 🏗️ Project Structure

CareerAI/

├── api/

│   └── server.js

├── index.html

├── style.css

├── script.js

├── package.json

├── .env

├── .gitignore

└── README.md

## 🔄 Application Workflow

1. Student enters name, target role and skills.
2. Frontend sends the information to the backend.
3. Backend sends the profile to Gemini AI.
4. Gemini analyzes the student's career profile.
5. Backend returns structured JSON.
6. Frontend displays the career analysis.
7. Backend generates a role-specific interview question.
8. Student submits an interview answer.
9. Backend sends the answer to Gemini.
10. Gemini evaluates the answer.
11. Frontend displays interview feedback.

## 🔌 API Endpoints

### Career Analysis

POST

/api/analyze

Request:

{
  "name": "Student Name",
  "role": "Data Analyst",
  "skills": "Python, SQL, Excel"
}

### Interview Question

POST

/api/interview-question

Request:

{
  "role": "Data Analyst",
  "skills": "Python, SQL, Excel"
}

### Interview Evaluation

POST

/api/interview

Request:

{
  "role": "Data Analyst",
  "question": "Interview question",
  "answer": "Student answer"
}

### Health Check

GET

/

## ⚙️ Installation

Clone the repository:

git clone YOUR_GITHUB_REPOSITORY_URL

Navigate to the project:

cd CareerAI

Install dependencies:

npm install

Create a `.env` file:

GEMINI_API_KEY=your_api_key_here

Start the backend:

node api/server.js

The backend runs on:

http://localhost:5000

Open the frontend using a local development server.

## 🔐 Environment Variables

The project uses:

GEMINI_API_KEY

The API key must never be uploaded to GitHub.

## 🚀 Future Improvements

- User authentication
- Database integration
- Resume analysis
- Job recommendation system
- LinkedIn profile analysis
- Voice-based interview practice
- Interview history
- Progress tracking
- Skill learning resources
- Deployment with production environment variables

## 👩‍💻 Author

Likitha Nagesh Moger

BE Computer Science and Engineering

CareerAI – AI-powered career guidance platform

## 📄 License

This project is created for educational and project demonstration purposes.