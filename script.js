'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const imgTargets = document.querySelectorAll('img[data-src]');
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');


// Modal window

const openModal = function () {
	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
};

const closeModal = function () {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
	if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
		closeModal();
	}
});


///////////////////////////////////////
// Button scrolling

btnScrollTo.addEventListener('click', function (e) {
	// const s1coords = section1.getBoundingClientRect();
	// console.log(s1coords);
	//
	// console.log(e.target.getBoundingClientRect());
	// console.log('current scroll', window.pageXOffset, window.pageYOffset)
	//
	// console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);
	//
	//
	// window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset)
	//
	// window.scrollTo({
	// 	left: s1coords.left + window.pageXOffset,
	// 	top: s1coords.top + window.pageYOffset,
	// 	behavior: 'smooth',
	// });

	section1.scrollIntoView({behavior: 'smooth'})
});

// Page navigation

document.querySelector('.nav__links').addEventListener('click', function (e) {
	e.preventDefault();
	// Matching strategy
	if (e.target.classList.contains('nav__link')) {
		const id = e.target.getAttribute('href');
		console.log(id);
		document.querySelector(id).scrollIntoView({behavior: 'smooth'});
	}
	;

});

///////////////////////////////////////
// Tabbed component

tabsContainer.addEventListener('click', function (e) {
	const clicked = e.target.closest('.operations__tab');
	// console.log(clicked);
	// Guard clause
	if (!clicked) return;

	tabs.forEach(t => t.classList.remove);
	clicked.classList.add('operations__tab--active');
	tabsContent.forEach(c => c.classList.remove('operations__content--active'));
	// console.log(clicked.dataset.tab)
	document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

});


///////////////////////////////////////
// Menu fade animation

const handleHover = function (e) {
	if (e.target.classList.contains('nav__link')) {
		const link = e.target;
		const siblings = link.closest('.nav').querySelectorAll('.nav__link');
		const logo = link.closest('.nav').querySelector('img');

		siblings.forEach(el => {
			if (el !== link) el.style.opacity = this;
		});
		logo.style.opacity = this;
	}
	;
	;
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Sticky navigation: Intersection Observer API
const intialCoords = section1.getBoundingClientRect();
// console.log(intialCoords)
window.addEventListener('scroll', function (e) {
	if (window.scrollY > intialCoords.top) nav.classList.add('sticky');
	else nav.classList.remove('sticky');
});

///////////////////////////////////////
// Sticky navigation: Intersection Observer API

const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight)

const stickyNav = function (entries) {
	const [entry] = entries;
	// console.log(entry);

	if (!entry.isIntersecting) nav.classList.add('sticky');
	else nav.classList.remove('sticky')

	nav.classList.add('sticky');
}
const headerObsrver = new IntersectionObserver(stickyNav, {
	root: null,
	threshold: 0,
	rootMargin: `-${navHeight}px`,
});
headerObsrver.observe(header)

const revealSection = function (entries, observer) {
	const [entry] = entries;
	// console.log(entry);
	if (!entry.isIntersecting) return;
	entry.target.classList.remove('section--hidden');
	observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
	root: null,
	threshold: 0.15,
});

allSections.forEach(function (section) {
	sectionObserver.observe(section);
	section.classList.add('section--hidden');
});


//Lazy Loading images

const loadImg = function (entries, observer) {
	const [entry] = entries;
	if (!entry.isIntersecting) return;
	entry.target.src = entry.target.dataset.src;
	entry.target.addEventListener('load', function () {
		entry.target.classList.remove('lazy-img')

	});
	observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
	root: null,
	threshold: 0,
	rootMargin: '-250px',
});

imgTargets.forEach(img => imgObserver.observe(img));


/// Slides

let curSlide = 0;
const maxSlide = slides.length;
const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
// createDots();

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  // activateDot(0);

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }

})

// const createDots = function () {
// 	slides.forEach(function (_, i) {
// 		dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}" ></button> `)
// 	});
// };
// createDots()
// const goToSlide = function (slide) {
// 	slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
//
// };
// goToSlide(0);
//
// const nextSlide = function () {
// 	if (curSlide === maxSlide - 1) {
// 		curSlide = 0;
// 	} else {
// 		curSlide++;
// 	}
// 	;
// 	goToSlide(curSlide);
// };
//
// const prevSlide = function () {
// 	if (curSlide === 0) {
// 		curSlide = maxSlide - 1;
// 	} else {
// 		curSlide--;
// 	}
// 	;
// 	goToSlide(curSlide);
// }
//
// btnRight.addEventListener('click', nextSlide);
// btnLeft.addEventListener('click', prevSlide);
//
//
// document.addEventListener('keydown', function (e) {
// 	if (e.key === 'ArrowLeft') prevSlide();
// 	e.key === 'ArrowRight' && nextSlide()
// });
//
//
// dotContainer.addEventListener('click', function (e) {
// 	if (e.target.classList.contains('dots__dot')) {
// 		const {slide} = e.target.dataset;
// 		goToSlide(slide)
// 		// activateDot(slide);
// 	}
//
// });

// dotContainer.addEventListener('click',function (e){
// 	if(e.target.classList.contains('dots__dot')){
// 		const {slide} = e.target.dataset;
// 		goToSlide(slide);
// 	};
// });


// dotContainer.addEventListener('click',function (e){
// 	if(e.target.classList.contains('dots__dot')){
// 		const {slide} = e.target.dataset;
// 		goToSlide(slide);
// 	};
// })
//// document.querySelectorAll('.nav__link').forEach(function (el){
// 	el.addEventListener('click', function (e){
// 		e.preventDefault();
// 		const  id = this.getAttribute('href');
// 		// console.log(id);
// 		document.querySelector(id).scrollIntoView({behavior: 'smooth'});
// 	});
// });
//


// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
// const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`
// console.log(randomColor());
//
// document.querySelector('.nav__link').addEventListener('click',function (e){
// 	console.log('link');
// 	this.style.backgroundColor = randomColor();
// });

//document.querySelector('.nav__links').addEventListener('click',function (e){});
//document.querySelector('.nav').addEventListener('click', function (e){});
// btnScrollTo.addEventListener('click', function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);

// console.log(e.target.getBoundingClientRect());
//
// console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
//
// console.log(
//   'height/width viewport',
//   document.documentElement.clientHeight,
//   document.documentElement.clientWidth
// )
// })


//// Lectures

// const header = document.querySelector('.header')
// console.log(document.body)
// const massege = document.createElement('div');
// massege.classList.add('cookie-message')
// massege.textContent = 'we use cookie-message for improved'
// massege.innerHTML = 'we use cookie-message. <button class="btn bt"> got it </button>'
//
//
// header.append(massege)

