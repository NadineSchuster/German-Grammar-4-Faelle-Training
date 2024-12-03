import cleanUp from "./cleanUp.js";
import shuffle from "./shuffle.js";
import createQuizContainer from "./createQuizContainer.js";


let createClozeElements = function (mainContainer, exercise) {
  let restText;
  let text = exercise.question;
  console.log("createClozeElements",text);
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

let createAssignCorrectlyElements = function (mainContainer, exercise) {
  let restSatz
  let otherWord
  let text = exercise.question;
  let exerciseSolutions = exercise.solution[0];
  let counter = 0;
  Object.entries(exerciseSolutions).forEach(([exerciseKey, exerciseValue]) => {
    // console.log("Key", exerciseKey, "Value", exerciseValue);
    counter++;
    console.log("Counter:", counter);
 
    // let solutionItem = exerciseSolutions[0];
    // console.log("Solutions: ", solutionItem)

    // let kasus = Object.keys(solutionItem)[0]
    
    let kasus = exerciseKey
    // console.log("Kasus:",kasus)
    // let LösungsElement = Object.values(solutionItem)[0]
    let LösungsElement = exerciseValue
    let LösungsElementLänge = LösungsElement.length
    let LösungsElementIndex = text.indexOf(LösungsElement)
    if (LösungsElementIndex != 0) {
      otherWord = text.slice(0, LösungsElementIndex)
      let textItem = document.createElement("p");
      textItem.textContent = otherWord;
      mainContainer.append(
        textItem
      )
      
    }
    let satzelementLänge = LösungsElementIndex + LösungsElementLänge
    let satzelement = text.slice(LösungsElementIndex, satzelementLänge)
    // satzelement attribute = LösungsElment
    // console.log(LösungsElementIndex, satzelementLänge);
    // console.log(LösungsElement, satzelement);

    restSatz = text.replace(satzelement, "");
    restSatz = restSatz.replace(otherWord, "");
      console.log("Restsatz", restSatz)
    // console.log("restSatz",restSatz)
    text = restSatz
    const satzelemente = satzelement.split(" ");
    for (let i = 0; i < satzelemente.length; i++) {
      let textItem = document.createElement("p");
      textItem.textContent = satzelemente[i];
      textItem.setAttribute("solution", kasus);
      mainContainer.append(
        textItem
      )

      if (counter == Object.keys(exerciseSolutions).length) {
        const satzelemente = text.split(" ");
        console.log("Satzelemente",satzelemente)
        for (let i = 0; i < satzelemente.length; i++) {
          let textItem = document.createElement("p");
          textItem.textContent = satzelemente[i];
          mainContainer.append(
            textItem
          )
        }
    }
  }
    // if (LösungsElementIndex != 0) {
    //   let otherWord = text.slice(0, LösungsElementIndex)
    //    let textItem = document.createElement("p");
    //     textItem.textContent = otherWord;
    //     mainContainer.append(
    //       textItem
    //     )
    // }
  });

  
  // if("Der Löwe" == "Der Löwe") // Satzelement == SolutionItem
  // {
  //   // Der Löwe => Attribut = Nominativ
  // }
  // const words = text.split(" ");
  // console.log(words);
  // for (let i = 0; i < words.length; i++) {
  //   console.log(Object.keys(solutionItem)[i]);
  //   let solutionWords = Object.values(solutionItem);
  //   console.log((solutionWords));
  //   console.log((solutionWords.length));
  // }
  // for (let i = 0; i < words.length; i++) {
  //   const word = words[i];

  //   let textItem = document.createElement("p");
  //   textItem.textContent = word;

  //   let solution = Object.keys(solutionItem)[i];
  //   textItem.setAttribute("solution", solution);

  //   console.log("Wort:",word,"Kasus:", solution);

  //   mainContainer.append(
  //     word,
  //   )
  // }
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
                
                createClozeElements(mainContainer, exercise);

              } else if (exerciseValue == "AssignCorrectly") {
                
                createAssignCorrectlyElements(mainContainer, exercise);
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