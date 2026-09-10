// ============================================
// NAVIGATION DATA
// ============================================

const navSections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

// ============================================
// PRELOADER
// ============================================

window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }, 1200);
});

// ============================================
// SCROLL PROGRESS BAR (requestAnimationFrame)
// ============================================

const scrollProgress = document.getElementById('scroll-progress');
let ticking = false;

function updateScrollProgress() {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  scrollProgress.style.width = progress + '%';
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateScrollProgress);
    ticking = true;
  }
});

// ============================================
// BACK TO TOP BUTTON
// ============================================

const backToTop = document.getElementById('back-to-top');

function handleBackToTop() {
  if (window.scrollY > 500) {
    backToTop.style.opacity = '1';
    backToTop.style.pointerEvents = 'auto';
    backToTop.style.transform = 'translateY(0)';
  } else {
    backToTop.style.opacity = '0';
    backToTop.style.pointerEvents = 'none';
    backToTop.style.transform = 'translateY(20px)';
  }
}

window.addEventListener('scroll', handleBackToTop);

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// COUNTER ANIMATION
// ============================================

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('[data-count]');
      counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        function updateCounter() {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target + '+';
          }
        }

        updateCounter();
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => {
  counterObserver.observe(el.parentElement.parentElement);
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > 50) {
    navbar.classList.add('nav-blur', 'shadow-lg');
    navbar.style.boxShadow = '0 4px 30px rgba(92, 61, 46, 0.08)';
  } else {
    navbar.classList.remove('nav-blur', 'shadow-lg');
    navbar.style.boxShadow = 'none';
  }

  // Hide/show navbar on scroll direction
  if (currentScroll > lastScroll && currentScroll > 200) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  lastScroll = currentScroll;
});

// ============================================
// ACTIVE SECTION HIGHLIGHTING
// ============================================

const sections = document.querySelectorAll('section[id]');
const navLinksContainerDesktop = document.getElementById('nav-links-desktop');
const navLinksContainerMobile = document.getElementById('nav-links-mobile');

// Render nav links dynamically
navSections.forEach(section => {
  const linkHTML = `<a href="#${section.id}" class="px-4 py-2 rounded-lg text-sm font-medium text-brown-muted hover:text-brown hover:bg-brown/5 transition-all duration-200">${section.label}</a>`;
  navLinksContainerDesktop.insertAdjacentHTML('beforeend', linkHTML);
  navLinksContainerMobile.insertAdjacentHTML('beforeend', `<a href="#${section.id}" class="block px-4 py-3 rounded-lg text-brown-muted hover:text-brown hover:bg-brown/5 transition-all duration-200 font-medium">${section.label}</a>`);
});

function highlightNav() {
  const scrollPos = window.scrollY + 150;
  const allNavLinks = document.querySelectorAll('#nav-links-desktop a, #nav-links-mobile a');

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      allNavLinks.forEach(link => {
        link.classList.remove('text-pink', 'font-semibold');
        link.classList.add('text-brown-muted');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('text-pink', 'font-semibold');
          link.classList.remove('text-brown-muted');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNav);

// ============================================
// MOBILE MENU TOGGLE
// ============================================

const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

mobileToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  menuIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  });
});

// Close mobile menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  }
});

// ============================================
// SKILLS DATA & RENDER
// ============================================

const skillCategories = [
  {
    title: 'Frontend',
    color: '#C4956A',
    skills: [
      { name: 'React', level: 90 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'JavaScript', level: 85 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'Three.js', level: 70 },
    ],
  },
  {
    title: 'Design',
    color: '#E8A0BF',
    skills: [
      { name: 'UI/UX Design', level: 88 },
      { name: 'Figma', level: 85 },
      { name: 'Prototyping', level: 82 },
      { name: 'Wireframing', level: 90 },
    ],
  },
  {
    title: 'Backend',
    color: '#D4A574',
    skills: [
      { name: 'Python', level: 80 },
      { name: 'C++', level: 75 },
      { name: 'PHP', level: 70 },
      { name: 'SQL', level: 72 },
    ],
  },
  {
    title: 'Tools',
    color: '#C9A87C',
    skills: [
      { name: 'Git & GitHub', level: 85 },
      { name: 'AI/ML Basics', level: 70 },
      { name: 'Game Dev', level: 72 },
      { name: 'Responsive Design', level: 90 },
    ],
  },
];

