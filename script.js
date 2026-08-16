// ========================================
// CAREERAI JAVASCRIPT
// ========================================


// ========================================
// NAVIGATION
// ========================================

function scrollToAnalyzer() {

    document.getElementById("analyzer").scrollIntoView({
        behavior: "smooth"
    });

}


function scrollToFeatures() {

    document.getElementById("features").scrollIntoView({
        behavior: "smooth"
    });

}


// ========================================
// CAREER ANALYZER
// ========================================

const careerForm =
    document.getElementById("careerForm");


careerForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        // ----------------------------------------
        // GET USER INPUT
        // ----------------------------------------

        const name =
            document.getElementById("name")
                .value
                .trim();


        const role =
            document.getElementById("role")
                .value
                .trim();


        const skills =
            document.getElementById("skills")
                .value
                .trim();


        // ----------------------------------------
        // VALIDATION
        // ----------------------------------------

        if (!name || !role || !skills) {

            alert(
                "Please fill in all the fields."
            );

            return;

        }


        // ----------------------------------------
        // BUTTON
        // ----------------------------------------

        const button =
            document.querySelector(".analyze-btn");


        button.disabled = true;

        button.textContent =
            "🧠 AI is analyzing...";


        try {

            // ----------------------------------------
            // CALL CAREER API
            // ----------------------------------------

            const response =
                await fetch(
                    "https://careerai-backend-fb1l.onrender.com/api/analyze",
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            name,
                            role,
                            skills

                        })

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.error ||
                    "Something went wrong."
                );

            }


            // ----------------------------------------
            // DISPLAY CAREER RESULTS
            // ----------------------------------------

            displayAIResults(
                data.analysis
            );


            // ----------------------------------------
            // GENERATE INTERVIEW QUESTION
            // ----------------------------------------

            generateInterviewQuestion(
                role,
                skills
            );


        }

        catch (error) {

            console.error(error);


            alert(
                "AI connection failed. Make sure the server is running and your API key is configured."
            );

        }

        finally {

            button.disabled = false;

            button.textContent =
                "✨ Analyze My Career";

        }

    }
);


// ========================================
// DISPLAY CAREER RESULTS
// ========================================

