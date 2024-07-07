import Question from "../classes/Question.js";

let card = document.querySelector("#exercise-card");
let button = document.querySelector("#button");
let counter = document.querySelector("#counter");

let dragStart = function (event) {
  console.log("dragging...");

  let b = [this.id];
  event.dataTransfer.setData("text", b);
};

let dragEnter = function (event) {
  event.target.classList.add("drag-hover");
};

let dragOver = function (event) {
  console.log("dragging over...");
  event.preventDefault();
};

let dragLeave = function (event) {
  event.target.classList.remove("drag-hover");
};

let drop = function (event) {
  event.preventDefault();

  let container = event.target;

  let dropItem = event.dataTransfer;
  let containerId = container.id;
  let dropItemId = dropItem.getData("text");

  let selections = document.querySelectorAll(".droppable-item");
  let selection;

  for (let y = 0; y < selections.length; y++) {
    if (selections[y].id == dropItemId) {
      selection = selections[y];
    }
  }
};

class DragAndDropLarge extends Question {
  constructor(
    id,
    question,
    kasus,
    article,
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

let articles = ["Das", "Die", "Der"];
let dropItems = ["Leben", "Essen", "Buch", "Papier"];
let createContainers = function () {
  let upperContainer = document.createElement("div");
  upperContainer.classList.add("upper-container");

  for (let y = 0; y < articles.length; y++) {
    let firstMainContainer = document.createElement("div");
    firstMainContainer.classList.add("inner-container-large");
    let firstdropContainer = document.createElement("div");

    let articleName = document.createElement("h2");
    articleName.textContent = articles[y];
    firstMainContainer.appendChild(articleName);

    firstdropContainer.classList.add("das");
    firstdropContainer.classList.add("drop-container-large");
    firstdropContainer.addEventListener("dragenter", dragEnter);
    firstdropContainer.addEventListener("dragover", dragOver);
    firstdropContainer.addEventListener("dragleave", dragLeave);
    firstdropContainer.addEventListener("drop", drop);
    firstMainContainer.appendChild(firstdropContainer);
    upperContainer.appendChild(firstMainContainer);
  }

  let dropItemsContainer = document.createElement("div");
  dropItemsContainer.classList.add("drop-items-container-large");

  for (let i = 0; i < dropItems.length; i++) {
    let dropItem = document.createElement("h3");
    dropItem.textContent = dropItems[i];
    dropItem.setAttribute("draggable", "true");
    dropItem.classList.add("droppable-item");
    dropItem.classList.add("droppable-item-large");
    dropItem.addEventListener("dragstart", dragStart);
    // dropItem.id = this.id;
    dropItemsContainer.appendChild(dropItem);
  }

  card.appendChild(upperContainer);
  card.appendChild(dropItemsContainer);
};

createContainers();