const skillsGrid = document.getElementById('skills-grid');

skillCategories.forEach((cat, ci) => {
  const card = document.createElement('div');
  card.className = 'skill-card glass rounded-2xl p-6';
  card.style.transitionDelay = `${ci * 100}ms`;

  card.innerHTML = `
    <div class="flex items-center gap-3 mb-6">
      <div class="w-3 h-3 rounded-full" style="background-color: ${cat.color}"></div>
      <h3 class="font-bold text-brown text-lg">${cat.title}</h3>
    </div>
    ${cat.skills.map((skill, si) => `
      <div class="mb-4">
        <div class="flex justify-between items-center mb-1.5">
          <span class="text-sm text-brown-light font-medium">${skill.name}</span>
          <span class="text-xs text-brown-muted font-mono">${skill.level}%</span>
        </div>
        <div class="h-2 bg-brown/5 rounded-full overflow-hidden">
          <div class="skill-bar-fill h-full rounded-full" style="background: linear-gradient(90deg, ${cat.color}, ${cat.color}88);" data-width="${skill.level}"></div>
        </div>
      </div>
    `).join('')}
  `;

  skillsGrid.appendChild(card);
});

// Animate skill bars on scroll
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
        setTimeout(() => {
          bar.style.width = bar.dataset.width + '%';
        }, i * 100);
      });
    }
  });
}, { threshold: 0.2 });

skillsObserver.observe(skillsGrid);

// ============================================
// PROJECTS DATA & RENDER (CASE STUDY STYLE)
// ============================================

const projects = [
  {
    title: 'CityMind',
    subtitle: 'AI-Powered Urban Intelligence System',
    description: 'An intelligent city simulation that uses 5 distinct AI techniques to manage emergency response, road infrastructure, ambulance deployment, and crime risk prediction across a 10x10 city grid.',
    image: 'assets/projects/citymind.png',
    tags: ['Python', 'AI/ML', 'Pygame', 'Scikit-learn', 'NetworkX'],
    color: '#C4956A',
    github: 'https://github.com/Sabia-Munir/CityMind',
    features: [
      'CSP + Backtracking for city layout',
      'Kruskal\'s MST for road networks',
      'Genetic Algorithm for ambulance placement',
      'A* Search for emergency routing',
      'K-Means + Random Forest crime prediction',
      '3D isometric Pygame visualization',
    ],
  },
  {
    title: 'Cafe Prosa',
    subtitle: 'Immersive 3D Restaurant Experience',
    description: 'A stunning restaurant website with interactive 3D scenes, smooth animations, and a modern UI featuring animated food scenes, steam particles, and responsive design.',
    image: 'assets/projects/cafeprosa.png',
    tags: ['React', 'Three.js', 'Tailwind CSS', 'Framer Motion'],
    color: '#E8A0BF',
    github: 'https://github.com/Sabia-Munir/Cafe-Prosa',
    features: [
      'Interactive 3D food scenes with Three.js',
      'Smooth page transitions and animations',
      'Responsive design across all devices',
      'Component-based React architecture',
      'Custom particle effects and steam',
      'Pizza, Pasta, Coffee interactive scenes',
    ],
  },
  {
    title: 'IVOR',
    subtitle: 'Hospital Management System',
    description: 'A comprehensive hospital database management system built with SQL Server and PHP, featuring a custom dark-themed dashboard UI with real-time data visualizations.',
    image: 'assets/projects/ivor.png',
    tags: ['PHP', 'SQL Server', 'HTML/CSS', 'Database Design'],
    color: '#D4A574',
    github: 'https://github.com/Sabia-Munir/IVOR-Hospital-Management-System',
    features: [
      'Live Dashboard with real-time stats',
      'Full CRUD for all hospital entities',
      '12 Complex SQL Queries',
      'Normalized Relational Schema',
      'Role-based data views',
      'Custom dark UI with illustrations',
    ],
  },
  {
    title: 'Laptop Point',
    subtitle: 'Full-Stack E-Commerce Platform',
    description: 'A full-stack e-commerce platform built solo, from database to storefront. Features role-based auth, product management, and an atomic checkout function preventing overselling on simultaneous orders.',
    image: 'assets/projects/laptoppoint.png',
    tags: ['HTML/CSS', 'JavaScript', 'Supabase', 'Postgres', 'Tailwind CSS'],
    color: '#7C3AED',
    github: 'https://github.com/Sabia-Munir/Laptop-Point',
    features: [
      'Role-based Auth (customer/admin)',
      'Supabase Postgres with RLS policies',
      'Atomic checkout preventing overselling',
      'Product image storage & management',
      'Price range filtering',
      'Deploy-ready static site',
    ],
  },
];

