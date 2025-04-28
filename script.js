// scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Highlight active section in navbar on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Image slider functionality
document.addEventListener('DOMContentLoaded', function() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const workCards = document.querySelectorAll('.work-card');
  let currentIndex = 0;

  function showSlide(index) {
    // Hide all slides
    workCards.forEach(card => card.classList.remove('active'));
    
    // Ensure index is within bounds
    if (index >= workCards.length) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = workCards.length - 1;
    } else {
      currentIndex = index;
    }
    
    // Show current slide
    workCards[currentIndex].classList.add('active');
  }

  // Next button click
  nextBtn.addEventListener('click', () => {
    showSlide(currentIndex + 1);
  });

  // Previous button click
  prevBtn.addEventListener('click', () => {
    showSlide(currentIndex - 1);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      showSlide(currentIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      showSlide(currentIndex - 1);
    }
  });

  // Initialize first slide
  showSlide(0);
});

document.addEventListener('DOMContentLoaded', function() {
  // Fullscreen Image Viewer
  const thumbnails = document.querySelectorAll('.thumbnail');
  const overlay = document.getElementById('overlay');
  const fullscreenImg = document.getElementById('fullscreenImg');
  const closeBtn = document.getElementById('closeBtn');
  
  // Track current image index
  let currentImageIndex = 0;
  const images = Array.from(thumbnails).map(img => img.src);
  
  // Open fullscreen when clicking a thumbnail
  thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', function() {
          currentImageIndex = index;
          fullscreenImg.src = this.src;
          overlay.style.display = 'flex';
          document.body.style.overflow = 'hidden'; // Prevent scrolling
      });
  });
  
  // Close fullscreen
  closeBtn.addEventListener('click', closeFullscreen);
  
  // Close when clicking outside image
  overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
          closeFullscreen();
      }
  });
  
  // Keyboard navigation (arrow keys + ESC)
  document.addEventListener('keydown', function(e) {
      if (overlay.style.display === 'flex') {
          // ESC to close
          if (e.key === 'Escape') {
              closeFullscreen();
          }
          // Right arrow for next image
          else if (e.key === 'ArrowRight') {
              navigate(1);
          }
          // Left arrow for previous image
          else if (e.key === 'ArrowLeft') {
              navigate(-1);
          }
      }
  });
  
  // Navigation between images
  function navigate(direction) {
      currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
      fullscreenImg.src = images[currentImageIndex];
  }
  
  // Close function
  function closeFullscreen() {
      overlay.style.display = 'none';
      document.body.style.overflow = 'auto'; // Re-enable scrolling
  }
});
