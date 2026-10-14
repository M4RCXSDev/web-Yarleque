// Configuración del número de WhatsApp (EDITABLE)
// Reemplaza este número con el número real de la empresa
// Formato: código de país + número (sin el símbolo +)
const whatsappNumber = '51903263203';

// Mensaje predeterminado
const whatsappMessage = 'Hola, D&C NORY. Quisiera obtener más información sobre sus productos textiles';

// Codificar el mensaje para URL
const encodedMessage = encodeURIComponent(whatsappMessage);

// URL completa de WhatsApp
const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

// Función para configurar los botones de WhatsApp
function setupWhatsAppButtons() {
    // Botón flotante
    const whatsappFloat = document.getElementById('whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.href = whatsappURL;
    }

    // Botón de sección de contacto
    const whatsappBtn = document.getElementById('whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.href = whatsappURL;
    }
}

// Función para el menú móvil
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

// Función para scroll suave al navegar
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorar enlaces que son solo "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Función para animación al hacer scroll
function setupScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Seleccionar elementos para animar
    const animatedElements = document.querySelectorAll('.producto-card, .sostenibilidad-card');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Inicializar todo cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    setupWhatsAppButtons();
    setupMobileMenu();
    setupSmoothScroll();
    setupScrollAnimation();
});

// Cerrar menú móvil al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth > 768 && navMenu) {
        navMenu.classList.remove('active');
    }
});
