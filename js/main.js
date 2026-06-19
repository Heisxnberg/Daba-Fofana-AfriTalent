
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
<<<<<<< HEAD

handleBackToTopVisibility();


handleBackToTopVisibility();

/* =============================================================
   COMMIT 7 : Compteurs animés + Animations fade-in au scroll
   ============================================================= */
 
/* -----------------------------------------------------------
   4. COMPTEURS ANIMÉS AU SCROLL
   ----------------------------------------------------------- */
 
/**
 * Anime un compteur de 0 jusqu'à sa valeur cible.
 * @param {HTMLElement} element - L'élément DOM dont le texte sera mis à jour
 * @param {number} target       - La valeur finale à atteindre
 * @param {number} duration     - Durée de l'animation en millisecondes
 */
function animateCounter(element, target, duration) {
  /* Valeur de départ */
  let current = 0;
 
  /* Nombre de mises à jour par seconde (60 fps) */
  const FPS = 60;
  const totalSteps = Math.ceil((duration / 1000) * FPS);
  const increment = target / totalSteps;
 
  /* setInterval met à jour la valeur toutes les ~16ms (60fps) */
  const interval = setInterval(function () {
    current += increment;
 
    if (current >= target) {
      /* Animation terminée : affiche la valeur exacte */
      current = target;
      clearInterval(interval);
    }
 
    /* Met à jour le texte de l'élément avec le nombre arrondi */
    element.textContent = Math.floor(current).toLocaleString('fr-FR');
  }, 1000 / FPS);
}
 
/**
 * Initialise l'IntersectionObserver pour les compteurs animés.
 * Cible : tous les éléments avec la classe .stat-number et
 * l'attribut data-target.
 */
function initCounters() {
  /* Sélectionne tous les compteurs de la page */
  const counters = document.querySelectorAll('.stat-number[data-target]');
 
  if (counters.length === 0) return; /* Aucun compteur sur cette page */
 
  /* Options de l'observer : déclenche quand 20% de l'élément est visible */
  const observerOptions = {
    threshold: 0.2
  };
 
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      /* L'élément entre dans le viewport */
      if (entry.isIntersecting) {
        const element = entry.target;
        const target = parseInt(element.getAttribute('data-target'), 10);
 
        /* Lance l'animation une seule fois (on désobserve ensuite) */
        animateCounter(element, target, 2000); /* Durée : 2 secondes */
        observer.unobserve(element);
      }
    });
  }, observerOptions);
 
  /* Observe chaque compteur */
  counters.forEach(function (counter) {
    observer.observe(counter);
  });
}
 
/* Lance les compteurs quand le DOM est prêt */
document.addEventListener('DOMContentLoaded', initCounters);
 
 
/* -----------------------------------------------------------
   5. ANIMATIONS FADE-IN AU SCROLL (IntersectionObserver)
   Les éléments avec la classe .fade-in-section sont invisibles
   par défaut (opacity: 0, translateY: 30px en CSS).
   Ils apparaissent en fondu quand ils entrent dans le viewport.
   ----------------------------------------------------------- */
 
/**
 * Initialise l'IntersectionObserver pour les animations fade-in.
 * Cible : tous les éléments avec la classe .fade-in-section.
 * Quand un élément entre dans le viewport, on lui ajoute
 * la classe .is-visible qui déclenche la transition CSS.
 */
function initFadeInSections() {
  /* Sélectionne tous les éléments à animer */
  const sections = document.querySelectorAll('.fade-in-section');
 
  if (sections.length === 0) return;
 
  const observerOptions = {
    threshold: 0.1,      /* Déclenche dès 10% de l'élément visible */
    rootMargin: '0px 0px -50px 0px' /* Déclenche légèrement avant le bord bas */
  };
 
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        /* Ajoute la classe qui déclenche le fondu (définie en CSS) */
        entry.target.classList.add('is-visible');
        /* On désobserve après la première apparition */
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
 
  /* Observe chaque section */
  sections.forEach(function (section) {
    observer.observe(section);
  });
}
 
/* Lance les fade-ins quand le DOM est prêt */
document.addEventListener('DOMContentLoaded', initFadeInSections);

/* =============================================================
   COMMIT 8 : Filtrage dynamique freelances + Validation formulaire
   ============================================================= */
 
/* -----------------------------------------------------------
   6. FILTRAGE DYNAMIQUE DES FREELANCES (freelances.html)
   Les cartes de freelances ont un attribut data-category
   (ex : data-category="design").
   Les boutons de filtre ont un attribut data-filter
   (ex : data-filter="design" ou data-filter="all").
   Un clic sur un bouton affiche/masque les cartes correspondantes
   sans rechargement de page.
   ----------------------------------------------------------- */
 
