/* ============================
   1. DARK MODE & ICONS
   ============================ */
const toggleBtn = document.getElementById('theme-toggle');
const themeIcon = toggleBtn ? toggleBtn.querySelector('i') : null;
const currentTheme = localStorage.getItem('theme');

// Function: Update the Icon based on theme
function updateIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
        themeIcon.className = 'ri-sun-line'; // Sun for dark mode
    } else {
        themeIcon.className = 'ri-moon-line'; // Moon for light mode
    }
}

// Initial Load
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);
}

// Click Event
if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });
}

/* ============================
   2. PROGRESS TRACKING
   ============================ */
// Update Progress Bar (if it exists on page)
const progressBar = document.getElementById('progress-fill');
if(progressBar) {
    let progress = localStorage.getItem('studyProgress') || 10;
    progressBar.style.width = progress + '%';
    const textEl = document.getElementById('progress-text');
    if(textEl) textEl.textContent = progress + '% Completed';
}

// Mark Complete Button Logic
const completeBtn = document.getElementById('mark-complete');
if (completeBtn) {
    // Check if already completed
    if(localStorage.getItem(window.location.href + '-complete')) {
         completeBtn.innerHTML = '<i class="ri-check-double-line"></i> Completed';
         completeBtn.style.background = "#2e7d32";
    }

    completeBtn.addEventListener('click', () => {
        completeBtn.innerHTML = '<i class="ri-check-double-line"></i> Completed';
        completeBtn.style.background = "#2e7d32";
        
        // Increase progress only once per page
        if(!localStorage.getItem(window.location.href + '-complete')) {
            let newProg = parseInt(localStorage.getItem('studyProgress') || 10) + 5;
            if(newProg > 100) newProg = 100;
            localStorage.setItem('studyProgress', newProg);
            localStorage.setItem(window.location.href + '-complete', 'true');
        }
    });
}

/* ============================
   3. CONTINUE LEARNING (RESUME)
   ============================ */

// A. SAVE LOCATION: If we are on a Chapter Page
// We detect a chapter page by looking for specific elements like ".topic-check"
if (document.querySelector('.topic-check') || document.querySelector('.exam-box')) {
    const pageData = {
        title: document.title.split('|')[0].trim(), // Gets "Kinematics" from "Kinematics | Draqonify"
        url: window.location.href
    };
    localStorage.setItem('lastVisited', JSON.stringify(pageData));
}

// B. SHOW BUTTON: If we are on Homepage (and container exists)
const continueContainer = document.getElementById('continue-container');
if (continueContainer) {
    const lastVisited = JSON.parse(localStorage.getItem('lastVisited'));
    
    if (lastVisited && lastVisited.url) {
        continueContainer.style.display = 'block';
        continueContainer.innerHTML = `
            <a href="${lastVisited.url}" class="btn-big" style="background: var(--accent); color: var(--text-main); border: 2px solid var(--accent);">
                <i class="ri-play-circle-line"></i> Continue: ${lastVisited.title}
            </a>
        `;
    }
}
