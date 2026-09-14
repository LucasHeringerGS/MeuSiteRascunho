// Menu mobile
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // fecha o menu ao clicar em um link
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Ano dinâmico no rodapé
const anoEl = document.getElementById('ano');
if (anoEl) {
  anoEl.textContent = new Date().getFullYear();
}

// Carrossel de projetos/demonstrações
// Funciona com qualquer quantidade de cards — não precisa mexer aqui ao adicionar mais.
const track = document.getElementById('portfolioTrack');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');
const dotsWrap = document.getElementById('carouselDots');

if (track && prevBtn && nextBtn && dotsWrap) {
  const cards = Array.from(track.children);

  // cria um ponto de navegação para cada card
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Ir para o projeto ${i + 1}`);
    dot.addEventListener('click', () => {
      cards[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    });
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function activeIndex() {
    const trackLeft = track.scrollLeft;
    let closest = 0;
    let closestDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - trackLeft);
      if (dist < closestDist) { closestDist = dist; closest = i; }
    });
    return closest;
  }

  function updateControls() {
    const index = activeIndex();
    dots.forEach((d, i) => d.classList.toggle('active', i === index));

    const maxScroll = track.scrollWidth - track.clientWidth - 4;
    prevBtn.disabled = track.scrollLeft <= 4;
    nextBtn.disabled = track.scrollLeft >= maxScroll;
  }

  function scrollByCard(direction) {
    const index = Math.min(Math.max(activeIndex() + direction, 0), cards.length - 1);
    cards[index].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  }

  prevBtn.addEventListener('click', () => scrollByCard(-1));
  nextBtn.addEventListener('click', () => scrollByCard(1));
  track.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateControls);
  });

  updateControls();
  // esconde os controles se todos os cards já couberem na tela (nada a rolar)
  window.addEventListener('resize', () => {
    const hasOverflow = track.scrollWidth > track.clientWidth + 4;
    document.querySelector('.carousel-controls').style.display = hasOverflow ? 'flex' : 'none';
  });
  window.dispatchEvent(new Event('resize'));
}