/**
 * Initialise le système de filtrage dynamique des cartes freelances.
 * Ne s'exécute que si la barre de filtres est présente dans la page.
 */
function initFreelanceFilter() {
  /* Conteneur des boutons de filtre */
  const filterContainer = document.getElementById('filter-bar');
  if (!filterContainer) return; /* On n'est pas sur freelances.html */
 
  /* Toutes les cartes de freelances */
  const freelanceCards = document.querySelectorAll('.freelance-card[data-category]');
  /* Tous les boutons de filtre */
  const filterButtons = filterContainer.querySelectorAll('[data-filter]');
 
  /**
   * Applique un filtre : affiche les cartes dont la catégorie
   * correspond au filtre sélectionné, masque les autres.
   * @param {string} filter - La catégorie à afficher, ou "all" pour tout montrer
   */
  function applyFilter(filter) {
    freelanceCards.forEach(function (card) {
      /* "all" : toutes les cartes sont visibles */
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = ''; /* Restaure l'affichage par défaut */
        /* Petit délai pour que la transition CSS soit visible */
        requestAnimationFrame(function () {
          card.classList.add('card-visible');
          card.classList.remove('card-hidden');
        });
      } else {
        card.classList.add('card-hidden');
        card.classList.remove('card-visible');
        /* Cache l'élément après la transition (300ms) */
        setTimeout(function () {
          if (card.classList.contains('card-hidden')) {
            card.style.display = 'none';
          }
        }, 300);
      }
    });
  }
 
  /**
   * Met à jour l'état actif du bouton de filtre sélectionné.
   * @param {HTMLElement} activeBtn - Le bouton qui vient d'être cliqué
   */
  function updateActiveButton(activeBtn) {
    filterButtons.forEach(function (btn) {
      btn.classList.remove('active'); /* Retire "active" de tous les boutons */
    });
    activeBtn.classList.add('active'); /* Ajoute "active" au bouton cliqué */
  }
 
  /* --- Attache l'événement click sur chaque bouton de filtre --- */
  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = btn.getAttribute('data-filter');
      applyFilter(filter);
      updateActiveButton(btn);
    });
  });
 
  /* Applique le filtre "all" au chargement (toutes les cartes visibles) */
  applyFilter('all');
}
 
/* Lance le filtrage quand le DOM est prêt */
document.addEventListener('DOMContentLoaded', initFreelanceFilter);
 
 
/* -----------------------------------------------------------
   7. VALIDATION DU FORMULAIRE DE CONTACT (contact.html)
   Validation complète côté client en JavaScript vanilla :
   - Tous les champs sont requis
   - Format email vérifié par regex
   - Longueur minimum du message : 20 caractères
   - Messages d'erreur personnalisés sous chaque champ
   - Message de succès stylisé après soumission
   - Aucun envoi réel (preventDefault)
   ----------------------------------------------------------- */
 