const projectsGrid = document.getElementById('projects-grid');

projects.forEach((project, i) => {
  const card = document.createElement('div');
  card.className = 'project-card glass rounded-2xl overflow-hidden border border-brown/10 hover:border-pink/30 group';

  card.innerHTML = `
    <div class="card-shine"></div>
    <!-- Header with screenshot -->
    <div class="relative h-48 overflow-hidden bg-gradient-to-br from-skin-dark via-brown/10 to-skin">
      <img src="${project.image}" alt="${project.title} screenshot" class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" loading="lazy">
      <div class="absolute inset-0 bg-gradient-to-t from-skin-light/90 via-skin-light/20 to-transparent"></div>
      <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="absolute top-3 right-3 w-9 h-9 rounded-lg glass flex items-center justify-center text-brown-muted hover:text-brown hover:scale-110 transition-all z-20" aria-label="View on GitHub">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
      </a>
    </div>

    <!-- Content -->
    <div class="p-5">
      <div class="flex items-center gap-2 mb-2">
        <span class="w-1.5 h-1.5 rounded-full" style="background-color: ${project.color};"></span>
        <span class="text-[10px] font-bold tracking-[0.2em] uppercase" style="color: ${project.color};">Project</span>
      </div>
      <h3 class="text-xl font-black text-brown mb-1">${project.title}</h3>
      <p class="text-xs font-semibold mb-3" style="color: ${project.color};">${project.subtitle}</p>
      <p class="text-brown-muted text-[13px] leading-relaxed mb-4 line-clamp-3">${project.description}</p>

      <div class="flex flex-wrap gap-1.5 mb-4">
        ${project.tags.map(tag => `<span class="tag-badge px-2.5 py-1 rounded-full text-[10px] font-mono border border-brown/10 text-brown-muted bg-brown/5">${tag}</span>`).join('')}
      </div>

      <!-- Highlights -->
      <div class="flex flex-wrap gap-1.5 mb-4">
        ${project.features.slice(0, 3).map(f => `<span class="text-[10px] text-brown-muted bg-brown/5 rounded-md px-2 py-1 flex items-center gap-1"><svg class="w-2.5 h-2.5 flex-shrink-0" style="color: ${project.color};" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>${f}</span>`).join('')}
      </div>

      <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-xs font-bold transition-all duration-300 hover:gap-2.5 group/link" style="color: ${project.color};">
        View Source
        <svg class="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
      </a>
    </div>
  `;

  projectsGrid.appendChild(card);
});

// ============================================
// TIMELINE DATA & RENDER
// ============================================

