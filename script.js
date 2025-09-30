// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) span.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
        }
    });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    });
});

// Typing effect for hero section
const typingText = document.querySelector('.typing-text');
const texts = [
    'welcome to my portfolio',
    'retro developer',
    'creative coder',
    'building the future with nostalgia'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500; // Pause before next text
    }
    
    setTimeout(typeText, typeSpeed);
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeText, 1000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields!', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully! (This is a demo)', 'success');
    
    // Reset form
    this.reset();
});

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00ff00' : '#ff0000'};
        color: #000080;
        padding: 15px 20px;
        border: 2px outset #c0c0c0;
        font-family: 'Share Tech Mono', monospace;
        font-weight: bold;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Shutdown function
function shutdown() {
    if (confirm('Are you sure you want to exit?')) {
        // Create shutdown effect
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000080;
            color: #c0c0c0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-family: 'Share Tech Mono', monospace;
            font-size: 1.2rem;
            z-index: 10000;
            animation: fadeIn 0.5s ease;
        `;
        
        overlay.innerHTML = `
            <div style="text-align: center;">
                <p>Microsoft Windows 95</p>
                <p>Shutting down...</p>
                <br>
                <p>It's now safe to turn off your computer.</p>
                <br>
                <p style="font-size: 0.8rem; color: #808080;">Click anywhere to continue</p>
            </div>
        `;
        
        // Add fade in animation
        if (!document.querySelector('#shutdown-styles')) {
            const style = document.createElement('style');
            style.id = 'shutdown-styles';
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(overlay);
        
        // Remove overlay on click
        overlay.addEventListener('click', () => {
            overlay.remove();
        });
    }
}

// Add retro sound effects (optional)
function playClickSound() {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Add click sounds to buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('.nav-link, .btn-link, .submit-btn, .btn')) {
        playClickSound();
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add retro cursor effect
document.addEventListener('mousemove', function(e) {
    // Remove existing cursor
    const existingCursor = document.querySelector('.retro-cursor');
    if (existingCursor) {
        existingCursor.remove();
    }
    
    // Create new cursor
    const cursor = document.createElement('div');
    cursor.className = 'retro-cursor';
    cursor.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 20px;
        height: 20px;
        background: #00ff00;
        border: 1px solid #c0c0c0;
        pointer-events: none;
        z-index: 10000;
        animation: cursorBlink 1s infinite;
    `;
    
    // Add cursor blink animation
    if (!document.querySelector('#cursor-styles')) {
        const style = document.createElement('style');
        style.id = 'cursor-styles';
        style.textContent = `
            @keyframes cursorBlink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(cursor);
    
    // Remove cursor after animation
    setTimeout(() => {
        if (cursor.parentNode) {
            cursor.remove();
        }
    }, 1000);
});

// Add loading screen
window.addEventListener('load', () => {
    const loadingScreen = document.createElement('div');
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000080;
        color: #c0c0c0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: 'Share Tech Mono', monospace;
        font-size: 1.2rem;
        z-index: 10000;
        animation: fadeOut 1s ease 2s forwards;
    `;
    
    loadingScreen.innerHTML = `
        <div style="text-align: center;">
            <p>Microsoft Windows 95</p>
            <p>Starting Windows...</p>
            <br>
            <div style="width: 200px; height: 20px; border: 2px inset #c0c0c0; background: #000080;">
                <div style="width: 100%; height: 100%; background: #00ff00; animation: loading 2s ease;"></div>
            </div>
        </div>
    `;
    
    // Add loading animations
    if (!document.querySelector('#loading-styles')) {
        const style = document.createElement('style');
        style.id = 'loading-styles';
        style.textContent = `
            @keyframes loading {
                from { width: 0%; }
                to { width: 100%; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; visibility: hidden; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(loadingScreen);
    
    // Remove loading screen after animation
    setTimeout(() => {
        if (loadingScreen.parentNode) {
            loadingScreen.remove();
        }
    }, 3000);
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Alt + H for home
    if (e.altKey && e.key === 'h') {
        e.preventDefault();
        document.querySelector('a[href="#home"]').click();
    }
    
    // Alt + P for projects
    if (e.altKey && e.key === 'p') {
        e.preventDefault();
        document.querySelector('a[href="#projects"]').click();
    }
    
    // Alt + C for contact
    if (e.altKey && e.key === 'c') {
        e.preventDefault();
        document.querySelector('a[href="#contact"]').click();
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    }
});

// Add retro screen flicker effect
function addScreenFlicker() {
    const flicker = document.createElement('div');
    flicker.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.1);
        pointer-events: none;
        z-index: 9999;
        animation: flicker 0.1s ease;
    `;
    
    if (!document.querySelector('#flicker-styles')) {
        const style = document.createElement('style');
        style.id = 'flicker-styles';
        style.textContent = `
            @keyframes flicker {
                0% { opacity: 0; }
                50% { opacity: 1; }
                100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(flicker);
    
    setTimeout(() => {
        if (flicker.parentNode) {
            flicker.remove();
        }
    }, 100);
}

// Random screen flicker
setInterval(() => {
    if (Math.random() < 0.01) { // 1% chance every interval
        addScreenFlicker();
    }
}, 1000);

