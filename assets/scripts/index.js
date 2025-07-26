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

  const animationType = slide.dataset.animation || 'new';

  switch (animationType) {
    case 'old':
      animateOld(slide);
      break;
    case 'between':
      animateBetween(slide, tl);
      break;
    case 'main-one':
      animateMainOne(slide, tl);
      break;
    case 'main-two':
      animateMainTwo(slide, tl);
      break;
    case 'main-main':
      animateMainMain(slide, tl);
      break;
    default:
      animateNew(slide, tl);
      break;
  }

  function animateNew(slide, tl) {
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
  }

  function animateOld(slide) {
    const animateEl = (selector, y = 120, delay = 0.75) => {
      const el = slide.querySelector(selector);
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

    const cover = slide.querySelectorAll('[data-image-cover]');
    if (cover.length) {
      cover.forEach((el) => {
        const direction = el.dataset.direction || 'right';
        const xValue = direction === 'left' ? -101 : 101;

        gsap.set(el, { xPercent: 0 });

        gsap.to(el, {
          xPercent: xValue,
          duration: 1,
          ease: 'power2.out',
          delay: 1.25,
        });
      });
    }

    animateEl('.hero-title');
    animateEl('.hero-description', 100, 1.75);
    animateEl('.border-btn-box', 0, 2.25);
  }

  function animateBetween(slide, tl) {
    const covers = slide.querySelectorAll('[data-image-cover]');
    covers.forEach((el) => {
      const xValue = (el.dataset.direction || 'right') === 'left' ? -101 : 101;
      gsap.set(el, { xPercent: 0 });
      tl.to(el, { xPercent: xValue, ease: coverEase, duration: 1 }, 0);
    });

    const description = slide.querySelector('.hero-description');
    if (description) {
      tl.fromTo(
        description,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
        },
        1
      );
    }

    const btn = slide.querySelector('.border-btn-box');
    if (btn) {
      tl.fromTo(
        btn,
        { opacity: 0, y: 0 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
        },
        1.5
      );
    }
  }

  function animateMainOne(slide, tl) {
    const heroEase = CustomEase.create('coverEase', '0.86, 0, 0.07, 1');

    const covers = slide.querySelectorAll('[data-image-cover]');
    gsap.set(covers, { xPercent: 0 });

    tl.to(covers, { xPercent: 101, ease: coverEase, duration: 1.5 })
      .fromTo(
        slide.querySelector('.left'),
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
        slide.querySelector('.right'),
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
        slide.querySelector('.hero-slide-media'),
        { scale: 1.2 },
        { scale: 1, duration: 0.5, ease: 'linear' },
        '-=1'
      )
      .fromTo(
        slide.querySelector('.hero-description'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 },
        '-=0.5'
      )
      .fromTo(
        slide.querySelector('.border-btn-box'),
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        '-=0.5'
      );
  }

  function animateMainTwo(slide, tl) {
    const heroEase = CustomEase.create('coverEase', '0.86, 0, 0.07, 1');

    const coversAccent = slide.querySelectorAll(
      '.accent-color [data-image-cover]'
    );
    const coversLight = slide.querySelectorAll(
      '.light-color [data-image-cover]'
    );

    gsap.set([...coversAccent, ...coversLight], { xPercent: 0 });

    tl.to(coversAccent, { xPercent: 101, ease: coverEase, duration: 1 })
      .to(coversLight, { xPercent: 101, ease: coverEase, duration: 1 })
      .fromTo(
        slide.querySelector('.left'),
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
        slide.querySelector('.right'),
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
        slide.querySelector('.hero-description'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: textEase },
        '-=0.5'
      )
      .fromTo(
        slide.querySelector('.border-btn-box'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: textEase },
        '-=0.5'
      );
  }

  function animateMainMain(slide, tl) {
    const heroEase = CustomEase.create('coverEase', '0.86, 0, 0.07, 1');

    tl.fromTo(
      slide.querySelector('.hero-energising-wrap'),
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
        slide.querySelector('.hero-slide--main [data-image-cover]'),
        { xPercent: 0 },
        {
          xPercent: 101,
          ease: coverEase,
          duration: 1.5,
        },
        '<'
      )
      .fromTo(
        slide.querySelector('.left'),
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
        slide.querySelector('.right'),
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
        slide.querySelector('.hero-slide-media'),
        { scale: 1.2 },
        {
          scale: 1,
          duration: 0.5,
          ease: 'linear',
        },
        '-=1'
      )
      .fromTo(
        slide.querySelector('.hero-future'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: heroEase },
        '-=1'
      )
      .fromTo(
        slide.querySelector('.hero-slide--main .hero-description'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
        },
        '-=0.5'
      )
      .fromTo(
        slide.querySelector('.hero-slide--main .border-btn-box'),
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
        },
        '-=0.5'
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
          const img = slide.querySelector('.hero-slide-image');
          if (img) img.style.transition = '';
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
      slideChange() {
        runSlideTl(this);
      },
    },
  });

  swiper.on('slideChange', () => {
    if (swiper.realIndex > 2) {
      heroSlider.classList.add('not-first-slide');
    } else {
      heroSlider.classList.remove('not-first-slide');
    }
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

const initProjectsSlider = (selector, reverse = false) => {
  const swiper = new Swiper(selector, {
    slidesPerView: 3,
    speed: 12000,
    spaceBetween: 22,
    loop: true,
    autoplay: {
      delay: 0,
      reverseDirection: reverse,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
      1920: {
        slidesPerView: 4,
      },
    },
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initBurgerMenu();
  initHeroSlider();

  handleCustomCursor();

  initProjectsSlider('.swiper--left');
  initProjectsSlider('.swiper--right', true);
  initProjectsSlider('.swiper--left-2');
});
