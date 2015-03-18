var seconds = 0;
var timerID = -1;
var started = false;
var timerEvent = new CustomEvent(
  "timerEvent",
  {
    detail: {
      message: "timer fired",
      time: new Date(),
    },
    bubbles: true,
    cancelable: true
  }
);

function updateTimerDisplay()
{
  document.getElementById("timer-display").innerHTML =
    Math.floor(seconds / 3600) + ":" + (Math.floor(seconds / 60) % 60) + ":" +
    (seconds % 60);
}

function updateTimer()
{
  seconds++;
  updateTimerDisplay();
  document.getElementById("timer-display").dispatchEvent(timerEvent);
  timerID = setTimeout('updateTimer()', 1000);
}

// Start the timer.
function startTimer()
{
  if(!started)
  {
    updateTimer();
    started = true;
  }
}

// Stop the timer.
function stopTimer()
{
  clearTimeout(timerID);
  timerID = -1;
  started = false;
}

// Reset the timer.
function resetTimer()
{
  seconds = 0;
  stopTimer();
  updateTimerDisplay();
}