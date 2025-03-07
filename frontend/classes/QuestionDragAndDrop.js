import Question from "./Question.js";
import drop from "../helpers/drop.js";
import checkResults from "../helpers/checkResults.js";

// let quizContainer = false;
let nounContainer;
let articleContainer;
let innerContainer;
let dropItemsContainer;
let userResults = [];
// let dropPairs = [];

let button = document.querySelector("#button");

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
  }

  // createQuizContainer(card) {
  //   card.classList.add("card");
  //   innerContainer = document.createElement("div");
  //   innerContainer.classList.add("innerContainer");
  //   dropItemsContainer = document.createElement("div");
  //   dropItemsContainer.classList.add("dropItemsContainer");
  //   articleContainer = document.createElement("div");
  //   articleContainer.classList.add("article-container-drop-pairs");
  //   nounContainer = document.createElement("div");
  //   nounContainer.classList.add("noun-container-drop-pairs");

  //   innerContainer.appendChild(articleContainer);
  //   innerContainer.appendChild(nounContainer);

  //   card.appendChild(innerContainer);
  //   card.appendChild(dropItemsContainer);
  //   quizContainer = true;
  // }

  createQuizCard(dropPairs, card, questions) {
    let nounContainer = document.querySelector(".noun-container-drop-pairs");
    let innerContainer = document.querySelector(".innerContainer");
    let dropItemsContainer = document.querySelector(".dropItemsContainer");
    let articleContainer = document.querySelector(
      ".article-container-drop-pairs"
    );
    // console.log("Quiz Container: ", quizContainer);
    // if (!quizContainer) {
    //   this.createQuizContainer(card);
    // }

    // To Do: shuffle order of answers AND shuffle order of everything else

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
    // dropContainer.addEventListener("drop", this.drop);
    // let dropContainer = document.querySelector(".drag-box");
    dropContainer.addEventListener("drop", (e) => {
      drop(e, questions);
    });

    nounContainer.appendChild(dropContainer);

    button.addEventListener("click", (e) => {
      checkResults(e, dropPairs);
    });
    // button.classList.add("deactivated");
  }

  dragStart(event) {
    console.log("dragging...");

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

  // drop(event) {
  //   event.preventDefault();

  //   event.target.classList.remove("drag-hover");

  //   if (event.target.classList.contains("drag-box")) {
  //     let container = event.target;

  //     let firstChild;

  //     if (container.firstChild) {
  //       console.log("deleting...");

  //       if (
  //         container.firstChild.id !== null &&
  //         container.firstChild.id !== undefined
  //       ) {
  //         firstChild = container.firstChild.id;
  //       }

  //       container.replaceChildren();
  //     }

  //     let dropItem = event.dataTransfer;
  //     let containerId = container.id;
  //     let dropItemId = dropItem.getData("text");

  //     let selections = document.querySelectorAll(".droppable-item");
  //     let selection;
  //     // deactivate/reactivate selected user choice in option box so it can only used
  //     for (let y = 0; y < selections.length; y++) {
  //       if (selections[y].id == dropItemId) {
  //         selection = selections[y];
  //         selection.classList.add("deactivated");
  //       }
  //       if (selections[y].id == firstChild) {
  //         selections[y].classList.remove("deactivated");
  //       }
  //     }

  //     let containerArticle;
  //     let dropItemArticle;
  //     let dropItemNoun;

  //     console.log("This is it:", dropPairs, dropPairs.length);

  //     for (let i = 0; i < dropPairs.length; i++) {
  //       // get container article
  //       if (dropPairs[i].id == containerId) {
  //         containerArticle = dropPairs[i].article;
  //         console.log("Container Article: ", containerArticle);
  //       }

  //       console.log("Drop Pair", dropPairs[i]);

  //       // get user choice
  //       if (dropPairs[i].id == dropItemId) {
  //         dropItemArticle = dropPairs[i].article;
  //         dropItemNoun = dropPairs[i].noun;
  //       }
  //     }

  //     console.log("hello: ", dropItemNoun);

  //     let containerContent = document.createElement("h2");
  //     containerContent.textContent = dropItemNoun;
  //     containerContent.id = dropItemId;
  //     containerContent.noun = dropItemNoun;
  //     containerContent.classList.add("noChaos");
  //     container.appendChild(containerContent);

  //     // Create a Delete Button for removing a dropped item and add it back to options
  //     let deleteButton = document.createElement("div");
  //     deleteButton.textContent = "X";
  //     deleteButton.classList.add("delete-button");
  //     deleteButton.addEventListener("click", function (event) {
  //       if (container.firstChild) {
  //         console.log("deleting...");
  //         container.replaceChildren();
  //       }
  //       if (selection.classList.contains("deactivated")) {
  //         selection.classList.remove("deactivated");
  //       }
  //     });
  //     container.appendChild(deleteButton);

  //     /////////////////////////////////////////////////////////////
  //     let placeholders = document.querySelectorAll(".drag-box");
  //     let isComplete = true;

  //     for (let i = 0; i < placeholders.length; i++) {
  //       let item = placeholders[i];

  //       if (
  //         !item.firstElementChild ||
  //         item.firstElementChild.id == undefined ||
  //         item.firstElementChild.id == null
  //       ) {
  //         isComplete = false;
  //       }
  //     }
  //     if (isComplete) {
  //       button.classList.remove("deactivated");
  //     }
  //   }
  // }
}

export default DragAndDrop;
