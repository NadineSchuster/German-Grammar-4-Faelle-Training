export default function shuffle(sprüche) {
  for (let i = sprüche.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let k = sprüche[i];
    sprüche[i] = sprüche[j];
    sprüche[j] = k;
  }

  // spruch.textContent = sprüche;
  return sprüche;
}

// export default function shuffle(array) {
//   let currentIndex = array.length;

//   // While there remain elements to shuffle...
//   while (currentIndex != 0) {
//     // Pick a remaining element...
//     let randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;

//     // And swap it with the current element.
//     [array[currentIndex], array[randomIndex]] = [
//       array[randomIndex],
//       array[currentIndex],
//     ];
//   }

//   return array;
// }
