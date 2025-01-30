document.addEventListener('DOMContentLoaded', function() {
    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const menu = document.querySelector('.menu');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        menu.classList.toggle('active');
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.menu-list-items a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Skill Progress Bar Animation
    const skillsSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress');

    function showProgress() {
        progressBars.forEach(progressBar => {
            const value = progressBar.style.width;
            progressBar.style.width = '0';
            setTimeout(() => {
                progressBar.style.width = value;
            }, 300);
        });
    }

    // Animate skills when section is in view
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                showProgress();
            }
        });
    }, observerOptions);

    observer.observe(skillsSection);

    // Form Submission Handling
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add your form submission logic here
        const formData = new FormData(this);
        
        // Example: Send data to server or show success message
        console.log('Form submitted:', Object.fromEntries(formData));
        alert('Thank you for your message! I will respond shortly.');
        this.reset();
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
        }
    });

    // Initialization for scroll animations
    const scrollElements = document.querySelectorAll('.my-card, #myimage');
    
    const elementInView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight)
        );
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach(el => {
            if (elementInView(el)) {
                el.classList.add('scrolled');
            }
        });
    };

    // Initial check
    handleScrollAnimation();
    
    // Listen for scroll events
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
});
// Add this to your existing JavaScript code

// Hire Me Modal Functionality
const hireMeBtn = document.querySelector('.common-btn');
const hireMeModal = document.createElement('div');
hireMeModal.innerHTML = `
    <div class="modal-overlay">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Hire Naveed Khan</h2>
            <form id="hireForm">
                <div class="form-group">
                    <input type="text" placeholder="Your Name" required>
                </div>
                <div class="form-group">
                    <input type="email" placeholder="Your Email" required>
                </div>
                <div class="form-group">
                    <textarea placeholder="Project Details" rows="5" required></textarea>
                </div>
                <button type="submit" class="btn common-btn">Send Proposal</button>
            </form>
        </div>
    </div>
`;

document.body.appendChild(hireMeModal);

// Modal Elements
const modalOverlay = document.querySelector('.modal-overlay');
const closeModal = document.querySelector('.close-modal');

// Show Modal
hireMeBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// Close Modal
closeModal.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Handle Hire Form Submission
document.getElementById('hireForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    const formData = new FormData(this);
    console.log('Hire form submitted:', Object.fromEntries(formData));
    
    // Show success message
    alert('Thank you for your interest! I will contact you shortly.');
    
    // Close modal and reset form
    modalOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
    this.reset();
});


