'use strict';

// Slider
const btnPrev = document.querySelector('#prev');
const btnNext = document.querySelector('#next');
const slides = document.querySelectorAll('.slide');

const nextSlide = function () {
  const current = document.querySelector('.current');
  current.classList.remove('current');
  if (current.nextElementSibling) {
    current.nextElementSibling.classList.add('current');
  } else {
    slides[0].classList.add('current');
  }
};
const prevSlide = function () {
  const current = document.querySelector('.current');
  current.classList.remove('current');
  if (current.previousElementSibling) {
    current.previousElementSibling.classList.add('current');
  } else {
    slides[slides.length - 1].classList.add('current');
  }
};

btnNext.addEventListener('click', nextSlide);
btnPrev.addEventListener('click', prevSlide);

// Nav hover

const nav = document.querySelector('.nav');

const hover = function (e) {
  if (e.target.classList.contains('nav-link')) {
    const link = e.target;
    const sibilings = link.closest('.nav').querySelectorAll('.nav-link');
    const logo = link.closest('.nav').querySelector('.logo');

    sibilings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', hover.bind(0.5));
nav.addEventListener('mouseout', hover.bind(1));

// Sticky Nav

const navHeight = nav.getBoundingClientRect().height;
const header = document.querySelector('.header');
const navLinks = document.querySelector('.nav-links');

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const navObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
navObserver.observe(header);

// Navigation buttons

document.querySelector('.nav-links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav-link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Nav Mobile

const btnMenu = document.querySelector('.menu-btn');
const menuOverlay = document.querySelector('.overlay-menu');
const openMenu = function (e) {
  const links = document.querySelector('.nav-links');
  links.classList.toggle('show');
  menuOverlay.classList.toggle('hidden');
};
btnMenu.addEventListener('click', openMenu);

// Modal btn //

const btnShow = document.querySelector('.btn-show-modal');
const btnClose = document.querySelector('.btn--close-modal');
const overlay = document.querySelector('.overlay-full');
const modal = document.querySelector('.modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function (e) {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnShow.addEventListener('click', openModal);
btnClose.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// About Tabs //

const tabsContainer = document.querySelector('.about-tab-container');
const tabs = document.querySelectorAll('.about-tab');
const tabsContent = document.querySelectorAll('.about-content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.about-tab');

  if (!clicked) return;

  tabs.forEach((t) => t.classList.remove('about-tab-active'));
  tabsContent.forEach((c) => c.classList.remove('about-content-active'));

  clicked.classList.add('about-tab-active');
  document
    .querySelector(`.about-content-${clicked.dataset.tab}`)
    .classList.add('about-content-active');
});

// Section roll

const allSection = document.querySelectorAll('.section');

const rollSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section-hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(rollSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section-hidden');
});
