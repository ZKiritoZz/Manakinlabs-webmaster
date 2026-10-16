# Manakin Labs - Sitio Web Corporativo

Este repositorio contiene el código fuente del sitio web corporativo de **Manakin Labs**, una empresa de desarrollo de software y automatización con presencia en Guanacaste, Costa Rica. El proyecto está construido como una _landing page_ estática con HTML, CSS y JavaScript, optimizada para presentar servicios, testimonios, tecnologías clave y canales de contacto.

**Versión actual:** 1.1.0

## Tabla de contenidos

1. [Características principales](#características-principales)
2. [Estructura del proyecto](#estructura-del-proyecto)
3. [Dependencias externas](#dependencias-externas)
4. [Setup y despliegue](#setup-y-despliegue)
5. [Personalización del chatbot de n8n](#personalización-del-chatbot-de-n8n)
6. [Flujo de estilos y assets](#flujo-de-estilos-y-assets)
7. [SEO y analítica](#seo-y-analítica)
8. [Sistema de versionado](#sistema-de-versionado)
9. [Mantenimiento y testing manual](#mantenimiento-y-testing-manual)
10. [To-Do / mejoras futuras](#to-do--mejoras-futuras)

## Características principales

- **Diseño premium y responsivo** basado en _Bootstrap 5.3_ con animaciones vía _AOS_ y efectos visuales personalizados.
- **Secciones destacadas**: servicios, tecnologías, testimonios de clientes, proceso de trabajo, branding y CTA claros para captación de leads.
- **Formularios de contacto** (HTML) con componentes custom y validaciones básicas manejadas en JavaScript.
- **Botones flotantes**: acceso directo a WhatsApp, botón "scroll to top" y **chatbot embebido de n8n**.
- **Optimización SEO**: metas enriquecidas para redes sociales (Open Graph y Twitter), _structured data_ (JSON-LD) para negocio y servicios.
- **Sistema de internacionalización (i18n)**: soporte para español e inglés.
- **Recursos visuales** almacenados en `assets/` e `images/` con imágenes optimizadas.
- **Estructura organizada**: separación de CSS, JavaScript e imágenes en carpetas dedicadas siguiendo buenas prácticas.

## Estructura del proyecto

```
manakinlabs/
│
├── index.html                    # Página principal del sitio
├── consultoria.html              # Página de consultoría en IA
├── Agentvschatbot.html          # Página de agentes de IA vs chatbots
├── formularios.html              # Página auxiliar para formularios de servicio
├── formularioautomation.html     # Formulario de automatización
├── politicas-privacidad.html    # Políticas de privacidad
│
├── css/                          # Estilos CSS
│   ├── styles.css                # Estilos principales del sitio
│   └── consultoria.css           # Estilos específicos de consultoría
│
├── js/                           # Scripts JavaScript
│   ├── script.js                 # Lógica principal de interacción y animaciones
│   ├── consultoria.js            # Scripts específicos de consultoría
│   ├── agent-chat-demo.js        # Demo del chat de agentes
│   └── i18n.js                   # Sistema de internacionalización
│
├── images/                       # Imágenes y recursos gráficos
│   └── favicon.ico               # Favicon del sitio
│
├── assets/                       # Recursos adicionales
│   ├── manakinbird.png           # Logo principal
│   ├── camposdental.png          # Logo cliente
│   ├── coach.png                 # Logo cliente
│   ├── nutriparalavida.png       # Logo cliente
│   ├── UC.png                    # Logo cliente
│   └── n8n-docs-icon.svg         # Ícono n8n
│
├── i18n/                         # Archivos de traducción
│   ├── es.json                   # Traducciones en español
│   └── en.json                   # Traducciones en inglés
│
├── _headers                       # Headers de seguridad (Netlify)
├── robots.txt                     # Configuración para crawlers
├── sitemap.xml                    # Mapa del sitio
├── ai.txt                         # Archivo para motores de búsqueda de IA
├── BingSiteAuth.xml              # Autenticación Bing
├── CHANGELOG.md                   # Historial de versiones
└── README.md                      # Este documento
```

> **Nota:** La estructura del proyecto sigue las mejores prácticas de organización, separando CSS, JavaScript e imágenes en carpetas dedicadas para facilitar el mantenimiento y la escalabilidad.

## Dependencias externas

El sitio depende de varias librerías entregadas vía CDN:

- **Bootstrap 5.3 (CSS/JS)** para el grid y componentes base.
- **Font Awesome 6** para iconografía.
- **AOS (Animate On Scroll)** para animaciones al hacer _scroll_.
- **particles.js** para efectos en el hero.
- **Google Fonts** (`Inter` y `Poppins`).
- **n8n Chat Widget** (`@n8n/chat`) para el chatbot embebido.
- **intl-tel-input** para validación de números telefónicos internacionales.

Estas dependencias se encuentran referenciadas directamente en los archivos HTML a través de etiquetas `<link>` y `<script>`.

## Setup y despliegue

Al ser un sitio estático, no requiere compilación ni dependencias locales adicionales.

1. **Clonar o descargar** el repositorio en el servidor deseado.
2. Servir los archivos usando cualquier hosting estático (Netlify, Vercel, GitHub Pages) o subirlos a un hosting tradicional con soporte HTTPS.
3. Asegurarse de que el dominio/public URL esté registrado en:
   - **Allowed Origins** del workflow de n8n (ver siguiente sección).
   - Configuración de cualquier servicio de analítica o integraciones externas.

### Desarrollo local

Basta con abrir `index.html` en un navegador moderno o utilizar un servidor local básico (por ejemplo, `npx serve`). No hay pipeline de build.

```bash
# Opción 1: Servidor HTTP simple de Python
python -m http.server 8000

# Opción 2: Usando Node.js (npx serve)
npx serve

# Opción 3: Usando PHP
php -S localhost:8000
```

## Personalización del chatbot de n8n

El chat se integra mediante CDN en `index.html`:

```html
<link href="https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css" rel="stylesheet" />
<script type="module">
  import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

  createChat({
    webhookUrl: 'https://webhook.n8.manakinlabs.com/webhook/6bcd354d-ac9e-452e-b644-c40f57dd362e/chat',
    mode: 'window',
    loadPreviousSession: true,
    showWelcomeScreen: false,
    initialMessages: [
      '¡Hola! 👋',
      'Soy el asistente virtual de Manakin Labs, ¿en qué puedo ayudarte hoy?'
    ],
    metadata: {
      source: 'website-index'
    }
  });
</script>
```

### Recomendaciones de configuración

- En n8n, el workflow debe estar **activo** y utilizar un **Chat Trigger**.
- Añade el dominio del sitio a **Allowed Origins (CORS)** dentro del nodo `Chat Trigger`.
- Si se requiere streaming, activar `enableStreaming` tanto en n8n como en el `createChat`.
- El **estilo visual** del chat se personaliza en `css/styles.css` usando variables CSS (`--chat--*`) y reglas específicas bajo la sección "n8n CHAT CUSTOMIZAtion". Se ajustó el botón flotante para usar un ícono de bot mediante `Font Awesome`.

## Flujo de estilos y assets

- `css/styles.css` centraliza variables, colores, tipografías, efectos, animaciones y responsividad.
- `css/consultoria.css` contiene estilos específicos para la página de consultoría.
- Secciones específicas están documentadas con comentarios (`/* ============================================ */`) para facilitar el mantenimiento.
- El branding principal usa una paleta verde/azul oscuro y efectos _glassmorphism_.

## SEO y analítica

- Metadatos extensivos en `<head>`: título, descripción, keywords y robots.
- JSON-LD para `LocalBusiness`, `ProfessionalService` y `Organization`.
- Integración con Google Analytics (gtag.js) configurada.
- Archivo `ai.txt` para motores de búsqueda de IA.
- Sitemap XML y robots.txt configurados.

## Sistema de versionado

Este proyecto utiliza [Semantic Versioning](https://semver.org/) (SemVer) para el control de versiones.

**Formato:** `MAJOR.MINOR.PATCH` (ej: 1.1.0)

- **MAJOR**: Cambios incompatibles con versiones anteriores
- **MINOR**: Nuevas funcionalidades compatibles hacia atrás
- **PATCH**: Correcciones de bugs compatibles hacia atrás

Para ver el historial completo de cambios, consulta el archivo [CHANGELOG.md](./CHANGELOG.md).

### Versión actual: 1.1.0

Esta versión incluye:
- Reorganización completa de la estructura del proyecto
- Separación de CSS, JavaScript e imágenes en carpetas dedicadas
- Mejora en la organización y mantenibilidad del código
- Actualización de todas las referencias en archivos HTML

## Mantenimiento y testing manual

1. **Pruebas básicas**:
   - Revisar que los enlaces funcionen (`href` de navbar, CTA, redes sociales).
   - Asegurar que el chatbot carga y responde (abrir en el dominio aprobado).
   - Validar formulario de contacto (campos requeridos, feedback visual).
   - Testear animaciones y partículas en distintos navegadores.
   - Verificar que todas las rutas de CSS y JS funcionen correctamente.

2. **Responsividad**:
   - Evaluar en breakpoints principales (320px, 768px, 1024px, 1440px).
   - Confirmar que los botones flotantes (WhatsApp y chat) no se superponen.

3. **Performance**:
   - Optimizar imágenes (`assets` e `images`) cuando se agreguen nuevas.
   - Minimizar llamadas externas si el tiempo de carga aumenta.

4. **Estructura**:
   - Mantener la organización de carpetas (css/, js/, images/).
   - Actualizar referencias cuando se agreguen nuevos archivos.

## To-Do / mejoras futuras

- [ ] Integrar un backend para manejar envíos reales del formulario de contacto.
- [x] Añadir analítica (Google Analytics 4 configurado).
- [ ] Incorporar un sistema de despliegue continuo (CI/CD) para hosting estático.
- [x] Internacionalizar el contenido (i18n) para versiones en inglés.
- [ ] Agregar secciones dinámicas (blog, casos de estudio) si se requiere contenido frecuente.
- [ ] Implementar tests automatizados para validar la estructura y referencias.

---

**Contacto interno:** Para dudas sobre el sitio o actualizaciones, comunicarte con el equipo de desarrollo de Manakin Labs o el responsable del workflow de n8n.

**Última actualización:** Diciembre 2025 - Versión 1.1.0
