"use strict";

let button = document.querySelector("#button");
let card = document.querySelector("#exercise-card");
let counter = document.querySelector("#counter");
let userFeedback = document.querySelector("#user-feedback");
let userAnswers = [];

class Question {
  constructor(id, question, kasus, quizType, wordType, timeType) {
    this.id = id;
    this.question = question;
    this.kasus = kasus;
    this.quizType = quizType;
    this.wordType = wordType;
    this.timeType = timeType;
  }

  cleanUp(container) {
    let child = container.firstElementChild;

    if (child) {
      while (child) {
        var next = child.nextElementSibling;
        container.removeChild(child);
        child = next;
      }
    }
  }
}

class QuestionCard extends Question {
  constructor(
    id,
    question,
    answers,
    quizType,
    wordType,
    timeType,
    userSelection
  ) {
    super(id, question, quizType, wordType, timeType);
    this.answers = answers;
    this.userSelection = userSelection;
  }

  createQuizCard() {
    let q = document.createElement("h3");
    q.textContent = this.question;
    card.appendChild(q);
    // shuffle order of answers :)
    this.answers = randomizeExercise(this.answers);
    for (let i = 0; i < this.answers.length; i++) {
      let element = document.createElement("p");
      element.textContent = this.answers[i];
      element.addEventListener("click", function () {
        // registriere Antwort
        let activeSelection = document.querySelector(
          "#exercise-card p.selected"
        );
        if (activeSelection) {
          activeSelection.classList.remove("selected");
        }
        element.classList.add("selected");
      });
      card.appendChild(element);
    }
  }

  saveUserSelection() {
    let activeSelection = document.querySelector("#exercise-card p.selected");
    if (activeSelection) {
      userAnswers.push(activeSelection.textContent);
      return true;
    } else {
      return false;
    }
  }

  giveFeedback(feedback) {
    switch (feedback) {
      case "missing":
        let p = document.createElement("p");
        p.textContent = "Bitte eine Antwort auswählen";
        p.classList.add("selection-missing");
        userFeedback.appendChild(p);
        break;

      default:
        break;
    }
  }
}

let c = new QuestionCard(
  1,
  "Was ist dein Lieblingstier?",
  ["Katzen", "Hunde", "Fische", "Ich mag keine Tiere, ich esse Tiere"],
  "Tiere"
);

let d = new QuestionCard(
  2,
  "Wo kannst du dich entspannen?",
  ["Strand", "Wald", "Zuhause", "Bibliothek"],
  "Orte"
);

let e = new QuestionCard(
  3,
  "Was ist deine Lieblingsfarbe?",
  ["Rot", "Gelb", "Grün"],
  "Farben"
);

let exercise = [];
exercise.push(c, d, e);
exercise = randomizeExercise(exercise);

let loadQuestion = function () {
  exercise[counter.textContent].cleanUp(card);
  exercise[counter.textContent].createQuizCard();
  counter.textContent++;
};
loadQuestion();

button.addEventListener("click", function (e) {
  let element = exercise[counter.textContent];

  element.cleanUp(userFeedback);
  let selectionExists = element.saveUserSelection();

  if (selectionExists) {
    element.cleanUp(card);
    element.createQuizCard();
    counter.textContent++;

    if (counter.textContent >= exercise.length) {
      counter.textContent = 0;
      exercise = randomizeExercise(exercise);
    }
  } else {
    element.giveFeedback("missing");
  }
});

function randomizeExercise(sprüche) {
  for (let i = sprüche.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let k = sprüche[i];
    sprüche[i] = sprüche[j];
    sprüche[j] = k;
  }

  // spruch.textContent = sprüche;
  return sprüche;
}
