//Model
//none

//View
var startButton = document.getElementById("start-button");
var stopButton = document.getElementById("stop-button");
var elapsedTimeText = document.getElementsByClassName("elapsed-time-text")[0];

//Listeners
// none

/** Displays the start button */
function displayStartButton() {
  // Display start button
  startButton.style.display = "block";

  // Hide stop button
  stopButton.style.display = "none";
}

/** Hide the start button */
function hideStartButton() {
  // Hide start button
  startButton.style.display = "none";

  // Display stop button
  stopButton.style.display = "block";
}

//Controller

/** Stores the reference to the elapsed time interval*/
var elapsedTimeIntervalRef;

/** Stores the start time of timer */
var startTime;

/** Stores the details of elapsed time when paused */
var elapsedTimeWhenPaused;

/** Starts the stopwatch */
function startStopwatch() {
  // Set start time based on whether it's stopped or resetted
  setStartTime();

  // Every second
  elapsedTimeIntervalRef = setInterval(() => {
    // Compute the elapsed time & display
    elapsedTimeText.innerText = timeAndDateHandling.getElapsedTime(startTime); //pass the actual record start time

    // Improvement: Can Stop elapsed time and resert when a maximum elapsed time
    //              has been reached.
  }, 10);

  // Hide the start button, which will be replace by stop
  hideStartButton();
}

/** Sets the start time value */
function setStartTime() {
  if (elapsedTimeWhenPaused) {
    startTime = new Date();
    // Subtract the elapsed hours, minutes and seconds from the current date
    // To get correct elapsed time to resume from it
    startTime.setHours(startTime.getHours() - elapsedTimeWhenPaused.hours);
    startTime.setMinutes(
      startTime.getMinutes() - elapsedTimeWhenPaused.minutes
    );
    startTime.setSeconds(
      startTime.getSeconds() - elapsedTimeWhenPaused.seconds
    );
    startTime.setMilliseconds(
      startTime.getMilliseconds() - elapsedTimeWhenPaused.milliseconds
    );
  } else {
    startTime = new Date();
  }
}

/** Pauses stopwatch */
function stopStopwatch() {
  // Clear interval
  if (typeof elapsedTimeIntervalRef !== "undefined") {
    clearInterval(elapsedTimeIntervalRef);
    elapsedTimeIntervalRef = undefined;
  }

  // Store the elapsed time on pause
  storeElapsedTimeOnPause();

  // display the start button
  displayStartButton();
}

/** Stores the elapsed time hours, minutes and seconds details
 * on pause*/
function storeElapsedTimeOnPause() {
  // Break down elapsed time from display test
  const brokenDownElapsedTime = elapsedTimeText.innerText.split(":");

  // Convert list to numbers
  const brokenDownElapsedTimeAsNumbers = brokenDownElapsedTime.map(
    (numberAsString) => parseInt(numberAsString)
  );

  // Store the hours minutes and seconds from that time
  elapsedTimeWhenPaused = {
    hours:
      brokenDownElapsedTimeAsNumbers.length === 3
        ? brokenDownElapsedTimeAsNumbers[0]
        : 0,
    minutes:
      brokenDownElapsedTimeAsNumbers.length === 3
        ? brokenDownElapsedTimeAsNumbers[1]
        : brokenDownElapsedTimeAsNumbers[0],
    seconds:
      brokenDownElapsedTimeAsNumbers.length === 3
        ? brokenDownElapsedTimeAsNumbers[2]
        : brokenDownElapsedTimeAsNumbers[1],
    milliseconds:
      brokenDownElapsedTimeAsNumbers.length === 2
        ? brokenDownElapsedTimeAsNumbers[1]
        : brokenDownElapsedTimeAsNumbers[0],
  };
}

/** Resets stopwatch */
function resetStopwatch() {
  // Clear interval
  if (typeof elapsedTimeIntervalRef !== "undefined") {
    clearInterval(elapsedTimeIntervalRef);
    elapsedTimeIntervalRef = undefined;
  }

  // Reset elapsed time when paused object
  elapsedTimeWhenPaused = undefined;

  // display the start button
  displayStartButton();

  // Reset elapsed time text
  elapsedTimeText.innerText = "00:00.000";
}

//API for time and date functions

var timeAndDateHandling = {
  /** Computes the elapsed time since the moment the function is called in the format mm:ss or hh:mm:ss
   * @param {String} startTime - start time to compute the elapsed time since
   * @returns {String} elapsed time in mm:ss format or hh:mm:ss format if elapsed hours are 0.
   */
  getElapsedTime: function (startTime) {
    // Record end time
    let endTime = new Date();

    // Compute time difference in milliseconds
    let timeDiff = endTime.getTime() - startTime.getTime();

    let milliseconds = timeDiff % 1000;
    // Pad milliseconds with a zero if neccessary
    let millisecondsAsString =
      milliseconds < 100 ? "0" + milliseconds : milliseconds + "";
    console.log(milliseconds);

    // Convert time difference from milliseconds to seconds
    timeDiff = timeDiff / 1000;

    // Extract integer seconds that dont form a minute using %
    let seconds = Math.floor(timeDiff % 60); //ignoring uncomplete seconds (floor)

    // Pad seconds with a zero if neccessary
    let secondsAsString = seconds < 10 ? "0" + seconds : seconds + "";

    // Convert time difference from seconds to minutes using %
    timeDiff = Math.floor(timeDiff / 60);

    // Extract integer minutes that don't form an hour using %
    let minutes = timeDiff % 60; //no need to floor possible incomplete minutes, becase they've been handled as seconds

    // Pad minutes with a zero if neccessary
    let minutesAsString = minutes < 10 ? "0" + minutes : minutes + "";

    // Convert time difference from minutes to hours
    timeDiff = Math.floor(timeDiff / 60);

    // Extract integer hours that don't form a day using %
    let hours = timeDiff % 24; //no need to floor possible incomplete hours, becase they've been handled as seconds

    // Convert time difference from hours to days
    timeDiff = Math.floor(timeDiff / 24);

    // The rest of timeDiff is number of days
    let days = timeDiff;

    let totalHours = hours + days * 24; // add days to hours
    let totalHoursAsString =
      totalHours < 10 ? "0" + totalHours : totalHours + "";

    if (totalHoursAsString === "00") {
      return (
        minutesAsString + ":" + secondsAsString + "." + millisecondsAsString
      );
    } else {
      return (
        totalHoursAsString +
        ":" +
        minutesAsString +
        ":" +
        secondsAsString +
        "." +
        millisecondsAsString
      );
    }
  },
};
