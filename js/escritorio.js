document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Variables y Configuración del Carrusel ---
    const carruselVertical = document.querySelector('.carrusel-vertical');
    const items = document.querySelectorAll('.carrusel-item');
    const alturaItem = 300; // Debe coincidir con la altura definida en escritorio.css (300px)
    const totalItems = items.length;
    
    let currentIndex = 0;
    const intervaloTiempo = 3000; // 3 segundos
    
    // Establecer la altura total inicial del carrusel
    if (carruselVertical) {
        carruselVertical.style.height = `${totalItems * alturaItem}px`;
    }

    // --- 2. Función de Movimiento del Carrusel ---
    function moverCarrusel() {
        if (!carruselVertical) return; // Salir si el elemento no existe

        // Incrementar el índice
        currentIndex++;
        
        // Si el índice supera el último elemento, regresa al primero
        if (currentIndex >= totalItems) {
            currentIndex = 0;
        }

        // Calcular el desplazamiento vertical
        const desplazamiento = -currentIndex * alturaItem;
        
        // Aplicar la transformación CSS
        carruselVertical.style.transform = `translateY(${desplazamiento}px)`;
    }

    // --- 3. Inicialización del Carrusel Automático ---
    if (carruselVertical && totalItems > 1) {
        setInterval(moverCarrusel, intervaloTiempo);
    }


    // --- 4. Inicialización de Información de Usuario (Simulado) ---
    const nombreUsuarioDisplay = document.getElementById('nombreUsuario');
    const rolUsuarioDisplay = document.getElementById('rolUsuario');
    const nombreUsuarioBienvenida = document.getElementById('nombreUsuarioBienvenida');
    const btnCerrarSesion = document.getElementById('btnCerrarSesion');
    
    // Simulación de datos del usuario logueado (Puedes cambiar estos valores)
    const datosUsuario = {
        nombre: "Ramber",
        rol: "Administrador" 
    };

    if (nombreUsuarioDisplay && rolUsuarioDisplay) {
        nombreUsuarioDisplay.textContent = datosUsuario.nombre;
        rolUsuarioDisplay.textContent = datosUsuario.rol;
    }
    if (nombreUsuarioBienvenida) {
        nombreUsuarioBienvenida.textContent = datosUsuario.nombre;
    }

    // Función de Cerrar Sesión (Simulado)
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', () => {
            alert("Sesión cerrada. Redirigiendo a Login.");
            // En un proyecto real: limpiar tokens o sesión
            window.location.href = 'index.html'; 
        });
    }
});