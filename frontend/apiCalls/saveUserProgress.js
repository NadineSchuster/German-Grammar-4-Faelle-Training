async function saveUserProgress(userProgress) {
  const options = {
    method: "POST",
    body: JSON.stringify(userProgress),
    headers: {
      "Content-Type": "application/json",
    },
  };
  let response = await fetch("http://localhost:5000/saveUserProgress", options);
  let json = await response.json();
  console.log(json);
}

export default saveUserProgress;
