function initCustomJS() {

  // --- 1. RESTORE LOADING SCREEN & PROGRESS BAR ---
  const loader = document.getElementById('loader') || document.querySelector('.loader') || document.getElementById('preloader');
  const progressBar = document.getElementById('loader-bar') || document.getElementById('loader-progress') || document.querySelector('.progress-bar');
  
  if (loader) {
    let progress = 0;
    let interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 90) progress = 90; 
      if (progressBar) progressBar.style.width = progress + '%';
    }, 150);

    window.addEventListener('load', () => {
      clearInterval(interval);
      if (progressBar) progressBar.style.width = '100%';
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => loader.style.display = 'none', 500);
      }, 400); 
    });
  }

  // --- 2. LIGHTSABER SCROLL BAR (Articles Only) ---
  const path = window.location.pathname;
  if (path !== '/' && path !== '/index.html' && !path.includes('/about')) {
    let bar = document.getElementById('lightsaber-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'lightsaber-bar';
      document.body.appendChild(bar);
    }
    
    // Clear old listeners by replacing or just rely on passive. 
    // Wait, adding multiple scroll listeners is bad. Let's just track it on the window.
    window.onscroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      bar.style.width = Math.min(pct, 100) + '%';
    };
  }

  // Cursor logic moved to cursor.js

  // --- 4. HACKER DECODE HOVER EFFECT ---
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  document.querySelectorAll('.home-article-item').forEach(card => {
    const header = card.querySelector('h2');
    if (!header) return; 
    if (!header.dataset.original) header.dataset.original = header.innerText;
    
    card.onmouseenter = () => {
      let iterations = 0;
      clearInterval(header.dataset.interval);
      header.dataset.interval = setInterval(() => {
        header.innerText = header.innerText.split("")
          .map((letter, index) => {
            if(header.dataset.original[index] === " ") return " ";
            if(index < iterations) return header.dataset.original[index];
            return letters[Math.floor(Math.random() * letters.length)];
          }).join("");
        if(iterations >= header.dataset.original.length) clearInterval(header.dataset.interval);
        iterations += 1 / 3; 
      }, 25);
    };
  });

  // --- 5. AUTO-OPEN TABLE OF CONTENTS ON DESKTOP ---
  const tocDetails = document.querySelector('.toc details');
  if (tocDetails && window.innerWidth >= 1100) tocDetails.setAttribute('open', '');

}

document.addEventListener("DOMContentLoaded", initCustomJS);
document.addEventListener("turbo:load", initCustomJS);
