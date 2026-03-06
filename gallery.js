// Gallery Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const category = this.getAttribute('data-category');
            filterGallery(category);
        });
    });
});

function filterGallery(category) {
    const sections = document.querySelectorAll('[id$="-section"]');
    if (category === 'all') {
        sections.forEach(section => section.style.display = 'block');
    } else {
        sections.forEach(section => {
            if (section.id === `${category}-section`) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    }
}

function viewImage(index) {
    alert('In a production environment, this would open a lightbox to view the full-size image.');
}

function downloadImage(index) {
    alert('In a production environment, this would download the selected image.');
}
// ── Infographic Slider ──
let currentSlide = 0;
const totalSlides = 5;
const track = document.getElementById('infographicTrack');
const dots  = document.querySelectorAll('.slider-dot');
let autoSlideTimer;

function updateSlider() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
    document.querySelector('.slider-prev').disabled = false;
    document.querySelector('.slider-next').disabled = false;
}

function slideInfographic(dir) {
    // Loop around instead of stopping at edges
    currentSlide = (currentSlide + dir + totalSlides) % totalSlides;
    updateSlider();
    resetAutoSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
    resetAutoSlide();
}

// ── Auto Slide ──
function startAutoSlide() {
    autoSlideTimer = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }, 3000); // every 3 seconds
}

function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
}

// Touch/swipe
let touchStartX = 0;
track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
track.addEventListener('touchend',   e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) slideInfographic(diff > 0 ? 1 : -1);
});

// Pause on hover
document.querySelector('.infographic-slider-wrapper').addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
document.querySelector('.infographic-slider-wrapper').addEventListener('mouseleave', startAutoSlide);

// Init
updateSlider();
startAutoSlide();

// ── Lightbox with Slider ──
function openLightbox(btn) {
    const card  = btn.closest('.infographic-card');
    const img   = card.querySelector('img');
    const title = card.querySelector('h4').textContent;

    document.getElementById('lightbox-img').src = img.src;
    document.getElementById('lightbox-img').alt = title;
    document.getElementById('lightbox-caption').textContent = title;
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';

    // Sync lightbox to current slide
    lightboxIndex = currentSlide;
    clearInterval(autoSlideTimer); // pause auto slide when lightbox open
}

// Also open lightbox on image click directly
document.querySelectorAll('.infographic-img img').forEach((img, i) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
        lightboxIndex = i;
        updateLightbox();
        document.getElementById('lightbox').classList.add('open');
        document.body.style.overflow = 'hidden';
        clearInterval(autoSlideTimer);
    });
});

// ── Lightbox Navigation ──
let lightboxIndex = 0;
const allImages = [
    { src: 'Images/Infographic1(Daily Life).png', title: 'AI in Daily Life' },
    { src: 'Images/Infographic2(Applicaton).png', title: 'AI Applications in Real Life' },
    { src: 'Images/Infographic3(Use Case).png', title: 'Daily Use Cases of AI' },
    { src: 'Images/Infographic4(Benefits).png', title: 'Main Benefits of AI' },
    { src: 'Images/Infographic5(Impact).png', title: 'Impact of AI in Our Lives' },
];

function updateLightbox() {
    const item = allImages[lightboxIndex];
    const imgEl = document.getElementById('lightbox-img');
    // Fade effect
    imgEl.style.opacity = '0';
    setTimeout(() => {
        imgEl.src = item.src;
        imgEl.alt = item.title;
        imgEl.style.opacity = '1';
    }, 150);
    document.getElementById('lightbox-caption').textContent =
        `${item.title}  (${lightboxIndex + 1} / ${totalSlides})`;
}

function lightboxSlide(dir) {
    lightboxIndex = (lightboxIndex + dir + totalSlides) % totalSlides;
    updateLightbox();
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
    startAutoSlide(); // resume auto slide
}

// Keyboard controls
document.addEventListener('keydown', e => {
    const isOpen = document.getElementById('lightbox').classList.contains('open');
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   isOpen ? lightboxSlide(-1) : slideInfographic(-1);
    if (e.key === 'ArrowRight')  isOpen ? lightboxSlide(1)  : slideInfographic(1);
});

// ── Poster Slider ──
let currentPoster = 0;
const totalPosters = 5;
const posterTrack = document.getElementById('posterTrack');
const posterDots  = document.querySelectorAll('.poster-dot');
let posterAutoTimer;

function updatePosterSlider() {
    posterTrack.style.transform = `translateX(-${currentPoster * 100}%)`;
    posterDots.forEach((dot, i) => dot.classList.toggle('active', i === currentPoster));
}

function slidePoster(dir) {
    currentPoster = (currentPoster + dir + totalPosters) % totalPosters;
    updatePosterSlider();
    resetPosterAuto();
}

function goToPoster(index) {
    currentPoster = index;
    updatePosterSlider();
    resetPosterAuto();
}

function startPosterAuto() {
    posterAutoTimer = setInterval(() => {
        currentPoster = (currentPoster + 1) % totalPosters;
        updatePosterSlider();
    }, 3500);
}

function resetPosterAuto() {
    clearInterval(posterAutoTimer);
    startPosterAuto();
}

// Pause on hover
document.getElementById('posterSliderWrapper').addEventListener('mouseenter', () => clearInterval(posterAutoTimer));
document.getElementById('posterSliderWrapper').addEventListener('mouseleave', startPosterAuto);

// Touch swipe
let posterTouchX = 0;
posterTrack.addEventListener('touchstart', e => { posterTouchX = e.touches[0].clientX; });
posterTrack.addEventListener('touchend',   e => {
    const diff = posterTouchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) slidePoster(diff > 0 ? 1 : -1);
});

// Init
updatePosterSlider();
startPosterAuto();

// ── Poster Lightbox ──
const posterImages = [...document.querySelectorAll('#posterTrack .infographic-card')].map(card => ({
    src:   card.querySelector('img').src,
    title: card.querySelector('h4').textContent
}));

let posterLightboxIndex = 0;

function openPosterLightbox(btn) {
    const card  = btn.closest('.infographic-card');
    const cards = [...document.querySelectorAll('#posterTrack .infographic-card')];
    posterLightboxIndex = cards.indexOf(card);
    updatePosterLightbox();
    document.getElementById('posterLightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
    clearInterval(posterAutoTimer);
}

document.querySelectorAll('#posterTrack .infographic-img img').forEach((img, i) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
        posterLightboxIndex = i;
        updatePosterLightbox();
        document.getElementById('posterLightbox').classList.add('open');
        document.body.style.overflow = 'hidden';
        clearInterval(posterAutoTimer);
    });
});

function updatePosterLightbox() {
    const item  = posterImages[posterLightboxIndex];
    const imgEl = document.getElementById('poster-lightbox-img');
    imgEl.style.opacity = '0';
    setTimeout(() => {
        imgEl.src = item.src;
        imgEl.alt = item.title;
        imgEl.style.opacity = '1';
    }, 150);
    document.getElementById('poster-lightbox-caption').textContent =
        `${item.title}  (${posterLightboxIndex + 1} / ${totalPosters})`;
}

function posterLightboxSlide(dir) {
    posterLightboxIndex = (posterLightboxIndex + dir + totalPosters) % totalPosters;
    updatePosterLightbox();
}

function closePosterLightbox() {
    document.getElementById('posterLightbox').classList.remove('open');
    document.body.style.overflow = '';
    startPosterAuto();
}