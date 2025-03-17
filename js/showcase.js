async function loadVideos() {
  // Load PerfectScrollbar dynamically if not already loaded
  if (typeof PerfectScrollbar === "undefined") {
    await loadPerfectScrollbar();
  }

  //const response = await fetch("/data/videotest.csv");
  const response = await fetch("/data/videos_2.csv");
  const data = await response.text();
  // remove header row
  const rows = data.split("\n").slice(1);
  const videoContainer = document.getElementById("videos");

  // Clear existing content
  videoContainer.innerHTML = "";

  rows.forEach((row) => {
    // Make sure to properly handle commas within quoted fields
    const columns = parseCSVRow(row);
    const title = columns[1] || "";
    const members = columns[2] || "";
    const videoUrl = columns[3] || "";
    const description = columns[4] || "No Description Available";
    if (videoUrl) {
      // Create card container
      const card = document.createElement("div");
      card.className = "card col-md-12 mb-4";

      // Create card header for title
      const cardHeader = document.createElement("div");
      cardHeader.className = "card-header";
      const titleElement = document.createElement("h5");
      titleElement.textContent = title.trim();

      const membersElement = document.createElement("h6");
      membersElement.textContent = members.trim();
      membersElement.className = "text-muted";

      cardHeader.appendChild(titleElement);
      cardHeader.appendChild(membersElement);

      // Create card body
      const cardBody = document.createElement("div");
      cardBody.className = "card-body row";

      // Create video column (left side)
      const videoCol = document.createElement("div");
      videoCol.className = "col-md-6";

      // Create and configure video iframe
      const videoFrame = document.createElement("iframe");
      videoFrame.src = videoUrl.trim();
      videoFrame.title = title.trim();
      videoFrame.className = "w-100";
      videoFrame.style.height = "225px";
      videoFrame.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      videoFrame.allowFullscreen = true;

      // Create description column (right side)
      const descCol = document.createElement("div");
      descCol.className = "col-md-6";

      // Create scrollable container for description
      const scrollContainer = document.createElement("div");
      scrollContainer.className = "scrollable-content";
      scrollContainer.style.position = "relative";
      scrollContainer.style.height = "225px";
      scrollContainer.style.overflow = "hidden";

      // Create description text
      const descText = document.createElement("p");
      descText.className = "card-text";
      descText.textContent = description.trim();

      // Assemble the card structure
      scrollContainer.appendChild(descText);
      descCol.appendChild(scrollContainer);
      videoCol.appendChild(videoFrame);

      cardBody.appendChild(videoCol);
      cardBody.appendChild(descCol);

      card.appendChild(cardHeader);
      card.appendChild(cardBody);

      // Add to main container
      videoContainer.appendChild(card);
    }
  });

  // Initialize Perfect Scrollbar after DOM is fully updated
  setTimeout(() => {
    const scrollElements = document.querySelectorAll(".scrollable-content");
    scrollElements.forEach((el) => {
      try {
        new PerfectScrollbar(el);
      } catch (error) {
        console.error("Error initializing PerfectScrollbar:", error);
      }
    });
  }, 100);
}

// Helper function to properly parse CSV rows (handles commas within quoted fields)
function parseCSVRow(row) {
  const result = [];
  let startPos = 0;
  let inQuotes = false;

  for (let i = 0; i < row.length; i++) {
    if (row[i] === '"') {
      inQuotes = !inQuotes;
    } else if (row[i] === "," && !inQuotes) {
      result.push(row.substring(startPos, i).replace(/^"|"$/g, "").trim());
      startPos = i + 1;
    }
  }

  // Add the last field
  result.push(row.substring(startPos).replace(/^"|"$/g, "").trim());
  return result;
}

// Function to dynamically load PerfectScrollbar if not present
async function loadPerfectScrollbar() {
  return new Promise((resolve, reject) => {
    // Load CSS
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href =
      "https://cdnjs.cloudflare.com/ajax/libs/perfect-scrollbar/1.5.5/css/perfect-scrollbar.min.css";
    document.head.appendChild(cssLink);

    // Load JS
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/perfect-scrollbar/1.5.5/perfect-scrollbar.min.js";
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Add CSS for scrollbar styling
function addScrollbarStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .scrollable-content {
      padding-right: 10px;
    }
    .ps__rail-y {
      background-color: transparent !important;
    }
    .ps__thumb-y {
      background-color: #aaa !important;
      width: 6px !important;
    }
  `;
  document.head.appendChild(style);
}

// Initialize when the page loads
window.onload = function() {
  addScrollbarStyles();
  loadVideos();
};

// Update scrollbars when window resizes
window.addEventListener("resize", function() {
  const scrollElements = document.querySelectorAll(".scrollable-content");
  scrollElements.forEach((el) => {
    const ps = el._ps || new PerfectScrollbar(el);
    el._ps = ps;
    ps.update();
  });
});
