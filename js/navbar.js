
// JS/navbar.js
document.addEventListener("DOMContentLoaded", function() {
    const navbarHTML = `
    <nav class="navbar navbar-expand-lg" id="navHeader">
        <div class="row navbar-collapse collapse show">
            <div class="col-lg-2">
                <a href="index.html">
                    <img class="navLogo" alt="logo" src="imgs/logos/Circular/main.png">
                </a>
            </div>
            <div class="col-lg-9 tabsSec">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <ul class="nav nav-tabs">
                    <div class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" id="activeTab" href="index.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <div class="navbar-nav">
                                <a class="nav-link" href="cohort.html">Meet Cohort XI</a>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="conference.html">Conference</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="studentVids.html">Student Interviews</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="professionalVids.html">Professional Interviews</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="resources.html">Resources</a>
                        </li>
                    </div>
                </ul>
            </div>
            <div class="col-lg-1"></div>
        </div>
    </nav>
    `;
    
    document.getElementById('navbar-placeholder').innerHTML = navbarHTML;
});
