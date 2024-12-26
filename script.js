let setTiming = document.getElementById("timeMode");
const template = document.getElementById("myTemplate");
let isTemplateVisible = false;
let minT = document.getElementById("minT")

let countdownInterval;
let wordsTyped = 0;
let correctWords = 0;
let totalWords = 0;
let startTime;
let typingStarted = false;

const typingArea = document.getElementById("typingArea");
const wordMin = document.getElementById("wordMin");
const charMin = document.getElementById("charMin");
const accuracyElem = document.getElementById("accuracy");
const minutesElem = document.getElementById("minutes");
const secondsElem = document.getElementById("seconds");
const moonIcon = document.getElementById("light");
const body = document.body;

moonIcon.addEventListener("click", () => {
    
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        moonIcon.innerHTML = '<i class="fa-regular fa-sun"></i></i>';
    } else {
        moonIcon.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
});

setTiming.addEventListener("click", function () {
    if (!isTemplateVisible) {
        const clone = document.importNode(template.content, true);
        document.querySelector(".setTime").appendChild(clone);
        isTemplateVisible = true;
    } else {
        const buttons = document.querySelectorAll(".btnThree");
        buttons.forEach(button => button.remove());
        isTemplateVisible = false;
    }
});

document.querySelector(".setTime").addEventListener("click", function (event) {
    if (event.target && event.target.id === "1min") {
        minT.textContent = "1"
        minutesElem.textContent = "01";
        secondsElem.textContent = "00";
    }
    if (event.target && event.target.id === "3min") {
        minT.textContent = "3" 
        minutesElem.textContent = "03";
        secondsElem.textContent = "00";
    }
    if (event.target && event.target.id === "5min") {
        minT.textContent = "5" 
        minutesElem.textContent = "05";
        secondsElem.textContent = "00";
    }
});

document.getElementById("start").addEventListener("click", function () {
    if (typingStarted) {
        return; 
    }

    typingStarted = true; 
    let minutes = parseInt(minutesElem.textContent);
    let seconds = parseInt(secondsElem.textContent);

    if (isNaN(minutes) || isNaN(seconds)) {
        console.error("Invalid time values:", minutes, seconds);
        return;
    }

  
    typingArea.disabled = false;

   
    startTime = Date.now();

    if (countdownInterval) clearInterval(countdownInterval);

    countdownInterval = setInterval(function () {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(countdownInterval);
                alert("Time is up");
                typingArea.disabled = true; 
            } else {
                minutes--;
                seconds = 59;
            }
        } else {
            seconds--;
        }

        minutesElem.textContent = minutes < 10 ? "0" + minutes : minutes;
        secondsElem.textContent = seconds < 10 ? "0" + seconds : seconds;

       
        updateStats();
    }, 1000);
});


document.getElementById("reset").addEventListener("click", function () {
    
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    
    minutesElem.textContent = "00";
    secondsElem.textContent = "00";
    wordMin.innerHTML = "<span>0</span><p>words/min</p>";
    charMin.innerHTML = "<span>0</span><p>chars/min</p>";
    accuracyElem.innerHTML = "<span>0</span><p>% accuracy</p>";
    typingArea.value = "";
    typingArea.disabled = true;
    wordsTyped = 0;
    correctWords = 0;
    totalWords = 0;

   
    typingStarted = false; 
});


function updateStats() {
    const typedText = typingArea.value.trim();
    const wordArray = typedText.split(/\s+/);
    wordsTyped = wordArray.length;

    
    const charCount = typedText.replace(/\s+/g, '').length;
    const minutesElapsed = (Date.now() - startTime) / 60000;
    const charsPerMin = charCount / minutesElapsed;

    
    const wordsPerMin = wordsTyped / minutesElapsed;

   
    const correctWordsArray = wordArray.filter(word => word === 'the'); 
    correctWords = correctWordsArray.length;
    const accuracy = (correctWords / wordsTyped) * 100 || 0;

    
    wordMin.innerHTML = `<span>${wordsPerMin.toFixed(1)}</span><p>words/min</p>`;
    charMin.innerHTML = `<span>${charsPerMin.toFixed(1)}</span><p>chars/min</p>`;
    accuracyElem.innerHTML = `<span>${accuracy.toFixed(1)}</span><p>% accuracy</p>`;
}


document.querySelectorAll(".choice1, .choice2, .choice3, .choice4, .choice5, .choice6").forEach(choice => {
    choice.addEventListener("click", function () {
       
        const choiceText = choice.innerText;

        const paraInput = document.getElementById("para");

      
        paraInput.value = choiceText;

        paraInput.readOnly = true;
        document.querySelector("textarea").value = "";
    });
});
