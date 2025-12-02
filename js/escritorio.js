document.addEventListener('DOMContentLoaded', () => {

    // --- 1. GESTIÓN Y VERIFICACIÓN DE SESIÓN ---

    const usuarioData = sessionStorage.getItem('usuarioLogueado');
    if (usuarioData) {
        // La sesión existe, cargamos los datos del usuario
        const usuario = JSON.parse(usuarioData);

        // Elementos donde se muestra la información del usuario
        const nombreUsuarioDisplay = document.getElementById('nombreUsuario');
        const rolUsuarioDisplay = document.getElementById('rolUsuario');
        const nombreUsuarioBienvenida = document.getElementById('nombreUsuarioBienvenida');

        if (nombreUsuarioDisplay) nombreUsuarioDisplay.textContent = usuario.nombre;
        if (rolUsuarioDisplay) rolUsuarioDisplay.textContent = usuario.rol;
        if (nombreUsuarioBienvenida) nombreUsuarioBienvenida.textContent = usuario.nombre;

        // Asegurar que el botón de Cerrar Sesión funcione llamando a la función global
        const btnCerrarSesion = document.getElementById('btnCerrarSesion');
        if (btnCerrarSesion) {
            btnCerrarSesion.addEventListener('click', () => {
                // window.cerrarSesion debe estar definida en auth.js
                if (typeof window.cerrarSesion === 'function') {
                    window.cerrarSesion();
                } else {
                    alert("Error: La función de cierre de sesión no está disponible.");
                }
            });
        }

    } else {
        // Si no hay datos de sesión, redirigir al login
        alert("Sesión no encontrada. Por favor, inicia sesión.");
        window.location.href = 'index.html';
        return; // Detener la ejecución del resto del script si no hay sesión
    }


    // --- 2. LÓGICA DEL CARRUSEL VERTICAL AUTOMÁTICO ---

    const carruselVertical = document.querySelector('.carrusel-vertical');
    const items = document.querySelectorAll('.carrusel-item');
    const alturaItem = 300; // Debe coincidir con la altura definida en escritorio.css (300px)
    const totalItems = items.length;

    let currentIndex = 0;
    const intervaloTiempo = 3000; // 3 segundos

    // Establecer la altura total del contenedor para que la transición CSS funcione correctamente
    if (carruselVertical && totalItems > 0) {
        carruselVertical.style.height = `${totalItems * alturaItem}px`;
    }

    // Función que realiza el movimiento del carrusel
    function moverCarrusel() {
        if (!carruselVertical || totalItems <= 1) return; // No hacer nada si no hay carrusel o pocos ítems

        // 1. Incrementar el índice
        currentIndex++;

        // 2. Si el índice supera el último elemento, regresa al primero
        if (currentIndex >= totalItems) {
            currentIndex = 0;
        }

        // 3. Calcular el desplazamiento vertical (hacia arriba, por eso es negativo)
        const desplazamiento = -currentIndex * alturaItem;

        // 4. Aplicar la transformación CSS para mover el carrusel
        carruselVertical.style.transform = `translateY(${desplazamiento}px)`;
    }

    // 5. Inicialización del Carrusel Automático
    if (carruselVertical && totalItems > 1) {
        setInterval(moverCarrusel, intervaloTiempo);
    }
});