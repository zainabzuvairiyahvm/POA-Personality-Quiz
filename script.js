const questions = [
  // PART 1: POA DISCOVERY
  {
    icon: "📘",
    question: "What is POA?\nWhich of the following best describes what you will learn in POA?",
    options: [
      { text: "A. Recording and analysing the financial transactions of a business", correct: true, score: "A" },
      { text: "B. Planning how a business should advertise its products", correct: false, score: "B" },
      { text: "C. Learning how businesses hire and manage employees", correct: false, score: "C" },
      { text: "D. Studying how businesses design and develop new products", correct: false, score: "D" }
    ]
  },
  {
    icon: "🔑",
    question: "A student sells 20 handmade keychains at $5 each ($100 total). Which statement best describes the $100 earned?",
    options: [
      { text: "A. It is revenue earned from the main business activity.", correct: true, score: "A" },
      { text: "B. It is profit earned from the main business activity.", correct: false, score: "B" },
      { text: "C. It is an asset of the business earned from selling goods.", correct: false, score: "C" },
      { text: "D. It is an expense incurred from the main business activity.", correct: false, score: "D" }
    ]
  },
  {
    icon: "📦",
    question: "A business pays $200 for packaging materials used for its phone case orders. How should the $200 be classified?",
    options: [
      { text: "A. Revenue", correct: false, score: "A" },
      { text: "B. Expense", correct: true, score: "B" },
      { text: "C. Profit", correct: false, score: "C" },
      { text: "D. Capital", correct: false, score: "D" }
    ]
  },
  {
    icon: "💻",
    question: "A business owns a laptop costing $1,500 used by staff. Which statement is correct?",
    options: [
      { text: "A. It is an asset (resource owned with economic value).", correct: true, score: "A" },
      { text: "B. It is an expense because money was paid to buy it.", correct: false, score: "B" },
      { text: "C. It is revenue because it helps earn income.", correct: false, score: "C" },
      { text: "D. It is profit because it provides benefits.", correct: false, score: "D" }
    ]
  },
  {
    icon: "💰",
    question: "A business earns $800 revenue and incurs $500 expenses. What is the profit?",
    options: [
      { text: "A. $300", correct: true, score: "A" },
      { text: "B. $500", correct: false, score: "B" },
      { text: "C. $800", correct: false, score: "C" },
      { text: "D. $1,300", correct: false, score: "D" }
    ]
  },
  {
    icon: "🧮",
    question: "A small business earns $2,500 revenue and has $1,600 expenses. What is the profit?",
    options: [
      { text: "A. $900", correct: true, score: "A" },
      { text: "B. $1,600", correct: false, score: "B" },
      { text: "C. $2,500", correct: false, score: "C" },
      { text: "D. $4,100", correct: false, score: "D" }
    ]
  },

  // PART 2: GET TO KNOW YOU
  {
    icon: "⏰",
    question: "Group project due tomorrow, barely started. What do you do?",
    options: [
      { text: "A. Make a plan and divide the work.", style: "A" },
      { text: "B. Start doing whatever needs to be done immediately.", style: "B" },
      { text: "C. Ask everyone what they think before deciding.", style: "C" },
      { text: "D. 'Don't worry guys, we still have time.' 😎", style: "D" }
    ]
  },
  {
    icon: "💵",
    question: "You find $5 on the classroom floor. First thought?",
    options: [
      { text: "A. 'Whose is this?'", style: "A" },
      { text: "B. 'Hmm... what should I do with this?' 👀", style: "B" },
      { text: "C. 'I should probably hand it to the teacher.'", style: "C" },
      { text: "D. 'FREE MONEY!' 😭", style: "D" }
    ]
  },
  {
    icon: "📐",
    question: "Pick your ideal study desk setup:",
    options: [
      { text: "A. Everything neatly arranged and easy to find.", style: "A" },
      { text: "B. Laptop, calculator, snacks ready to go.", style: "B" },
      { text: "C. Colourful stationery and random cool things everywhere.", style: "C" },
      { text: "D. One small clear space amongst complete chaos. 😂", style: "D" }
    ]
  },
  {
    icon: "📚",
    question: "Test tomorrow! What best describes you?",
    options: [
      { text: "A. Start early so I don't have to rush.", style: "A" },
      { text: "B. Make a plan, but don't always stick to it.", style: "B" },
      { text: "C. Study when I feel ready to focus.", style: "C" },
      { text: "D. Brain gets hyper-productive the night before.", style: "D" }
    ]
  }
];

