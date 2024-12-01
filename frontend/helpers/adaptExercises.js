function adaptExercises(exerciseKind, dropPairs) {
  let exercises = [];
  //   exerciseRow = [];
  //   console.log("Hello from button genitiv");
  //   console.log(dropPairs);
  //   dropPairs[0].cleanUp(nounContainer);
  //   dropPairs[0].cleanUp(articleContainer);
  //   dropPairs[0].cleanUp(dropItemsContainer);

  for (let i = 0; i < dropPairs.length; i++) {
    let exercise = dropPairs[i];
    if (exercise.kasus == exerciseKind) {
      exercises.push(exercise);
    }
  }
  console.log("Adapted exercises:", exercises)
  return exercises;
}

export default adaptExercises;
