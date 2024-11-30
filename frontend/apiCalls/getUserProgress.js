import Result from "../classes/UserResult.js";

let userResults = [];

async function getUserProgress() {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`http://localhost:5000/getUserProgress`, options);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    // console.log("data", data)
    let progressUnits = data;
  
    if (progressUnits !== undefined) {
      for (let i = 0; i < progressUnits.length; i++) {
        let result = new Result();
        result = progressUnits[i];
        userResults.push(result);
      }
      console.log("UserRes", userResults);
      return userResults;
    } else {
      console.log("No saved Values found.");
    }
  } catch (error) {
    console.error("Fetching progress failed:", error);
    return [];
  }
}

export default getUserProgress;
