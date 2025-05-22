// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Book Appointment Button
document.querySelector('.book-appointment').addEventListener('click', () => {
    // You can replace this with your actual booking logic
    const phoneNumber = '+918971474507';
    window.location.href = `tel:${phoneNumber}`;
});

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .about-content');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if(elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Mobile menu toggle
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    const menuButton = document.createElement('button');
    menuButton.classList.add('mobile-menu-button');
    menuButton.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    navbar.insertBefore(menuButton, navLinks);
    
    menuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuButton.classList.toggle('active');
    });
};

// Initialize mobile menu on load
document.addEventListener('DOMContentLoaded', createMobileMenu);

// Form validation for contact form (if added later)
const validateForm = (formElement) => {
    const inputs = formElement.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
        
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                input.classList.add('error');
            }
        }
    });
    
    return isValid;
};

// Add loading state to buttons
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        if (this.classList.contains('book-appointment')) {
            this.classList.add('loading');
            // Remove loading state after action completes
            setTimeout(() => {
                this.classList.remove('loading');
            }, 1000);
        }
    });
});

// Modal functionality
const modal = document.getElementById('pdfModal');
const closeBtn = document.querySelector('.close-modal');
const downloadForm = document.getElementById('pdfDownloadForm');

function openPdfModal() {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closePdfModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closePdfModal();
    }
});

// Close modal when clicking close button
closeBtn.addEventListener('click', closePdfModal);

// Handle form submission
downloadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Here you can add your form submission logic
    // For example, send the data to your server and trigger the PDF download
    alert('Thank you! Your download will begin shortly.');
    closePdfModal();
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closePdfModal();
    }
});

// Certificates Slider
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.certificate-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    let currentSlide = 0;

    // Show initial slide
    showSlide(currentSlide);

    // Previous button click
    prevBtn.addEventListener('click', () => {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }
        showSlide(currentSlide);
    });

    // Next button click
    nextBtn.addEventListener('click', () => {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    });

    // Dot click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    function showSlide(n) {
        slides.forEach(slide => slide.style.display = 'none');
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[n].style.display = 'block';
        dots[n].classList.add('active');
    }

    // Auto slide every 5 seconds
    setInterval(() => {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }, 5000);
}); 