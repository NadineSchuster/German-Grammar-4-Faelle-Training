import Question from "../classes/Question.js";

let card = document.querySelector("#exercise-card");
let button = document.querySelector("#button");
let counter = document.querySelector("#counter");

let userResults = [];

class Result {
  constructor(id, totalTries, right, wrong) {
    this.id = id;
    this.totalTries = totalTries;
    this.right = right;
    this.wrong = wrong;
  }
}

class UserResults {
  constructor(userId, results) {
    this.userId = userId;
    this.results = results; // 1 result is made out of Result
  }
}

let nounContainer;
let articleContainer;
let quizContainer = false;
let innerContainer;
let dropItemsContainer;

let results = [];

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

  createQuizCard(dropPairs) {
    if (!quizContainer) {
      this.createQuizContainer();
    }

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
    dropContainer.addEventListener("drop", this.drop);

    nounContainer.appendChild(dropContainer);

    button.addEventListener("click", this.checkResults);
    button.classList.add("deactivated");
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

  drop(event) {
    event.preventDefault();

    event.target.classList.remove("drag-hover");

    if (event.target.classList.contains("drag-box")) {
      let container = event.target;

      let firstChild;

      if (container.firstChild) {
        console.log("deleting...");

        if (
          container.firstChild.id !== null &&
          container.firstChild.id !== undefined
        ) {
          firstChild = container.firstChild.id;
        }

        container.replaceChildren();
      }

      let dropItem = event.dataTransfer;
      let containerId = container.id;
      let dropItemId = dropItem.getData("text");

      let selections = document.querySelectorAll(".droppable-item");
      let selection;
      // deactivate/reactivate selected user choice in option box so it can only used
      for (let y = 0; y < selections.length; y++) {
        if (selections[y].id == dropItemId) {
          selection = selections[y];
          selection.classList.add("deactivated");
        }
        if (selections[y].id == firstChild) {
          selections[y].classList.remove("deactivated");
        }
      }

      let containerArticle;
      let dropItemArticle;
      let dropItemNoun;

      for (let i = 0; i < dropPairs.length; i++) {
        // get container article
        if (dropPairs[i].id == containerId) {
          containerArticle = dropPairs[i].article;
          console.log("Container Article: ", containerArticle);
        }

        // console.log(dropPairs[i]);

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

      // Create a Delete Button for removing a dropped item and add it back to options
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

      /////////////////////////////////////////////////////////////
      let placeholders = document.querySelectorAll(".drag-box");
      let isComplete = true;

      for (let i = 0; i < placeholders.length; i++) {
        let item = placeholders[i];

        if (
          !item.firstElementChild ||
          item.firstElementChild.id == undefined ||
          item.firstElementChild.id == null
        ) {
          isComplete = false;
        }
      }
      if (isComplete) {
        button.classList.remove("deactivated");
      }
    }
  }

  checkResults() {
    button.classList.add("deactivated");
    let deleteBtns = document.querySelectorAll(".delete-button");
    for (let c = 0; c < deleteBtns.length; c++) {
      let item = deleteBtns[c];
      item.classList.add("deactivated");
    }

    let containerArticle;
    let dropItemArticle;
    let boxes = document.querySelectorAll(".drag-box");

    for (let i = 0; i < boxes.length; i++) {
      let item = boxes[i];

      if (item.firstElementChild) {
        let droppedItemId = item.firstElementChild.id;

        for (let y = 0; y < dropPairs.length; y++) {
          if (dropPairs[y].id === item.id) {
            containerArticle = dropPairs[y].article;
          }
        }
        for (let e = 0; e < dropPairs.length; e++) {
          if (dropPairs[e].id === droppedItemId) {
            dropItemArticle = dropPairs[e].article;
          }
        }

        // console.log("Container: ", containerArticle);
        // console.log("Item: ", dropItemArticle);
      }

      // let droppedItemArticle = dropPairs.id ===

      // console.log(droppedItem);
      // // console.log(selections[i].id, droppedItem.id);

      if (dropItemArticle !== undefined) {
      }

      if (containerArticle !== undefined && dropItemArticle !== undefined) {
        let isCorrect = containerArticle === dropItemArticle;
        console.log(containerArticle);
        console.log(dropItemArticle);

        let exercise;
        for (let a = 0; a < userResults.length; a++) {
          if (userResults[a].id === item.id) {
            exercise = userResults[a];
            exercise.totalTries++;
          }
        }

        // erst zählen und speichern, wenn alle Felder ausgefüllt sind und danach
        // speichern und zählen Funktion deaktivieren, sonst kann man okay spammen
        // und bekommt einen guten Score

        if (!exercise) {
          exercise = new Result();
          exercise.id = item.id;
          exercise.totalTries = 1;
          exercise.right = 0;
          exercise.wrong = 0;

          userResults.push(exercise);
        }

        if (isCorrect) {
          exercise.right++;
        } else if (!isCorrect) {
          exercise.wrong++;
        }

        containerArticle = undefined;
        dropItemArticle = undefined;
      }
    }
    console.log(userResults);

    // saveToDatabase(userResults);
  }
}

// let placeholders = document.querySelectorAll(".drag-box");
// let isComplete = true;

// for (let i = 0; i < placeholders.length; i++) {
//   let item = placeholders[i];

//   if (!item.firstElementChild) {
//     let p = document.createElement("p");
//     p.textContent = "X";
//     p.classList.add("noChaos");
//     item.appendChild(p);

//     isComplete = false;
//   }
// }
// if (isComplete) {
//   button.classList.remove("deactivated");
// }

let dropPairs = [];

function getDatabaseData() {
  fetch(`./database.json`)
    .then((response) => {
      return response.json();
      // console.log(response);
    })
    .then((response) => {
      // console.log(response);

      let miniDrops = response.MiniDragAndDropUnits;
      // console.log(miniDrops[0]);

      for (let i = 0; i < miniDrops.length; i++) {
        let dragDropItem = new DragAndDrop();
        dragDropItem.id = miniDrops[i].id;
        dragDropItem.question = miniDrops[i].question;
        dragDropItem.kasus = miniDrops[i].kasus;
        dragDropItem.article = miniDrops[i].article;
        dragDropItem.noun = miniDrops[i].noun;
        dragDropItem.quizType = miniDrops[i].quizType;
        dragDropItem.wordType = miniDrops[i].wordType;
        dragDropItem.timeType = miniDrops[i].timeType;
        // console.log("item: ", dragDropItem.id);
        dropPairs.push(dragDropItem);
      }
      return dropPairs;
    })
    .then((dropPairs) => {
      for (let i = 0; i < dropPairs.length; i++) {
        dropPairs[i].createQuizCard(dropPairs);
      }
    });
}
getDatabaseData();

// function saveToDatabase(data) {
//   fetch(`userResult.json`, {
//     method: "POST", // or 'PUT'
//     mode: "cors", // no-cors, *cors, same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, *same-origin, omit

//     redirect: "follow", // manual, *follow, error
//     referrerPolicy: "no-referrer",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => {
//       console.log("Success:", response);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

//  id,
// question,
// kasus,
// article,
// noun,
// quizType,
// wordType,
// timeType
