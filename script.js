// Smooth scroll for nav links and main CTA buttons
document.querySelectorAll('a.nav-link, a.btn-accent, a.btn-outline-light').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 75; // navbar height offset
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Scroll reveal using IntersectionObserver
const revealElements = document.querySelectorAll('.reveal-on-scroll');
const observerOptions = {
  threshold: 0.15
};

const revealOnIntersect = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(revealOnIntersect, observerOptions);
revealElements.forEach(el => observer.observe(el));

// Contact form validation & success message
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Reset state
    formStatus.classList.add('d-none');
    let isValid = true;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    // Basic validation
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
      if (!input.value.trim()) {
        input.classList.add('is-invalid');
        isValid = false;
      } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
      }
    });

    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue && !emailPattern.test(emailValue)) {
      emailInput.classList.add('is-invalid');
      isValid = false;
    }

    if (!isValid) return;

    // Simulate successful submit (no backend)
    formStatus.classList.remove('d-none');
    formStatus.classList.remove('text-danger');
    formStatus.classList.add('text-success');

    // Optionally clear form after short delay
    setTimeout(() => {
      contactForm.reset();
      [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        input.classList.remove('is-valid', 'is-invalid');
      });
    }, 800);
  });

  // Remove invalid state on input
  contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      if (input.value.trim()) {
        input.classList.remove('is-invalid');
      }
    });
  });
}

// Dynamic year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Animate progress bars on scroll
const progressBars = document.querySelectorAll('.progress-bar');
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.style.width;
      entry.target.style.width = '0%';
      setTimeout(() => {
        entry.target.style.width = width;
      }, 100);
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

progressBars.forEach(bar => progressObserver.observe(bar));

// Animated rotating text for hero section
const animatedTextElement = document.querySelector('.animated-text');
if (animatedTextElement) {
  const titles = [
    'Freelancer',
    'Technical Trainer',
    'Full stack Developer',
    'Digital Marketing'
  ];
  
  let currentTitleIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function typeText() {
    const currentTitle = titles[currentTitleIndex];
    
    if (isDeleting) {
      // Delete characters
      animatedTextElement.textContent = currentTitle.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      typingSpeed = 50; // Faster when deleting
    } else {
      // Type characters
      animatedTextElement.textContent = currentTitle.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      typingSpeed = 100; // Normal typing speed
    }
    
    if (!isDeleting && currentCharIndex === currentTitle.length) {
      // Pause at end of word
      typingSpeed = 2000; // Wait 2 seconds before deleting
      isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
      // Move to next title
      isDeleting = false;
      currentTitleIndex = (currentTitleIndex + 1) % titles.length;
      typingSpeed = 500; // Pause before typing next word
    }
    
    setTimeout(typeText, typingSpeed);
  }
  
  // Start typing animation after a short delay
  setTimeout(typeText, 1000);
}