const personalities = {
  A: { emoji: "🐰", title: "The Careful Accountant", quote: '"Check twice. Submit once."', desc: "Precise, organised, and pays close attention to details." },
  B: { emoji: "🐱", title: "The Number Cruncher", quote: '"Give me the numbers."', desc: "Enjoys calculations, patterns, and figuring things out." },
  C: { emoji: "🦊", title: "The Accounting Detective", quote: '"Something doesn\'t add up..."', desc: "Curious, analytical, and loves solving problems." },
  D: { emoji: "🐻", title: "The Steady Accountant", quote: '"Okay... we got this."', desc: "Calm, consistent, and works through problems step-by-step." }
};

let currentQ = 0;
let scores = { A: 0, B: 0, C: 0, D: 0 };
let styles = { A: 0, B: 0, C: 0, D: 0 };

const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedbackText = document.getElementById("feedback-text");
const quizIllustration = document.getElementById("quiz-illustration");

function loadQuestion() {
  feedbackText.classList.add("hidden");
  const q = questions[currentQ];
  
  progressBar.style.width = `${((currentQ) / questions.length) * 100}%`;
  quizIllustration.textContent = q.icon;
  questionText.innerText = q.question;
  optionsContainer.innerHTML = "";

  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerText = opt.text;
    btn.onclick = () => handleSelect(opt);
    optionsContainer.appendChild(btn);
  });
}

function handleSelect(opt) {
  if (currentQ < 6) {
    if (opt.score) scores[opt.score]++;
    if (opt.correct) {
      feedbackText.textContent = "Correct! ✨";
      feedbackText.style.color = "#4caf50";
    } else {
      feedbackText.textContent = "Not quite! Keep learning! 💡";
      feedbackText.style.color = "#ff9800";
    }
    feedbackText.classList.remove("hidden");
    setTimeout(nextQuestion, 800);
  } else {
    if (opt.style) styles[opt.style]++;
    nextQuestion();
  }
}

function nextQuestion() {
  currentQ++;
  if (currentQ < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  progressBar.style.width = "100%";
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");

  const topPersonality = Object.keys(scores).reduce((a, b) => scores[a] >= scores[b] ? a : b);
  const topStyle = Object.keys(styles).reduce((a, b) => styles[a] >= styles[b] ? a : b);

  const p = personalities[topPersonality];
  document.getElementById("result-emoji").textContent = p.emoji;
  document.getElementById("result-title").textContent = p.title;
  document.getElementById("result-quote").textContent = p.quote;
  document.getElementById("result-desc").textContent = p.desc;

  const tag = document.getElementById("combo-tag");
  const comboTitle = document.getElementById("combo-title");
  const comboDesc = document.getElementById("combo-desc");

  if (topStyle === "D" || topStyle === "C") {
    tag.textContent = "💥 Mismatched Combo";
    tag.className = "style-tag tag-mismatch";
    comboTitle.textContent = "THE PANIC PLANNER";
    comboDesc.textContent = "Your accounting brain wants everything organised... but your study schedule apparently has other plans! 😂";
  } else {
    tag.textContent = "💚 Matched Combo";
    tag.className = "style-tag tag-match";
    comboTitle.textContent = "THE MASTER STRATEGIST";
    comboDesc.textContent = "You like figuring things out and actually have a plan for doing it. POA might be a dangerous combination for you! 🔎";
  }
}

document.getElementById("restart-btn").onclick = () => {
  currentQ = 0;
  scores = { A: 0, B: 0, C: 0, D: 0 };
  styles = { A: 0, B: 0, C: 0, D: 0 };
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");
  loadQuestion();
};

loadQuestion();
