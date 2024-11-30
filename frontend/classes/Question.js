"use strict";

class Question {
  constructor(id, question, kasus, quizType, wordType, timeType) {
    this.id = id;
    this.question = question;
    this.kasus = kasus;
    this.quizType = quizType;
    this.wordType = wordType;
    this.timeType = timeType;
  }

  cleanUp(container) {
    let child = container.firstElementChild;

    if (child) {
      while (child) {
        var next = child.nextElementSibling;
        container.removeChild(child);
        child = next;
      }
    }
  }
}

export default Question;
