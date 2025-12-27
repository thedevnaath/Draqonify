// Dark Mode Logic
const toggleBtn = document.getElementById('theme-toggle');
const themeIcon = toggleBtn.querySelector('i'); // Select the icon inside the button
const currentTheme = localStorage.getItem('theme');

// Function to update Icon based on theme
function updateIcon(theme) {
    if (theme === 'dark') {
        // If Dark, show Sun icon
        themeIcon.className = 'ri-sun-line';
    } else {
        // If Light, show Moon icon
        themeIcon.className = 'ri-moon-line';
    }
}

// Initial Load
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);
}

// Click Event
toggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateIcon(newTheme);
});

// Simple Progress (Visual)
const progressBar = document.getElementById('progress-fill');
if(progressBar) {
    let progress = localStorage.getItem('studyProgress') || 10;
    progressBar.style.width = progress + '%';
    document.getElementById('progress-text').textContent = progress + '% Completed';
}

// Mark Complete Button
const completeBtn = document.getElementById('mark-complete');
if (completeBtn) {
    completeBtn.addEventListener('click', () => {
        completeBtn.innerHTML = '<i class="ri-check-double-line"></i> Completed';
        completeBtn.style.background = "#2e7d32";
        let newProg = parseInt(localStorage.getItem('studyProgress') || 10) + 5;
        localStorage.setItem('studyProgress', newProg);
    });
}
