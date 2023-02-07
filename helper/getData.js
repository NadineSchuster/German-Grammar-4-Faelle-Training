"use static";

// let ReadDatabase = new Promise(function (resolve, reject) {
//   let xhr = new XMLHttpRequest();
//   xhr.open("GET", "../database.json", true);
//   xhr.onload = function () {
//     if (this.status == 200) {
//       let data = JSON.parse(this.responseText);
//       resolve(data);
//     }
//   };
//   xhr.send();
// });

let ReadDatabase = new Promise(function (res, rej) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "../database.json", true);
  xhr.onload = function () {
    if (this.status == 200) {
      let data = JSON.parse(this.responseText);
      res(data);
    }
  };
  xhr.send();
});

export default ReadDatabase;
