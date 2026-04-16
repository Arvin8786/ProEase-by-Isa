/**
 * ProEase V3.2 - Robust Sidebar Engine
 * Features: Auto-scroll, Sticky Footer, Active State Tracking, Role-based Access, 
 * User Status Preview, and Internal Styling.
 */

document.addEventListener("DOMContentLoaded", function() {
    // 1. SESSION & SECURITY CHECK
    const userJson = localStorage.getItem('user');
    if (!userJson) {
        window.location.href = "index.html";
        return;
    }
    const user = JSON.parse(userJson);

    // 2. INTERNAL SIDEBAR STYLING (Ensures menu looks perfect on every page)
    const sidebarStyles = `
        <style>
            .sidebar {
                width: 260px;
                background: #0f172a;
                height: 100vh;
                color: white;
                position: fixed;
                top: 0;
                left: 0;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                z-index: 10000;
                box-shadow: 4px 0 10px rgba(0,0,0,0.1);
            }
            .brand-area {
                padding: 30px 20px;
                border-bottom: 1px solid #1e293b;
            }
            .logo {
                font-size: 22px;
                font-weight: 800;
                color: white;
                text-decoration: none;
                letter-spacing: -1px;
            }
            .logo span { color: #6366f1; font-size: 14px; font-weight: 400; margin-left: 5px; }
            .release-info { font-size: 10px; color: #64748b; margin-top: 5px; text-transform: uppercase; letter-spacing: 1px; }

            .menu-area {
                flex: 1;
                overflow-y: auto;
                padding: 20px 15px;
            }
            .menu-area::-webkit-scrollbar { width: 4px; }
            .menu-area::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }

            .nav-label {
                font-size: 10px;
                text-transform: uppercase;
                color: #475569;
                letter-spacing: 1.5px;
                font-weight: 800;
                margin: 25px 10px 10px 10px;
                display: block;
                cursor: pointer;
            }
            .nav-item {
                padding: 12px 16px;
                color: #94a3b8;
                text-decoration: none;
                border-radius: 10px;
                font-weight: 500;
                font-size: 14px;
                display: flex;
                align-items: center;
                margin-bottom: 4px;
                transition: all 0.2s ease;
            }
            .nav-item:hover { background: #1e293b; color: white; transform: translateX(5px); }
            .nav-item.active { background: #6366f1; color: white; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3); }

            .dropdown-content { padding-left: 15px; margin-top: 5px; border-left: 1px solid #1e293b; margin-left: 10px; }
            
            .sidebar-footer {
                padding: 20px;
                border-top: 1px solid #1e293b;
                background: #0f172a;
            }
            .user-mini-profile {
                background: #1e293b;
                padding: 12px;
                border-radius: 12px;
                margin-bottom: 15px;
                display: flex;
                flex-direction: column;
                gap: 4px;
            }
            .u-id { font-size: 12px; font-weight: 800; color: white; }
            .u-tier { font-size: 10px; color: #6366f1; text-transform: uppercase; font-weight: 800; }

            .logout-btn {
                width: 100%;
                background: #ef4444;
                color: white;
                border: none;
                padding: 12px;
                border-radius: 10px;
                font-weight: 700;
                cursor: pointer;
                transition: background 0.2s;
            }
            .logout-btn:hover { background: #dc2626; }
            
            details summary { list-style: none; outline: none; }
            details summary::-webkit-details-marker { display: none; }
        </style>
    `;

    // 3. GENERATE SIDEBAR HTML
    const sidebarHTML = `
        <div class="sidebar">
            <div class="brand-area">
                <a href="dashboard.html" class="logo">${APP_CONFIG.name}<span> ${APP_CONFIG.version}</span></a>
                <div class="release-info">Build: ${APP_CONFIG.releaseDate}</div>
            </div>
            
            <div class="menu-area">
                <a href="dashboard.html" class="nav-item" id="nav-dashboard">📊 Dashboard Overview</a>
                <a href="profile-parser.html" class="nav-item" id="nav-profile">👤 Master Career Profile</a>

                <details class="nav-dropdown" open>
                    <summary class="nav-label">📄 Document Creation</summary>
                    <div class="dropdown-content">
                        <a href="resume-builder.html" class="nav-item" id="nav-resume">AI Resume Builder</a>
                        <a href="cover-letter.html" class="nav-item" id="nav-cover">AI Cover Letter Gen</a>
                        <a href="resignation-gen.html" class="nav-item" id="nav-resign">Resignation Generator</a>
                        <a href="form-filler.html" class="nav-item" id="nav-form">AI Form Filler</a>
                    </div>
                </details>

                <details class="nav-dropdown" open>
                    <summary class="nav-label">🎯 Interview & Performance</summary>
                    <div class="dropdown-content">
                        <a href="mock-interview.html" class="nav-item" id="nav-interview">AI Mock Interview</a>
                        <a href="ats-checker.html" class="nav-item" id="nav-ats">ATS Score Checker</a>
                        <a href="linkedin-auditor.html" class="nav-item" id="nav-linkedin">LinkedIn Auditor</a>
                        <a href="job-tracker.html" class="nav-item" id="nav-tracker">Job Application Board</a>
                    </div>
                </details>

                <div id="adminArea" style="${user.role === 'Admin' ? 'display:block' : 'display:none'}">
                    <details class="nav-dropdown">
                        <summary class="nav-label" style="color: #f87171;">🛡️ System Administration</summary>
                        <div class="dropdown-content">
                            <a href="admin.html" class="nav-item" style="color: #f87171;">User & Limit Management</a>
                        </div>
                    </details>
                </div>
            </div>

            <div class="sidebar-footer">
                <div class="user-mini-profile">
                    <span class="u-id">ID: ${user.userId}</span>
                    <span class="u-tier">Plan: ${user.status}</span>
                </div>
                <button onclick="logout()" class="logout-btn">Logout Session</button>
            </div>
        </div>
    `;

    // 4. INJECT INTO DOM
    document.head.insertAdjacentHTML('beforeend', sidebarStyles);
    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

    // 5. AUTO-HIGHLIGHT ACTIVE TAB
    const path = window.location.pathname.split("/").pop();
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
    
    if (activeMap[path]) {
        const activeElement = document.getElementById(activeMap[path]);
        if (activeElement) activeElement.classList.add("active");
    }
});

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}
