// ══════════════════════════════════════════
//  ENVIAR FORMULARIO DIRECTO A TU WHATSAPP
// ══════════════════════════════════════════
const form = document.getElementById('formParticipacion');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('i_nombre').value.trim();
    const correo = document.getElementById('i_correo').value.trim();
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value.trim();

    // 📱 Tu número real de WhatsApp configurado (Colombia: 57)
    const miNumeroWhatsApp = '573138672126'; 

    if (!nombre || !correo) {
      alert('Por favor completa los campos obligatorios.');
      return;
    }

    // Armamos el texto formateado que te llegará al WhatsApp
    let textoWhatsApp = `*¡Nuevo mensaje desde Doble Mundo Alemán!* 🇩🇪\n\n`;
    textoWhatsApp += `👤 *Nombre:* ${nombre}\n`;
    textoWhatsApp += `📧 *Correo:* ${correo}\n`;
    textoWhatsApp += `📌 *Asunto:* ${asunto}\n`;
    if (mensaje) {
      textoWhatsApp += `💬 *Mensaje/Propuesta:* ${mensaje}\n`;
    }

    // Convertimos el texto a un formato compatible con enlaces/URLs
    const mensajeCodificado = encodeURIComponent(textoWhatsApp);

    // Creamos la URL directa a tu WhatsApp
    const urlWhatsApp = `https://wa.me/${miNumeroWhatsApp}?text=${mensajeCodificado}`;

    // Abrimos WhatsApp en una nueva pestaña
    window.open(urlWhatsApp, '_blank');

    alert('¡Muchas gracias, ' + nombre + '! Serás redirigido a WhatsApp para enviar tu mensaje.');
    form.reset();
  });
}

// ══════════════════════════════════════════
//  TYPEWRITER (Efecto Mecanografía — Alemán)
// ══════════════════════════════════════════
const frases = [
  '"Die Grenzen meiner Sprache bedeuten die Grenzen meiner Welt."',
  'Aprende vocabulario, fonética y cultura alemana.',
  'Módulos interactivos · Expresión oral · Práctica guiada',
  '"Guten Tag!" — Empieza tu viaje lingüístico hoy.',
  'Doble Mundo Alemán · Centro de Interés'
];
let fi = 0, ci = 0, del = false;
const tw = document.getElementById('typewriter');

function typeIt() {
  if (!tw) return;
  const f = frases[fi];
  if (!del) {
    tw.textContent = f.slice(0, ++ci);
    if (ci === f.length) {
      del = true;
      setTimeout(typeIt, 2400);
      return;
    }
  } else {
    tw.textContent = f.slice(0, --ci);
    if (ci === 0) {
      del = false;
      fi = (fi + 1) % frases.length;
    }
  }
  setTimeout(typeIt, del ? 36 : 80);
}
if (tw) typeIt();

// ══════════════════════════════════════════
//  TIMELINE SCROLL (Efectos en Tarjetas)
// ══════════════════════════════════════════
const itemsTimeline = document.querySelectorAll('.tarjeta');
if (itemsTimeline.length > 0) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: .15 });
  itemsTimeline.forEach((el) => obs.observe(el));
}

// ══════════════════════════════════════════
//  BURBUJAS DE SCROLL (DATOS CURIOSOS)
// ══════════════════════════════════════════
const bubbles = [
  { t: "El alemán tiene tres géneros gramaticales: masculino (der), femenino (die) y neutro (das).", a: "Gramática" },
  { t: "En alemán, los sustantivos siempre se escriben con la primera letra en mayúscula.", a: "Ortografía" },
  { t: "Muchas palabras alemanas se unen para formar términos muy largos y específicos.", a: "Curiosidad" },
  { t: "El idioma alemán se habla en países como Alemania, Austria, Suiza, Liechtenstein y Luxemburgo.", a: "Geografía" },
  { t: "Practicar la pronunciación en voz alta ayuda a entrenar los músculos de la boca para nuevos sonidos.", a: "Fonética" },
  { t: "Las dinámicas de grupo facilitan la memorización de vocabulario cotidiano.", a: "Metodología" }
];

let lastBIdx = -1, bTimer = null;
const sb = document.getElementById('scrollBubble');

function showBubble() {
  if (!sb) return;
  let i;
  do { i = Math.floor(Math.random() * bubbles.length); } while (i === lastBIdx);
  lastBIdx = i;
  const txtEl = document.getElementById('bubbleTxt');
  const authEl = document.getElementById('bubbleAuthor');
  if (txtEl) txtEl.textContent = '"' + bubbles[i].t + '"';
  if (authEl) authEl.textContent = '— ' + bubbles[i].a;
  sb.classList.add('show');
  clearTimeout(bTimer);
  bTimer = setTimeout(() => sb.classList.remove('show'), 5500);
}

if (sb) {
  let lastSY = 0, throttle = false;
  window.addEventListener('scroll', () => {
    if (throttle) return;
    throttle = true;
    setTimeout(() => throttle = false, 1400);
    if (window.scrollY > 300 && Math.abs(window.scrollY - lastSY) > 180) {
      lastSY = window.scrollY;
      showBubble();
    }
  });
}

// ══════════════════════════════════════════
//  DESPLAZAMIENTO SUAVE (SMOOTH SCROLL)
// ══════════════════════════════════════════
document.querySelectorAll('nav a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});
