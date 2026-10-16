// ============================================
// MANAKIN LABS - I18N SYSTEM
// Sistema de traducción español/inglés
// ============================================

class I18n {
    constructor() {
        this.currentLanguage = this.getStoredLanguage() || 'es';
        this.translations = {};
        this.loaded = false;
    }

    // Obtener idioma almacenado en localStorage
    getStoredLanguage() {
        try {
            return localStorage.getItem('language') || 'es';
        } catch (e) {
            return 'es';
        }
    }

    // Guardar idioma en localStorage
    setStoredLanguage(lang) {
        try {
            localStorage.setItem('language', lang);
        } catch (e) {
            console.warn('No se pudo guardar el idioma en localStorage');
        }
    }

    // Cargar archivo de traducción
    async loadTranslations(lang) {
        try {
            const response = await fetch(`./i18n/${lang}.json`);
            if (!response.ok) {
                throw new Error(`No se pudo cargar el archivo de traducción: ${lang}.json`);
            }
            const translations = await response.json();
            this.translations[lang] = translations;
            return translations;
        } catch (error) {
            console.error('Error al cargar traducciones:', error);
            // Si falla, intentar cargar español como fallback
            if (lang !== 'es') {
                return await this.loadTranslations('es');
            }
            return {};
        }
    }

    // Obtener traducción por clave
    t(key, params = {}) {
        const translations = this.translations[this.currentLanguage];
        if (!translations) {
            return key;
        }

        let translation = translations[key];
        
        if (!translation) {
            // Si no existe en el idioma actual, intentar en español
            translation = this.translations['es']?.[key] || key;
        }

        // Reemplazar parámetros si existen
        if (params && Object.keys(params).length > 0) {
            Object.keys(params).forEach(param => {
                translation = translation.replace(`{{${param}}}`, params[param]);
            });
        }

        return translation;
    }

    // Cambiar idioma
    async changeLanguage(lang) {
        if (!this.translations[lang]) {
            await this.loadTranslations(lang);
        }
        
        this.currentLanguage = lang;
        this.setStoredLanguage(lang);
        
        // Actualizar atributo lang del HTML
        document.documentElement.lang = lang === 'es' ? 'es' : 'en';
        
        // Actualizar todas las traducciones en el DOM
        this.translatePage();
        
        // Actualizar botón de idioma
        this.updateLanguageButton();
        
        // Disparar evento personalizado
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    }

    // Traducir página completa
    translatePage() {
        // Traducir elementos con atributo data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            // Si es un input o textarea, actualizar placeholder
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.hasAttribute('data-i18n-placeholder')) {
                    const placeholderKey = element.getAttribute('data-i18n-placeholder');
                    element.placeholder = this.t(placeholderKey);
                }
            } else if (element.hasAttribute('data-i18n-html')) {
                // Si tiene atributo data-i18n-html, usar innerHTML
                element.innerHTML = translation;
            } else {
                // Por defecto, usar textContent
                element.textContent = translation;
            }
        });

        // Traducir placeholders de inputs y textareas
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });

        // Traducir atributos específicos
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.t(key);
        });

        document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
            const key = element.getAttribute('data-i18n-aria-label');
            element.setAttribute('aria-label', this.t(key));
        });
    }

    // Actualizar botón de idioma
    updateLanguageButton() {
        const langButton = document.getElementById('languageToggle');
        const langIcon = document.getElementById('languageIcon');
        
        if (langButton && langIcon) {
            if (this.currentLanguage === 'es') {
                langButton.setAttribute('aria-label', 'Cambiar a inglés');
                langButton.title = 'Cambiar a inglés';
                langIcon.className = 'fas fa-language';
            } else {
                langButton.setAttribute('aria-label', 'Switch to Spanish');
                langButton.title = 'Switch to Spanish';
                langIcon.className = 'fas fa-language';
            }
        }
    }

    // Inicializar sistema i18n
    async init() {
        // Cargar idioma actual
        await this.loadTranslations(this.currentLanguage);
        
        // También cargar el otro idioma para cambio rápido
        const otherLang = this.currentLanguage === 'es' ? 'en' : 'es';
        await this.loadTranslations(otherLang);
        
        this.loaded = true;
        
        // Establecer idioma inicial
        document.documentElement.lang = this.currentLanguage === 'es' ? 'es' : 'en';
        
        // Traducir página
        this.translatePage();
        
        // Actualizar botón
        this.updateLanguageButton();
    }

    // Obtener idioma actual
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Alternar entre idiomas
    async toggleLanguage() {
        const newLang = this.currentLanguage === 'es' ? 'en' : 'es';
        await this.changeLanguage(newLang);
    }
}

// Crear instancia global
const i18n = new I18n();

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => i18n.init());
} else {
    i18n.init();
}

// Exportar para uso global
window.i18n = i18n;