const experiences = [
  {
    title: 'BS Computer Science',
    org: 'FAST NUCES',
    period: 'Class of 2028',
    description: 'Pursuing BS in Computer Science with focus on software development, algorithms, and AI. Building a strong foundation in both theoretical and practical aspects of computing.',
    tags: ['Algorithms', 'Data Structures', 'OOP', 'AI/ML'],
    type: 'education',
  },
  {
    title: 'UI/UX Design',
    org: 'Self-Taught & Projects',
    period: 'Ongoing',
    description: 'Designing intuitive user interfaces and experiences for web and mobile applications. Strongest suit where thoughtful design meets clean, functional code.',
    tags: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    type: 'skill',
  },
  {
    title: 'Freelance Developer',
    org: 'Open for Opportunities',
    period: 'Available Now',
    description: 'Ready to bring your ideas to life with modern web technologies. Specializing in React, Tailwind CSS, and creative web experiences.',
    tags: ['React', 'Tailwind', '3D Web', 'Responsive'],
    type: 'work',
  },
];

const timeline = document.getElementById('timeline');

experiences.forEach((exp, i) => {
  const item = document.createElement('div');
  item.className = `timeline-item relative mb-12 ml-12 md:ml-0 ${i % 2 === 0 ? 'md:flex md:justify-start' : 'md:flex md:justify-end'}`;
  item.style.transitionDelay = `${i * 200}ms`;

  const typeColors = {
    education: 'bg-blue-500',
    skill: 'bg-pink',
    work: 'bg-green-500',
  };

  item.innerHTML = `
    <div class="timeline-dot ${typeColors[exp.type]}"></div>
    <div class="md:w-1/2 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}">
      <div class="timeline-content glass rounded-2xl p-6 border border-brown/10 hover:border-pink/30">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-2 h-2 rounded-full ${typeColors[exp.type]}"></span>
          <span class="text-xs font-semibold tracking-wider uppercase text-brown-muted">${exp.type}</span>
        </div>
        <h3 class="font-bold text-brown text-lg mb-1">${exp.title}</h3>
        <p class="text-xs text-brown-muted mb-3">${exp.org} • ${exp.period}</p>
        <p class="text-sm text-brown-muted leading-relaxed mb-4">${exp.description}</p>
        <div class="flex flex-wrap gap-2">
          ${exp.tags.map(tag => `<span class="px-2 py-1 rounded-md text-xs bg-pink/10 text-pink border border-pink/20">${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  `;

  timeline.appendChild(item);
});

// ============================================
// CONTACT FORM VALIDATION
// ============================================

const contactForm = document.getElementById('contact-form');
const formInputs = contactForm.querySelectorAll('input, textarea');

// Real-time validation on blur
formInputs.forEach(input => {
  input.addEventListener('blur', function() {
    if (this.value.trim() === '' && this.hasAttribute('required')) {
      this.classList.add('border-red-400');
      this.classList.remove('border-brown/10');
    } else {
      this.classList.remove('border-red-400');
      this.classList.add('border-brown/10');
    }
  });

  input.addEventListener('input', function() {
    if (this.classList.contains('border-red-400') && this.value.trim() !== '') {
      this.classList.remove('border-red-400');
      this.classList.add('border-brown/10');
    }
  });
});

// Form submission
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;

  // Validate all fields
  let isValid = true;
  this.querySelectorAll('input, textarea').forEach(input => {
    if (input.hasAttribute('required') && input.value.trim() === '') {
      isValid = false;
      input.classList.add('border-red-400');
    }
  });

  if (!isValid) {
    btn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg> Please fill all fields';
    btn.style.background = '#ef4444';
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
    }, 2000);
    return;
  }

  btn.innerHTML = '<svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> Message Sent!';
    btn.style.background = '#22c55e';
    this.reset();
    formInputs.forEach(input => {
      input.classList.remove('border-red-400');
    });
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.disabled = false;
    }, 2500);
  }, 1500);
});

// ============================================
// DARK MODE TOGGLE
// ============================================

const darkModeToggle = document.getElementById('dark-mode-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

if (darkModeToggle) {
  const isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) {
    document.documentElement.classList.add('dark');
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
  }

  darkModeToggle.addEventListener('click', () => {
    const currentlyDark = document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', !currentlyDark);
    sunIcon.classList.toggle('hidden');
    moonIcon.classList.toggle('hidden');
  });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ============================================
// GSAP ANIMATIONS
// ============================================

gsap.registerPlugin(ScrollTrigger);

// Hero entrance timeline
const heroTimeline = gsap.timeline({
  defaults: { duration: 0.8, ease: 'power3.out' }
});

heroTimeline
  .from('.gsap-hero', {
    y: 40,
    opacity: 0,
    stagger: 0.15,
  })
  .from('.gsap-hero-visual', {
    scale: 0.8,
    opacity: 0,
    duration: 1,
  }, '-=0.4');

// Section scroll animations
document.querySelectorAll('.gsap-section').forEach(el => {
  gsap.from(el, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });
});

// Project card stagger animation
ScrollTrigger.batch('.project-card', {
  onEnter: batch => gsap.from(batch, {
    y: 60,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'power3.out',
  }),
  start: 'top 85%',
});

// Skill bar fill animation on scroll
ScrollTrigger.create({
  trigger: '#skills-grid',
  start: 'top 80%',
  onEnter: () => {
    document.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
      setTimeout(() => {
        bar.style.width = bar.dataset.width + '%';
      }, i * 80);
    });
  },
  once: true,
});

// Timeline items stagger
ScrollTrigger.batch('.timeline-item', {
  onEnter: batch => gsap.from(batch, {
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
  }),
  start: 'top 85%',
});

// ============================================
// 3D TILT EFFECT ON PROJECT CARDS
// ============================================
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = 'transform 0.1s ease';

    // Shine effect
    const shine = card.querySelector('.card-shine');
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(232,135,156,0.15) 0%, transparent 60%)`;
    }
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    card.style.transition = 'transform 0.5s ease';
    const shine = card.querySelector('.card-shine');
    if (shine) {
      shine.style.background = 'transparent';
    }
  });
});

