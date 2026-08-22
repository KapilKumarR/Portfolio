/* =========================================================
   Portfolio interactions — vanilla JS only, no jQuery required
========================================================= */
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Typing animation ---------- */
  var typingEl = document.getElementById('typing-animation');
  var roles = ['Recruitment Executive', 'Talent Acquisition Specialist', 'IT & Recruitment Automation'];
  var roleIndex = 0;
  var charIndex = 0;
  var deleting = false;

  function typeLoop() {
    if (!typingEl) return;
    var current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      typingEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      charIndex--;
      typingEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  }
  typeLoop();

  /* ---------- Shuffle the badge tape once, then duplicate for seamless loop ---------- */
  var tapeInner = document.getElementById('badgeTapeInner');
  if (tapeInner) {
    var chips = Array.from(tapeInner.children);
    for (var i = chips.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      tapeInner.appendChild(chips[j]);
    }
    // Duplicate the set so the CSS animation (translateX -50%) loops seamlessly
    var clone = tapeInner.cloneNode(true);
    clone.removeAttribute('id');
    tapeInner.parentNode.appendChild(clone);
  }

  /* ---------- Bootstrap tooltips (desktop rail) ---------- */
  var tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltipTriggerList.forEach(function (el) {
    if (window.bootstrap && window.bootstrap.Tooltip) {
      new bootstrap.Tooltip(el);
    }
  });

  /* ---------- Smooth-scroll for nav links + close mobile offcanvas ---------- */
  document.querySelectorAll('.js-scroll').forEach(function (link) {
    link.addEventListener('click', function () {
      var offcanvasEl = document.getElementById('mobileNav');
      if (offcanvasEl && window.bootstrap) {
        var instance = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (instance) instance.hide();
      }
    });
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- Active section highlight on the desktop side rail ---------- */
  var railLinks = document.querySelectorAll('.rail-link');
  var sections = Array.from(railLinks).map(function (link) {
    return document.querySelector(link.getAttribute('href'));
  }).filter(Boolean);

  function setActiveRailLink() {
    var scrollPos = window.scrollY + window.innerHeight * 0.35;
    var current = sections[0];
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) current = sec;
    });
    railLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current.id);
    });
  }

  if (sections.length) {
    setActiveRailLink();
    window.addEventListener('scroll', setActiveRailLink, { passive: true });
  }
});
