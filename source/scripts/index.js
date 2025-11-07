const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--no-js');

navToggle.addEventListener('click', () => {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
    navToggle.classList.remove('main-nav__toggle--open');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
    navToggle.classList.add('main-nav__toggle--open');
  }
});


const slider = document.querySelector('.slider');
const sliderContainer = slider?.querySelector('.slider__container');
const sliderButton = slider?.querySelector('.slider__button');
const sliderBefore = slider?.querySelector('.slider__before');
const sliderAfter = slider?.querySelector('.slider__after');

if (sliderContainer && sliderButton && sliderBefore && sliderAfter) {
  let isDragging = false;

  const updateSliderPosition = (clientX) => {
    const containerRect = sliderContainer.getBoundingClientRect();
    const containerWidth = containerRect.width;
    let position = clientX - containerRect.left;

    position = Math.max(0, Math.min(position, containerWidth));

    const percentage = (position / containerWidth) * 100;

    sliderBefore.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    sliderAfter.style.clipPath = `inset(0 0 0 ${percentage}%)`;
    sliderButton.style.left = `${percentage}%`;
  };

  const handleMove = (clientX) => {
    if (!isDragging) {
      return;
    }
    updateSliderPosition(clientX);
  };

  const startDragging = () => {
    isDragging = true;
  };

  const stopDragging = () => {
    isDragging = false;
  };

  sliderButton.addEventListener('mousedown', startDragging);
  sliderButton.addEventListener('touchstart', startDragging, { passive: true });

  document.addEventListener('mousemove', (e) => handleMove(e.clientX));
  document.addEventListener('touchmove', (e) => handleMove(e.touches[0].clientX), { passive: true });

  document.addEventListener('mouseup', stopDragging);
  document.addEventListener('touchend', stopDragging);

  sliderContainer.addEventListener('click', (e) => {
    if (e.target !== sliderButton) {
      updateSliderPosition(e.clientX);
    }
  });
}
