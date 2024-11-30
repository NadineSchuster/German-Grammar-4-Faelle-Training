import Question from "./Question.js";

class MultipleChoiceQuestion extends Question {
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

export default MultipleChoiceQuestion;
