// ============================================
// SCROLL PROGRESS BAR
// ============================================
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  scrollProgress.style.width = progress + '%';
});

// ============================================
// PRELOADER
// ============================================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => preloader.style.display = 'none', 500);
  }, 1200);
});

// ============================================
// BACK TO TOP
// ============================================
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.style.opacity = '1';
    backToTop.style.pointerEvents = 'auto';
  } else {
    backToTop.style.opacity = '0';
    backToTop.style.pointerEvents = 'none';
  }
});
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
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target + '+';
          }
        };
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
// PARTICLE BACKGROUND
// ============================================
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '92, 61, 46' : '232, 135, 156';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
  }
}

const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
for (let i = 0; i < particleCount; i++) particles.push(new Particle());

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(92, 61, 46, ${0.1 * (1 - dist / 150)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ============================================
// TYPED TEXT EFFECT
// ============================================
const typedEl = document.getElementById('typed-text');
const roles = ['UI/UX Designer', 'Frontend Developer', 'React Developer', 'Game Developer', 'Creative Coder'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50;
  } else {
    typedEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 100;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    typeSpeed = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500;
  }

  setTimeout(typeEffect, typeSpeed);
}
typeEffect();

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('nav-blur', 'shadow-lg');
    navbar.style.boxShadow = '0 4px 30px rgba(108, 99, 255, 0.05)';
  } else {
    navbar.classList.remove('nav-blur', 'shadow-lg');
    navbar.style.boxShadow = 'none';
  }
});

