/* ==========================================================================
   GSR PORTFOLIO - DYNAMIC LOGIC & INTERACTIONS
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Mobile Menu Toggling (with backdrop overlay support)
    const menuIcon = document.getElementById("menu-icon");
    const navbar = document.getElementById("navbar");
    const navOverlay = document.getElementById("nav-overlay");
    
    function toggleMenu() {
        if (navbar) navbar.classList.toggle("active");
        if (navOverlay) navOverlay.classList.toggle("active");
        
        if (menuIcon) {
            const icon = menuIcon.querySelector("i");
            if (icon) {
                if (navbar && navbar.classList.contains("active")) {
                    icon.className = "bx bx-x";
                } else {
                    icon.className = "bx bx-menu";
                }
            }
        }
    }
    
    function closeMenu() {
        if (navbar) navbar.classList.remove("active");
        if (navOverlay) navOverlay.classList.remove("active");
        
        if (menuIcon) {
            const icon = menuIcon.querySelector("i");
            if (icon) icon.className = "bx bx-menu";
        }
    }

    if (menuIcon && navbar) {
        menuIcon.addEventListener("click", toggleMenu);
    }
    
    if (navOverlay) {
        navOverlay.addEventListener("click", closeMenu);
    }
    
    // Close mobile navbar when clicking any link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // 2. Typed.js Configuration
    if (document.querySelector(".text")) {
        new Typed(".text", {
            strings: ["Full Stack Developer", "MERN Stack Developer", "Startup Builder", "Problem Solver"],
            typeSpeed: 80,
            backSpeed: 40,
            backDelay: 1500,
            loop: true
        });
    }

    // 3. Performance-Optimized Scroll Reveal (Intersection Observer)
    const revealElements = document.querySelectorAll(".reveal");
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target); // Unobserve to play animation only once
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // 4. Back-to-Top & Sticky Navbar Scroll Logic
    const scrollTopBtn = document.getElementById("scroll-top");
    const header = document.querySelector(".header");
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;

        // Toggle back-to-top button visibility
        if (scrollTopBtn) {
            if (scrollY > 500) {
                scrollTopBtn.classList.add("active");
            } else {
                scrollTopBtn.classList.remove("active");
            }
        }

        // Header glassmorphism shadow on scroll
        if (header) {
            if (scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }

        // Active Section navbar highlighting
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Adjust check range to align active highlight during scrolling
            if (scrollY >= (sectionTop - 250)) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            const href = link.getAttribute("href");
            if (href === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    // 5. Contact Form Validation & Submission Mocking
    const contactForm = document.getElementById("contact-form");
    const formAlert = document.getElementById("form-alert");

    if (contactForm && formAlert) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            // Perform simple checks
            if (!name || !email || !subject || !message) {
                formAlert.textContent = "All fields are required. Please fill them out.";
                formAlert.className = "form-alert error";
                formAlert.style.display = "block";
                return;
            }

            // Simulate form submission success
            formAlert.textContent = "Thank you! Your message has been sent successfully.";
            formAlert.className = "form-alert success";
            formAlert.style.display = "block";
            
            // Reset input values
            contactForm.reset();

            // Hide status notification card after 5 seconds
            setTimeout(() => {
                formAlert.style.display = "none";
                formAlert.className = "form-alert";
            }, 5000);
        });
    }
});