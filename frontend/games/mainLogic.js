"use strict";
import createMainMenue from "./createMainMenue.js";
import getGameData from "../apiCalls/getGameData.js";
import getUserProgress from "../apiCalls/getUserProgress.js";

async function start() {
  let questions = await getGameData();
  let progress = await getUserProgress();
  console.log("Progress in MainLogic:", progress)

  if (questions.length === 0) {
    console.error("No questions available.");
    return;
  }

  // if (progress.length === 0) {
  //   console.error("No progress available.");
  //   return;
  // }

  console.log("Hello from main logic", progress);
  createMainMenue(questions);
  // await adaptExercises("1", questions);
}
start();
