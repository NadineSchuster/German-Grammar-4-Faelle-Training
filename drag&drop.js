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
    let article = document.createElement("h3");
    article.textContent = this.article;
    article.classList.add("article");
    articleContainer.appendChild(article);

    let dropItem = document.createElement("h3");
    dropItem.textContent = this.noun;
    dropItem.setAttribute("draggable", "true");
    dropItem.classList.add("droppable-item");
    dropItem.addEventListener("dragstart", this.dragStart);
    dropItem.id = this.id;
    dropItemsContainer.appendChild(dropItem);
    // shuffle order of answers :)
    // this.answers = randomizeExercise(this.answers);
    let dropContainer = document.createElement("div");

    dropContainer.classList.add("drag-box");
    dropContainer.id = this.id;
    dropContainer.classList.add(this.article);
    dropContainer.addEventListener("dragenter", this.dragEnter);
    dropContainer.addEventListener("dragover", this.dragOver);
    dropContainer.addEventListener("dragleave", this.dragLeave);
    dropContainer.addEventListener("drop", this.drop);

    nounContainer.appendChild(dropContainer);
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
    event.preventDefault();

    event.target.classList.remove("drag-hover");

    if (event.target.classList.contains("drag-box")) {
      let container = event.target;

      if (container.firstChild) {
        console.log("deleting...");
        container.replaceChildren();
      }

      let dropItem = event.dataTransfer;
      let containerId = container.id;
      let dropItemId = dropItem.getData("text");

      let selections = document.querySelectorAll(".droppable-item");
      let selection;
      for (let y = 0; y < selections.length; y++) {
        if (selections[y].id == dropItemId) {
          selection = selections[y];
          selection.classList.add("deactivated");
        }
      }

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
        }
      }

      let containerContent = document.createElement("h2");
      containerContent.textContent = dropItemNoun;
      containerContent.id = dropItemId;
      containerContent.noun = dropItemNoun;
      containerContent.classList.add("noChaos");
      container.appendChild(containerContent);

      let isCorrect = containerArticle === dropItemArticle;
      console.log(isCorrect);

      let deleteButton = document.createElement("div");
      deleteButton.textContent = "X";
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", function (event) {
        if (container.firstChild) {
          console.log("deleting...");
          container.replaceChildren();
        }
        if (selection.classList.contains("deactivated")) {
          selection.classList.remove("deactivated");
        }
      });
      container.appendChild(deleteButton);
    }
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
