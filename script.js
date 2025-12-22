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

// Parallax effect for hero image (subtle)
const heroImage = document.querySelector('.section__pic-container img');
if (heroImage) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.1;
    heroImage.style.transform = `scale(${1 + rate * 0.001})`;
  });
}

// Add magnetic effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  });
  
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});

// Tilt effect for cards (subtle)
const tiltCards = document.querySelectorAll('.project-card, .skill-card-static, .fact-card, .hackathon-card');
tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// Advanced Typing Animation with Multiple Styles
const typingElement = document.getElementById('typing-name');
if (typingElement) {
  const name = 'Dilusha Chandrasiri';
  
  // Different style configurations
  const styles = [
    { font: "'Inter', sans-serif", color: 'var(--text-primary)', weight: '700' },
    { font: "'Playfair Display', serif", color: '#6366f1', weight: '700' },
    { font: "'Pacifico', cursive", color: '#a855f7', weight: '400' },
    { font: "'Space Mono', monospace", color: '#06b6d4', weight: '700' },
    { font: "'Bebas Neue', sans-serif", color: '#f59e0b', weight: '400', letterSpacing: '3px' },
    { font: "'Inter', sans-serif", gradient: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)', weight: '700' }
  ];
  
  let currentStyleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;
  
  const typeSpeed = 80;
  const deleteSpeed = 40;
  const pauseBeforeDelete = 6000; // Increased to 6 seconds
  const pauseBeforeType = 500;
  
  function applyStyle(style) {
    typingElement.style.fontFamily = style.font;
    typingElement.style.fontWeight = style.weight;
    typingElement.style.letterSpacing = style.letterSpacing || 'normal';
    
    if (style.gradient) {
      typingElement.style.background = style.gradient;
      typingElement.style.webkitBackgroundClip = 'text';
      typingElement.style.webkitTextFillColor = 'transparent';
      typingElement.style.backgroundClip = 'text';
    } else {
      typingElement.style.background = 'none';
      typingElement.style.webkitTextFillColor = style.color;
      typingElement.style.color = style.color;
    }
  }
  
  function typeAnimation() {
    const currentText = name.substring(0, charIndex);
    typingElement.textContent = currentText;
    
    if (!isDeleting && charIndex < name.length) {
      // Typing
      charIndex++;
      setTimeout(typeAnimation, typeSpeed);
    } else if (!isDeleting && charIndex === name.length) {
      // Finished typing, pause then start deleting
      isPaused = true;
      setTimeout(() => {
        isDeleting = true;
        isPaused = false;
        typeAnimation();
      }, pauseBeforeDelete);
    } else if (isDeleting && charIndex > 0) {
      // Deleting
      charIndex--;
      setTimeout(typeAnimation, deleteSpeed);
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting, change style and start typing again
      isDeleting = false;
      currentStyleIndex = (currentStyleIndex + 1) % styles.length;
      applyStyle(styles[currentStyleIndex]);
      setTimeout(typeAnimation, pauseBeforeType);
    }
  }
  
  // Initialize with first style and start animation
  applyStyle(styles[0]);
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
