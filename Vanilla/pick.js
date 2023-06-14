import stopwatch from "./Vanilla/timer/stopwatch";
console.log(stopwatch);
//Used to store all data
var fullTimeStudyArray = Array([
  "Event",
  "Seconds to Complete",
  "Timestamp",
  "Pick Count",
]);

//Used for Pick Counter
var counter = 0;
var counterText = "walk";

//Storage variables for event and timer
var eventKeeper = "Timer Start";
var timeKeeper = new Date().getTime() / 1000;

function add_element_to_array(event) {
  event = event.replace("_button", "");

  //Update pick counter
  if (eventKeeper == counterText) {
    counter++;
    document.getElementById("status").innerHTML = "Picks Counted: " + counter;
  }

  //Get time between last button press event and now
  var d = new Date();
  var secondsToComplete = d.getTime() / 1000 - timeKeeper;

  //Push records to the fullTimeStudyArray(Event, Seconds to Complete, Timestamp, Pick Count)
  fullTimeStudyArray.push([
    eventKeeper,
    secondsToComplete.toFixed(2),
    d.toLocaleString().replace(",", ""),
    counter,
  ]);

  //Display data in Results Div
  update_results();

  eventKeeper = event;
  timeKeeper = d.getTime() / 1000;
}

//Delete last record of pressed button event
function delete_last_record() {
  //Update Pick Counter
  if (fullTimeStudyArray[fullTimeStudyArray.length - 1][0] == counterText) {
    counter--;
    document.getElementById("Status").innerHTML = "Picks Counted: " + counter;
  }

  timeKeeper =
    timeKeeper - fullTimeStudyArray[fullTimeStudyArray.length - 1][1];

  //Remove record from fullTimeStudyArray
  fullTimeStudyArray = fullTimeStudyArray.slice(
    0,
    fullTimeStudyArray.length - 1
  );

  //Update results in the results Div
  update_results();
}

//Update Results Div
function update_results() {
  //build html table for output
  var e = "<table>";

  for (var i = 0; i < fullTimeStudyArray.length; i++) {
    e += "<tr>";
    for (var j = 0; j < fullTimeStudyArray[i].length; j++) {
      e += "<td>" + fullTimeStudyArray[i][j] + "</td>";
    }
    e += "</tr>";
  }
  e += "</table>";
  document.getElementById("Results").innerHTML = e;
}

//CSV output
function arrayToCSV() {
  var csvRows = [];
  for (var i = 0; i < fullTimeStudyArray.length; ++i) {
    csvRows.push(fullTimeStudyArray[i].join(","));
  }
  var today = new Date();
  var csvString = csvRows.join("\n");
  var a = document.createElement("a");
  a.href = "data:attachment/csv," + csvString;
  a.target = "_blank";
  a.download =
    "Time Study " +
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    " " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds() +
    ".csv";

  document.body.appendChild(a);
  a.click();
}

function buttonClick(element) {
  //if timerStarted = 1{
  // startStopwatch();
  //}
  //add_element_to_array(element);
}
