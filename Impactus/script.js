//MODALIDADES

const modalities = [
  { id: 'boxe', name: 'Boxe', category: 'lutas', image: 'boxe.webp', short: 'Técnica de golpes, jogo de pernas e alto gasto calórico.', description: 'Fundamentos de boxe com foco em técnica de golpes, esquiva e jogo de pernas. Uma aula de alta intensidade que trabalha condicionamento, coordenação e confiança — sem foco em competição.' },
  { id: 'muaythai', name: 'Muay Thai', category: 'lutas', image: 'muaythai.webp', short: 'A arte das oito armas com foco em fundamentos e disciplina.', description: 'Prioridade aos fundamentos técnicos do Muaythai. Foco na evolução do aluno com aprendizado, prática e acompanhamento. Preparação para graduação opcional. Ensino focado em disciplina, não em competição.' },
  { id: 'muaythaikids', name: 'Muay Thai Kids', category: 'lutas', image: 'muaythaikids.webp', short: 'Segurança, atenção e acolhimento para crianças a partir de 8 anos.', description: 'Aulas formativas e lúdicas desenhadas exclusivamente para os pequenos. Ensinamos coordenação motora, respeito e disciplina da arte marcial em um ambiente 100% seguro, familiar e monitorado de perto.' },
  { id: 'nogi', name: 'Grappling / No-Gi', category: 'lutas', image: 'nogi.webp', short: 'Controle de solo, alavancas e estratégia corporal.', description: 'Fundamentos de lutas de agarre. Excelente para raciocínio tático aliado à resistência física e ao controle sob pressão.' },
];

const categoryLabels = { 'lutas': 'Lutas', 'corpo-mente': 'Corpo & Mente' };


