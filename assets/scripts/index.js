console.log('Hello, QRT!');

const handleBurgerMenu = () => {
  const wrapper = document.querySelector('.header-nav-wrapper');
  const burgerButton = wrapper.querySelector('.header-burger');
  const headerNav = wrapper.querySelector('.header-nav');
  const navLinks = headerNav.querySelectorAll('.header-nav-link');

  const openMenu = () => {
    wrapper.classList.add('js-opened');
    document.addEventListener('click', handleOutsideClick);
  };

  const closeMenu = () => {
    wrapper.classList.remove('js-opened');
    document.removeEventListener('click', handleOutsideClick);
  };

  const toggleMenu = () => {
    wrapper.classList.contains('js-opened') ? closeMenu() : openMenu();
  };

  const handleOutsideClick = (e) => {
    if (!wrapper.contains(e.target)) {
      closeMenu();
    }
  };

  burgerButton.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  handleBurgerMenu();
});
