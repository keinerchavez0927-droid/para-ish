/* ==========================================================
   ✏️  AQUÍ EDITAS TU CONTENIDO
   ========================================================== */

// 14 frases que flotan junto a Snoopy y las rosas
const FRASES = [
  "TE AMOOOO MI ISHITA",
  "ERES LA MEJOR NOVIA DEL MUNDO",
  "MI ESTRELLITA",
  "LA DUEÑA DE MI CORAZÓN",
  "QUELO UNA Y MIL VIDAS CONTIGO",
  "QUE BONITO ES VER EL BRILLO DE TUS OJOS",
  "ERES LA CAUSA DE MI FELICIDAD",
  "LA MAS INTELIGENTE",
  "UNICA EN EL UNIVERSO",
  "DUEÑA DE MI MUNDO",
  "CONTIGO TODO ES MAS BONITO",
  "MI LUGAR FAVORITO ES DONDE ESTES TÚ",
];

// Fotos: pon tus imágenes en images/fotos/ con estos nombres
// (o cambia los nombres). Para 14 fotos, agrega dos líneas más.
const FOTOS = [
  { src: "images/fotos/foto1.jpg" },
  { src: "images/fotos/foto2.jpg" },
  { src: "images/fotos/foto3.jpg" },
  { src: "images/fotos/foto4.jpg" },
  { src: "images/fotos/foto5.jpg" },
  { src: "images/fotos/foto6.jpg" },
  { src: "images/fotos/foto7.jpg" },
  { src: "images/fotos/foto8.jpg" },
  { src: "images/fotos/foto9.jpg" },
  { src: "images/fotos/foto10.jpg" },
  { src: "images/fotos/foto11.jpg" },
  { src: "images/fotos/foto12.jpg" }
];

/* ==========================================================
   LÓGICA (no necesitas tocar de aquí para abajo)
   ========================================================== */

// Si falta una imagen, muestra un cuadro con el nombre del archivo que debes poner
function ph(img) {
  const div = document.createElement("div");
  div.className = "ph";
  div.textContent = "Pon aquí: " + img.getAttribute("src");
  div.dataset.src = img.getAttribute("src");
  img.replaceWith(div);
}

const $ = (id) => document.getElementById(id);
const on = (id, ev, fn) => { const el = $(id); if (el) el.addEventListener(ev, fn); };

/* ---------- index.html: Sí / No ---------- */
let intentoNo = false;
on("btn-si", "click", () => (location.href = "amor.html"));
on("btn-no", "click", () => {
  if (!intentoNo) {
    // Primera vez: mensaje tierno y el "No" se convierte en "Sí"
    intentoNo = true;
    $("mensaje-no").hidden = false;
    const no = $("btn-no");
    no.textContent = "Sí";
    no.className = "btn btn-si";
    $("btn-si").classList.add("btn-grande");
  } else {
    location.href = "amor.html";
  }
});

/* ---------- musica.html ---------- */
const audio = $("audio");
if (audio) {
  on("btn-play", "click", () => {
    if (audio.paused) {
      audio.play().catch(() => alert("No encuentro la canción. Pon tu archivo en music/cancion.mp3"));
      $("disco").classList.add("girando");
      $("btn-play").textContent = "⏸ Pausar";
    } else {
      audio.pause();
      $("disco").classList.remove("girando");
      $("btn-play").textContent = "▶ Reproducir";
    }
  });
}

/* ---------- rosas.html: frases flotantes ---------- */
if ($("frases-capa")) {
  const capa = $("frases-capa");
  let i = 0;
  const lanzar = () => {
    const f = document.createElement("span");
    f.className = "frase";
    f.textContent = FRASES[i % FRASES.length];
    f.style.left = 3 + Math.random() * 25 + "%";
    f.style.animationDuration = 8 + Math.random() * 3 + "s";
    capa.appendChild(f);
    setTimeout(() => f.remove(), 12000);
    i++;
  };
  lanzar();
  setInterval(lanzar, 1600);
}

/* ---------- fotos.html: galería ---------- */
if ($("galeria")) {
  FOTOS.forEach((f, i) => {
    const b = document.createElement("button");
    b.className = "foto";
    b.setAttribute("aria-label", "Ver foto " + (i + 1));
    b.innerHTML = `<img src="${f.src}" alt="Foto ${i + 1} de nosotros" onerror="ph(this)" />`;
    b.addEventListener("click", () => {
      $("visor-contenido").innerHTML = `<img src="${f.src}" alt="Foto ${i + 1}" onerror="ph(this)" />`;
      $("visor").hidden = false;
    });
    $("galeria").appendChild(b);
  });
  on("visor-cerrar", "click", () => ($("visor").hidden = true));
  on("visor", "click", (e) => { if (e.target.id === "visor") $("visor").hidden = true; });
}

/* ---------- vela.html ---------- */
on("btn-soplar", "click", () => {
  $("llama").classList.add("apagada");
  $("humo").classList.add("sale");
  $("btn-soplar").hidden = true;
  $("vela-texto").textContent = "¡Tu deseo se cumplirá! 💖";
  lluviaDeCorazones();
  setTimeout(() => ($("btn-carta").hidden = false), 1200);
});

function lluviaDeCorazones() {
  const emojis = ["💖", "💕", "💗", "🌹", "✨"];
  for (let i = 0; i < 30; i++) {
    const h = document.createElement("span");
    h.className = "corazon";
    h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    h.style.left = Math.random() * 100 + "%";
    h.style.animationDuration = 2.5 + Math.random() * 2.5 + "s";
    h.style.animationDelay = Math.random() * 1.2 + "s";
    $("confeti").appendChild(h);
    setTimeout(() => h.remove(), 7000);
  }
}
