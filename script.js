// 1. LÓGICA PARA ABRIR EL SOBRE

const envelope = document.getElementById("envelope");

const musica = document.getElementById("musica");

envelope.addEventListener("click", () => {

  musica.play(); // 🎵 inicia música

  const tl = gsap.timeline();

  // Abrir solapa
  tl.to(".flap", {
    rotationX: 180,
    duration: 1,
    ease: "power2.inOut"
  });

  // Sacar carta
  tl.to(".letter", {
    y: -80,
    duration: 1,
    ease: "power2.out"
  });

  // Desvanecer loader
  tl.to("#loader", {
    opacity: 0,
    duration: 2,
    delay: 1,
    onComplete: () => {
      document.getElementById("loader").style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Mostrar contenido
  tl.to("#contenido", {
    opacity: 1,
    duration: 2
  });

});
// 2. CUENTA REGRESIVA
const weddingDate = new Date('December 12, 2026 17:00:00').getTime();

setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
        document.getElementById("days").innerHTML = Math.floor(distance / (1000 * 60 * 60 * 24));
        document.getElementById("hours").innerHTML = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById("minutes").innerHTML = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById("seconds").innerHTML = Math.floor((distance % (1000 * 60)) / 1000);
    }
}, 1000);


// 4. SLIDER
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const dotsContainer = document.querySelector('.dots');

let currentIndex = 0;
let autoPlayInterval;

// Crear dots dinámicamente
slides.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.addEventListener('click', () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dots span');

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  slides.forEach(slide => slide.classList.remove('active'));
  slides[currentIndex].classList.add('active');

  dots.forEach(dot => dot.classList.remove('active-dot'));
  dots[currentIndex].classList.add('active-dot');
}

function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Autoplay
function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 4000);
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

document.querySelector('.carousel')
  .addEventListener('mouseenter', stopAutoPlay);

document.querySelector('.carousel')
  .addEventListener('mouseleave', startAutoPlay);

updateCarousel();
startAutoPlay();