//RENDERIZAÇÃO: MODALIDADES E FILTROS
function renderModalities() {
  const grid = document.getElementById('modalities-grid');
  grid.innerHTML = modalities.map(m => `
    <article class="modality-card bg-paper border border-line flex flex-col" data-category="${m.category}">
      <div class="w-full aspect-[4/3] relative overflow-hidden bg-line">
        <img src="${m.image}" alt="${m.name}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
      </div>
      <div class="p-6 flex flex-col flex-1">
        <p class="text-xs uppercase tracking-[0.14em] text-bronze font-semibold mb-2">${categoryLabels[m.category]}</p>
        <h3 class="font-display font-bold text-xl text-ink mb-2.5">${m.name}</h3>
        <p class="text-graphite text-sm leading-relaxed mb-6 flex-1">${m.short}</p>
        <button data-modal-id="${m.id}" class="open-modal-btn text-sm font-semibold text-ink border-b border-ink pb-0.5 self-start hover:text-bronze hover:border-bronze transition-colors duration-300">Saber mais / Grade</button>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.modalId));
  });
}

//botões de filtro
const filterTabs = document.getElementById('filter-tabs');
filterTabs.addEventListener('click', (e) => {
  const btn = e.target.closest('.tab-btn');
  if (!btn) return;
  
  filterTabs.querySelectorAll('.tab-btn').forEach(b => b.dataset.active = 'false');
  btn.dataset.active = 'true';
  
  const filter = btn.dataset.filter;
  document.querySelectorAll('.modality-card').forEach(card => {
    card.dataset.hidden = (filter === 'todas' || card.dataset.category === filter) ? 'false' : 'true';
  });
});


//saber mais
const backdrop = document.getElementById('modal-backdrop');
const panel = document.getElementById('modal-panel');

function openModal(id) {
  const m = modalities.find(x => x.id === id);
  if (!m) return;
  
  // Preenche os textos do modal com os dados da modalidade clicada
  document.getElementById('modal-category').textContent = categoryLabels[m.category];
  document.getElementById('modal-title').textContent = m.name;
  document.getElementById('modal-description').textContent = m.description;
  
  // Animação de abertura
  backdrop.classList.remove('hidden');
  requestAnimationFrame(() => {
    backdrop.classList.add('flex');
    backdrop.style.opacity = '1';
    panel.style.opacity = '1';
    panel.style.transform = 'scale(1)';
  });
  document.body.style.overflow = 'hidden'; // Trava o scroll do site
}

function closeModal() {
  // Animação de fechamento
  backdrop.style.opacity = '0';
  panel.style.opacity = '0';
  panel.style.transform = 'scale(0.95)';
  setTimeout(() => {
    backdrop.classList.add('hidden');
    backdrop.classList.remove('flex');
    document.body.style.overflow = ''; // Destrava o scroll do site
  }, 250);
}

// Eventos para fechar o modal (Clicar no X, clicar fora da caixa ou apertar ESC)
document.getElementById('modal-close').addEventListener('click', closeModal);
backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeModal(); });
document.getElementById('modal-cta').addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });


// grade de horarios
const schedule = [
  { 
    day: 'Segunda', 
    classes: [
      { time: '08h00', name: 'Muay Thai / Boxe', level: 'Iniciantes' }, 
      { time: '09h00', name: 'Grupos Pequenos', level: 'Até 8 alunos' }, 
      { time: '16h00', name: 'Grupos Pequenos', level: 'Até 8 alunos' }, 
      { time: '17h00', name: 'Grupos Pequenos', level: 'Até 8 alunos' }, 
      { time: '18h00', name: 'Muay Thai / Boxe', level: 'Iniciantes' }, 
      { time: '19h00', name: 'Muay Thai / Boxe', level: 'Todos os níveis' }
    ] 
  },
  { 
    day: 'Terça', 
    classes: [
      { time: '09h00', name: 'Grupos Pequenos', level: 'Até 8 alunos' },
      { time: '16h00', name: 'Grupos Pequenos', level: 'Até 8 alunos' },
      { time: '17h00', name: 'Grupos Pequenos', level: 'Até 8 alunos' },
      { time: '18h00', name: 'Muay Thai Kids', level: '6 a 11 anos' },
      { time: '19h00', name: 'Muay Thai', level: 'Todos os níveis' },
      { time: '20h00', name: 'Muay Thai / Boxe', level: 'Iniciante / Todos' }
    ] 
  },
  { 
    day: 'Quarta', 
    classes: [
      { time: '08h00', name: 'Muay Thai / Boxe', level: 'Iniciantes' }, 
      { time: '09h00', name: 'Grupos Pequenos', level: 'Até 8 alunos' }, 
      { time: '16h00', name: 'Grupos Pequenos', level: 'Até 8 alunos' }, 
      { time: '17h00', name: 'Grupos Pequenos', level: 'Até 8 alunos' }, 
      { time: '18h00', name: 'Muay Thai / Boxe', level: 'Iniciantes' }, 
      { time: '19h00', name: 'Muay Thai / Boxe', level: 'Todos os níveis' }
    ] 
  },
  { 
    day: 'Quinta', 
    classes: [
      { time: '09h00', name: 'Grupos Pequenos', level: 'Até 8 alunos' },
      { time: '16h00', name: 'Grupos Pequenos', level: 'Até 8 alunos' },
      { time: '17h00', name: 'Grupos Pequenos', level: 'Até 8 alunos' },
      { time: '18h00', name: 'Muay Thai Kids', level: '6 a 11 anos' },
      { time: '19h00', name: 'Muay Thai', level: 'Todos os níveis' },
      { time: '20h00', name: 'Muay Thai / Boxe', level: 'Iniciante / Todos' }
    ] 
  },
  { 
    day: 'Sexta', 
    classes: [
      { time: '09h00', name: 'Grupos Pequenos', level: 'Até 8 alunos' },
      { time: '16h00', name: 'Grupos Pequenos', level: 'Até 8 alunos' },
      { time: '17h00', name: 'Grupos Pequenos', level: 'Até 8 alunos' },
      { time: '19h00', name: 'Muay Thai / Boxe', level: 'Todos os níveis' }
    ] 
  }
];

//renderizaçao grade de horarios

function renderSchedule() {
  const grid = document.getElementById('schedule-grid');
  grid.innerHTML = schedule.map(d => `
    <div class="bg-paper border border-line p-5">
      <p class="font-display font-bold text-ink mb-4 pb-3 border-b border-line">${d.day}</p>
      <ul class="space-y-3">
        ${d.classes.map(c => `<li class="text-sm"><p class="text-bronze font-semibold text-xs">${c.time}</p><p class="text-ink font-medium">${c.name}</p><p class="text-mist text-xs">${c.level}</p></li>`).join('')}
      </ul>
    </div>
  `).join('');
}

//carregamento site
renderModalities();
renderSchedule();

// controle do menu mobile
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const bars = document.querySelectorAll('.menu-bar');
let menuOpen = false;

menuToggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  menuToggle.setAttribute('aria-expanded', menuOpen);
  if (menuOpen) {
    mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
    mobileMenu.style.opacity = '1';
    bars[0].style.transform = 'translateY(6.5px) rotate(45deg)';
    bars[1].style.opacity = '0';
    bars[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
  } else {
    mobileMenu.style.maxHeight = '0';
    mobileMenu.style.opacity = '0';
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
  }
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.style.maxHeight = '0';
    mobileMenu.style.opacity = '0';
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
  });
});


//rolar tela
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));