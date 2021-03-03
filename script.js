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
const  header = document.querySelector('.header');


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

document.querySelector('.nav__links').addEventListener('click', function (e) {
	e.preventDefault();
	if (e.target.classList.contains('nav__link')) {
		const id = e.target.getAttribute('href');
		console.log(id);
		document.querySelector(id).scrollIntoView({behavior: 'smooth'});
	}
	;

});


tabsContainer.addEventListener('click', function (e) {
	const clicked = e.target.closest('.operations__tab');
	// console.log(clicked);
	if (!clicked) return;

	tabs.forEach(t => t.classList.remove);
	clicked.classList.add('operations__tab--active');
	tabsContent.forEach(c => c.classList.remove('operations__content--active'));
	// console.log(clicked.dataset.tab)
	document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

});


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


const intialCoords = section1.getBoundingClientRect();
// console.log(intialCoords)
window.addEventListener('scroll', function (e) {
	if (window.scrollY > intialCoords.top) nav.classList.add('sticky');
	else nav.classList.remove('sticky');
});

const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight)

const stickyNav = function (entries){
	const [entry] = entries;
	// console.log(entry);

	if(!entry.isIntersecting) nav.classList.add('sticky');
	else nav.classList.remove('sticky')

	nav.classList.add('sticky');
}
const headerObsrver = new IntersectionObserver(stickyNav,{
	root: null,
	threshold: 0,
	rootMargin: `-${navHeight}px`,
});
headerObsrver.observe(header)
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

