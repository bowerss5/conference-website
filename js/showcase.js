// get csv
async function loadVideos() {
  const response = await fetch("/data/videotest.csv");
  const data = await response.text();
  // remove header row
  const rows = data.split("\n").slice(1);

  const videoContainer = document.getElementById("videos");

  rows.forEach((row) => {
    const [title, videoUrl] = row.split(",");

    if (videoUrl) {
      const videoFrame = document.createElement("iframe");
      videoFrame.src = videoUrl.trim();
      videoFrame.title = title.trim();
      videoFrame.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      videoFrame.allowFullscreen = true;

      const container = document.createElement("div");
      // 3 per row
      container.className = "video-container col-md-3";
      container.appendChild(videoFrame);

      videoContainer.appendChild(container);
    }
  });
}
// Load videos when the page loads
window.onload = loadVideos;
