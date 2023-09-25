const questions = [
    {
        question: "Qual é o nome do planeta natal de Luke Skywalker?",
        options: ["Tatooine", "Endor", "Hoth", "Dagobah"],
        correctAnswer: "Tatooine"
    },
    {
        question: "Quem é o mestre Jedi de Anakin Skywalker?",
        options: ["Obi-Wan Kenobi", "Yoda", "Mace Windu", "Qui-Gon Jinn"],
        correctAnswer: "Obi-Wan Kenobi"
    },
    {
        question: "Como se chama a espaçonave de Han Solo?",
        options: ["Falcon Solitário", "Falcão Milenar", "Falcão do Espaço", "Falcão da Estrela"],
        correctAnswer: "Falcão Milenar"
    },
    {
        question: "Qual é o nome do Wookiee amigo de Han Solo?",
        options: ["C-3PO", "R2-D2", "Chewbacca", "BB-8"],
        correctAnswer: "Chewbacca"
    },
    {
        question: "Quem é o imperador Sith em Star Wars?",
        options: ["Darth Vader", "Darth Maul", "Darth Sidious", "Darth Plagueis"],
        correctAnswer: "Darth Sidious"
    },
    {
        question: "Qual é a espécie de Yoda?",
        options: ["Wookiee", "Hutt", "Twi'lek", "Yoda é uma espécie única"],
        correctAnswer: "Yoda é uma espécie única"
    },
    {
        question: "Quem é o pai de Luke Skywalker?",
        options: ["Anakin Skywalker", "Obi-Wan Kenobi", "Yoda", "Han Solo"],
        correctAnswer: "Anakin Skywalker"
    },
    {
        question: "Qual é o nome do caçador de recompensas que capturou Han Solo em carbonita?",
        options: ["Greedo", "Boba Fett", "Jango Fett", "Dengar"],
        correctAnswer: "Boba Fett"
    },
    {
        question: "Quem é o líder da Resistência em 'O Despertar da Força'?",
        options: ["Princesa Leia", "Luke Skywalker", "Han Solo", "General Leia Organa"],
        correctAnswer: "General Leia Organa"
    },
    {
        question: "Qual é a arma principal dos Jedi?",
        options: ["Blaster", "Sabre de Luz", "Bazooka", "Espada de Plasma"],
        correctAnswer: "Sabre de Luz"
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const resultElement = document.getElementById("result");
const nextButton = document.getElementById("next-button");

function loadQuestion() {
    const questionData = questions[currentQuestion];
    questionElement.textContent = questionData.question;

    for (let i = 0; i < 4; i++) {
        const optionButton = optionsContainer.children[i];
        optionButton.textContent = questionData.options[i];
        optionButton.classList.remove("correct", "incorrect");
        optionButton.disabled = false;
    }
}

function checkAnswer(selectedOption) {
    const selectedAnswer = selectedOption.textContent;
    const correctAnswer = questions[currentQuestion].correctAnswer;

    if (selectedAnswer === correctAnswer) {
        selectedOption.classList.add("correct");
        score++;
    } else {
        selectedOption.classList.add("incorrect");
        selectedOption.disabled = true;
    }

    for (let i = 0; i < 4; i++) {
        optionsContainer.children[i].disabled = true;
    }

    if (currentQuestion === questions.length - 1) {
        nextButton.textContent = "Ver Resultado";
    }

    resultElement.textContent = `Resposta correta: ${correctAnswer}`;
    nextButton.style.display = "block";
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
        resultElement.textContent = "";
        nextButton.style.display = "none";
    } else {
        showResult();
    }
}

function showResult() {
    questionElement.textContent = `Você acertou ${score} de ${questions.length} perguntas!`;
    optionsContainer.style.display = "none";
    resultElement.textContent = "";
    nextButton.style.display = "none";
}

loadQuestion();
