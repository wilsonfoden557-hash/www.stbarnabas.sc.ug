// Add to contact.html script section
function sendContactMessage(event) {
    event.preventDefault();
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    
    // Store in localStorage for admin to see
    const contactMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    contactMessages.push({
        id: Date.now(),
        sender: name,
        email: email,
        subject: subject,
        message: message,
        timestamp: new Date().toISOString(),
        read: false
    });
    localStorage.setItem('contactMessages', JSON.stringify(contactMessages));
    
    alert('Thank you for your message! Our administration will respond shortly.');
    document.getElementById('contactForm').reset();
}