<<<<<<< HEAD
=======
/**
 * Applique le thème (light ou dark) au body et met à jour
 * l'icône/texte du bouton toggle dans la navbar.
 * @param {string} theme - "dark" ou "light"
 */
function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
 
  /* Met à jour l'icône du bouton toggle (si présent dans la page) */
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    /* Icône soleil en dark mode, lune en light mode */
    toggleBtn.innerHTML = theme === 'dark'
      ? '<i class="bi bi-sun-fill" aria-hidden="true"></i>'
      : '<i class="bi bi-moon-fill" aria-hidden="true"></i>';
 
    /* Accessibilité : met à jour le label du bouton */
    toggleBtn.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'
    );
  }
}
 
/**
 * Bascule entre le mode clair et le mode sombre,
 * sauvegarde le choix dans localStorage.
 */
function toggleTheme() {
  /* Lit le thème actuel depuis localStorage (défaut : "light") */
  const currentTheme = localStorage.getItem('theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
 
  /* Sauvegarde et applique le nouveau thème */
  localStorage.setItem('theme', newTheme);
  applyTheme(newTheme);
}
 
/* --- Initialisation du Dark Mode au chargement de la page --- */
(function initTheme() {
  /* Récupère le thème sauvegardé, ou "light" par défaut */
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);
})();
 
/* --- Attache l'événement click sur le bouton toggle --- */
document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTheme);
  }
});
 
 
/* -----------------------------------------------------------
   2. NAVBAR DYNAMIQUE AU SCROLL
   La navbar change de style (fond, ombre) quand l'utilisateur
   fait défiler la page vers le bas (seuil : 80px).
   La classe "navbar-scrolled" est ajoutée/retirée sur #main-navbar.
   Le CSS du commit 3 gère l'apparence visuelle de cette classe.
   ----------------------------------------------------------- */
 
/**
 * Gère le style de la navbar en fonction de la position du scroll.
 * Appelée à chaque événement "scroll" sur window.
 */
function handleNavbarScroll() {
  const navbar = document.getElementById('main-navbar');
  if (!navbar) return; /* Sécurité : sort si la navbar n'existe pas */
 
  /* Seuil en pixels à partir duquel la navbar change de style */
  const SCROLL_THRESHOLD = 80;
 
  if (window.scrollY > SCROLL_THRESHOLD) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }
}
 
/* Écoute l'événement scroll sur window */
window.addEventListener('scroll', handleNavbarScroll, { passive: true });
 
/* Appel immédiat pour gérer le cas où la page est rechargée en milieu de scroll */
handleNavbarScroll();
 
 
/* -----------------------------------------------------------
   3. BOUTON "RETOUR EN HAUT"
   Le bouton apparaît quand l'utilisateur descend de plus de 300px.
   Un clic remonte la page en douceur (smooth scroll natif CSS déjà activé).
   Le bouton doit avoir l'id "back-to-top" dans le HTML.
   ----------------------------------------------------------- */
 
/**
 * Affiche ou masque le bouton "Retour en haut"
 * selon la position du scroll.
 */
function handleBackToTopVisibility() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
 
  /* Seuil : le bouton apparaît après 300px de scroll */
  const SHOW_THRESHOLD = 300;
 
  if (window.scrollY > SHOW_THRESHOLD) {
    btn.classList.add('visible');    /* Classe CSS qui le rend visible  */
  } else {
    btn.classList.remove('visible'); /* Caché par défaut                */
  }
}
 
/**
 * Remonte la page en douceur vers le haut.
 * Utilise scrollTo avec behavior: 'smooth' (scroll-behavior: smooth
 * est déjà activé en CSS sur html, mais on le force ici pour
 * compatibilité avec les anciens navigateurs).
 */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
 
/* --- Initialisation du bouton "Retour en haut" au chargement --- */
document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('back-to-top');
  if (btn) {
    btn.addEventListener('click', scrollToTop);
  }
});
 
/* Écoute le scroll pour la visibilité du bouton */
window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });
 
/* Appel immédiat */

handleBackToTopVisibility();


handleBackToTopVisibility();

>>>>>>> 6e4658c (temp)
