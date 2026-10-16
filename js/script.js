// ============================================
// MANAKIN LABS - JAVASCRIPT 2025
// ============================================

// ============================================
// 1. INITIALIZATION & AOS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: false,
        mirror: true,
        offset: 100,
        delay: 100
    });
    
    // Initialize all features
    initNavbar();
    initLanguageToggle();
    initTypingEffect();
    initCounters();
    initSmoothScroll();
    initContactForm();
    initCurrentYear();
    
    // Inicializar partículas después de que todo esté cargado
    if (typeof particlesJS !== 'undefined') {
        initParticles();
    } else {
        // Esperar a que particlesJS se cargue
        window.addEventListener('load', function() {
            if (typeof particlesJS !== 'undefined') {
                initParticles();
            }
        });
    }
    
    // Refresh AOS on window resize
    window.addEventListener('resize', function() {
        AOS.refresh();
    });
});

// ============================================
// 2. NAVBAR EFFECTS
// ============================================
function initNavbar() {
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

// ============================================
// 2.5. LANGUAGE TOGGLE
// ============================================
function initLanguageToggle() {
    const langToggle = document.getElementById('languageToggle');
    
    if (!langToggle) return;
    
    langToggle.addEventListener('click', async function() {
        if (window.i18n && window.i18n.loaded) {
            await window.i18n.toggleLanguage();
            
            // Actualizar frases del typing effect si existe
            if (typeof updateTypingPhrases === 'function') {
                updateTypingPhrases();
            }
        }
    });
    
    // Escuchar cambios de idioma para actualizar efectos dinámicos
    window.addEventListener('languageChanged', function(e) {
        if (typeof updateTypingPhrases === 'function') {
            updateTypingPhrases();
        }
    });
}

// ============================================
// 3. TYPING EFFECT
// ============================================
let typingInterval = null;
let currentTypingPhrases = [];

function updateTypingPhrases() {
    if (!window.i18n) return;
    
    const lang = window.i18n.getCurrentLanguage();
    
    if (lang === 'es') {
        currentTypingPhrases = [
            'Desarrollo de software a la medida',
            'Automatización inteligente de procesos',
            'Soluciones de Inteligencia Artificial',
            'Transformamos ideas en realidad digital'
        ];
    } else {
        currentTypingPhrases = [
            'Custom software development',
            'Intelligent process automation',
            'Artificial Intelligence solutions',
            'Transform ideas into digital reality'
        ];
    }
    
    // Reiniciar el efecto si ya estaba corriendo
    if (typingInterval) {
        clearInterval(typingInterval);
        typingInterval = null;
        initTypingEffect();
    }
}

function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    // Obtener frases según idioma actual
    updateTypingPhrases();
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const phrases = currentTypingPhrases.length > 0 ? currentTypingPhrases : [
            'Desarrollo de software a la medida',
            'Automatización inteligente de procesos',
            'Soluciones de Inteligencia Artificial',
            'Transformamos ideas en realidad digital'
        ];
        
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Deleting text
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Typing text
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // When word is complete
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at end
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }
        
        typingInterval = setTimeout(type, typingSpeed);
    }
    
    // Start typing effect
    setTimeout(type, 1000);
}

// ============================================
// 4. ANIMATED COUNTERS
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    let observerInitialized = false;
    
    if (counters.length === 0) return;
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !observerInitialized) {
                counters.forEach(counter => animateCounter(counter));
                observerInitialized = true;
            }
        });
    }, { threshold: 0.5 });
    
    // Observe the first counter
    if (counters[0]) {
        counterObserver.observe(counters[0].closest('.hero-stats'));
    }
}

