document.addEventListener('DOMContentLoaded', (event) => {
	const cursorOuter = document.querySelector('.cursor--large');
	const cursorInner = document.querySelector('.cursor--small');

	const { gsap, Splitting } = window;

	Splitting();

	var interact = false;

	let mouse = {
		x: -100,
		y: -100,
	};

	let scrollHeight = 0;

	window.addEventListener('scroll', function (e) {
		scrollHeight = window.scrollY;
	});

	let cursorOuterOriginalState = {
		width: cursorOuter.getBoundingClientRect().width,
		height: cursorOuter.getBoundingClientRect().height,
		color: cursorOuter.style.backgroundColor,
	};

	let cursorInnerOriginalState = {
		width: cursorInner.getBoundingClientRect().width,
		height: cursorInner.getBoundingClientRect().height,
		color: cursorInner.style.backgroundColor,
	};

	const image = document.querySelectorAll('.picture');
	image.forEach((image) => {
		image.addEventListener('pointerenter', handleMouseEnter);
		image.addEventListener('pointerleave', handleMouseLeave);
	});

	document.body.addEventListener('pointermove', updateCursorPosition);

	document.body.addEventListener('pointerdown', (event) => {
		gsap.to(cursorOuter, 0.15, {
			scale: 0.5,
		});
	});

	document.body.addEventListener('pointerup', () => {
		gsap.to(cursorOuter, 0.15, {
			scale: 1,
		});
	});

	function updateCursorPosition(e) {
		mouse.x = e.pageX;
		mouse.y = e.pageY;
	}

	function updateCursor() {
		gsap.to(cursorInner, 0.1, {
			x: mouse.x,
			y: mouse.y,
		});

		gsap.to(cursorOuter, 0.5, {
			x: mouse.x - cursorOuterOriginalState.width * (interact ? 4 : 0.5),
			y: mouse.y - cursorOuterOriginalState.height * (interact ? 4 : 0.5),
		});

		requestAnimationFrame(updateCursor);
	}

	updateCursor();

	function handleMouseEnter(event) {
		interact = true;

		gsap.to(cursorOuter, 0.2, {
			border: 0,
			width: cursorOuterOriginalState.width * 8,
			height: cursorOuterOriginalState.height * 8,

			x: mouse.x - cursorOuterOriginalState.width,
			y: mouse.y - cursorOuterOriginalState.width,

			filter: 'blur(50px)',
			mixBlendMode: 'lighten',
			backgroundColor: 'rgba(255, 255, 255, .25)',
		});

		gsap.to(cursorInner, 0.2, {
			width: 0,
			height: 0,
		});
	}

	function handleMouseLeave(event) {
		interact = false;

		gsap.to(cursorOuter, 0.2, {
			border: '1px solid black',

			width: cursorOuterOriginalState.width,
			height: cursorOuterOriginalState.height,
			backgroundColor: cursorOuterOriginalState.color,

			filter: 'none',
			mixBlendMode: 'none',
		});

		gsap.to(cursorInner, 0.2, {
			width: cursorInnerOriginalState.width,
			height: cursorInnerOriginalState.height,
		});
	}

	const backToTop = document.querySelector('.back-to-top');

	window.addEventListener('scroll', () => {
		if (window.scrollY > 250) {
			backToTop.classList.remove('hide');
		} else {
			backToTop.classList.add('hide');
		}
	});
});

console.clear();

const { gsap, Splitting } = window;

Splitting();

gsap.set('.cards__wrapper', { autoAlpha: 1 });

gsap.timeline({
	defaults: {
		duration: 1.25,
		stagger: 0.125,
		ease: 'expo.inOut',
	},
})
	.fromTo('.card__image--wrapper', { yPercent: 110 }, { yPercent: 0 }, 0)
	.fromTo('.card__image--outer', { yPercent: -110 }, { yPercent: 0 }, 0)
	.set('.cards__wrapper, .card', { pointerEvents: 'all' }, '-=1');
