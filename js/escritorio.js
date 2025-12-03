document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CONFIGURACIÓN INICIAL DEL HEADER (SIN AUTENTICACIÓN) ---
    // El objetivo es asignar valores estáticos ya que no hay sesión.
    
    const nombreUsuarioDisplay = document.getElementById('nombreUsuario');
    const rolUsuarioDisplay = document.getElementById('rolUsuario');
    const nombreUsuarioBienvenida = document.getElementById('nombreUsuarioBienvenida');

    // Asignar "Visitante" o "Invitado" a todos los campos
    if (nombreUsuarioDisplay) nombreUsuarioDisplay.textContent = 'Visitante';
    if (rolUsuarioDisplay) rolUsuarioDisplay.textContent = 'Invitado';
    if (nombreUsuarioBienvenida) nombreUsuarioBienvenida.textContent = 'Visitante';

    // Manejar el botón "Volver a Inicio" (Asumiendo ID: btnVolverInicio)
    const btnVolverInicio = document.getElementById('btnVolverInicio');
    if (btnVolverInicio) {
        btnVolverInicio.addEventListener('click', () => {
            // Redirigir al nuevo index que está en la Raíz (Necesita salir de /page/)
            window.location.href = '../index.html'; 
        });
    }


    // --- 2. LÓGICA DEL CARRUSEL VERTICAL AUTOMÁTICO ---
    
    const carruselVertical = document.querySelector('.carrusel-vertical');
    const items = document.querySelectorAll('.carrusel-item');
    // Altura fija de 300px definida en el CSS
    const alturaItem = 300; 
    const totalItems = items.length;
    let currentIndex = 0;
    const intervaloTiempo = 3000; // 3 segundos

    // Establecer la altura total para que la transición CSS funcione correctamente
    if (carruselVertical && totalItems > 0) {
        carruselVertical.style.height = `${totalItems * alturaItem}px`;
    }

    // Función que realiza el movimiento
    function moverCarrusel() {
        // No hace nada si no existe el carrusel o si solo hay un ítem
        if (!carruselVertical || totalItems <= 1) return; 

        currentIndex++;
        
        // Vuelve al inicio si llega al final
        if (currentIndex >= totalItems) {
            currentIndex = 0;
        }

        // Calcula el desplazamiento (negativo para subir)
        const desplazamiento = -currentIndex * alturaItem;

        // Aplica la transformación
        carruselVertical.style.transform = `translateY(${desplazamiento}px)`;
    }

    // Inicializar el intervalo automático
    if (carruselVertical && totalItems > 1) {
        setInterval(moverCarrusel, intervaloTiempo);
    }
});