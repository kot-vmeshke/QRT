const initBurgerMenu = () => {
  const wrapper = document.querySelector('.header-nav-wrapper');
  if (!wrapper) return;

  const burger = wrapper.querySelector('.header-burger');
  const navLinks = wrapper.querySelectorAll('.header-nav-link');

  const toggleMenu = () => wrapper.classList.toggle('js-opened');
  const closeMenu = () => wrapper.classList.remove('js-opened');

  const handleOutsideClick = (e) => {
    if (!wrapper.contains(e.target)) closeMenu();
  };

  burger?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();

    const isOpen = wrapper.classList.contains('js-opened');
    document[isOpen ? 'addEventListener' : 'removeEventListener'](
      'click',
      handleOutsideClick
    );
  });

  navLinks.forEach((link) => link.addEventListener('click', closeMenu));
};

const coverEase = CustomEase.create('coverEase', '0.86, 0, 0.07, 1');
const textEase = CustomEase.create('textEase', '0.77, 0, 0.175, 1');

const runSlideTl = (swiper) => {
  const slide = swiper.slides[swiper.activeIndex];
  if (!slide) return;

  swiper._tl && swiper._tl.kill();

  const tl = gsap.timeline({
    delay: 1.45,
    defaults: { duration: 1 },
  });

  const covers = slide.querySelectorAll('[data-image-cover]');
  covers.forEach((el) => {
    const xValue = (el.dataset.direction || 'right') === 'left' ? -101 : 101;
    gsap.set(el, { xPercent: 0 });

    tl.to(el, { xPercent: xValue, ease: coverEase }, 0);
  });

  const description = slide.querySelector('.hero-description');
  if (description) {
    tl.fromTo(
      description,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, ease: textEase },
      0.2
    );
  }

  const btn = slide.querySelector('.border-btn-box');
  if (btn) {
    tl.fromTo(
      btn,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, ease: textEase },
      0.4
    );
  }

  swiper._tl = tl;
};

const initHeroSlider = () => {
  const heroSlider = document.querySelector('.hero');
  if (!heroSlider) return;

  const interleaveOffset = 0.2;

  const swiper = new Swiper(heroSlider, {
    spaceBetween: 0,
    speed: 1500,
    watchSlidesProgress: true,
    navigation: {
      nextEl: '.hero-button--next',
      prevEl: '.hero-button--prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: false,
      enabled: false,
    },
    breakpoints: {
      0: {
        pagination: {
          enabled: true,
        },
      },
      1024: {
        pagination: {
          enabled: false,
        },
      },
    },
    on: {
      progress(swiper) {
        swiper.slides.forEach((slide) => {
          const progress = slide.progress;
          const translate = swiper.width * interleaveOffset * progress;
          slide.querySelector(
            '[data-slide-image]'
          ).style.transform = `translate3d(${translate}px, 0, 0)`;
        });
      },
      touchStart(swiper) {
        swiper.slides.forEach((slide) => {
          slide.querySelector('.hero-slide-image').style.transition = '';
        });
      },
      setTransition(speed) {
        this.slides.forEach((slide) => {
          slide.style.transition = `${speed}ms`;
          slide.querySelector(
            '[data-slide-image]'
          ).style.transition = `${speed}ms`;
        });
      },
      slideChangeTransitionStart() {
        runSlideTl(this);
      },
    },
  });

  swiper.on('slideChange', () => {
    heroSlider.classList.toggle('not-first-slide', swiper.realIndex !== 0);
  });
};

const initClientsSlider = () => {
  let swiper = null;

  const setupSlider = () => {
    const wrapper = document.querySelector('.clients-wrapper');
    if (!wrapper) return;

    if (window.innerWidth > 1200 && !swiper) {
      swiper = new Swiper(wrapper, {
        slidesPerView: 6,
        spaceBetween: 113,
        loop: true,
        allowTouchMove: false,
        speed: 7000,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        },
      });

      swiper.autoplay.stop();
      wrapper.addEventListener('mouseenter', () => swiper.autoplay.start());
      wrapper.addEventListener('mouseleave', () => swiper.autoplay.stop());
    }

    if (window.innerWidth <= 1200 && swiper) {
      swiper.destroy(true, true);
      swiper = null;
    }
  };

  window.addEventListener('load', setupSlider);
  window.addEventListener('resize', setupSlider);
};

const handleCustomCursor = () => {
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor) return;

  const hoverTargets = document.querySelectorAll('a, button, .cursor-hover');
  const specialSection = document.querySelector('.contacts');

  const moveCursor = (e) => {
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
  };

  const addHover = () => cursor.classList.add('hover');
  const removeHover = () => cursor.classList.remove('hover');

  document.addEventListener('mousemove', moveCursor);

  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', addHover);
    el.addEventListener('mouseleave', removeHover);
  });

  if (specialSection) {
    specialSection.addEventListener('mouseenter', () => {
      cursor.classList.add('custom-cursor--on-accent');
    });
    specialSection.addEventListener('mouseleave', () => {
      cursor.classList.remove('custom-cursor--on-accent');
    });
  }
};

const handleMainSlide = () => {
  const slide = document.querySelector('.hero');
  const video = slide.querySelector('.hero-slide-video');

  let hasPlayed = false;

  slide.addEventListener('pointermove', () => {
    if (!hasPlayed) {
      video.play();
      hasPlayed = true;
    }
    video.classList.add('active');
  });

  slide.addEventListener('pointerleave', () => {
    video.classList.remove('active');
    hasPlayed = false;
    video.pause();
    video.currentTime = 0;
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initBurgerMenu();
  initHeroSlider();
  initClientsSlider();

  handleCustomCursor();
  // handleMainSlide();
});
