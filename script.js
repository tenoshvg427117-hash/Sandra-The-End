
// ==========================================
// MENÚ DE NAVEGACIÓN
// ==========================================

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');

      document.querySelectorAll('.nav a').forEach(item => {
        item.classList.remove('active');
      });

      link.classList.add('active');
    });
  });
}


// ==========================================
// PÉTALOS FLOTANTES
// ==========================================

const petalContainer = document.getElementById('petals');

if (petalContainer) {
  for (let i = 0; i < 18; i++) {
    const petal = document.createElement('span');

    petal.className = 'petal';
    petal.textContent = '✿';

    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (8 + Math.random() * 10) + 's';
    petal.style.animationDelay = (Math.random() * 12) + 's';
    petal.style.fontSize = (10 + Math.random() * 10) + 'px';

    petalContainer.appendChild(petal);
  }
}


// ==========================================
// DATOS DE LAS GALERÍAS
// ==========================================

const galleryData = {

  // 31 FOTOGRAFÍAS
  tardes: {
    title: "Las tardes juntos",
    description: "Esos días que siempre tendrán un lugar especial.",

    photos: Array.from(
      { length: 31 },
      (_, i) => `fotos/tardes-${i + 1}.jpg.jpeg`
    )
  },


  // 10 FOTOGRAFÍAS
  combinaciones: {
    title: "Nuestras combinaciones",
    description: "Pequeños gustos y anécdotas muy nuestras.",

    photos: Array.from(
      { length: 10 },
      (_, i) => `fotos/comida-${i + 1}.jpg.jpeg`
    )
  },


  // 13 VIDEOS EXCLUSIVAMENTE
  peliculas: {
    title: "Nuestros videos",
    description: "Pequeños momentos que merecen volver a reproducirse.",

    videos: Array.from(
      { length: 13 },
      (_, i) => `videos/video-${i + 1}.mp4.mp4`
    )
  },


  // 16 FOTOGRAFÍAS
  aventuras: {
    title: "Pequeñas aventuras",
    description: "Lugares y momentos que se convirtieron en recuerdos.",

    photos: Array.from(
      { length: 16 },
      (_, i) => `fotos/aventuras-${i + 1}.jpg.jpeg`
    )
  }

};


// ==========================================
// ELEMENTOS DE LAS GALERÍAS
// ==========================================

const galleryView = document.getElementById("gallery-view");
const galleryTitle = document.getElementById("gallery-title");
const galleryDescription = document.getElementById("gallery-description");
const photoGrid = document.getElementById("photo-grid");
const backGallery = document.getElementById("back-gallery");
const memoryGrid = document.querySelector(".memory-grid");


// ==========================================
// ABRIR GALERÍAS
// ==========================================

function openGallery(name) {

  const gallery = galleryData[name];

  if (!gallery) return;

  galleryTitle.textContent = gallery.title;
  galleryDescription.textContent = gallery.description;

  photoGrid.replaceChildren();

  // MOSTRAR FOTOGRAFÍAS
  (gallery.photos || []).forEach((path, index) => {

    const img = document.createElement("img");

    img.src = path;
    img.alt = `${gallery.title} - Foto ${index + 1}`;
    img.loading = "lazy";

    img.onerror = () => {
      img.alt = "No se pudo cargar esta fotografía";
      img.style.display = "none";
    };

    photoGrid.appendChild(img);

  });


  // MOSTRAR VIDEOS
  (gallery.videos || []).forEach((path, index) => {

    const container = document.createElement("div");
    container.className = "video-card";

    const video = document.createElement("video");

    video.controls = true;
    video.preload = "metadata";
    video.playsInline = true;

    const source = document.createElement("source");

    source.src = path;
    source.type = "video/mp4";

    video.appendChild(source);

    const title = document.createElement("p");

    title.textContent = `Video ${index + 1}`;

    container.appendChild(video);
    container.appendChild(title);

    photoGrid.appendChild(container);

  });


  memoryGrid.hidden = true;
  galleryView.hidden = false;

  galleryView.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


// ==========================================
// CLIC EN LAS TARJETAS
// ==========================================

document.querySelectorAll(".memory-card[data-gallery]").forEach(card => {

  card.addEventListener("click", () => {
    openGallery(card.dataset.gallery);
  });

  card.addEventListener("keydown", event => {

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openGallery(card.dataset.gallery);
    }

  });

});


// ==========================================
// VOLVER A LOS RECUERDOS
// ==========================================

if (backGallery) {

  backGallery.addEventListener("click", () => {

    photoGrid.querySelectorAll("video").forEach(video => {
      video.pause();
    });

    galleryView.hidden = true;
    memoryGrid.hidden = false;

    memoryGrid.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

}
