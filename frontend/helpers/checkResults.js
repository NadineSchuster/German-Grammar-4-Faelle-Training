import saveUserProgress from "../apiCalls/saveUserProgress.js";
import Result from "../classes/UserResult.js";
import getUserProgress from "../apiCalls/getUserProgress.js";

export default async function checkResults(e, dropPairs) {
  e.preventDefault();

  // let userResults = [];
  try {
    // let userResults = await getUserProgress();

    let button = document.querySelector("#button");
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

      }

      if (dropItemArticle !== undefined) {
      }

      if (containerArticle !== undefined && dropItemArticle !== undefined) {
        let isCorrect = containerArticle === dropItemArticle;
        console.log(containerArticle);
        console.log(dropItemArticle);

        // let exercise;
        // if (userResults !== undefined) {
        //   for (let a = 0; a < userResults.length; a++) {
        //     if (userResults[a].id === item.id) {
        //       exercise = userResults[a];
        //       exercise.totalTries++;
        //     }
        //   }
        // }

        // erst zählen und speichern, wenn alle Felder ausgefüllt sind und danach
        // speichern und zählen Funktion deaktivieren, sonst kann man okay spammen
        // und bekommt einen guten Score

        // if (!exercise) {
        //   exercise = new Result();
        //   exercise.id = item.id;
        //   exercise.totalTries = 1;
        //   exercise.right = 0;
        //   exercise.wrong = 0;

        //   userResults.push(exercise);
        // }

        // if (isCorrect) {
        //   exercise.right++;
        // } else if (!isCorrect) {
        //   exercise.wrong++;
        // }

        containerArticle = undefined;
        dropItemArticle = undefined;
      }
    }
    // console.log("User Results", userResults);

    // await saveUserProgress(userResults);
    // renderExercises();
  } catch {
    console.log("UserProgress not found")
  }
}
