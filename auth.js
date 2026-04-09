// Authentication helper functions
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-family: 'Poppins', sans-serif;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Initialize demo announcements
function initDemoData() {
    // Sample announcements
    const announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
    if (announcements.length === 0) {
        const demoAnnouncements = [
            {
                id: 1,
                title: "School Reopening Date",
                content: "School will reopen on January 15th, 2024. All students are expected to report by 8:00 AM.",
                date: new Date().toISOString()
            },
            {
                id: 2,
                title: "Parent-Teacher Meeting",
                content: "Parent-Teacher meeting scheduled for January 20th, 2024. Please check your child's progress.",
                date: new Date().toISOString()
            }
        ];
        localStorage.setItem('announcements', JSON.stringify(demoAnnouncements));
    }
}

// Initialize demo data on page load
initDemoData();