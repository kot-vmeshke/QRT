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

const initHeroSlider = () => {
  const heroSlider = document.querySelector('.hero');
  if (!heroSlider) return;

  const interleaveOffset = 0.2;

  const swiper = new Swiper(heroSlider, {
    spaceBetween: 0,
    speed: 1500,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },
    breakpoints: {
      0: { autoplay: false },
      1200: {
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        },
      },
    },
    watchSlidesProgress: true,
    navigation: {
      nextEl: '.hero-button--next',
      prevEl: '.hero-button--prev',
    },
    on: {
      progress(swiper) {
        swiper.slides.forEach((slide) => {
          const progress = slide.progress;
          const translate = swiper.width * interleaveOffset * progress;
          slide.querySelector(
            '.hero-slide-image'
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
            '.hero-slide-image'
          ).style.transition = `${speed}ms`;
        });
      },
      slideChangeTransitionStart() {
        const active = swiper.slides[swiper.activeIndex];

        const animateEl = (selector, y = 120, delay = 0.75) => {
          const el = active.querySelector(selector);
          if (el) {
            gsap.fromTo(
              el,
              { opacity: 0, y },
              {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: 'power2.out',
                delay,
              }
            );
          }
        };

        animateEl('.hero-title');
        animateEl('.hero-slide-text-wrap img');
        animateEl('.hero-description', 100);
        animateEl('.button');
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

    if (window.innerWidth >= 1200 && !swiper) {
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

    if (window.innerWidth < 1200 && swiper) {
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
};

document.addEventListener('DOMContentLoaded', () => {
  initBurgerMenu();
  initHeroSlider();
  initClientsSlider();

  handleCustomCursor();
});