function displayAIResults(analysis) {

    const resultsSection =
        document.getElementById("results");


    const strengths =
        document.getElementById("strengths");


    const skillGaps =
        document.getElementById("skillGaps");


    const careerScore =
        document.getElementById("careerScore");


    const heroRole =
        document.getElementById("heroRole");


    const heroCurrentSkills =
        document.getElementById(
            "heroCurrentSkills"
        );


    const heroNeededSkills =
        document.getElementById(
            "heroNeededSkills"
        );


    // ----------------------------------------
    // SCORE
    // ----------------------------------------

    let score =
        analysis.score;


    if (
        typeof score === "number" &&
        score >= 0 &&
        score <= 100
    ) {

        careerScore.textContent =
            score + "%";

    }

    else {

        careerScore.textContent =
            "--";

    }


    // ----------------------------------------
    // HERO ROLE
    // ----------------------------------------

    const roleInput =
        document.getElementById("role");


    if (
        heroRole &&
        roleInput
    ) {

        heroRole.textContent =
            roleInput.value.trim();

    }


    // ----------------------------------------
    // CURRENT SKILLS
    // ----------------------------------------

    if (
        heroCurrentSkills &&
        Array.isArray(analysis.strengths)
    ) {

        heroCurrentSkills.innerHTML =
            analysis.strengths
                .map(skill => `
                    <div>
                        ✓ ${escapeHTML(skill)}
                    </div>
                `)
                .join("");

    }


    // ----------------------------------------
    // SKILLS TO IMPROVE
    // ----------------------------------------

    if (
        heroNeededSkills &&
        Array.isArray(analysis.skillGaps)
    ) {

        heroNeededSkills.innerHTML =
            analysis.skillGaps
                .map(skill => `
                    <div>
                        ! ${escapeHTML(skill)}
                    </div>
                `)
                .join("");

    }


    // ----------------------------------------
    // STRENGTHS
    // ----------------------------------------

    if (
        Array.isArray(
            analysis.strengths
        )
    ) {

        strengths.innerHTML =
            analysis.strengths
                .map(skill => `
                    <li>
                        ✓ ${escapeHTML(skill)}
                    </li>
                `)
                .join("");

    }


    // ----------------------------------------
    // SKILL GAPS
    // ----------------------------------------

    if (
        Array.isArray(
            analysis.skillGaps
        )
    ) {

        skillGaps.innerHTML =
            analysis.skillGaps
                .map(skill => `
                    <li>
                        ! ${escapeHTML(skill)}
                    </li>
                `)
                .join("");

    }


    // ----------------------------------------
    // AI ANALYSIS BOX
    // ----------------------------------------

    let existingAnalysis =
        document.getElementById(
            "aiAnalysis"
        );


    if (!existingAnalysis) {

        existingAnalysis =
            document.createElement("div");


        existingAnalysis.id =
            "aiAnalysis";


        existingAnalysis.style.marginTop =
            "30px";


        existingAnalysis.style.padding =
            "30px";


        existingAnalysis.style.border =
            "1px solid rgba(255,255,255,0.12)";


        existingAnalysis.style.borderRadius =
            "20px";


        existingAnalysis.style.background =
            "rgba(255,255,255,0.05)";


        existingAnalysis.style.lineHeight =
            "1.8";


        existingAnalysis.style.color =
            "#dce1f0";


        resultsSection.appendChild(
            existingAnalysis
        );

    }


    // ----------------------------------------
    // RECOMMENDED SKILLS
    // ----------------------------------------

    const recommendedSkills =
        analysis.recommendedSkills || [];


    const roadmap =
        analysis.roadmap || [];
        // ========================================
// DISPLAY PERSONALIZED ROADMAP
// ========================================

const personalizedRoadmap =
    document.getElementById("personalizedRoadmap");

if (
    personalizedRoadmap &&
    Array.isArray(roadmap)
) {

    personalizedRoadmap.innerHTML =
        roadmap
            .map((step, index) => `

                <div class="roadmap-item">

                    <div class="step-number">
                        ${String(index + 1).padStart(2, "0")}
                    </div>

                    <div>
                        <h3>
                            ${escapeHTML(step)}
                        </h3>

                        <p>
                            Personalized step based on
                            your career goal and skill gaps.
                        </p>
                    </div>

                </div>

            `)
            .join("");

}


    const advice =
        analysis.advice || "";


    existingAnalysis.innerHTML = `

        <h3>
            ✨ AI Career Analysis
        </h3>


        <div style="margin-top:25px;">

            <h4>💡 Career Advice</h4>

            <p>
                ${escapeHTML(advice)}
            </p>

        </div>


        <div style="margin-top:25px;">

            <h4>📚 Recommended Skills</h4>

            <ul>
                ${recommendedSkills
                    .map(skill => `
                        <li>
                            ${escapeHTML(skill)}
                        </li>
                    `)
                    .join("")
                }
            </ul>

        </div>


        <div style="margin-top:25px;">

            <h4>🛣️ Personalized Roadmap</h4>

            <ol>
                ${roadmap
                    .map(step => `
                        <li>
                            ${escapeHTML(step)}
                        </li>
                    `)
                    .join("")
                }
            </ol>

        </div>

    `;


    // ----------------------------------------
    // SHOW RESULTS
    // ----------------------------------------

    resultsSection.classList.remove(
        "hidden"
    );


    resultsSection.scrollIntoView({
        behavior: "smooth"
    });

}


// ========================================
// AI INTERVIEW QUESTION GENERATOR
// ========================================

async function generateInterviewQuestion(
    role,
    skills
) {

    const questionElement =
        document.getElementById(
            "question"
        );


    if (!questionElement) {

        return;

    }


    // ----------------------------------------
    // LOADING
    // ----------------------------------------

    questionElement.textContent =
        "🧠 Generating an interview question for your role...";


    try {

        // ----------------------------------------
        // CALL QUESTION API
        // ----------------------------------------

        const response =
            await fetch(
                "https://careerai-backend-fb1l.onrender.com/api/interview-question",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        role,
                        skills

                    })

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Question generation failed."
            );

        }


        // ----------------------------------------
        // DISPLAY QUESTION
        // ----------------------------------------

        questionElement.textContent =
            data.question;


    }

    catch (error) {

        console.error(
            "Interview Question Error:",
            error
        );


        questionElement.textContent =
            "Unable to generate an interview question. Please try again.";

    }

}


