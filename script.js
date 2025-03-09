const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Load progress from session storage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render questions
function renderQuestions() {
  questionsElement.innerHTML = "";
  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `<p>${q.question}</p>`;
    q.choices.forEach(choice => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${index}`;
      input.value = choice;

      // Ensure checked state persists
      if (userAnswers[index] === choice) {
        input.checked = true;
      }

      input.addEventListener("change", () => {
        userAnswers[index] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });
    questionsElement.appendChild(questionDiv);
  });
}

// Call function to render questions
renderQuestions();

// Handle quiz submission
submitButton.addEventListener("click", () => {
  let score = 0;
  questions.forEach((q, index) => {
    if (userAnswers[index] === q.answer) {
      score++;
    }
  });
  localStorage.setItem("score", score);
  scoreElement.textContent = `Your score is ${score} out of 5.`;
});

// Load final score from local storage
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of 5.`;
}
