/* Galería dinámica, lightbox accesible y pequeñas mejoras de navegación. */
const gallery = document.querySelector('[data-gallery]');
const hero = document.querySelector('[data-hero-image]');
const lightbox = document.querySelector('[data-lightbox]');
let photos = [], activeIndex = 0, touchStartX = 0, lastTrigger;
function imageMarkup(photo, heroImage = false) {
  const attrs = heroImage ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"';
  const sizes = heroImage ? '(min-width: 700px) 50vw, 100vw' : '(min-width: 700px) 33vw, 50vw';
  return `<img src="${photo.src}" srcset="${photo.srcset}" sizes="${sizes}" width="${photo.width}" height="${photo.height}" alt="${photo.alt}" ${attrs}>`;
}
function show(index) { activeIndex = (index + photos.length) % photos.length; const photo = photos[activeIndex]; lightbox.querySelector('img').outerHTML = imageMarkup(photo); lightbox.querySelector('[data-caption]').textContent = photo.alt; }
function openLightbox(index, trigger) { lastTrigger = trigger; show(index); lightbox.hidden = false; document.body.style.overflow = 'hidden'; lightbox.querySelector('[data-close]').focus(); }
function closeLightbox() { lightbox.hidden = true; document.body.style.overflow = ''; lastTrigger?.focus(); }
function loadGallery(data) {
  if (data.hero && hero) { hero.innerHTML = imageMarkup(data.hero, true); hero.classList.remove('hero__media--placeholder'); }
  photos = data.photos || [];
  if (!photos.length) { gallery.innerHTML = '<p class="gallery__empty">Próximamente se mostrarán algunos trabajos realizados.</p>'; return; }
  gallery.innerHTML = photos.map((photo, index) => `<button class="gallery__item" type="button" aria-label="Ampliar imagen ${index + 1} de ${photos.length}" data-index="${index}">${imageMarkup(photo)}</button>`).join('');
  gallery.querySelectorAll('button').forEach((button) => button.addEventListener('click', () => openLightbox(Number(button.dataset.index), button)));
}
fetch('assets/img/gallery.json').then((response) => response.ok ? response.json() : Promise.reject()).then(loadGallery).catch(() => { gallery.innerHTML = '<p class="gallery__empty">Próximamente se mostrarán algunos trabajos realizados.</p>'; });
document.querySelector('[data-close]').addEventListener('click', closeLightbox);
document.querySelector('[data-prev]').addEventListener('click', () => show(activeIndex - 1));
document.querySelector('[data-next]').addEventListener('click', () => show(activeIndex + 1));
document.addEventListener('keydown', (event) => { if (lightbox.hidden) return; if (event.key === 'Escape') closeLightbox(); if (event.key === 'ArrowLeft') show(activeIndex - 1); if (event.key === 'ArrowRight') show(activeIndex + 1); });
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
lightbox.addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0].screenX; }, { passive:true });
lightbox.addEventListener('touchend', (event) => { const distance = event.changedTouches[0].screenX - touchStartX; if (Math.abs(distance) > 45) show(activeIndex + (distance < 0 ? 1 : -1)); }, { passive:true });
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold:.12 });
document.querySelectorAll('[data-reveal]').forEach((item) => observer.observe(item));
window.addEventListener('scroll', () => document.querySelector('.site-header').classList.toggle('is-scrolled', scrollY > 5), { passive:true });
document.querySelector('#year').textContent = new Date().getFullYear();
