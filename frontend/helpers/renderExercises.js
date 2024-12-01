import cleanUp from "./cleanUp.js";
import shuffle from "./shuffle.js";
import createQuizContainer from "./createQuizContainer.js";


let exerciseToElements = function (mainContainer, exercise) {
  let restText;
  let text = exercise.question;
  console.log("exerciseToElements",text);
  let exerciseContainer = document.createElement("div");
  exerciseContainer.classList.add("cloze-inner-container")
  exerciseContainer.setAttribute('id', exercise.id);
  let exerciseSolutions = exercise.solution;
  let solutionItem = exerciseSolutions[0];
   
  console.log("ExerciseSolutions", exerciseSolutions)

  const count = text.split("]").length - 1;

  let needsInput = text.includes("[]")

  if (needsInput) {
    for (let i = 0; i < count; i++) {
      
      if (needsInput) {

        let firstGapIndex = text.indexOf("]");
        // Get the first part of the sentence
        let firstTextPart = text.slice(0, firstGapIndex+1);
        // Gets other part of text
        restText = text.slice(firstGapIndex + 1, text.length);
        
        let textItem = document.createElement("p");
        textItem.textContent = firstTextPart.replace("[]", "");
        
        let input = document.createElement("input");
        input.type = "text";
        
        let solution = Object.values(solutionItem)[i];
        input.setAttribute("solution", solution);
        
        exerciseContainer.append(
          textItem,
          input
        );
      }
      
      needsInput = restText.includes("[]")
      
      if (needsInput) {
        text = restText;
      } else {
        let part = document.createElement("p");
        part.textContent = restText;
        exerciseContainer.append(
          part
      );
      }
    }
  } else if (!needsInput) {
    let part = document.createElement("p");
    part.textContent = text;
    exerciseContainer.append(
      part
    );
  }

  mainContainer.append(
    exerciseContainer,
  )
}

export default function renderExercises(mainContainer, selectedExercises) {
// export default function renderExercises(exerciseRow, mainContainer, questions) {
  cleanUp(mainContainer);
  // shuffle(questions);
  // createQuizContainer(mainContainer);

  let clozes =[]

  selectedExercises.forEach((exercise, index) => {

            Object.entries(exercise).forEach(([exerciseKey, exerciseValue]) => {
          
              if (exerciseValue == "Cloze") {
                
                exerciseToElements(mainContainer, exercise);

              }
          });
      });

  // console.log("Clozes:", clozes)
  // for (let i = 0; i < clozes.length; i++) {
  //   let item = clozes[i];
  //   mainContainer.append(
  //         item
  //     );
  // }
  
      
  // let counter = 0;
  // for (let i = 0; i < questions.length; i++) {
  //   console.log("Next", questions[i]);
  //   questions[i].createQuizCard(questions, mainContainer, questions);
  //   // let spliced = exerciseRow.splice(i, 1);
  //   // practicedExercises.push(spliced[0]);
  // }

  // for (let i = 0; i < 2; i++) {
  //   console.log("Next", questions[i]);
  //   questions[i].createQuizCard(questions, mainContainer, questions);
    // let spliced = exerciseRow.splice(i, 1);
    // practicedExercises.push(spliced[0]);
  // }
}