// ============================================
// MAGNETIC BUTTON EFFECT
// ============================================
document.querySelectorAll('.magnetic-btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    btn.style.transition = 'transform 0.2s ease';
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
    btn.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  });
});

// ============================================
// CUSTOM CURSOR FOLLOWER
// ============================================
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
document.body.appendChild(cursor);

const cursorDot = cursor.querySelector('.cursor-dot');
const cursorRing = cursor.querySelector('.cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover states
document.querySelectorAll('a, button, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
});

// Hide cursor on mobile
if ('ontouchstart' in window) {
  cursor.style.display = 'none';
}

// ============================================
// TEXT REVEAL ANIMATION
// ============================================
function splitTextIntoSpans(element) {
  const text = element.textContent;
  element.innerHTML = '';
  text.split('').forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.transform = 'translateY(40px) rotateX(-90deg)';
    span.style.transition = `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.03}s`;
    element.appendChild(span);
  });
}

// Apply to hero heading
const heroHeading = document.querySelector('.text-reveal');
if (heroHeading) {
  splitTextIntoSpans(heroHeading);
  setTimeout(() => {
    heroHeading.querySelectorAll('span').forEach(span => {
      span.style.opacity = '1';
      span.style.transform = 'translateY(0) rotateX(0)';
    });
  }, 500);
}

// ============================================
// PARALLAX SCROLL EFFECTS
// ============================================
document.querySelectorAll('.parallax-element').forEach(el => {
  const speed = parseFloat(el.dataset.speed) || 0.5;
  gsap.to(el, {
    y: () => -100 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
});

// Floating tags parallax
document.querySelectorAll('.hero-tag').forEach((tag, i) => {
  gsap.to(tag, {
    y: () => -30 * (i + 1),
    ease: 'none',
    scrollTrigger: {
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
});

// ============================================
// SECTION HEADINGS ANIMATE ON SCROLL
// ============================================
document.querySelectorAll('.section-heading').forEach(heading => {
  gsap.from(heading, {
    scrollTrigger: {
      trigger: heading,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
  });
});

// ============================================
// SMOOTH REVEAL FOR ALL SECTIONS
// ============================================
document.querySelectorAll('section').forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
    opacity: 0.3,
    duration: 1,
    ease: 'power2.out',
  });
});
