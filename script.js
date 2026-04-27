// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Gallery Slider
const galleryTrack = document.querySelector('.gallery-track');
const gallerySlides = document.querySelectorAll('.gallery-slide');
const galleryPrev = document.querySelector('.gallery-prev');
const galleryNext = document.querySelector('.gallery-next');
const galleryDotsContainer = document.querySelector('.gallery-dots');

let currentSlide = 0;
const totalSlides = gallerySlides.length;

function createDots() {
    galleryDotsContainer.innerHTML = '';
    gallerySlides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('gallery-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        galleryDotsContainer.appendChild(dot);
    });
}

function updateSlider() {
    if (galleryTrack) {
        galleryTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    document.querySelectorAll('.gallery-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(slide) {
    currentSlide = slide;
    updateSlider();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

if (galleryNext && galleryPrev) {
    galleryNext.addEventListener('click', nextSlide);
    galleryPrev.addEventListener('click', prevSlide);
    createDots();
    setInterval(nextSlide, 5000);
}

// Testimonials Slider
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialPrev = document.querySelector('.testimonial-prev');
const testimonialNext = document.querySelector('.testimonial-next');

let currentTestimonial = 0;

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });
    currentTestimonial = index;
}

if (testimonialNext && testimonialPrev) {
    testimonialNext.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    });

    testimonialPrev.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    });

    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 7000);
}

// Contact Form
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const message = encodeURIComponent(formData.get('message') || 'Electrical services quote');
    
    const whatsappUrl = `https://wa.me/254700123456?text=Hi%20Steva%20Electrical,%20${name}%20(${phone})%20needs:%20${message}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Show success
    alert('📱 Quote request sent to WhatsApp! We\'ll reply within 30 minutes.');
    this.reset();
});

// M-Pesa Demo (Replace with real API)
function initiateMPesaPayment() {
    const phone = prompt('Enter M-Pesa number (2547XXXXXXXX):');
    if (phone && /^2547\d{8}$/.test(phone)) {
        alert(`✅ M-Pesa request sent to ${phone}\nPaybill: 123456 | Account: STEVA ELECTRICAL\nKSh 1,000 deposit\n\nComplete on your phone!`);
        // Here you would call your STK Push API
    } else {
        alert('❌ Please enter valid Kenyan number (2547XXXXXXXX)');
    }
}

// WhatsApp Floating Button
function createWhatsAppFloat() {
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/254700123456?text=Hi%20Steva%20Electrical,%20I%20need%20electrical%20services%20in%20Kenya!';
    whatsappBtn.target = '_blank';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    document.body.appendChild(whatsappBtn);
}

// Intersection Observer for animations
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

// Observe elements
document.querySelectorAll('.service-card, .stat, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createWhatsAppFloat();
    showTestimonial(0);
});