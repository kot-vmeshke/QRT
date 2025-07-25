// ============================
// GSAP & ScrollTrigger Setup
// ============================
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);

// ============================
// Hero Slide Intro Timeline
// ============================
const heroTimeline = gsap.timeline();

const heroEase = CustomEase.create('coverEase', '0.86, 0, 0.07, 1');

document.addEventListener('DOMContentLoaded', () => {
  heroTimeline
    .to('.preloader-cover', {
      xPercent: 101,
      duration: 1.5,
      ease: 'linear',
    })
    .to(
      '.preloader',
      {
        xPercent: 101,
        duration: 1,
        ease: heroEase,
        onComplete: () => {
          document.querySelector('.preloader').style.display = 'none';
        },
      },
      '+=0.2'
    )
    .fromTo(
      '.hero-energising-wrap',
      { opacity: 0, y: 120 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: heroEase,
      },
      '-=0.5'
    )
    .fromTo(
      '.left',
      { scaleX: 0, x: 0 },
      {
        scaleX: 1,
        x: -25,
        duration: 2,
        ease: heroEase,
        transformOrigin: 'right center',
      },
      '-=1'
    )
    .fromTo(
      '.right',
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 2,
        ease: heroEase,
        transformOrigin: 'left center',
      },
      '<'
    )
    .fromTo(
      '.hero-slide-media',
      { scale: 1.2 },
      {
        scale: 1,
        duration: 0.5,
        ease: 'linear',
      },
      '-=1'
    )
    .fromTo(
      '.hero-future',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: heroEase },
      '-=1'
    )
    .fromTo(
      '.hero-slide--main .hero-description',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
      },
      '-=0.5'
    )
    .fromTo(
      '.hero-slide--main .border-btn-box',
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
      },
      '-=0.5'
    );
});

// ============================
// Fade-In Elements on Scroll
// ============================
gsap.utils.toArray('[data-fade-in]').forEach((el) => {
  const translateY = +el.dataset.translateY || 60;

  gsap.from(el, {
    opacity: 0,
    y: translateY,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
      toggleActions: 'play none none none',
      once: true,
    },
  });
});

// ============================
// Animated Counters on Scroll
// ============================
gsap.utils.toArray('[data-counter]').forEach((el) => {
  const target = +el.dataset.to || 0;
  const duration = Math.min(3, Math.max(1, target / 50));

  ScrollTrigger.create({
    trigger: el,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: target,
          duration,
          ease: 'power1.out',
          snap: { innerText: 1 },
          onUpdate: () => {
            el.textContent = Math.floor(el.innerText);
          },
        }
      );
    },
  });
});

// ============================
// Staggered Reveal (e.g. cards)
// ============================
function staggerReveal(containerSelector, itemSelector, options = {}) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const items = container.querySelectorAll(itemSelector);
  if (!items.length) return;

  gsap.set(items, { opacity: 0, y: 60 });

  ScrollTrigger.create({
    trigger: container,
    start: options.start || 'top 80%',
    once: options.once !== false,
    onEnter: () => {
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: options.duration || 0.6,
        ease: options.ease || 'power2.out',
        stagger: options.stagger || 0.2,
      });
    },
  });
}

staggerReveal('.counters-wrap', '[data-stairs]');
staggerReveal('.why-us-list', '[data-stairs]');

// ============================
// Image Reveal with Slide Cover
// ============================
function revealImage(containerSelector) {
  const containers = gsap.utils.toArray(containerSelector);

  containers.forEach((container) => {
    const cover = container.querySelector('[data-image-cover]');
    if (!cover) return;

    const direction = cover.dataset.direction || 'right';
    const xValue = direction === 'left' ? -101 : 101;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          once: true,
        },
      })
      .to(cover, {
        xPercent: xValue,
        duration: 1,
        ease: 'power2.out',
      });
  });
}

revealImage('.service-image');
revealImage('.project-img');
revealImage('.section-title-wrapper');
