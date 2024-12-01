export default function pickExercises(selectedOptions, allExercises) {
    let selectedExercises = [];

    console.log("all of the exercises", allExercises)

    for (let i = 0; i < selectedOptions.length; i++) {
        const option = selectedOptions[i];
        
        allExercises.forEach((exercise, index) => {

            Object.entries(exercise).forEach(([exerciseKey, exerciseValue]) => {
        
                if (exerciseKey == "kasus" && exercise.kasus == option) {
                    console.log(exercise, option)
                }
            });
        });
    }
}