// ============================================
// 5. SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Navbar height offset
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// 6. CONTACT FORM
// ============================================
function initContactForm() {
    const enviarMensajeBtn = document.getElementById('enviarMensaje');
    const contactForm = document.getElementById('contactForm');
    const telefonoInput = document.getElementById('telefono');
    
    if (!enviarMensajeBtn || !contactForm || !telefonoInput) return;
    
    // URL del webhook de n8n - Actualiza esta URL con tu webhook específico
    const WEBHOOK_URL = 'https://webhook.n8.manakinlabs.com/webhook/ManakinTools';
    
    // Inicializar intl-tel-input
    let iti;
    if (typeof intlTelInput !== 'undefined') {
        iti = intlTelInput(telefonoInput, {
            initialCountry: 'cr', // Costa Rica por defecto
            preferredCountries: ['cr', 'us', 'mx', 'co', 'pe', 'es'],
            separateDialCode: true,
            utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@23.0.0/build/js/utils.js',
            nationalMode: false,
            autoPlaceholder: 'polite',
            customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
                return selectedCountryPlaceholder;
            }
        });
    }
    
    enviarMensajeBtn.addEventListener('click', async function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();
        
        // Obtener datos del teléfono usando intl-tel-input
        let telefono = null;
        let codigoPais = null;
        let numeroTelefono = null;
        
        if (iti) {
            const phoneValue = telefonoInput.value.trim();
            const countryData = iti.getSelectedCountryData();
            
            if (phoneValue) {
                // Obtener código de país
                codigoPais = '+' + countryData.dialCode;
                
                // Obtener número completo en formato E.164 (internacional)
                if (iti.isValidNumber()) {
                    telefono = iti.getNumber(); // Formato: +50670142848
                } else {
                    // Si no es válido pero hay valor, construir el número completo
                    const cleanNumber = phoneValue.replace(/\D/g, ''); // Solo números
                    telefono = '+' + countryData.dialCode + cleanNumber;
                }
                
                // Obtener solo el número nacional (sin código de país)
                // Cuando separateDialCode: true, el input solo contiene el número nacional
                numeroTelefono = phoneValue;
                
                // Si el número incluye el código de país, extraer solo el número nacional
                if (phoneValue.startsWith('+') || phoneValue.startsWith(countryData.dialCode)) {
                    // Remover el código de país si está presente
                    const dialCodePattern = new RegExp('^\\+' + countryData.dialCode + '|^' + countryData.dialCode);
                    numeroTelefono = phoneValue.replace(dialCodePattern, '').trim();
                }
            } else {
                // Si no hay valor, asegurar que codigoPais esté disponible de todas formas
                codigoPais = '+' + countryData.dialCode;
            }
        } else {
            // Fallback si intl-tel-input no está disponible
            const phoneValue = telefonoInput.value.trim();
            if (phoneValue) {
                telefono = phoneValue;
                // Intentar extraer código de país si está presente
                const match = phoneValue.match(/^(\+\d{1,4})\s*(.+)$/);
                if (match) {
                    codigoPais = match[1];
                    numeroTelefono = match[2];
                } else {
                    numeroTelefono = phoneValue;
                }
            }
        }
        
        // Log para debugging (puedes remover esto en producción)
        console.log('Datos del teléfono:', {
            telefono: telefono,
            codigo_pais: codigoPais,
            numero_telefono: numeroTelefono
        });
        
        // Validation
        if (!nombre || !email || !mensaje) {
            showNotification('Por favor, completa todos los campos', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Por favor, ingresa un email válido', 'error');
            return;
        }
        
        // Deshabilitar botón mientras se envía
        enviarMensajeBtn.disabled = true;
        enviarMensajeBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Enviando...';
        
        // Preparar datos para el webhook
        const formData = {
            nombre: nombre,
            email: email,
            telefono: telefono || null, // Número completo en formato internacional (E.164)
            codigo_pais: codigoPais || null, // Código de país con + (ej: +506)
            numero_telefono: numeroTelefono || null, // Solo el número sin código de país
            mensaje: mensaje,
            tag: 'manakin_labs',
            timestamp: new Date().toISOString(),
            source: 'contacto-form'
        };
        
        // Log del payload completo para debugging
        console.log('Payload completo enviado a n8n:', JSON.stringify(formData, null, 2));
        
        try {
            // Enviar datos al webhook de n8n
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                const responseData = await response.json().catch(() => null);
                showNotification('¡Mensaje enviado exitosamente, Uno de nuestros asistentes te contactará a la brevedad!', 'success');
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    if (iti) {
                        iti.setCountry('cr'); // Resetear a Costa Rica
                    }
                    enviarMensajeBtn.disabled = false;
                    enviarMensajeBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i> <span data-i18n="form_button">Enviar Mensaje</span>';
                }, 500);
            } else {
                const errorText = await response.text().catch(() => 'Error desconocido');
                console.error('Error del servidor:', response.status, errorText);
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
        } catch (error) {
            console.error('Error al enviar al webhook:', error);
            console.error('URL del webhook:', WEBHOOK_URL);
            console.error('Datos enviados:', formData);
            
            // Mostrar error y permitir reintentar
            showNotification('Error al enviar el mensaje. Por favor, verifica la conexión e intenta nuevamente.', 'error');
            
            // Restaurar botón
            enviarMensajeBtn.disabled = false;
            enviarMensajeBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i> <span data-i18n="form_button">Enviar Mensaje</span>';
        }
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('.form-control-custom');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary-green)';
        });
        
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }
        });
    });
}

