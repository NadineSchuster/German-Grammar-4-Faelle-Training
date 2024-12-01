export default function pickExercises(selectedOptions, allExercises) {
    let selectedExercises = [];

    console.log("all of the exercises", allExercises)

    for (let i = 0; i < selectedOptions.length; i++) {
        const option = selectedOptions[i];
        
        allExercises.forEach((exercise, index) => {

            Object.entries(exercise).forEach(([exerciseKey, exerciseValue]) => {

                if (exerciseValue == option) {
                    selectedExercises.push(exercise);
                }
            });
        });
    }

    // Remove all duplicates from the selectedExercises list
    selectedExercises = selectedExercises.filter((value, index, self) =>
            index === self.findIndex((t) => (
            t.id === value.id
        ))
    )

    console.log(selectedExercises)
}