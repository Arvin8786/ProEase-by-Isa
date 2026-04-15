// sidebar.js

// sidebar.js - GLOBAL CONFIGURATION
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz2c20JQhD5v-bHsdQassiK6pA3ekHuWyTY63WeiNeCYCL9I0ZizvDus8ouJtNRV6ie/exec";

const APP_CONFIG = {
    name: "ProEase",
    version: "V3.2",
    releaseDate: "April 15, 2026" 
};
// ... (rest of the sidebar code remains the same)
const APP_CONFIG = {
    name: "ProEase",
    version: "V3.2",
    releaseDate: "April 15, 2026" 
};

document.addEventListener("DOMContentLoaded", function() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) { window.location.href = "index.html"; return; }

    const sidebarHTML = `
        <div class="sidebar" style="display: flex; flex-direction: column; height: 100vh; position: fixed; top: 0; left: 0; width: 260px; background: #0f172a; box-sizing: border-box;">
            
            <!-- 1. FIXED HEADER (Logo & Version) -->
            <div class="brand-area" style="padding: 25px 20px 15px 20px; border-bottom: 1px solid #1e293b;">
                <a href="dashboard.html" class="logo" style="color: white; text-decoration: none; font-size: 22px; font-weight: 800;">${APP_CONFIG.name}<span style="color: #6366f1; font-size: 14px; font-weight: 400; margin-left: 5px;">${APP_CONFIG.version}</span></a>
                <div class="release-info" style="font-size: 11px; color: #64748b; margin-top: 5px;">Released: ${APP_CONFIG.releaseDate}</div>
            </div>
            
            <!-- 2. SCROLLABLE MENU AREA -->
            <div class="menu-area" style="flex: 1; overflow-y: auto; padding: 15px 15px;">
                
                <a href="dashboard.html" class="nav-item" id="nav-dashboard">📊 Overview Dashboard</a>
                <a href="profile-parser.html" class="nav-item" id="nav-profile">👤 AI Profile Sync</a>

                <!-- CATEGORY: DOCUMENT TOOLS -->
                <details class="nav-dropdown" open>
                    <summary class="nav-label">📄 Document Creation</summary>
                    <div class="dropdown-content">
                        <a href="resume-builder.html" class="nav-item" id="nav-resume">Resume Builder</a>
                        <a href="cover-letter.html" class="nav-item" id="nav-cover">Cover Letter Gen</a>
                        <a href="resignation-gen.html" class="nav-item" id="nav-resign">Resignation Letter</a>
                        <a href="form-filler.html" class="nav-item" id="nav-form">AI Form Filler</a>
                    </div>
                </details>

                <!-- CATEGORY: INTERVIEW PREP -->
                <details class="nav-dropdown" open>
                    <summary class="nav-label">🎯 Interview Prep</summary>
                    <div class="dropdown-content">
                        <a href="mock-interview.html" class="nav-item" id="nav-interview">AI Mock Interview</a>
                        <a href="resume-tailor.html" class="nav-item" id="nav-tailor">Resume Tailoring</a>
                    </div>
                </details>

                <!-- CATEGORY: ANALYTICS -->
                <details class="nav-dropdown" open>
                    <summary class="nav-label">📈 Career Analytics</summary>
                    <div class="dropdown-content">
                        <a href="ats-checker.html" class="nav-item" id="nav-ats">ATS Checker</a>
                        <a href="linkedin-auditor.html" class="nav-item" id="nav-linkedin">LinkedIn Auditor</a>
                        <a href="job-tracker.html" class="nav-item" id="nav-tracker">Job Tracker</a>
                    </div>
                </details>

                <!-- CATEGORY: ADMIN -->
                <div id="adminArea" style="${user.role === 'Admin' ? 'display:block' : 'display:none'}">
                    <details class="nav-dropdown">
                        <summary class="nav-label" style="color: #f87171;">🛡️ System Admin</summary>
                        <div class="dropdown-content">
                            <a href="admin.html" class="nav-item" style="color: #f87171;">Manage Users</a>
                        </div>
                    </details>
                </div>

            </div>

            <!-- 3. FIXED FOOTER (Logout Button) -->
            <div style="padding: 15px 20px; border-top: 1px solid #1e293b; background: #0f172a;">
                <button onclick="logout()" class="logout-btn" style="width: 100%; background: #ef4444; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: background 0.2s;">Logout Session</button>
            </div>
        </div>

        <!-- Inline CSS for elements inside JS -->
        <style>
            .menu-area::-webkit-scrollbar { width: 5px; }
            .menu-area::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
            
            .nav-item {
                display: block; padding: 10px 15px; color: #94a3b8; text-decoration: none;
                border-radius: 8px; font-size: 14px; font-weight: 500; margin-bottom: 4px; transition: all 0.2s;
            }
            .nav-item:hover, .nav-item.active { background: #1e293b; color: white; }
            
            .nav-label {
                font-size: 11px; text-transform: uppercase; color: #475569; letter-spacing: 1px;
                font-weight: 700; cursor: pointer; display: block; padding: 15px 10px 5px 10px;
            }
            .nav-dropdown[open] .nav-label { color: #6366f1; }
            
            .dropdown-content { padding-left: 10px; margin-top: 5px; }
            .logout-btn:hover { background: #dc2626 !important; }
        </style>
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
        "job-tracker.html": "nav-tracker",
        "resume-tailor.html": "nav-tailor"
    };
    const currentPath = window.location.pathname.split("/").pop();
    if(activeMap[currentPath]) document.getElementById(activeMap[currentPath]).classList.add("active");
});

function logout() {
    localStorage.removeItem('user');
    window.location.href = "index.html";
}
