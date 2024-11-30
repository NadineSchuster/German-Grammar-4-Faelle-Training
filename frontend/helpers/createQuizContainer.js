export default function createQuizContainer(card) {
  card.classList.add("card");
  let innerContainer = document.createElement("div");
  innerContainer.classList.add("innerContainer");
  let dropItemsContainer = document.createElement("div");
  dropItemsContainer.classList.add("dropItemsContainer");
  let articleContainer = document.createElement("div");
  articleContainer.classList.add("article-container-drop-pairs");
  let nounContainer = document.createElement("div");
  nounContainer.classList.add("noun-container-drop-pairs");

  innerContainer.appendChild(articleContainer);
  innerContainer.appendChild(nounContainer);

  card.appendChild(innerContainer);
  card.appendChild(dropItemsContainer);
}
