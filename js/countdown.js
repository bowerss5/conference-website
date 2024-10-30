
$(document).ready(function() {
    initCountdown();
    const targetDate = new Date('04-11-2025'); // Replace with your target date
    initializeTimer(targetDate);
});
function initCountdown() {
    const targetDate = new Date("2025-04-11");
    const currentDate = new Date();
    var timeDifference = targetDate.getTime() - currentDate.getTime();
    // Update the countdown every second
    setInterval(() => {
      // Recalculate the time difference
      timeDifference = targetDate.getTime() - new Date().getTime();
  
      // Update the days, hours, minutes, and seconds
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 2;
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      var pill = `<h3>${days}d ${hours}h ${minutes}m ${seconds}s</h3>`;
      if (days < 0) {
      // Update the countdown display
        pill = `<span class="badge text-bg-secondary"><h3>The conference has ended!<h3></span>`;
      }
      $("#timer").empty();
      $("#timer").append(pill);
    }, 1000);
}

function initCountdown() {
  const targetDate = new Date("2025-04-11");
  const currentDate = new Date();
  var timeDifference = targetDate.getTime() - currentDate.getTime();
  // Update the countdown every second
  setInterval(() => {
    // Recalculate the time difference
    timeDifference = targetDate.getTime() - new Date().getTime();

    // Update the days, hours, minutes, and seconds
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 2;
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    var pill = `<span class="badge badge-secondary"><h3>${days}d ${hours}h ${minutes}m ${seconds}s</h3></span>`;
    if (days < 0) {
    // Update the countdown display
      pill = `<span class="badge text-bg-secondary"><h3>The conference has ended!<h3></span>`;
    }
    $("#timer").empty();
    $("#timer").append(pill);
  }, 1000);
}

// Alternative timer
function initializeTimer(targetDate) {
function updateTimer() {
  const now = new Date();
  const difference = targetDate - now;

  if (difference <= 0) {
    document.querySelector('.timer').innerHTML = 'Timer Expired!';
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = days.toString().padStart(2, '0');
  document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
  document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Update timer immediately and then every second
updateTimer();
setInterval(updateTimer, 1000);
}
