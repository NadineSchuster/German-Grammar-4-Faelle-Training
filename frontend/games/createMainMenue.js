import cleanUp from "../helpers/cleanUp.js";
import adaptExercises from "../helpers/adaptExercises.js";
import renderExercises from "../helpers/renderExercises.js";
import pickExercises from "../helpers/pickExercises.js";
import drop from "../helpers/drop.js";

const mainContainer = document.querySelector("#main-container");

let buttonNext = document.querySelector("#button-next-exercise");
let practicedExercises = [];

let createMainMenue = function (questions) {
  cleanUp(mainContainer);
  let headLine = document.createElement("h1");
  headLine.textContent = "Übungen 4 Fälle";
  let subHeader = document.createElement("h3");
  subHeader.textContent = "Klicke auf eine Schwierigkeitsstufe um zu starten!";
  let veryEasyBtn = document.createElement("button");
  veryEasyBtn.classList.add("droppable-item");
  veryEasyBtn.textContent = "Sehr Leicht";
  veryEasyBtn.addEventListener("click", function () {
    console.log("Click! :D");
    let exercises = adaptExercises("1", questions);
    renderExercises(exercises, mainContainer, questions);
    buttonNext.addEventListener("click", function () {
      renderExercises(exercises, mainContainer, questions);
    });
  });
  let easyBtn = document.createElement("button");
  easyBtn.classList.add("droppable-item");
  easyBtn.textContent = "Leicht";
  easyBtn.addEventListener("click", function () {
    console.log("Click easy!");
  });
  let normalBtn = document.createElement("button");
  normalBtn.classList.add("droppable-item");
  normalBtn.textContent = "Normal";
  normalBtn.addEventListener("click", function () {
    console.log("Click Normal! :D");
  });
  let advancedBtn = document.createElement("button");
  advancedBtn.classList.add("droppable-item");
  advancedBtn.textContent = "Fortgeschritten";
  advancedBtn.addEventListener("click", function () {
    console.log("Click Advanced! :D");
  });
  let expertBtn = document.createElement("button");
  expertBtn.classList.add("droppable-item");
  expertBtn.textContent = "Experte";
  expertBtn.addEventListener("click", function () {
    console.log("Click Expert! :D");
    cleanUp(mainContainer);
  });
  let optionsContainer = document.createElement("div")
  optionsContainer.classList.add("main-menu-options-container");
  let selectedOptions = [];
  mainContainer.append(
    headLine,
    subHeader,
    veryEasyBtn,
    easyBtn,
    normalBtn,
    advancedBtn,
    expertBtn,
    optionsContainer,
  );
  let addButtonFunctionality = function (element, selectedOption) {
    // element.classList.add("option-item");
    element.classList.add("droppable-item");
    element.addEventListener("click", function () {
      console.log("Click! :D");
      if (element.classList.contains("selected-option-item")) {
        element.classList.remove("selected-option-item");
        for (var i = selectedOptions.length - 1; i >= 0; i--) {
          if (selectedOptions[i] === selectedOption) {
            selectedOptions.splice(i, 1);
          }
        }
        } else {
          element.classList.add("selected-option-item");
          selectedOptions.push(selectedOption);
        }      
      console.log(selectedOptions)

      if (typeof selectedOptions !== 'undefined' && selectedOptions.length > 0) {
        startQuizBtn.classList.remove("start-quiz-btn-deactivated");
      } else {
        startQuizBtn.classList.add("start-quiz-btn-deactivated");
      }
    });
  }

  let nominativOption = document.createElement("button");
  nominativOption.textContent = "Nominativ";
  addButtonFunctionality(nominativOption, nominativOption.textContent)

  let genitivOption = document.createElement("button");
  genitivOption.textContent = "Genitiv";
  addButtonFunctionality(genitivOption, genitivOption.textContent)

  let dativOption = document.createElement("button");
  dativOption.textContent = "Dativ";
  addButtonFunctionality(dativOption, dativOption.textContent)
 
  let akkusativOption = document.createElement("button");
  akkusativOption.textContent = "Akkusativ";
  addButtonFunctionality(akkusativOption, akkusativOption.textContent)

  // let gegenwartOption = document.createElement("button");
  // gegenwartOption.textContent = "Gegenwart";
  // addButtonFunctionality(gegenwartOption, gegenwartOption.textContent)

  // let ersteVergangenheitOption = document.createElement("button");
  // ersteVergangenheitOption.textContent = "Erste Vergangenheit";
  // addButtonFunctionality(ersteVergangenheitOption, ersteVergangenheitOption.textContent)

  // let zweiteVergangenheitOption = document.createElement("button");
  // zweiteVergangenheitOption.textContent = "Zweite Vergangenheit";
  // addButtonFunctionality(zweiteVergangenheitOption, zweiteVergangenheitOption.textContent);
  
  // let ersteZukunftOption = document.createElement("button");
  // ersteZukunftOption.textContent = "Erste Zukunft";
  // addButtonFunctionality(ersteZukunftOption, ersteZukunftOption.textContent);
  
  // let zweiteZukunftOption = document.createElement("button");
  // zweiteZukunftOption.textContent = "Zweite Zukunft";
  // addButtonFunctionality(zweiteZukunftOption, zweiteZukunftOption.textContent);
  
  // let vorvergangenheitOption = document.createElement("button");
  // vorvergangenheitOption.textContent = "Vorver- gangenheit";
  // addButtonFunctionality(vorvergangenheitOption, "Vorvergangenheit");

  let artikelOption = document.createElement("button");
  artikelOption.textContent = "Artikel";
  addButtonFunctionality(artikelOption, artikelOption.textContent);

  let substantivOption = document.createElement("button");
  substantivOption.textContent = "Substantiv";
  addButtonFunctionality(substantivOption, substantivOption.textContent);
  
  // let verbenOption = document.createElement("button");
  // verbenOption.textContent = "Verben";
  // addButtonFunctionality(verbenOption, verbenOption.textContent);
  
  let possessivpronomenOption = document.createElement("button");
  possessivpronomenOption.textContent = "Possessiv- pronomen";
  addButtonFunctionality(possessivpronomenOption, "Possessivpronomen");

  let startQuizBtn = document.createElement("button");
  startQuizBtn.textContent = "Start!";
  startQuizBtn.classList.add("start-quiz-btn");
  startQuizBtn.classList.add("start-quiz-btn-deactivated");
  startQuizBtn.addEventListener("click", function () {
    if (typeof selectedOptions !== 'undefined' && selectedOptions.length > 0) {
      console.log("Click Start!")
      let selectedExercises = pickExercises(selectedOptions, questions);
      renderExercises(mainContainer, selectedExercises);
    }
  });
  
  optionsContainer.append(
    nominativOption,
    genitivOption,
    dativOption,
    akkusativOption,
    // gegenwartOption,
    // ersteVergangenheitOption,
    // zweiteVergangenheitOption,
    // vorvergangenheitOption,
    // ersteZukunftOption,
    // zweiteZukunftOption,
    artikelOption,
    substantivOption,
    // verbenOption,
    possessivpronomenOption,
    startQuizBtn,
  );
};
export default createMainMenue;