// ============================================
// MOBILE MENU
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

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  });
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
    title: 'Programming',
    color: '#D4A574',
    skills: [
      { name: 'Python', level: 80 },
      { name: 'C++', level: 75 },
      { name: 'Assembly', level: 65 },
      { name: 'PHP', level: 70 },
    ],
  },
  {
    title: 'Tools & More',
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
  card.className = 'glass rounded-2xl p-6 group hover:border-white/10 transition-all duration-300 animate-on-scroll opacity-0 translate-y-8';
  card.style.transitionDelay = `${ci * 100}ms`;
  card.innerHTML = `
    <div class="flex items-center gap-3 mb-6">
      <div class="w-3 h-3 rounded-full" style="background-color: ${cat.color}"></div>
      <h3 class="font-bold text-white text-lg">${cat.title}</h3>
    </div>
    ${cat.skills.map((skill, si) => `
      <div class="mb-4">
        <div class="flex justify-between items-center mb-1.5">
          <span class="text-sm text-gray-300 font-medium">${skill.name}</span>
          <span class="text-xs text-gray-500 font-mono">${skill.level}%</span>
        </div>
        <div class="h-2 bg-white/5 rounded-full overflow-hidden">
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

document.querySelectorAll('#skills-grid').forEach(el => skillsObserver.observe(el));

// ============================================
// PROJECTS DATA & RENDER
// ============================================
const projects = [
  {
    title: 'CityMind',
    subtitle: 'AI-Powered Urban Intelligence System',
    description: 'An intelligent city simulation that uses 5 distinct AI techniques to manage emergency response, road infrastructure, ambulance deployment, and crime risk prediction across a 10x10 city grid. Built as a team project with 46 commits.',
    tags: ['Python', 'AI/ML', 'Pygame', 'Scikit-learn', 'NetworkX'],
    color: '#C4956A',
    github: 'https://github.com/Sabia-Munir/CityMind',
    image: 'assets/projects/citymind.svg',
    features: [
      'CSP + Backtracking for city layout planning',
      'Kruskal\'s MST for optimal road networks',
      'Genetic Algorithm for ambulance placement',
      'A* Search for real-time emergency routing',
      'K-Means + Random Forest for crime prediction',
      'Interactive 3D isometric Pygame visualization',
    ],
  },
  {
    title: 'Cafe Prosa',
    subtitle: 'Immersive 3D Restaurant Experience',
    description: 'A stunning restaurant website with interactive 3D scenes, smooth animations, and a modern UI. Features animated food scenes, steam particles, and responsive design across all devices. Built with 54 commits.',
    tags: ['React', 'Three.js', 'Tailwind CSS', 'Framer Motion'],
    color: '#E8A0BF',
    github: 'https://github.com/Sabia-Munir/Cafe-Prosa',
    image: 'assets/projects/cafeprosa.svg',
    features: [
      'Interactive 3D food scenes with Three.js',
      'Smooth page transitions and animations',
      'Responsive design across all devices',
      'Component-based React architecture',
      'Custom particle effects and steam animations',
      'Pizza, Pasta, and Coffee interactive scenes',
    ],
  },
  {
    title: 'IVOR',
    subtitle: 'Hospital Management System',
    description: 'A comprehensive hospital database management system built with SQL Server and PHP, featuring a custom dark-themed dashboard UI with real-time data visualizations. Team project with 12 complex SQL queries.',
    tags: ['PHP', 'SQL Server', 'HTML/CSS', 'Database Design'],
    color: '#D4A574',
    github: 'https://github.com/Sabia-Munir/IVOR-Hospital-Management-System',
    image: 'assets/projects/ivor.svg',
    features: [
      'Live Dashboard with real-time hospital stats',
      'Full CRUD Interface for all hospital entities',
      '12 Complex SQL Queries covering treatments',
      'Normalized Relational Schema from ER modeling',
      'Role-based data views for staff & patients',
      'Custom dark UI with illustrated components',
    ],
  },
];

const projectsGrid = document.getElementById('projects-grid');
projects.forEach((project, i) => {
  const card = document.createElement('div');
  card.className = 'project-card glass rounded-2xl overflow-hidden animate-on-scroll opacity-0 translate-y-8 border border-brown/10 hover:border-pink/30 hover:-translate-y-2 transition-all duration-300';
  card.style.transitionDelay = `${i * 150}ms`;
  card.innerHTML = `
    <div class="relative h-48 overflow-hidden bg-gradient-to-br from-skin-dark to-skin">
      <img src="${project.image}" alt="${project.title} preview" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-skin-light/90 to-transparent"></div>
      <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="absolute top-3 right-3 w-9 h-9 rounded-lg glass flex items-center justify-center text-brown-muted hover:text-brown hover:bg-brown/10 transition-all" aria-label="View ${project.title} on GitHub">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
      </a>
    </div>
    <div class="p-6">
      <h3 class="text-xl font-bold text-brown mb-1">${project.title}</h3>
      <p class="text-xs mb-3 text-pink font-medium">${project.subtitle}</p>
      <p class="text-brown-muted text-sm leading-relaxed mb-4">${project.description}</p>
      <div class="project-features hidden space-y-2 mb-4">
        ${project.features.map(f => `<div class="flex items-center gap-2 text-sm text-brown-muted"><svg class="w-3 h-3 flex-shrink-0 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg><span>${f}</span></div>`).join('')}
      </div>
      <button class="toggle-features text-xs font-medium mb-4 transition-colors text-pink hover:text-pink-dark">Show features →</button>
      <div class="flex flex-wrap gap-2">
        ${project.tags.map(tag => `<span class="px-3 py-1 rounded-full text-xs font-mono border border-pink/20 text-pink bg-pink/10">${tag}</span>`).join('')}
      </div>
    </div>
  `;
  projectsGrid.appendChild(card);
});

// Toggle features
document.querySelectorAll('.toggle-features').forEach(btn => {
  btn.addEventListener('click', () => {
    const features = btn.previousElementSibling;
    const isHidden = features.classList.contains('hidden');
    features.classList.toggle('hidden');
    btn.textContent = isHidden ? '← Show less' : 'Show features →';
  });
});

// ============================================
// TIMELINE DATA & RENDER
// ============================================
const experiences = [
  {
    title: 'Computer Science',
    org: 'FAST NUCES',
    period: 'Class of 2028',
    description: 'Pursuing BS in Computer Science with focus on software development, algorithms, and AI. Building a strong foundation in both theoretical and practical aspects of computing.',
    tags: ['Algorithms', 'Data Structures', 'OOP', 'AI/ML'],
  },
  {
    title: 'UI/UX Design',
    org: 'Self-Taught & Projects',
    period: 'Ongoing',
    description: 'Designing intuitive user interfaces and experiences for web and mobile applications. Strongest suit where thoughtful design meets clean, functional code.',
    tags: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
  },
  {
    title: 'Freelance Developer',
    org: 'Open for Opportunities',
    period: 'Available Now',
    description: 'Ready to bring your ideas to life with modern web technologies. Specializing in React, Tailwind CSS, and creative web experiences.',
    tags: ['React', 'Tailwind', '3D Web', 'Responsive'],
  },
];

const timeline = document.getElementById('timeline');
experiences.forEach((exp, i) => {
  const item = document.createElement('div');
  item.className = `timeline-item relative mb-12 ml-12 md:ml-0 animate-on-scroll opacity-0 translate-y-8 ${i % 2 === 0 ? 'md:flex md:justify-start' : 'md:flex md:justify-end'}`;
  item.style.transitionDelay = `${i * 200}ms`;
  item.innerHTML = `
    <div class="md:w-1/2 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}">
      <div class="glass rounded-2xl p-6 hover:border-primary/20 transition-all duration-300">
        <h3 class="font-bold text-white mb-1">${exp.title}</h3>
        <p class="text-xs text-gray-500 mb-3">${exp.org} • ${exp.period}</p>
        <p class="text-sm text-gray-400 leading-relaxed mb-4">${exp.description}</p>
        <div class="flex flex-wrap gap-2">
          ${exp.tags.map(tag => `<span class="px-2 py-1 rounded-md text-xs bg-primary/10 text-primary/80 border border-primary/10">${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
  timeline.appendChild(item);
});

// ============================================
// CONTACT FORM
// ============================================
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.innerHTML = '<svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> Message Sent!';
    btn.style.background = '#22c55e';
    this.reset();
    setTimeout(() => {
      btn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg> Send Message';
      btn.style.background = '';
      btn.disabled = false;
    }, 2000);
  }, 1500);
});

// ============================================
// SMOOTH SCROLL FOR ALL ANCHOR LINKS
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
