// Add this at the very beginning of dashboard.html script section
if (!localStorage.getItem('currentUser')) {
    // Create a default student user
    const defaultUser = {
        id: Date.now(),
        name: 'Guest Student',
        email: 'guest@stbarnabas.sc.ug',
        role: 'student',
        createdAt: new Date().toISOString()
    };
    localStorage.setItem('currentUser', JSON.stringify(defaultUser));
    
    // Also add to users array if not exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (!users.find(u => u.email === 'guest@stbarnabas.sc.ug')) {
        users.push(defaultUser);
        localStorage.setItem('users', JSON.stringify(users));
    }
}