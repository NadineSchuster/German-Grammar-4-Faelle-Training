import cleanUp from "./cleanUp.js";
import shuffle from "./shuffle.js";
import createQuizContainer from "./createQuizContainer.js";

export default function renderExercises(exerciseRow, mainContainer, questions) {
  cleanUp(mainContainer);
  shuffle(questions);
  createQuizContainer(mainContainer);

  let counter = 0;
  for (let i = 0; i < questions.length; i++) {
    console.log("Next", questions[i]);
    questions[i].createQuizCard(questions, mainContainer, questions);
    // let spliced = exerciseRow.splice(i, 1);
    // practicedExercises.push(spliced[0]);
  }
}
