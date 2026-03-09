// Mobile Menu Toggle
function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  menu.classList.toggle('open');
  icon.classList.toggle('open');
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const menu = document.querySelector('.menu-links');
  const hamburger = document.querySelector('.hamburger-menu');
  
  if (menu && hamburger && !hamburger.contains(e.target) && menu.classList.contains('open')) {
    menu.classList.remove('open');
    document.querySelector('.hamburger-icon').classList.remove('open');
  }
});

// Navbar scroll effect
const nav = document.getElementById('desktop-nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (nav) {
    if (currentScroll > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  
  // Background color change when scrolling to about section
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    const aboutRect = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Change to black when about section is mostly visible (allow 30% of other sections)
    // Change back to white when more than 30% of other section is visible
    if (aboutRect.top <= windowHeight * 0.3 && aboutRect.bottom >= windowHeight * 0.7) {
      document.body.classList.add('dark-bg');
    } else {
      document.body.classList.remove('dark-bg');
    }
  }
  
  lastScroll = currentScroll;
});

// Smooth scroll for anchor links
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

// Intersection Observer for fade-in animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Animate children with stagger effect
      const children = entry.target.querySelectorAll('.details-container, .project-card, .skill-card-static, .fact-card, .story-card, .hackathon-card, .activity-card, .contact-info-container');
      children.forEach((child, index) => {
        child.style.transitionDelay = `${index * 0.1}s`;
        child.style.opacity = '1';
        child.style.transform = 'translateY(0)';
      });
    }
  });
}, observerOptions);

// Observe sections for animations
document.addEventListener('DOMContentLoaded', () => {
  // Add fade-in-up class to sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('fade-in-up');
    observer.observe(section);
  });

  // Initialize card animations
  const cards = document.querySelectorAll('.details-container, .project-card, .skill-card-static, .fact-card, .story-card, .hackathon-card, .activity-card, .contact-info-container');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  // Trigger animations for visible sections
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      section.classList.add('visible');
      
      const children = section.querySelectorAll('.details-container, .project-card, .skill-card-static, .fact-card, .story-card, .hackathon-card, .activity-card, .contact-info-container');
      children.forEach((child, index) => {
        setTimeout(() => {
          child.style.opacity = '1';
          child.style.transform = 'translateY(0)';
        }, index * 100);
      });
    }
  });
});

// Typing Animation - types name once
const typingElement = document.getElementById('typing-name');
if (typingElement) {
  const name = 'Dilusha Chandrasiri';
  let charIndex = 0;
  const typeSpeed = 80;

  function typeAnimation() {
    if (charIndex < name.length) {
      typingElement.textContent = name.substring(0, charIndex + 1);
      charIndex++;
      setTimeout(typeAnimation, typeSpeed);
    }
  }

  setTimeout(typeAnimation, 800);
}

// Role Typing Animation - Cycles through different titles
const roleElement = document.getElementById('typing-role');
if (roleElement) {
  const roles = [
    'Software Developer',
    'Software Engineering Undergraduate',
    'Computer Science & Engineering Student',
    'Full-Stack Developer',
    'Web Developer'
  ];
  
  let currentRoleIndex = 0;
  let roleCharIndex = 0;
  let isRoleDeleting = false;
  
  const roleTypeSpeed = 60;
  const roleDeleteSpeed = 30;
  const rolePauseBeforeDelete = 6000; // 6 seconds to read
  const rolePauseBeforeType = 400;
  
  function roleTypeAnimation() {
    const currentRole = roles[currentRoleIndex];
    const displayText = currentRole.substring(0, roleCharIndex);
    roleElement.textContent = displayText;
    
    if (!isRoleDeleting && roleCharIndex < currentRole.length) {
      // Typing
      roleCharIndex++;
      setTimeout(roleTypeAnimation, roleTypeSpeed);
    } else if (!isRoleDeleting && roleCharIndex === currentRole.length) {
      // Finished typing, pause then start deleting
      setTimeout(() => {
        isRoleDeleting = true;
        roleTypeAnimation();
      }, rolePauseBeforeDelete);
    } else if (isRoleDeleting && roleCharIndex > 0) {
      // Deleting
      roleCharIndex--;
      setTimeout(roleTypeAnimation, roleDeleteSpeed);
    } else if (isRoleDeleting && roleCharIndex === 0) {
      // Finished deleting, change to next role
      isRoleDeleting = false;
      currentRoleIndex = (currentRoleIndex + 1) % roles.length;
      setTimeout(roleTypeAnimation, rolePauseBeforeType);
    }
  }
  
  // Start role animation after a short delay
  setTimeout(roleTypeAnimation, 1200);
}

// Cursor glow effect (subtle, follows mouse)
const createCursorGlow = () => {
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: -1;
    transition: transform 0.2s ease-out;
    transform: translate(-50%, -50%);
  `;
  document.body.appendChild(glow);
  
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
};

// Only add cursor glow on desktop
if (window.innerWidth > 768) {
  createCursorGlow();
}

// Active nav link highlight
const highlightNavLink = () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', highlightNavLink);

// Performance optimization: Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
  const skillsTrack = document.querySelector('.skills-track');
  if (skillsTrack) {
    if (document.hidden) {
      skillsTrack.style.animationPlayState = 'paused';
    } else {
      skillsTrack.style.animationPlayState = 'running';
    }
  }
});

console.log('Portfolio loaded successfully ✨');
