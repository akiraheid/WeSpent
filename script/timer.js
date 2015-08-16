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
  var _hour = Math.floor(seconds / 3600);
  var _minute = Math.floor(seconds / 60) % 60;
  var _second = Math.floor(seconds % 60);

  document.getElementById("timer-display").innerHTML =
    ((_hour < 10) ? ('0' + _hour).slice(-2) :_hour) + ":"
    + ((_minute < 10) ? ('0' + _minute).slice(-2) : _minute) + ":"
    + ((_second < 10) ? ('0' + _second).slice(-2) : _second);
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
