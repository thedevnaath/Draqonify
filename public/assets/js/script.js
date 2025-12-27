// Dark Mode
const toggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    toggleBtn.textContent = currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
}

toggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    toggleBtn.textContent = newTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
});

// Simple Progress (Visual)
const progressBar = document.getElementById('progress-fill');
if(progressBar) {
    // Just a demo value for now, increases as they visit pages
    let progress = localStorage.getItem('studyProgress') || 10;
    progressBar.style.width = progress + '%';
    document.getElementById('progress-text').textContent = progress + '% Completed';
}

const completeBtn = document.getElementById('mark-complete');
if (completeBtn) {
    completeBtn.addEventListener('click', () => {
        completeBtn.textContent = "✅ Completed";
        completeBtn.style.background = "#2e7d32";
        let newProg = parseInt(localStorage.getItem('studyProgress') || 10) + 5;
        localStorage.setItem('studyProgress', newProg);
    });
}
