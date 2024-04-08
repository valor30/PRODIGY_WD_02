// Define variables to hold time values
let stopwatchInterval;
let stopwatchTime = new Date();
let laps = []; // Array to store lap times
let timerDuration = 0;
let timerInterval;

// Define functions for stopwatch operations
function startStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchTime = new Date();
  stopwatchInterval = setInterval(updateStopwatchDisplay, 10);
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
}

function restartStopwatch() {
  stopwatchTime = new Date(); // Reset stopwatch time
  updateStopwatchDisplay();
}

function updateStopwatchDisplay() {
  const elapsedTime = new Date(new Date() - stopwatchTime);
  document.getElementById('stopwatchDisplay').textContent = formatTime(elapsedTime);
}

// Define functions for timer operations
function startTimer(durationInSeconds) {
  timerDuration = durationInSeconds;
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimerDisplay, 1000);
}

function updateTimerDisplay() {
    const hours = Math.floor(timerDuration / 3600);
    const minutes = Math.floor((timerDuration % 3600) / 60);
    const seconds = timerDuration % 60;
  
    document.getElementById('timerDisplay').textContent =
      `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  
    if (timerDuration <= 0) {
      clearInterval(timerInterval);
      playSoundEffect(); // Play sound effect when timer reaches zero
      return;
    }
  
    timerDuration--; // Decrement timer duration only if it's not zero yet
  }
  

// Define utility functions
function pad(number, length = 2) {
  return String(number).padStart(length, '0');
}

function formatTime(time) {
  return `${pad(time.getUTCHours())}:${pad(time.getUTCMinutes())}:${pad(time.getUTCSeconds())}.${pad(time.getUTCMilliseconds(), 3)}`;
}

function playSoundEffect() {
  const audio = new Audio('sound.wav');
  audio.play();
}

// Define functions for lap operations
function startLap() {
  if (!stopwatchInterval) {
    console.error('Stopwatch is not running');
    return;
  }
  laps.push(new Date(new Date() - stopwatchTime)); // Save the current lap time
  displayLaps(); // Update the lap times display
}

function displayLaps() {
  const lapTimesElement = document.getElementById('lapTimes');
  lapTimesElement.innerHTML = ''; // Clear previous lap times
  laps.forEach((lapTime, index) => {
    const lapElement = document.createElement('div');
    lapElement.classList.add('lap-time-entry');
    lapElement.textContent = `Lap ${index + 1}: ${formatTime(lapTime)}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-lap-button');
    deleteButton.onclick = () => deleteLap(index);

    lapElement.appendChild(deleteButton);
    lapTimesElement.appendChild(lapElement);
  });
}

function deleteLap(lapIndex) {
  laps.splice(lapIndex, 1); // Remove the lap from the array
  displayLaps(); // Update the lap times display
}

// Event listeners for buttons
document.getElementById('startButton').addEventListener('click', startStopwatch);
document.getElementById('stopButton').addEventListener('click', stopStopwatch);
document.getElementById('restartButton').addEventListener('click', restartStopwatch);
document.getElementById('lapButton').addEventListener('click', startLap);
document.getElementById('startTimerButton').addEventListener('click', () => {
  const hours = parseInt(document.getElementById('hoursInput').value, 10) || 0;
  const minutes = parseInt(document.getElementById('minutesInput').value, 10) || 0;
  const seconds = parseInt(document.getElementById('secondsInput').value, 10) || 0;
  const duration = (hours * 3600) + (minutes * 60) + seconds;
  startTimer(duration);
});

// Initialize displays
updateClockDisplay(); // Initialize clock

// Define functions for clock operations
function updateClockDisplay() {
  document.getElementById('clockDisplay').textContent = new Date().toLocaleTimeString();
  setTimeout(updateClockDisplay, 1000);
}

function switchApp(app) {
  document.getElementById('stopwatchApp').style.display = app === 'stopwatch' ? 'block' : 'none';
  document.getElementById('clockApp').style.display = app === 'stopwatch' ? 'none' : 'block';
  if (app !== 'stopwatch') updateClockDisplay();
}
