window.onload = () => {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const next = document.querySelector('.button-next');
  const prev = document.querySelector('.button-prev');

  let index = 0;
  const slideWidth = slides[0].getBoundingClientRect().width;

  slides.forEach((slide, i) => {
    slide.style.left = slideWidth * i + 'px';
  });

  function moveCarousel() {
    track.style.transform = `translateX(-${slideWidth * index}px)`;
  }

  next.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    moveCarousel();
  });

  prev.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    moveCarousel();
  });

  setInterval(() => {
    index = (index + 1) % slides.length;
    moveCarousel();
  }, 5000);
};
