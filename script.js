const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

// Al hacer clic, activamos el menú y la animación del icono
hamburger.addEventListener("click", () => {
hamburger.classList.toggle("active");
navMenu.classList.toggle("active");
});

// Opcional: Cerrar el menú cuando se hace clic en un enlace
document.querySelectorAll(".nav-link").forEach(n =>
n.addEventListener("click", () => {
hamburger.classList.remove("active");
navMenu.classList.remove("active");
}));