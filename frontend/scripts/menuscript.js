const menuToggle = document.querySelector('.menu-toggle input');
const menu = document.querySelector('nav ul');

menuToggle.addEventListener('click', function() {
  if (menu.style.display === 'flex') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'flex';
  }
});
