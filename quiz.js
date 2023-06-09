var quiz = {
  data: [
    {
      q : "What is the standard distance between the target and archer in Olympics?",
      o : [
        { text: "", image: "modelos.PNG" },
        { text: "70 meters", image: "link-to-image-2" },
        { text: "100 meters", image: "link-to-image-3" },
        { text: "120 meters", image: "link-to-image-4" }
      ],
      l : "link-1",
      a : 0 // arrays start with 0, so answer is 70 meters
    },
    {
      q : "What is the standard distance between the target and archer in Olympics?",
      o : [
        { text: "50 meters", image: "link-to-image-1" },
        { text: "", image: "modelos.PNG" },
        { text: "100 meters", image: "link-to-image-3" },
        { text: "120 meters", image: "link-to-image-4" }
      ],
      l : "link-1",
      a : 1 // arrays start with 0, so answer is 70 meters
    }

  ],

  // (A2) HTML ELEMENTS
  hWrap: null, // HTML quiz container
  hQn: null, // HTML question wrapper
  hAns: null, // HTML answers wrapper
  lAns: null, // Link

  // (A3) GAME FLAGS
  now: 0, // current question
  score: 0, // current score

  // (B) INIT QUIZ HTML
  init: () => {
    // (B1) WRAPPER
    quiz.hWrap = document.getElementById("quizWrap");

    // (B2) QUESTIONS SECTION
    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);

    // (B3) ANSWERS SECTION
    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);

    // Links
    quiz.lAns = document.createElement("div");
    quiz.lAns.id = "quizlAns";
    quiz.hWrap.appendChild(quiz.lAns);

    // (B4) GO!
    quiz.draw();
  },

  // (C) DRAW QUESTION
  draw: () => {
    // (C1) QUESTION
    quiz.hQn.innerHTML = quiz.data[quiz.now].q;

    quiz.lAns.innerHTML = "<a href='" + quiz.data[quiz.now].l + "' target='_blank'>Link</a>";

    // (C2) OPTIONS
    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.now].o) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].o[i].text;
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", () => quiz.select(label));
      quiz.hAns.appendChild(label);

      // Adicionar imagem à opção
      let image = document.createElement("img");
      image.src = quiz.data[quiz.now].o[i].image;
      label.appendChild(image);
    }
  },

  // (D) OPTION SELECTED
  select: (option) => {
    // (D1) DETACH ALL ONCLICK
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }

    // (D2) CHECK IF CORRECT
    let correct = option.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
      quiz.score++;
      option.classList.add("correct");
    } else {
      option.classList.add("wrong");
    }

    // (D3) NEXT QUESTION OR END GAME
    quiz.now++;
    setTimeout(() => {
      if (quiz.now < quiz.data.length) { quiz.draw(); }
      else {
        quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
        quiz.hAns.innerHTML = "";
      }
    }, 1000);
  },

  // (E) RESTART QUIZ
  reset : () => {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();
  }
};
window.addEventListener("load", quiz.init);
