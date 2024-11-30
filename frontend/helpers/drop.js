export default function drop(event, dropPairs) {
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

    console.log("This is it:", dropPairs, dropPairs.length);

    for (let i = 0; i < dropPairs.length; i++) {
      // get container article
      if (dropPairs[i].id == containerId) {
        containerArticle = dropPairs[i].article;
        console.log("Container Article: ", containerArticle);
      }

      console.log("Drop Pair", dropPairs[i]);

      // get user choice
      if (dropPairs[i].id == dropItemId) {
        dropItemArticle = dropPairs[i].article;
        dropItemNoun = dropPairs[i].noun;
      }
    }

    console.log("hello: ", dropItemNoun);

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
