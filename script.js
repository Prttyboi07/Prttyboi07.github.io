// ================================
// DOM Elements
// ================================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');
const contactForm = document.getElementById('contact-form');

// ================================
// Dark/Light Mode Toggle with localStorage
// ================================
function initTheme() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Initialize theme on page load
initTheme();

// Theme toggle event listener
themeToggle.addEventListener('click', toggleTheme);

// ================================
// Mobile Navigation Toggle
// ================================
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Toggle hamburger icon to X
    const icon = navToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ================================
// Active Navigation Link on Scroll
// ================================
function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// ================================
// Navbar Background on Scroll
// ================================
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 30px var(--shadow-color)';
    } else {
        navbar.style.boxShadow = '0 2px 20px var(--shadow-color)';
    }
}

window.addEventListener('scroll', handleNavbarScroll);

// ================================
// Contact Form Handling
// ================================
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name && email && message) {
        // Show success message
        alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon!`);
        
        // Reset form
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// ================================
// Smooth Scroll for All Anchor Links
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// Scroll Reveal Animation
// ================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.skill-category, .project-card, .detail-item');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (elementTop < windowHeight - revealPoint) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize reveal elements
document.querySelectorAll('.skill-category, .project-card, .detail-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ================================
// Typing Effect for Subtitle (Optional Enhancement)
// ================================
const subtitles = ['Aspiring Web Developer', 'IT Student', 'Creative Thinker', 'Problem Solver'];
let subtitleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const subtitleElement = document.querySelector('.home-subtitle');

function typeEffect() {
    const currentSubtitle = subtitles[subtitleIndex];
    
    if (isDeleting) {
        subtitleElement.textContent = currentSubtitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        subtitleElement.textContent = currentSubtitle.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentSubtitle.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        subtitleIndex = (subtitleIndex + 1) % subtitles.length;
        typeSpeed = 500; // Pause before typing new word
    }
    
    setTimeout(typeEffect, typeSpeed);
}

// Start typing effect after page loads
window.addEventListener('load', () => {
    setTimeout(typeEffect, 1000);
});

console.log('Portfolio loaded successfully! 🚀');
console.log('Theme:', localStorage.getItem('theme') || 'light');
