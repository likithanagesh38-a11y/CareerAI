// ========================================
// CAREERAI BACKEND SERVER
// ========================================

// ========================================
// IMPORTS
// ========================================

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";


// ========================================
// ENVIRONMENT CONFIGURATION
// ========================================

dotenv.config();


// ========================================
// CREATE EXPRESS APP
// ========================================

const app = express();


// ========================================
// MIDDLEWARE
// ========================================

app.use(cors());
app.use(express.json());


// ========================================
// GEMINI AI
// ========================================

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


// ========================================
// HELPER FUNCTION
// CLEAN GEMINI JSON RESPONSE
// ========================================

function cleanJSON(text) {

    if (!text) {
        throw new Error("Empty AI response.");
    }

    let cleaned = text.trim();

    // Remove markdown code fences if Gemini adds them
    cleaned = cleaned
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

    return JSON.parse(cleaned);
}


// ========================================
// CAREER ANALYZER API
// ========================================

app.post("/api/analyze", async (req, res) => {

    try {

        // ----------------------------------------
        // GET USER DATA
        // ----------------------------------------

        const {
            name,
            role,
            skills
        } = req.body;


        // ----------------------------------------
        // VALIDATION
        // ----------------------------------------

        if (!name || !role || !skills) {

            return res.status(400).json({
                success: false,
                error: "Please provide name, role and skills."
            });

        }


        // ----------------------------------------
        // CAREER ANALYSIS PROMPT
        // ----------------------------------------

        const prompt = `
You are CareerAI, an expert career advisor.

Analyze the student's career profile.

Student Name:
${name}

Target Job Role:
${role}

Current Skills:
${skills}


Your task is to analyze the student specifically for the target job role.

Determine:

1. Career readiness score
2. Current strengths
3. Skill gaps
4. Recommended skills
5. Exactly five personalized roadmap steps
6. Short practical career advice


IMPORTANT:

The result MUST depend on the target job role.

Do not assume the student knows any skill that was not included in Current Skills.

For example:

If the target role is Data Analyst, consider skills such as:
SQL, Excel, Python, Pandas, NumPy, Statistics,
Power BI, Tableau, Data Visualization and ETL.

If the target role is Frontend Developer, consider:
HTML, CSS, JavaScript, React, Git/GitHub,
Responsive Design, Tailwind CSS and APIs.

If the target role is Data Scientist, consider:
Python, SQL, Statistics, Machine Learning,
Pandas, NumPy, Data Visualization and Model Deployment.

Adapt the skills according to the actual target role.


Return ONLY valid JSON.

Do not use markdown.

Do not use code blocks.

Do not write anything before or after the JSON.


Use exactly this structure:

{
    "score": 65,

    "strengths": [
        "Python",
        "SQL",
        "Excel"
    ],

    "skillGaps": [
        "Power BI / Tableau",
        "Pandas and NumPy",
        "Statistics and Probability",
        "Data Visualization"
    ],

    "recommendedSkills": [
        "Power BI",
        "Pandas",
        "NumPy",
        "Statistics",
        "Data Visualization"
    ],

    "roadmap": [
        "Master the most important missing technical skills",
        "Learn tools required for the target role",
        "Practice real-world projects",
        "Build a strong professional portfolio",
        "Prepare for interviews and job applications"
    ],

    "advice": "Focus on your missing skills and build practical projects to become job-ready."
}


Rules:

- score must be a number from 0 to 100.
- strengths must contain ONLY skills the student already has.
- skillGaps must contain skills missing or needing improvement.
- recommendedSkills must contain useful skills the student should learn next.
- roadmap must contain EXACTLY 5 steps.
- advice must be short and practical.
- The result must be specific to the target job role.
- Do not assume skills that were not provided.
- Do not give the same generic skills for every career.
- Use realistic skills required for the target role.
`;


        // ----------------------------------------
        // CALL GEMINI
        // ----------------------------------------

        const response = await ai.models.generateContent({

            model: "gemini-3.5-flash",

            contents: prompt

        });


        // ----------------------------------------
        // GET GEMINI RESPONSE
        // ----------------------------------------

        const text = response.text;


        // ----------------------------------------
        // CONVERT RESPONSE TO JSON
        // ----------------------------------------

        const analysis = cleanJSON(text);


        // ----------------------------------------
        // VALIDATE SCORE
        // ----------------------------------------

        if (
            typeof analysis.score !== "number" ||
            analysis.score < 0 ||
            analysis.score > 100
        ) {

            throw new Error("Invalid career score returned by AI.");

        }


        // ----------------------------------------
        // SEND RESPONSE
        // ----------------------------------------

        res.json({

            success: true,

            analysis: analysis

        });


    } catch (error) {

        // ----------------------------------------
        // ERROR HANDLING
        // ----------------------------------------

        console.error(
            "Career Analyzer Error:",
            error
        );


        res.status(500).json({

            success: false,

            error:
                "AI analysis failed. Please try again."

        });

    }

});


// ========================================
// AI INTERVIEW COACH API
// ========================================

