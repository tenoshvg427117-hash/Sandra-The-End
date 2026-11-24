
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
