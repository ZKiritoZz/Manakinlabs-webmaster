// Agent Chat Demo - Script externo para cumplir con CSP
(function() {
    'use strict';
    
    // Esperar a que el DOM esté completamente cargado
    document.addEventListener('DOMContentLoaded', function() {
        
        // Data for the BOT conversation
        const botSequence = [
            { type: 'user', text: "Quiero devolver mis tennis, me quedan pequeñas." },
            { type: 'bot', text: "Hola. Para ayuda, elige una opción del menú:" },
            { type: 'bot-options', options: ["1. Ventas", "2. Soporte Técnico", "3. Horarios"] },
            { type: 'user', text: "Opción 2" },
            { type: 'bot', text: "Has seleccionado Soporte. Por favor, describe tu problema usando palabras clave." },
            { type: 'user', text: "Devolución" },
            { type: 'bot', text: "Lo siento, no entiendo 'Devolución'. ¿Quisiste decir 'Facturación'?" }
        ];

        // Data for the AGENT conversation
        const agentSequence = [
            { type: 'user', text: "Quiero devolver mis tennis, me quedan pequeñas." },
            { type: 'thinking', text: "Consultando historial de pedidos..." },
            { type: 'agent', text: "Veo que compraste las Nike Air Max talla 42 el martes pasado. Como te quedan pequeñas, puedo ofrecerte una talla 43 que es más grande. ¿Quieres cambiarlas por la talla 43 o prefieres un reembolso?" },
            { type: 'user', text: "Cambio por talla 43, por favor." },
            { type: 'thinking', text: "Verificando stock... Generando etiqueta..." },
            { type: 'agent', text: "¡Listo! He reservado la talla 43. Aquí tienes tu etiqueta de devolución QR. En cuanto las entregues en correos, te enviamos las nuevas." },
            { type: 'action', text: "🎟️ Etiqueta de envío generada" }
        ];

        function createBubble(text, type, container) {
            if (!container) {
                console.error('Container no encontrado');
                return;
            }
            
            const div = document.createElement('div');
            div.className = 'chat-bubble p-3 rounded-lg mb-2';
            div.style.maxWidth = '85%';
            div.style.fontSize = '0.875rem';
            
            if (type === 'user') {
                div.className += ' chat-bubble-user ml-auto rounded-tr-none';
                div.style.marginLeft = 'auto';
            } else if (type === 'bot') {
                div.className += ' chat-bubble-bot mr-auto rounded-tl-none';
                div.style.marginRight = 'auto';
            } else if (type === 'agent') {
                div.className += ' chat-bubble-agent mr-auto rounded-tl-none';
                div.style.marginRight = 'auto';
            } else if (type === 'thinking') {
                div.className = 'chat-bubble chat-bubble-thinking';
                div.style.fontSize = '0.75rem';
                div.style.fontStyle = 'italic';
                div.style.marginBottom = '0.5rem';
                div.style.display = 'flex';
                div.style.alignItems = 'center';
                div.style.gap = '0.5rem';
                div.innerHTML = '<i class="fa-solid fa-gear fa-spin"></i> ' + text;
                container.appendChild(div);
                setTimeout(function() { div.classList.add('visible'); }, 50);
                return;
            } else if (type === 'action') {
                div.className = 'chat-bubble chat-bubble-action';
                div.style.padding = '0.5rem';
                div.style.fontSize = '0.75rem';
                div.style.textAlign = 'center';
                div.style.fontWeight = 'bold';
                div.style.margin = '0.5rem auto';
                div.style.width = '75%';
                div.innerHTML = text;
                container.appendChild(div);
                setTimeout(function() { div.classList.add('visible'); }, 50);
                return;
            }

            div.innerText = text;
            container.appendChild(div);
            // Trigger animation
            setTimeout(function() { div.classList.add('visible'); }, 50);
        }

        function createOptions(options, container) {
            if (!container) {
                console.error('Container no encontrado');
                return;
            }
            
            const div = document.createElement('div');
            div.className = "chat-bubble mb-2";
            div.style.display = 'flex';
            div.style.flexDirection = 'column';
            div.style.gap = '0.5rem';
            div.style.width = '75%';
            div.style.marginRight = 'auto';
            options.forEach(function(opt) {
                const btn = document.createElement('button');
                btn.style.textAlign = 'left';
                btn.style.fontSize = '0.75rem';
                btn.style.background = 'rgba(255, 255, 255, 0.1)';
                btn.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                btn.style.padding = '0.5rem';
                btn.style.borderRadius = '8px';
                btn.style.color = 'var(--light-text)';
                btn.style.transition = 'all 0.3s ease';
                btn.style.cursor = 'pointer';
                btn.onmouseover = function() {
                    this.style.background = 'rgba(255, 255, 255, 0.15)';
                    this.style.color = 'var(--white)';
                };
                btn.onmouseout = function() {
                    this.style.background = 'rgba(255, 255, 255, 0.1)';
                    this.style.color = 'var(--light-text)';
                };
                btn.innerText = opt;
                div.appendChild(btn);
            });
            container.appendChild(div);
            setTimeout(function() { div.classList.add('visible'); }, 50);
        }

        function runBotDemo() {
            try {
                const container = document.getElementById('bot-chat-container');
                if (!container) {
                    console.error('No se encontró el contenedor bot-chat-container');
                    return;
                }
                
                container.innerHTML = '';
                
                let index = 0;
                function processNext() {
                    if (index >= botSequence.length) return;
                    
                    const step = botSequence[index];
                    index++;
                    
                    if (step.type === 'bot-options') {
                        createOptions(step.options, container);
                    } else {
                        createBubble(step.text, step.type, container);
                    }
                    
                    container.scrollTop = container.scrollHeight;
                    
                    if (index < botSequence.length) {
                        setTimeout(processNext, 2000);
                    }
                }
                
                processNext();
            } catch (error) {
                console.error('Error en runBotDemo:', error);
            }
        }

        function runAgentDemo() {
            try {
                const container = document.getElementById('agent-chat-container');
                if (!container) {
                    console.error('No se encontró el contenedor agent-chat-container');
                    return;
                }
                
                container.innerHTML = '';
                
                let index = 0;
                function processNext() {
                    if (index >= agentSequence.length) return;
                    
                    const step = agentSequence[index];
                    index++;
                    
                    if (step.type === 'thinking') {
                        createBubble(step.text, step.type, container);
                        container.scrollTop = container.scrollHeight;
                        setTimeout(function() {
                            processNext();
                        }, 3000);
                    } else if (step.type === 'action') {
                        createBubble(step.text, step.type, container);
                        container.scrollTop = container.scrollHeight;
                        if (index < agentSequence.length) {
                            setTimeout(processNext, 2000);
                        }
                    } else {
                        createBubble(step.text, step.type, container);
                        container.scrollTop = container.scrollHeight;
                        if (index < agentSequence.length) {
                            setTimeout(processNext, 2000);
                        }
                    }
                }
                
                processNext();
            } catch (error) {
                console.error('Error en runAgentDemo:', error);
            }
        }

        // Agregar event listeners a los botones
        const btnBotDemo = document.getElementById('btn-bot-demo');
        if (btnBotDemo) {
            btnBotDemo.addEventListener('click', runBotDemo);
        }

        const btnAgentDemo = document.getElementById('btn-agent-demo');
        if (btnAgentDemo) {
            btnAgentDemo.addEventListener('click', runAgentDemo);
        }
    });
})();

