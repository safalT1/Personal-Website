document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('[data-navbar]');
  const navTogglers = document.querySelectorAll('[data-nav-toggler]');
  const overlay = document.querySelector('[data-overlay]');
  const navbarLinks = document.querySelectorAll('.navbar-link');
  const collapsibleTriggers = document.querySelectorAll('.collapsible-trigger');

  // Toggle mobile menu
  navTogglers.forEach(toggler => {
    toggler.addEventListener('click', () => {
      navbar.classList.toggle('active');
      overlay.classList.toggle('active');
      // Prevent scrolling when menu is open
      document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : 'auto';
    });
  });

  // Smooth scrolling for navbar links
  navbarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Calculate offset for fixed header (adjust based on your header height)
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu after clicking
        navbar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });

  // Toggle collapsible sections (Skills and Education)
  collapsibleTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const content = trigger.nextElementSibling;
      const toggleIcon = trigger.querySelector('.toggle-icon');
      
      // Toggle content visibility
      content.classList.toggle('active');
      
      // Update icon (+ to - or vice versa)
      toggleIcon.textContent = content.classList.contains('active') ? '−' : '+';
      
      // Smooth height transition (requires CSS support)
      content.style.maxHeight = content.classList.contains('active') 
        ? `${content.scrollHeight}px` 
        : '0';
    });
  });

  // Handle window resize to ensure navbar is reset on desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) { // Adjust breakpoint based on your CSS
      navbar.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
});