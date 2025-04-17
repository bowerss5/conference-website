$(document).ready(function() {
  const targetDate = new Date(2025, 3, 11, 10, 30, 0, 0);
  //const targetDate = new Date(Date.now() + 10000); // Use this to test
  initializeTimer(targetDate);
});

function initializeTimer(targetDate) {
  // Changed from embed-responsive-1by1 to embed-responsive-16by9
  const streamContainer = $('<div>', {
    id: 'stream-container',
    class: 'row mt-0'
  }).html(`
    <div class="col-12 justify-content-center">
      <div class="timer-container">
        <div class="textarea">
          <h2 class="live-text">Conference has concluded!</h2>
          <div class="embed-responsive embed-responsive-16by9">
            <iframe class="embed-responsive-item" 
                    src="https://www.youtube.com/embed/3Zu56tF9VVc" 
                    allowfullscreen>
            </iframe>
          </div>
        </div>
      </div>
    </div>
  `);

  $('.timer-container').parent().after(streamContainer);

  function updateTimer() {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      // Use vanilla JavaScript as fallback
      const timerContainer = document.querySelector('.timer-container');
      if (timerContainer) {
        timerContainer.style.transition = 'opacity 1s';
        timerContainer.style.opacity = '0';
        setTimeout(() => {
          timerContainer.style.display = 'none';
          // Show the stream
          $('#stream-container').collapse('show');
        }, 1000);
      }
      
      clearInterval(timerInterval);
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Update the timer display
    $('#days').text(days.toString().padStart(2, '0'));
    $('#hours').text(hours.toString().padStart(2, '0'));
    $('#minutes').text(minutes.toString().padStart(2, '0'));
    $('#seconds').text(seconds.toString().padStart(2, '0'));
  }

  // Start the timer
  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}