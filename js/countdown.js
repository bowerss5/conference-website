
$(document).ready(function() {
    initCountdown();
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
      var pill = `<span class="badge badge-secondary"><h3>${days}d ${hours}h ${minutes}m ${seconds}s</h3></span>`;
      if (days < 0) {
      // Update the countdown display
        pill = `<span class="badge text-bg-secondary"><h3>The conference has ended!<h3></span>`;
      }
      $("#timer").empty();
      $("#timer").append(pill);
    }, 1000);
}