// ============================================
// 7. NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #00C853 0%, #00B8D4 100%)' : 'linear-gradient(135deg, #ff5252 0%, #ff1744 100%)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        backdrop-filter: blur(10px);
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        font-weight: 600;
        font-size: 0.95rem;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(style);

// ============================================
// 8. PARTICLES.JS CONFIGURATION
// ============================================
function initParticles() {
    if (typeof particlesJS === 'undefined') {
        console.warn('particlesJS no está disponible');
        return;
    }
    
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) {
        console.warn('Elemento particles-js no encontrado');
        return;
    }
    
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#00C853'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.3,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00C853',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

// ============================================
// 8.5. CURRENT YEAR IN FOOTER
// ============================================
function initCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ============================================
// 9. SERVICE CARDS HOVER EFFECTS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card-premium');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// ============================================
// 10. LAZY LOADING IMAGES
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});

// ============================================
// 11. CAROUSEL AUTO-PLAY CONTROL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('#clientesCarousel');
    if (!carousel) return;
    
    const carouselInstance = new bootstrap.Carousel(carousel, {
        interval: 5000,
        wrap: true,
        touch: true
    });
    
    // Pause on hover
    carousel.addEventListener('mouseenter', function() {
        carouselInstance.pause();
    });
    
    carousel.addEventListener('mouseleave', function() {
        carouselInstance.cycle();
    });
});

// ============================================
// 12. TECH ITEMS ANIMATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
});

// ============================================
// 13. PARALLAX EFFECT
// ============================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroVideo) {
        heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ============================================
// 14. MOBILE MENU ENHANCEMENT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            // Add animation class
            navbarCollapse.classList.toggle('animating');
            
            // Prevent body scroll when menu is open
            if (navbarCollapse.classList.contains('show') || navbarCollapse.classList.contains('showing')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
});

// ============================================
// 15. PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Optimize scroll events
const optimizedScroll = debounce(function() {
    // Your scroll logic here
}, 10);

window.addEventListener('scroll', optimizedScroll);

// ============================================
// 16. EASTER EGGS & FUN INTERACCIONES
// ============================================

// Konami Code Easter Egg
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', function(e) {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    // Add rainbow effect to brand
    const brand = document.querySelector('.navbar-brand');
    if (brand) {
        brand.style.animation = 'rainbow 2s linear infinite';
        showNotification('¡Easter Egg Activado! 🎉', 'success');
        
        setTimeout(() => {
            brand.style.animation = '';
        }, 10000);
    }
}

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// ============================================
// 17. PRELOADER (Optional)
// ============================================
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// ============================================
// 18. CONSOLE MESSAGE
// ============================================
console.log('%cManakin Labs Ofical Website', 'color: #00C853; font-size: 20px; font-weight: bold;');
console.log('%cDesarrollado por Manakin Labs', 'color: #00B8D4; font-size: 14px;');
console.log('%cDesarrollador: David salazar Valverde', 'color: #00B8D4; font-size: 14px;');
console.log('%cDate: 03/11/2025', 'color: #00B8D4; font-size: 14px;');
console.log('%cVersion: 1.0.0', 'color: #00B8D4; font-size: 14px;');
console.log('%cLicense: MIT', 'color: #00B8D4; font-size: 14px;');
console.log('%cWebsite: https://manakinlabs.com', 'color: #00B8D4; font-size: 14px;');
console.log('%cEmail: dajosava@gmail.com', 'color: #00B8D4; font-size: 14px;');
console.log('%cPhone: +506 70142848', 'color: #00B8D4; font-size: 14px;');
console.log('%cAddress: Hojancha, Guanacaste, Costa Rica', 'color: #00B8D4; font-size: 14px;');
console.log('%cCountry: Costa Rica', 'color: #00B8D4; font-size: 14px;');

// ============================================
// 19. ERROR HANDLING
// ============================================
window.addEventListener('error', function(e) {
    console.error('Error capturado:', e.error);
    // Puedes enviar esto a un servicio de logging
});

// ============================================
// EXPORT FUNCTIONS (if using modules)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavbar,
        initTypingEffect,
        initCounters,
        initSmoothScroll,
        showNotification
    };
}
