
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');

  toggle.setAttribute(
    'aria-expanded',
    String(open)
  );
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');

    toggle.setAttribute(
      'aria-expanded',
      'false'
    );

    document.querySelectorAll('.nav a').forEach(item => {
      item.classList.remove('active');
    });

    link.classList.add('active');
  });
});

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

const galleryData = {
  tardes: {
    title: "Las tardes juntos",
    description: "Esos días que siempre tendrán un lugar especial.",
    photos: [
      "fotos/tardes-1.jpg",
      "fotos/tardes-2.jpg",
      "fotos/tardes-3.jpg"
    ]
  },

  combinaciones: {
    title: "Nuestras combinaciones",
    description: "Pequeños gustos y anécdotas muy nuestras.",
    photos: [
      "fotos/comida-1.jpg",
      "fotos/comida-2.jpg",
      "fotos/comida-3.jpg"
    ]
  },

  peliculas: {
    title: "Videos y películas",
    description: "Historias que compartimos frente a una pantalla.",
    photos: [
      "fotos/peliculas-1.jpg",
      "fotos/peliculas-2.jpg",
      "fotos/peliculas-3.jpg"
    ]
  },

  aventuras: {
    title: "Pequeñas aventuras",
    description: "Lugares y momentos que se convirtieron en recuerdos.",
    photos: [
      "fotos/aventuras-1.jpg",
      "fotos/aventuras-2.jpg",
      "fotos/aventuras-3.jpg"
    ]
  }
};

const galleryView = document.getElementById("gallery-view");
const galleryTitle = document.getElementById("gallery-title");
const galleryDescription = document.getElementById("gallery-description");
const photoGrid = document.getElementById("photo-grid");
const backGallery = document.getElementById("back-gallery");
const memoryGrid = document.querySelector(".memory-grid");

function openGallery(name) {
  const gallery = galleryData[name];
  if (!gallery) return;

  galleryTitle.textContent = gallery.title;
  galleryDescription.textContent = gallery.description;
  photoGrid.replaceChildren();

  gallery.photos.forEach(path => {
    const img = document.createElement("img");
    img.src = path;
    img.alt = gallery.title;
    img.loading = "lazy";
    photoGrid.appendChild(img);
  });

  memoryGrid.hidden = true;
  galleryView.hidden = false;
  galleryView.scrollIntoView({ behavior: "smooth" });
}

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

backGallery.addEventListener("click", () => {
  galleryView.hidden = true;
  memoryGrid.hidden = false;
  memoryGrid.scrollIntoView({ behavior: "smooth" });
});
