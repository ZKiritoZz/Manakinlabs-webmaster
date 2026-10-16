// Asegurar que el contenido sea visible incluso antes de que AOS cargue
document.addEventListener('DOMContentLoaded', function() {
    // Hacer visible todo el contenido inmediatamente
    const allElements = document.querySelectorAll('.consultoria-hero, .service-card-consultoria, .feature-card-consultoria, .benefits-list-consultoria, .process-section-consultoria, .cta-section-consultoria');
    allElements.forEach(function(el) {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
    });
    
    // Inicializar año actual en el footer
    initCurrentYear();
});

// Initialize AOS
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        disable: false
    });
}

// Smooth scroll para navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Función para actualizar el año automáticamente en el footer
function initCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

