// script.js

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(n =>
        n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        })
    );
}

// ===== LOGIN / REGISTRO =====
document.addEventListener('DOMContentLoaded', () => {

    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginMessage = document.getElementById('login-message');
    const registerMessage = document.getElementById('register-message');

    // Función para activar login
    const showLogin = () => {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        loginMessage.textContent = '';
        registerMessage.textContent = '';
    };

    // Función para activar registro
    const showRegister = () => {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        loginMessage.textContent = '';
        registerMessage.textContent = '';
    };

    // Cambiar pestañas al hacer click
    loginTab.addEventListener('click', showLogin);
    registerTab.addEventListener('click', showRegister);

    // Animación de entrada al título "Accede a tu cuenta"
    const loginTitle = document.querySelector('#login-form h2');
    if (loginTitle) {
        loginTitle.animate([
            { opacity: 1 },
            { opacity: 0.3 },
            { opacity: 1 },
            { opacity: 0.3 },
            { opacity: 1 }
        ], {
            duration: 1600,
            easing: 'ease-in-out'
        });
    }

    // ===== REGISTRO REAL =====
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirm = document.getElementById('register-confirm').value;

        // Validaciones
        if (!name || !email || !password || !confirm) {
            registerMessage.textContent = 'Todos los campos son obligatorios.';
            registerMessage.style.color = 'red';
            return;
        }

        if (password.length < 6) {
            registerMessage.textContent = 'La contraseña debe tener al menos 6 caracteres.';
            registerMessage.style.color = 'red';
            return;
        }

        if (password !== confirm) {
            registerMessage.textContent = 'Las contraseñas no coinciden.';
            registerMessage.style.color = 'red';
            return;
        }

        // Enviar al backend
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                registerMessage.textContent = data.message;
                registerMessage.style.color = 'green';
                registerForm.reset();
                showLogin(); // Cambia automáticamente a login
            } else {
                registerMessage.textContent = data.message;
                registerMessage.style.color = 'red';
            }
        } catch (err) {
            console.error('Error conectando con el servidor:', err);
            registerMessage.textContent = 'Error de conexión con el servidor.';
            registerMessage.style.color = 'red';
        }
    });

    // ===== LOGIN (solo mensaje simulado por ahora) =====
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (!email || !password) {
            loginMessage.textContent = 'Todos los campos son obligatorios.';
            loginMessage.style.color = 'red';
            return;
        }

        // Aquí puedes implementar login real más adelante
        loginMessage.textContent = 'Login simulado (aún no conectado a backend)';
        loginMessage.style.color = 'green';
    });

});