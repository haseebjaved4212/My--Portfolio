// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Canvas Animation for Background
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 212, 255, 0.5)";
    ctx.fill();
  }
}

// Initialize particles
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  // Draw connecting lines
  particles.forEach((p1, i) => {
    particles.slice(i + 1).forEach((p2) => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 212, 255, ${1 - distance / 100})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    });
  });

  requestAnimationFrame(animate);
}

animate();

// Handle window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// GSAP Animations for Hero Section
gsap.from(".hero-content h1", {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power3.out",
});

gsap.from(".hero-content h2", {
  opacity: 0,
  y: 30,
  duration: 1,
  delay: 0.3,
  ease: "power3.out",
});

gsap.from(".hero-content p", {
  opacity: 0,
  y: 20,
  duration: 1,
  delay: 0.5,
  ease: "power3.out",
});

gsap.from(".cta-buttons", {
  opacity: 0,
  y: 20,
  duration: 1,
  delay: 0.7,
  ease: "power3.out",
});

// Scroll Animations for Sections
gsap.utils.toArray("section").forEach((section) => {
  gsap.from(section.children, {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
  });
});

// Project Cards Animation
gsap.utils.toArray(".project-card").forEach((card, i) => {
  gsap.from(card, {
    opacity: 0,
    y: 50,
    duration: 0.8,
    delay: i * 0.2,
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close menu on link click
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Pause marquee animation on hover
const skillsMarquee = document.querySelector(".skills-marquee");

skillsMarquee.addEventListener("mouseenter", () => {
  skillsMarquee.style.animationPlayState = "paused";
});

skillsMarquee.addEventListener("mouseleave", () => {
  skillsMarquee.style.animationPlayState = "running";
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.style.color = "var(--gray)";
    if (item.getAttribute("href").slice(1) === current) {
      item.style.color = "var(--primary)";
    }
  });
});

// Form submission handling
const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", (e) => {
  // FormSubmit will handle the actual submission
  // You can add additional client-side validation here if needed
  console.log("Form submitted successfully!");
});

// Add scroll reveal animation for skill items
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe skill items
document.querySelectorAll(".skill-item").forEach((item) => {
  item.style.opacity = "0";
  item.style.transform = "translateY(20px)";
  item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(item);
});

// Add typing effect to hero subtitle (optional enhancement)
const heroSubtitle = document.querySelector(".hero h2");
const text = heroSubtitle.textContent;
heroSubtitle.textContent = "";

let i = 0;
function typeWriter() {
  if (i < text.length) {
    heroSubtitle.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}

// Start typing effect after hero animation
setTimeout(typeWriter, 1300);

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    heroContent.style.opacity = 1 - scrolled * 0.002;
  }
});

// Console message
console.log(
  "%c👋 Welcome to my portfolio!",
  "color: #00d4ff; font-size: 20px; font-weight: bold;"
);
console.log(
  "%cBuilt with HTML, CSS, JavaScript & GSAP",
  "color: #ff006e; font-size: 14px;"
);
