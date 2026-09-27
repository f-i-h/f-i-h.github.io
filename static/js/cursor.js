// Standalone Cursor Logic
(function() {
  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let rx = mx;
  let ry = my;
  let dot, ring;
  let isHovering = false;

  function initCursor() {
    dot = document.querySelector('.cursor-dot');
    ring = document.querySelector('.cursor-ring');
    
    if (!dot) {
      dot = document.createElement('div');
      dot.className = 'cursor-dot';
      document.body.appendChild(dot);
    }
    if (!ring) {
      ring = document.createElement('div');
      ring.className = 'cursor-ring';
      document.body.appendChild(ring);
    }

    // Attach hover listeners to links
    document.querySelectorAll('a, button, .home-article-item, summary, .top-link, input').forEach(el => {
      el.onmouseenter = () => { isHovering = true; ring.classList.add('hovered'); };
      el.onmouseleave = () => { isHovering = false; ring.classList.remove('hovered'); };
    });
  }

  // Update mouse position on move
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    if (dot) {
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
    }
  });

  // Animation loop for the springy ring
  function animRing() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    if (ring) {
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
    }
    requestAnimationFrame(animRing);
  }
  animRing();

  // Initialize on load and turbo load
  document.addEventListener("DOMContentLoaded", initCursor);
  document.addEventListener("turbo:load", initCursor);
})();
