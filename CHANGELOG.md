# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.2] - 2026-01-XX

### Cambiado
- Cambiado emoji de cohete (🚀) por checkmark (✓) en la sección "Beneficios de Nuestra Consultoría" de la página de consultoría
- Desactivado movimiento automático del carrusel en la sección "Nuestro Proceso de Consultoría" para permitir navegación manual por parte de los usuarios
- Extendido el año dinámico en el footer a todas las páginas del sitio (consultoria.html, Agentvschatbot.html, politicas-privacidad.html)

### Mejorado
- Mejorada la experiencia de usuario en el carrusel de proceso de consultoría, ahora siempre inicia en el paso 1 (Discovery)
- Consistencia en el footer de todas las páginas con actualización automática del año

---
## [1.1.1] - 2026-01-01

### Añadido
- Agregada tecnología crewAI a la sección de tecnologías que dominamos (David Salazar)
- Año dinámico en el footer que se actualiza automáticamente (David Salazar)

### Cambiado
- Actualizaciones en el carrusel de clientes (Carlos Antonio Vargas)
- Reactivado efecto de partículas en la hero section (David Salazar)
- Mejorado el centrado del contenido en la hero section (David Salazar)

### Eliminado
- Removida tecnología Flutter de la sección de tecnologías que dominamos (David Salazar)
- Eliminado efecto de copos de nieve navideño de la hero section (David Salazar)

---

## [1.1.0] - 2025-12-15

### Añadido
- Sistema de versionado semántico (SemVer)
- Archivo CHANGELOG.md para documentar cambios
- Estructura de carpetas organizada (css/, js/, images/)
- Separación de estilos CSS en archivos dedicados
- Separación de scripts JavaScript en archivos dedicados
- Carpeta `images/` para recursos gráficos (favicon)

### Cambiado
- Reorganización completa de la estructura del proyecto
- Movidos todos los archivos CSS a `css/`
  - `styles.css` → `css/styles.css`
  - `consultoria.css` → `css/consultoria.css`
- Movidos todos los archivos JavaScript a `js/`
  - `script.js` → `js/script.js`
  - `consultoria.js` → `js/consultoria.js`
  - `agent-chat-demo.js` → `js/agent-chat-demo.js`
  - `i18n.js` → `js/i18n.js`
- Movido `favicon.ico` a `images/favicon.ico`
- Actualizadas todas las referencias en archivos HTML:
  - `index.html`
  - `consultoria.html`
  - `Agentvschatbot.html`
  - `politicas-privacidad.html`
  - `formularioautomation.html`
  - `formularios.html`
- Actualizado README.md con la nueva estructura del proyecto

### Mejorado
- Organización del código siguiendo mejores prácticas
- Mantenibilidad del proyecto
- Escalabilidad para futuras adiciones
- Documentación del proyecto

### Notas técnicas
- Todas las rutas relativas se mantienen funcionando correctamente
- La carpeta `assets/` se mantiene en la raíz para compatibilidad
- La carpeta `i18n/` se mantiene en la raíz para compatibilidad con el sistema de traducción

---

## [1.0.0] - Versión inicial

### Añadido
- Sitio web corporativo de Manakin Labs
- Página principal (index.html) con todas las secciones
- Página de consultoría en IA (consultoria.html)
- Página de agentes de IA vs chatbots (Agentvschatbot.html)
- Formularios de contacto
- Sistema de internacionalización (i18n)
- Integración con chatbot de n8n
- Integración con Google Analytics
- Optimización SEO completa
- Diseño responsivo con Bootstrap 5.3
- Animaciones con AOS
- Efectos de partículas con particles.js

---

## Tipos de cambios

- **Añadido** para nuevas funcionalidades
- **Cambiado** para cambios en funcionalidades existentes
- **Deprecado** para funcionalidades que serán eliminadas pronto
- **Eliminado** para funcionalidades eliminadas
- **Corregido** para corrección de bugs
- **Seguridad** para vulnerabilidades

