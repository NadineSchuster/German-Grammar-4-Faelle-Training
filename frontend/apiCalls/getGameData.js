import DragAndDrop from "../classes/QuestionDragAndDrop.js";

export default async function fetchQuestions() {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`http://localhost:5000/getGameData`, options);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    
    const data = await response.json();
    console.log("data", data)
    let dropPairs = [];
    let miniDrops = data.MiniDragAndDropUnits;
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
      console.log(dragDropItem);
      dropPairs.push(dragDropItem);
    }
    console.log("hello", dropPairs);
    return dropPairs;
  } catch (error) {
    console.error("Fetching questions failed:", error);
    return [];
  }
}

// let getGameData = async function () {
//   const options = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   fetch(`http://localhost:5000/getGameData`, options)
//     .then((response) => {
//       return response.json();
//     })
//     .then((response) => {
//       let dropPairs = [];
//       let miniDrops = response.MiniDragAndDropUnits;
//       for (let i = 0; i < miniDrops.length; i++) {
//         let dragDropItem = new DragAndDrop();
//         dragDropItem.id = miniDrops[i].id;
//         dragDropItem.question = miniDrops[i].question;
//         dragDropItem.kasus = miniDrops[i].kasus;
//         dragDropItem.article = miniDrops[i].article;
//         dragDropItem.noun = miniDrops[i].noun;
//         dragDropItem.quizType = miniDrops[i].quizType;
//         dragDropItem.wordType = miniDrops[i].wordType;
//         dragDropItem.timeType = miniDrops[i].timeType;
//         console.log(dragDropItem);
//         dropPairs.push(dragDropItem);
//       }
//       return dropPairs;
//     });
// };
// export default getGameData;