/**
 * Initialise la validation du formulaire de contact.
 * Ne s'exécute que si le formulaire est présent dans la page.
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return; /* On n'est pas sur contact.html */
 
  /* Récupère tous les champs du formulaire */
  const fieldNom     = document.getElementById('contact-nom');
  const fieldPrenom  = document.getElementById('contact-prenom');
  const fieldEmail   = document.getElementById('contact-email');
  const fieldSujet   = document.getElementById('contact-sujet');
  const fieldMessage = document.getElementById('contact-message');
 
  /* Conteneur du message de succès (affiché après soumission valide) */
  const successMsg = document.getElementById('form-success');
 
  /* --- Fonctions utilitaires de validation --- */
 
  /**
   * Affiche un message d'erreur sous un champ et le marque en rouge.
   * @param {HTMLElement} field   - Le champ en erreur
   * @param {string}      message - Le message d'erreur à afficher
   */
  function showError(field, message) {
    field.classList.add('is-invalid');    /* Bordure rouge (Bootstrap) */
    field.classList.remove('is-valid');   /* Retire la bordure verte   */
 
    /* Cherche ou crée l'élément de message d'erreur sous le champ */
    let errorEl = field.nextElementSibling;
    if (!errorEl || !errorEl.classList.contains('invalid-feedback')) {
      errorEl = document.createElement('div');
      errorEl.classList.add('invalid-feedback');
      field.parentNode.insertBefore(errorEl, field.nextSibling);
    }
    errorEl.textContent = message;
  }
 
  /**
   * Marque un champ comme valide (bordure verte, efface l'erreur).
   * @param {HTMLElement} field - Le champ valide
   */
  function showSuccess(field) {
    field.classList.remove('is-invalid'); /* Retire la bordure rouge */
    field.classList.add('is-valid');      /* Bordure verte           */
 
    /* Efface le message d'erreur s'il existe */
    const errorEl = field.nextElementSibling;
    if (errorEl && errorEl.classList.contains('invalid-feedback')) {
      errorEl.textContent = '';
    }
  }
 
  /**
   * Vérifie qu'un champ texte n'est pas vide.
   * @param {HTMLElement} field   - Le champ à vérifier
   * @param {string}      label   - Le nom du champ (pour le message)
   * @returns {boolean} true si valide
   */
  function validateRequired(field, label) {
    if (field.value.trim() === '') {
      showError(field, `Le champ "${label}" est obligatoire.`);
      return false;
    }
    showSuccess(field);
    return true;
  }
 
  /**
   * Vérifie le format d'une adresse email avec une regex.
   * @param {HTMLElement} field - Le champ email
   * @returns {boolean} true si valide
   */
  function validateEmail(field) {
    /* Regex standard pour valider le format d'une adresse email */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
    if (field.value.trim() === '') {
      showError(field, 'L\'adresse email est obligatoire.');
      return false;
    }
    if (!emailRegex.test(field.value.trim())) {
      showError(field, 'Veuillez entrer une adresse email valide (ex : nom@domaine.com).');
      return false;
    }
    showSuccess(field);
    return true;
  }
 
  /**
   * Vérifie qu'un menu déroulant a une valeur sélectionnée.
   * @param {HTMLElement} field - Le champ <select>
   * @param {string}      label - Le nom du champ
   * @returns {boolean} true si valide
   */
  function validateSelect(field, label) {
    if (field.value === '' || field.value === null) {
      showError(field, `Veuillez sélectionner un "${label}".`);
      return false;
    }
    showSuccess(field);
    return true;
  }
 
  /**
   * Vérifie la longueur minimale d'un textarea.
   * @param {HTMLElement} field      - Le champ textarea
   * @param {number}      minLength  - Nombre minimum de caractères
   * @returns {boolean} true si valide
   */
  function validateMinLength(field, minLength) {
    if (field.value.trim() === '') {
      showError(field, 'Le message est obligatoire.');
      return false;
    }
    if (field.value.trim().length < minLength) {
      showError(
        field,
        `Le message doit contenir au minimum ${minLength} caractères (actuellement : ${field.value.trim().length}).`
      );
      return false;
    }
    showSuccess(field);
    return true;
  }
 
  /* --- Validation en temps réel (au blur : quand le champ perd le focus) --- */
  /* Donne un retour immédiat à l'utilisateur sans attendre la soumission.   */
 
  if (fieldNom)     fieldNom.addEventListener('blur',     function () { validateRequired(fieldNom,    'Nom'); });
  if (fieldPrenom)  fieldPrenom.addEventListener('blur',  function () { validateRequired(fieldPrenom, 'Prénom'); });
  if (fieldEmail)   fieldEmail.addEventListener('blur',   function () { validateEmail(fieldEmail); });
  if (fieldSujet)   fieldSujet.addEventListener('change', function () { validateSelect(fieldSujet,   'Sujet'); });
  if (fieldMessage) fieldMessage.addEventListener('blur', function () { validateMinLength(fieldMessage, 20); });
 
  /* --- Soumission du formulaire --- */
  form.addEventListener('submit', function (event) {
    /* Empêche l'envoi réel du formulaire */
    event.preventDefault();
 
    /* Lance toutes les validations et collecte les résultats */
    const isNomValid     = fieldNom     ? validateRequired(fieldNom,    'Nom')    : true;
    const isPrenomValid  = fieldPrenom  ? validateRequired(fieldPrenom, 'Prénom') : true;
    const isEmailValid   = fieldEmail   ? validateEmail(fieldEmail)               : true;
    const isSujetValid   = fieldSujet   ? validateSelect(fieldSujet,   'Sujet')  : true;
    const isMessageValid = fieldMessage ? validateMinLength(fieldMessage, 20)     : true;
 
    /* Si tous les champs sont valides */
    if (isNomValid && isPrenomValid && isEmailValid && isSujetValid && isMessageValid) {
 
      /* Affiche le message de succès */
      if (successMsg) {
        successMsg.classList.remove('d-none'); /* Retire la classe Bootstrap "d-none" */
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
 
      /* Réinitialise le formulaire après 3 secondes */
      setTimeout(function () {
        form.reset();
 
        /* Retire les classes de validation Bootstrap de tous les champs */
        [fieldNom, fieldPrenom, fieldEmail, fieldSujet, fieldMessage].forEach(function (f) {
          if (f) {
            f.classList.remove('is-valid', 'is-invalid');
          }
        });
 
        /* Cache à nouveau le message de succès */
        if (successMsg) {
          successMsg.classList.add('d-none');
        }
      }, 3000);
    }
  });
}
 
/* Lance la validation quand le DOM est prêt */
document.addEventListener('DOMContentLoaded', initContactForm);