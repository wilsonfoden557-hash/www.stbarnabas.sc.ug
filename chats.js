// Chat functionality
let messageCheckInterval;

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) {
        showNotification('Please enter a message', 'error');
        return;
    }
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    
    const newMessage = {
        id: Date.now(),
        text: message,
        sender: currentUser.name,
        senderId: currentUser.id,
        receiver: 'admin',
        timestamp: new Date().toISOString(),
        read: false
    };
    
    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));
    
    input.value = '';
    loadMessages();
    
    // Simulate admin response (for demo)
    setTimeout(() => {
        simulateAdminResponse(message);
    }, 2000);
    
    updateStats();
}

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const chatMessages = document.getElementById('chatMessages');
    
    if (messages.length === 0) {
        chatMessages.innerHTML = '<p style="text-align: center; color: #999;">No messages yet. Start a conversation with the school administration!</p>';
        return;
    }
    
    chatMessages.innerHTML = messages.map(msg => `
        <div class="message ${msg.senderId === currentUser.id ? 'sent' : 'received'}">
            <div class="message-bubble">
                <div><strong>${msg.sender === 'admin' ? 'School Admin' : msg.sender}</strong></div>
                <div>${escapeHtml(msg.text)}</div>
                <div class="message-time">${formatTime(msg.timestamp)}</div>
            </div>
        </div>
    `).join('');
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function simulateAdminResponse(userMessage) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    
    // Check if admin already responded to this message
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender === currentUser.name && !lastMessage.responded) {
        const adminResponse = {
            id: Date.now(),
            text: getAutoResponse(userMessage),
            sender: 'admin',
            senderId: 'admin',
            receiver: currentUser.name,
            timestamp: new Date().toISOString(),
            read: false,
            responded: true
        };
        
        messages.push(adminResponse);
        localStorage.setItem('messages', JSON.stringify(messages));
        loadMessages();
        updateStats();
    }
}

function getAutoResponse(message) {
    const responses = [
        "Thank you for your message. We'll get back to you shortly.",
        "Your message has been received. A school administrator will respond soon.",
        "Thank you for reaching out. We appreciate your communication.",
        "Your inquiry has been noted. We'll provide assistance as soon as possible."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Start checking for new messages
function startMessagePolling() {
    if (messageCheckInterval) clearInterval(messageCheckInterval);
    messageCheckInterval = setInterval(() => {
        const currentSection = document.querySelector('.nav-link.active').dataset.section;
        if (currentSection === 'chat') {
            loadMessages();
        }
    }, 5000);
}

// Initialize chat polling
startMessagePolling();