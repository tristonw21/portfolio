// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
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

// Navbar background on scroll - respects theme
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    if (window.scrollY > 100) {
        if (isDarkMode) {
            navbar.style.background = 'rgba(10, 14, 26, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        }
    } else {
        if (isDarkMode) {
            navbar.style.background = 'rgba(10, 14, 26, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission (replace with actual form handling)
    alert('Thank you for your message! I\'ll get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .about-content, .contact-content');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing effect for hero title with HTML support
function typeWriter(element, htmlText, speed = 100) {
    element.innerHTML = '';
    
    // For the specific case of "Hi, I'm <span class="highlight">Triston</span>"
    // We'll type "Hi, I'm " first, then wrap "Triston" in the span
    const parts = [
        { text: "Hi, I'm ", isHighlighted: false },
        { text: "Triston", isHighlighted: true }
    ];
    
    let currentPartIndex = 0;
    let currentCharIndex = 0;
    let displayText = '';
    
    function type() {
        if (currentPartIndex < parts.length) {
            const currentPart = parts[currentPartIndex];
            
            if (currentCharIndex < currentPart.text.length) {
                // Add the next character
                if (currentPart.isHighlighted && currentCharIndex === 0) {
                    // Start the highlight span
                    displayText += '<span class="highlight">';
                }
                
                displayText += currentPart.text.charAt(currentCharIndex);
                currentCharIndex++;
                
                if (currentPart.isHighlighted && currentCharIndex === currentPart.text.length) {
                    // Close the highlight span
                    displayText += '</span>';
                }
                
                element.innerHTML = displayText;
                setTimeout(type, speed);
            } else {
                // Move to next part
                currentPartIndex++;
                currentCharIndex = 0;
                setTimeout(type, speed);
            }
        }
    }
    
    type();
}

//Typing effect for hero title
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        typeWriter(heroTitle, '', 80); // Speed reduced for better readability
    }
});

// Add active class to current navigation item based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
            console.log('Active class added to:', link.textContent, 'for section:', current);
        }
    });
});

// Parallax effect for hero section (optional)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add CSS for active navigation state
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #ff4500 !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Projects Carousel Functionality
document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    const slides = document.querySelectorAll('.carousel-slide');
    
    const totalSlides = 3; // Actual number of unique slides
    let currentSlide = 1; // Start at first real slide (after clone)
    let isTransitioning = false;
      // Initialize carousel position
    function initCarousel() {
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateIndicators();
    }
    
    // Function to update carousel position
    function updateCarousel(instant = false) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        if (instant) {
            carouselTrack.style.transition = 'none';
        } else {
            carouselTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
        
        const translateX = -currentSlide * 100;
        carouselTrack.style.transform = `translateX(${translateX}%)`;
        
        updateIndicators();
        
        setTimeout(() => {
            isTransitioning = false;
            handleInfiniteLoop();
        }, instant ? 0 : 600);
    }
    
    // Handle infinite loop logic
    function handleInfiniteLoop() {
        if (currentSlide === 0) {
            // Jump to last real slide
            currentSlide = totalSlides;
            carouselTrack.style.transition = 'none';
            carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            updateIndicators();
        } else if (currentSlide === totalSlides + 1) {
            // Jump to first real slide
            currentSlide = 1;
            carouselTrack.style.transition = 'none';
            carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            updateIndicators();
        }
    }
    
    // Update indicators
    function updateIndicators() {
        const realSlideIndex = currentSlide === 0 ? totalSlides - 1 : 
                              currentSlide === totalSlides + 1 ? 0 : currentSlide - 1;
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === realSlideIndex);
        });
    }
    
    // Next slide function
    function nextSlide() {
        if (isTransitioning) return;
        currentSlide++;
        updateCarousel();
    }
    
    // Previous slide function
    function prevSlide() {
        if (isTransitioning) return;
        currentSlide--;
        updateCarousel();
    }
    
    // Go to specific slide
    function goToSlide(index) {
        if (isTransitioning) return;
        currentSlide = index + 1; // Add 1 because of clone at beginning
        updateCarousel();
    }
    
    // Event listeners for navigation buttons
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Auto-play carousel
    let autoPlayInterval = setInterval(nextSlide, 4000);
    
    // Pause auto-play on hover
    const carousel = document.querySelector('.projects-carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    // Resume auto-play when mouse leaves
    carousel.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 4000);
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        clearInterval(autoPlayInterval);
    });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        e.preventDefault();
    });
    
    carousel.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        
        const diffX = startX - currentX;
        
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        // Resume auto-play
        autoPlayInterval = setInterval(nextSlide, 4000);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(nextSlide, 4000);
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(nextSlide, 4000);
        }
    });
    
    // Initialize carousel
    initCarousel();
});

// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved dark mode preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme) {
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
        }
    } else if (prefersDark) {
        body.classList.add('dark-mode');
    }
      // Helper function to update navbar background based on current theme and scroll position
    function updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        const isDarkMode = body.classList.contains('dark-mode');
        
        if (window.scrollY > 100) {
            if (isDarkMode) {
                navbar.style.background = 'rgba(10, 14, 26, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            }
        } else {
            if (isDarkMode) {
                navbar.style.background = 'rgba(10, 14, 26, 0.95)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        }
    }
    
    // Toggle dark mode function
    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
        
        // Update navbar background immediately after theme change
        updateNavbarBackground();
        
        // Save preference to localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
        
        // Add a subtle animation effect
        darkModeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            darkModeToggle.style.transform = 'scale(1)';
        }, 150);
    }
    
    // Event listener for dark mode toggle
    darkModeToggle.addEventListener('click', toggleDarkMode);
      // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                body.classList.add('dark-mode');
            } else {
                body.classList.remove('dark-mode');
            }
            // Update navbar background when system theme changes
            updateNavbarBackground();
        }
    });
});
