import Question from "../classes/Question.js";

let card = document.querySelector("#exercise-card");
let button = document.querySelector("#button");
let counter = document.querySelector("#counter");

class DragAndDropText extends Question {
  constructor(
    id,
    question,
    kasus,
    sentence,
    words,
    quizType,
    wordType,
    timeType
  ) {
    super(id, question, kasus, quizType, wordType, timeType);
    this.article = article;
    this.words = words;
    // this.answers = answers;
  }
}

let a = new DragAndDropText(
  "10",
  "Füge ein Adjektiv hinzu.",
  "1",
  "Maja pflückt" + <div id="user-selection-box"></div> + "Äpfel",
  ["reif", "reife", "reifen"],
  "lueckentext",
  "Adjektiv",
  "Gegenwart"
);