app.post("/api/interview", async (req, res) => {

    try {

        // ----------------------------------------
        // GET INTERVIEW DATA
        // ----------------------------------------

        const {
            role,
            question,
            answer
        } = req.body;


        // ----------------------------------------
        // VALIDATION
        // ----------------------------------------

        if (!role || !question || !answer) {

            return res.status(400).json({

                success: false,

                error:
                    "Role, question and answer are required."

            });

        }


        // ----------------------------------------
        // INTERVIEW PROMPT
        // ----------------------------------------

        const prompt = `
You are CareerAI, an expert AI interview coach.

Evaluate a college student's interview answer.

Target Job Role:
${role}

Interview Question:
${question}

Student's Answer:
${answer}


Evaluate the ACTUAL answer given by the student.

Do not give generic feedback.

Consider:

- Technical correctness
- Understanding of the concept
- Clarity
- Use of correct terminology
- Completeness
- Practical examples
- Interview readiness


Return ONLY valid JSON.

Do not use markdown.

Do not use code blocks.

Do not write anything before or after the JSON.


Use exactly this structure:

{
    "score": 8,

    "strengths": [
        "Clearly explained the main concept",
        "Used correct technical terminology"
    ],

    "improvements": [
        "Add a practical example",
        "Explain the concept in more detail"
    ],

    "betterAnswer": "A stronger answer would clearly explain the concept and include a simple real-world example."
}


Rules:

- score must be a number from 0 to 10.
- strengths must contain specific things the student did well.
- improvements must contain specific things the student should improve.
- betterAnswer must be clear and interview-ready.
- Evaluate the actual answer.
- Do not give generic feedback.
- Keep the feedback suitable for a college student.
- Be encouraging and practical.
- The feedback should be relevant to the target job role.
`;


        // ----------------------------------------
        // CALL GEMINI
        // ----------------------------------------

        const response = await ai.models.generateContent({

            model: "gemini-3.5-flash",

            contents: prompt

        });


        // ----------------------------------------
        // GET GEMINI RESPONSE
        // ----------------------------------------

        const text = response.text;


        // ----------------------------------------
        // CONVERT RESPONSE TO JSON
        // ----------------------------------------

        const feedback = cleanJSON(text);


        // ----------------------------------------
        // VALIDATE SCORE
        // ----------------------------------------

        if (
            typeof feedback.score !== "number" ||
            feedback.score < 0 ||
            feedback.score > 10
        ) {

            throw new Error(
                "Invalid interview score returned by AI."
            );

        }


        // ----------------------------------------
        // SEND RESPONSE
        // ----------------------------------------

        res.json({

            success: true,

            feedback: feedback

        });


    } catch (error) {

        // ----------------------------------------
        // ERROR HANDLING
        // ----------------------------------------

        console.error(
            "Interview AI Error:",
            error
        );


        res.status(500).json({

            success: false,

            error:
                "Interview evaluation failed. Please try again."

        });

    }

});

// ========================================
// AI INTERVIEW QUESTION GENERATOR API
// ========================================

app.post("/api/interview-question", async (req, res) => {

    try {

        const {
            role,
            skills
        } = req.body;


        // ----------------------------------------
        // VALIDATION
        // ----------------------------------------

        if (!role) {

            return res.status(400).json({

                success: false,

                error: "Target job role is required."

            });

        }


        // ----------------------------------------
        // QUESTION GENERATION PROMPT
        // ----------------------------------------

        const prompt = `
You are CareerAI, an expert technical interview coach.

Generate ONE interview question for a college student.

Target Job Role:
${role}

Current Skills:
${skills || "Not provided"}


The question MUST be relevant to the target job role.

Examples:

For Data Analyst:
- SQL
- Excel
- Python
- Statistics
- Power BI
- Data Visualization

For Frontend Developer:
- HTML
- CSS
- JavaScript
- React
- APIs
- Responsive Design

For Data Scientist:
- Python
- Statistics
- Machine Learning
- Pandas
- NumPy
- SQL

For Backend Developer:
- Node.js
- Express
- APIs
- Databases
- Authentication
- Server-side programming


IMPORTANT:

Generate ONLY ONE question.

Do not provide the answer.

Do not provide explanation.

Do not use markdown.

Return ONLY valid JSON.

Use exactly this structure:

{
    "question": "Explain how you would handle missing data in a dataset using Python."
}
`;


        // ----------------------------------------
        // CALL GEMINI
        // ----------------------------------------

        const response = await ai.models.generateContent({

            model: "gemini-3.5-flash",

            contents: prompt

        });


        // ----------------------------------------
        // GET RESPONSE
        // ----------------------------------------

        const text = response.text;


        // ----------------------------------------
        // CLEAN JSON
        // ----------------------------------------

        const result = cleanJSON(text);


        // ----------------------------------------
        // VALIDATION
        // ----------------------------------------

        if (
            !result.question ||
            typeof result.question !== "string"
        ) {

            throw new Error(
                "Invalid interview question returned by AI."
            );

        }


        // ----------------------------------------
        // SEND QUESTION
        // ----------------------------------------

        res.json({

            success: true,

            question: result.question

        });

    }

    catch (error) {

        console.error(
            "Interview Question Error:",
            error
        );


        res.status(500).json({

            success: false,

            error:
                "Interview question generation failed. Please try again."

        });

    }

});
// ========================================
// HEALTH CHECK
// ========================================

app.get("/", (req, res) => {

    res.json({

        success: true,

        message:
            "CareerAI backend is running 🚀"

    });

});


// ========================================
// START SERVER
// ========================================

const PORT = 5000;

app.listen(PORT, () => {

    console.log(
        `CareerAI server running at http://localhost:${PORT}`
    );

});