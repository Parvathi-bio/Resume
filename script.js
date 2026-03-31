// script.js
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Scroll Reveal Animations
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100; // Trigger point in px before element is fully in view

        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            
            // If top of element is less than window height - reveal point, add active class
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add("active");
            }
        });
    };

    // Initial check in case elements are already visible on load
    revealOnScroll();
    
    // Add event listener to scroll
    window.addEventListener("scroll", revealOnScroll);


    // 2. Progress Bar Animations
    const progressBars = document.querySelectorAll(".progress");
    const skillsSection = document.getElementById("skills");
    
    let animated = false;

    const fillProgressBars = () => {
        if(!skillsSection) return;
        
        const sectionPos = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // If we reach the skills section and it hasn't animated yet
        if (sectionPos < windowHeight - 100 && !animated) {
            progressBars.forEach(bar => {
                const targetWidth = bar.getAttribute("data-width");
                bar.style.width = targetWidth;
            });
            animated = true; // prevent re-animating
        }
    };

    // Check once on load in case section is visible
    fillProgressBars();

    // Listen to scroll for progress bars
    window.addEventListener("scroll", fillProgressBars);

    
    // 3. Optional Smooth scroll for nav links (Safari fallback if css scroll-behavior doesn't work well)
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: targetPosition - 70, // offset for fixed nav
                    behavior: 'smooth'
                });
            }
        });
    });

});