// ========================================
// AI INTERVIEW COACH
// ========================================

async function evaluateAnswer() {

    const answer =
        document.getElementById(
            "answer"
        )
        .value
        .trim();


    const feedback =
        document.getElementById(
            "feedback"
        );


    const role =
        document.getElementById(
            "role"
        )
        .value
        .trim();


    const questionElement =
        document.getElementById(
            "question"
        );


    // ----------------------------------------
    // VALIDATION
    // ----------------------------------------

    if (!role) {

        alert(
            "Please analyze your career profile first."
        );

        return;

    }


    if (!answer) {

        alert(
            "Please write your answer first."
        );

        return;

    }


    if (!questionElement) {

        alert(
            "Interview question not found."
        );

        return;

    }


    const question =
        questionElement.textContent.trim();


    // ----------------------------------------
    // LOADING
    // ----------------------------------------

    feedback.classList.remove(
        "hidden"
    );


    feedback.innerHTML = `

        <h4>
            🧠 AI is evaluating your answer...
        </h4>

        <p>
            Please wait while CareerAI
            analyzes your response.
        </p>

    `;


    try {

        // ----------------------------------------
        // CALL INTERVIEW API
        // ----------------------------------------

        const response =
            await fetch(
                "https://careerai-backend-fb1l.onrender.com/api/interview",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        role,
                        question,
                        answer

                    })

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Interview evaluation failed."
            );

        }


        // ----------------------------------------
        // GET FEEDBACK
        // ----------------------------------------

        const aiFeedback =
            data.feedback;


        // ----------------------------------------
        // STRENGTHS
        // ----------------------------------------

        let strengthsHTML = "";


        if (
            Array.isArray(
                aiFeedback.strengths
            )
        ) {

            strengthsHTML =
                aiFeedback.strengths
                    .map(item => `
                        <li>
                            ✓ ${escapeHTML(item)}
                        </li>
                    `)
                    .join("");

        }


        // ----------------------------------------
        // IMPROVEMENTS
        // ----------------------------------------

        let improvementsHTML = "";


        if (
            Array.isArray(
                aiFeedback.improvements
            )
        ) {

            improvementsHTML =
                aiFeedback.improvements
                    .map(item => `
                        <li>
                            ! ${escapeHTML(item)}
                        </li>
                    `)
                    .join("");

        }


        // ----------------------------------------
        // DISPLAY FEEDBACK
        // ----------------------------------------

        feedback.innerHTML = `

            <h4>
                ✨ AI Interview Feedback
            </h4>


            <div class="interview-score">

                <strong>
                    Score:
                    ${aiFeedback.score}/10
                </strong>

            </div>


            <div class="interview-section">

                <h5>
                    💪 What You Did Well
                </h5>

                <ul>
                    ${strengthsHTML}
                </ul>

            </div>


            <div class="interview-section">

                <h5>
                    ⚠️ What You Can Improve
                </h5>

                <ul>
                    ${improvementsHTML}
                </ul>

            </div>


            <div class="interview-section">

                <h5>
                    🚀 Better Answer
                </h5>

                <p>
                    ${escapeHTML(
                        aiFeedback.betterAnswer ||
                        "No improved answer was generated."
                    )}
                </p>

            </div>

        `;

    }

    catch (error) {

        console.error(
            "Interview Coach Error:",
            error
        );


        feedback.innerHTML = `

            <h4>
                ⚠️ Something went wrong
            </h4>

            <p>
                ${escapeHTML(
                    error.message
                )}
            </p>

        `;

    }

}


// ========================================
// SECURITY
// ========================================

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}


// ========================================
// PAGE LOAD
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "CareerAI loaded successfully 🚀"
        );

    }
);