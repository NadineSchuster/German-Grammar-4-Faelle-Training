"use static";

let nounContainer;
let articleContainer;
let quizContainer = false;
let innerContainer;
let dropItemsContainer;

class DragAndDrop extends Question {
  constructor(
    id,
    question,
    kasus,
    article,
    noun,
    quizType,
    wordType,
    timeType
  ) {
    super(id, question, kasus, quizType, wordType, timeType);
    this.article = article;
    this.noun = noun;
    // this.answers = answers;
  }

  static cleanUp(container) {
    console.log("Hello from basic function");
    container.replaceChildren();
    // let child = container.firstChild;

    // console.log("Last child: ", container.lastChild);

    // if (child) {
    //   while (child) {
    //     container.removeChild(container.lastChild);
    //   }
    // }
  }

  createQuizContainer() {
    card.classList.add("card");
    innerContainer = document.createElement("div");
    innerContainer.classList.add("innerContainer");
    dropItemsContainer = document.createElement("div");
    dropItemsContainer.classList.add("dropItemsContainer");
    articleContainer = document.createElement("div");
    articleContainer.classList.add("article-container-drop-pairs");
    nounContainer = document.createElement("div");
    nounContainer.classList.add("noun-container-drop-pairs");

    innerContainer.appendChild(articleContainer);
    innerContainer.appendChild(nounContainer);

    card.appendChild(innerContainer);
    card.appendChild(dropItemsContainer);
    quizContainer = true;
  }

  createQuizCard() {
    if (!quizContainer) {
      this.createQuizContainer();
    }

    console.log(this.quizContainer);
    let cardContainsClass = card.classList.contains(
      "main-container-drop-pairs"
    );

    if (!cardContainsClass) {
      card.classList.add("main-container-drop-pairs");
    }
    // Get Drag And Drop pairs
    let a = document.createElement("h3");
    a.textContent = this.article;
    a.classList.add("article");
    articleContainer.appendChild(a);

    let q = document.createElement("h3");
    q.textContent = this.noun;
    q.setAttribute("draggable", "true");
    q.classList.add("droppable-item");
    q.addEventListener("dragstart", this.dragStart);
    q.style.color = "black";
    q.id = this.id;
    dropItemsContainer.appendChild(q);
    // shuffle order of answers :)
    // this.answers = randomizeExercise(this.answers);
    let div = document.createElement("div");

    div.classList.add("drag-box");
    div.id = this.id;
    div.classList.add(this.article);
    div.addEventListener("dragenter", this.dragEnter);
    div.addEventListener("dragover", this.dragOver);
    div.addEventListener("dragleave", this.dragLeave);
    div.addEventListener("drop", this.drop);

    nounContainer.appendChild(div);
  }

  // Tutorial: https://www.youtube.com/watch?v=wv7pvH1O5Ho

  dragStart(event) {
    console.log("dragging...");
    // event.dataTransfer.setData("text", event.target.style.color);

    // let b = { id: event.target.id, noun: event.target.noun };
    let b = [this.id];
    event.dataTransfer.setData("text", b);
  }

  dragEnter(event) {
    event.target.classList.add("drag-hover");
  }

  dragOver(event) {
    console.log("dragging over...");
    event.preventDefault();
  }

  dragLeave(event) {
    event.target.classList.remove("drag-hover");
  }

  drop(event) {
    console.log("dropping...");
    event.preventDefault();
    event.target.classList.remove("drag-hover");
    let container;
    let dropItem = event.dataTransfer;

    let containerId;
    if (event.target.firstChild) {
      container = event.target.parentElement;
      containerId = container.id;
    } else {
      container = event.target;
      containerId = event.target.id;
    }

    console.log(containerId);
    let dropItemId = dropItem.getData("text");
    console.log("drop Item id: ", dropItemId);
    let containerArticle;
    let dropItemArticle;
    let dropItemNoun;

    for (let i = 0; i < dropPairs.length; i++) {
      // get container article
      if (dropPairs[i].id == containerId) {
        containerArticle = dropPairs[i].article;
      }

      // get user choice
      if (dropPairs[i].id == dropItemId) {
        dropItemArticle = dropPairs[i].article;
        dropItemNoun = dropPairs[i].noun;

        console.log(dropItemId);
        console.log(dropItemNoun);
      }
    }

    // console.log(dropItemArticle);

    console.log("Event Target: ", container);

    if (event.target.firstChild) {
      let parent = event.target.parentNode;
      console.log("child: ", event.target.firstChild);
      console.log("parent ", parent);

      // DragAndDrop.cleanUp(event.target);
      parent.replaceChildren();

      console.log("Now child: ", event.target.firstChild);
    }

    let containerContent = document.createElement("h2");
    containerContent.textContent = dropItemNoun;
    container.appendChild(containerContent);

    // let divNoun = document.createElement("h3");
    // divNoun.textContent = this.noun;
    // div.appendChild(divNoun);

    let isCorrect = containerArticle === dropItemArticle;
    console.log(isCorrect);
    // event.target.style.backgroundColor = dataFromDroppElement;
  }
}

let b = new DragAndDrop(
  4,
  "Füge den richtigen Artikel hinzu.",
  "1",
  "Der",
  "Hund",
  "D&D-Einzelpaar",
  "Substantiv",
  "Gegenwart"
);
let a = new DragAndDrop(
  5,
  "Füge den richtigen Artikel hinzu.",
  "1",
  "Die",
  "Katze",
  "D&D-Einzelpaar",
  "Substantiv",
  "Gegenwart"
);
let dropPairs = [];
dropPairs.push(a, b);
for (let i = 0; i < dropPairs.length; i++) {
  dropPairs[i].createQuizCard();
}
