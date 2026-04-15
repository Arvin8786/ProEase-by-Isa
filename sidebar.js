// sidebar.js

// --- UPDATE THESE TWO LINES FOR NEW RELEASES ---
const APP_CONFIG = {
    name: "ProEase",
    version: "V3.2",
    releaseDate: "October 28, 2023" // Update this for every release
};

document.addEventListener("DOMContentLoaded", function() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) { window.location.href = "index.html"; return; }

    const sidebarHTML = `
        <div class="sidebar">
            <div class="brand-area">
                <a href="dashboard.html" class="logo">${APP_CONFIG.name}<span> ${APP_CONFIG.version}</span></a>
                <div class="release-info">Released: ${APP_CONFIG.releaseDate}</div>
            </div>
            
            <span class="nav-label">Main Menu</span>
            <div class="nav-group">
                <a href="dashboard.html" class="nav-item" id="nav-dashboard">Overview</a>
                <a href="profile-parser.html" class="nav-item" id="nav-profile">AI Profile Sync</a>
            </div>

            <span class="nav-label">Document Tools</span>
            <div class="nav-group">
                <a href="resume-builder.html" class="nav-item" id="nav-resume">Resume Builder</a>
                <a href="cover-letter.html" class="nav-item" id="nav-cover">Cover Letter</a>
                <a href="resignation-gen.html" class="nav-item" id="nav-resign">Resignation Gen</a>
                <a href="form-filler.html" class="nav-item" id="nav-form">AI Form Filler</a>
            </div>

            <span class="nav-label">Interview & AI</span>
            <div class="nav-group">
                <a href="mock-interview.html" class="nav-item" id="nav-interview">Mock Interview</a>
                <a href="ats-checker.html" class="nav-item" id="nav-ats">ATS Checker</a>
                <a href="linkedin-auditor.html" class="nav-item" id="nav-linkedin">LinkedIn Auditor</a>
                <a href="job-tracker.html" class="nav-item" id="nav-tracker">Job Tracker</a>
            </div>

            <div id="adminArea" class="admin-section" style="${user.role === 'Admin' ? 'display:block' : 'display:none'}">
                <span class="nav-label">System Admin</span>
                <a href="admin.html" class="nav-item" style="color: #f87171; background: rgba(248, 113, 113, 0.1);">Manage Users</a>
            </div>

            <button onclick="logout()" class="logout-btn">Logout Session</button>
        </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

    // Update Browser Tab Title automatically
    const path = window.location.pathname.split("/").pop().replace(".html", "");
    const pageTitle = path ? path.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : "Dashboard";
    document.title = `${APP_CONFIG.name} ${APP_CONFIG.version} | ${pageTitle}`;

    // Highlight active link
    const activeMap = {
        "dashboard.html": "nav-dashboard",
        "profile-parser.html": "nav-profile",
        "resume-builder.html": "nav-resume",
        "cover-letter.html": "nav-cover",
        "resignation-gen.html": "nav-resign",
        "form-filler.html": "nav-form",
        "mock-interview.html": "nav-interview",
        "ats-checker.html": "nav-ats",
        "linkedin-auditor.html": "nav-linkedin",
        "job-tracker.html": "nav-tracker"
    };
    const currentPath = window.location.pathname.split("/").pop();
    if(activeMap[currentPath]) document.getElementById(activeMap[currentPath]).classList.add("active");
});

function logout() {
    localStorage.removeItem('user');
    window.location.href = "index.html";
}
