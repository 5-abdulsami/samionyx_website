// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    navMenu.style.position = 'absolute';
    navMenu.style.top = '70px';
    navMenu.style.left = '0';
    navMenu.style.right = '0';
    navMenu.style.flexDirection = 'column';
    navMenu.style.backgroundColor = 'var(--secondary-color)';
    navMenu.style.gap = '0';
    navMenu.style.padding = '20px';
    navMenu.style.borderBottom = '1px solid var(--border-color)';
});

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.style.display = 'none';
    });
});

// Portfolio Lightbox
const portfolioItems = document.querySelectorAll('.portfolio-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

const projectData = {
    1: {
        title: 'FitTrack Pro',
        description: 'A comprehensive fitness tracking application that monitors daily activities, workouts, and health metrics. Features real-time analytics, personalized recommendations, and social sharing capabilities.',
        images: ['/placeholder.svg?height=600&width=600']
    },
    2: {
        title: 'ShopHub',
        description: 'A full-featured e-commerce platform with seamless checkout experience, product recommendations, and secure payment integration. Supports multiple payment methods and real-time order tracking.',
        images: ['/placeholder.svg?height=600&width=600']
    },
    3: {
        title: 'ConnectHub',
        description: 'A modern social networking platform with real-time messaging, video calls, and community features. Built with scalable architecture to support millions of users.',
        images: ['/placeholder.svg?height=600&width=600']
    },
    4: {
        title: 'TravelGo',
        description: 'An innovative travel booking application featuring AR destination previews, personalized itineraries, and local recommendations. Integrates with major travel APIs for real-time pricing.',
        images: ['/placeholder.svg?height=600&width=600']
    },
    5: {
        title: 'TaskFlow',
        description: 'An AI-powered productivity app that intelligently manages tasks, schedules, and priorities. Features machine learning algorithms for smart task suggestions and time management.',
        images: ['/placeholder.svg?height=600&width=600']
    },
    6: {
        title: 'MindfulMe',
        description: 'A wellness and meditation app offering personalized content, guided sessions, and progress tracking. Includes features for stress management and mindfulness practices.',
        images: ['/placeholder.svg?height=600&width=600']
    }
};

let currentProject = null;
let currentImageIndex = 0;

portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        const projectId = item.getAttribute('data-project');
        currentProject = projectId;
        currentImageIndex = 0;
        showLightbox(projectId);
    });
});

function showLightbox(projectId) {
    const project = projectData[projectId];
    lightboxImage.src = project.images[0];
    lightboxTitle.textContent = project.title;
    lightboxDescription.textContent = project.description;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

lightboxClose.addEventListener('click', closeLightbox);

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

lightboxPrev.addEventListener('click', () => {
    const project = projectData[currentProject];
    currentImageIndex = (currentImageIndex - 1 + project.images.length) % project.images.length;
    lightboxImage.src = project.images[currentImageIndex];
});

lightboxNext.addEventListener('click', () => {
    const project = projectData[currentProject];
    currentImageIndex = (currentImageIndex + 1) % project.images.length;
    lightboxImage.src = project.images[currentImageIndex];
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .testimonial-card, .portfolio-item').forEach(el => {
    observer.observe(el);
});

// Form Submission
const form = document.getElementById('form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            submitButton.textContent = 'Message Sent! ✓';
            form.reset();
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 3000);
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Error:', error);
        submitButton.textContent = 'Error - Try Again';
        submitButton.disabled = false;
        setTimeout(() => {
            submitButton.textContent = originalText;
        }, 3000);
    }
});

// Scroll Animation for Navbar
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 212, 255, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Parallax Effect on Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        orb.style.transform = `translateY(${scrolled * (0.5 + index * 0.1)}px)`;
    });
});