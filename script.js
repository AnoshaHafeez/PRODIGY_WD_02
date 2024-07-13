document.addEventListener("DOMContentLoaded", function () {
    let minute = 0,
        sec = 0,
        msec = 0,
        timer,
        isRunning = false,
        lapCount = 0;

    const minuteSpan = document.querySelector(".minute");
    const secSpan = document.querySelector(".sec");
    const msecSpan = document.querySelector(".msec");
    const lapList = document.querySelector(".lap");

    const resetButton = document.querySelector(".button-wrapper .button:nth-child(1)");
    const playButton = document.querySelector(".button-wrapper .button:nth-child(2)");
    const lapButton = document.querySelector(".button-wrapper .button:nth-child(3)");
    const clearButton = document.querySelector(".lap-clear-button");

    resetButton.addEventListener("click", resetStopwatch);
    playButton.addEventListener("click", toggleStopwatch);
    lapButton.addEventListener("click", addLap);
    clearButton.addEventListener("click", clearLaps);

    function updateDisplay() {
        minuteSpan.textContent = `${minute < 10 ? "0" : ""}${minute} :`;
        secSpan.textContent = `${sec < 10 ? "0" : ""}${sec} :`;
        msecSpan.textContent = `${msec < 10 ? "0" : ""}${msec}`;
    }

    function startTimer() {
        timer = setInterval(() => {
            msec++;
            if (msec === 100) {
                msec = 0;
                sec++;
            }
            if (sec === 60) {
                sec = 0;
                minute++;
            }
            updateDisplay();
        }, 10);
    }

    function stopTimer() {
        clearInterval(timer);
    }

    function resetStopwatch() {
        stopTimer();
        isRunning = false;
        playButton.textContent = "Play";
        minute = 0;
        sec = 0;
        msec = 0;
        updateDisplay();
    }

    function toggleStopwatch() {
        if (isRunning) {
            stopTimer();
            playButton.textContent = "Play";
        } else {
            startTimer();
            playButton.textContent = "Pause";
        }
        isRunning = !isRunning;
    }

    function addLap() {
        if (!isRunning) return;
        lapCount++;
        const lapItem = document.createElement("li");
        lapItem.classList.add("lap-item");
        lapItem.innerHTML = `<span class="number">#${lapCount}</span><span class="time-stamp">${minute < 10 ? "0" : ""}${minute} : ${sec < 10 ? "0" : ""}${sec} : ${msec < 10 ? "0" : ""}${msec}</span>`;
        lapList.appendChild(lapItem);
    }

    function clearLaps() {
        lapList.innerHTML = '';
        lapCount = 0;
    }

    updateDisplay();
});
