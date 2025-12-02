document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener el formulario por su ID (debe ser 'formularioLogin' según tu HTML)
    const formulario = document.getElementById('formularioLogin');

    // 2. Escuchar el evento de envío del formulario
    formulario.addEventListener('submit', function(event) {
        // Prevenir el envío por defecto para manejar la validación
        event.preventDefault(); 

        // 3. Obtener los valores de los campos
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Limpiar mensajes de error previos y establecer la bandera de validación
        limpiarErrores();
        let esValido = true; 

        // 4. Validar Email: Obligatorio y formato correcto
        if (email === '') {
            mostrarError('email', 'El correo electrónico es obligatorio.');
            esValido = false;
        } else if (!validarEmailFormato(email)) {
            mostrarError('email', 'El formato del correo electrónico no es válido.');
            esValido = false;
        }

        // 5. Validar Contraseña: Obligatoria y longitud mínima de 6 caracteres
        if (password === '') {
            mostrarError('password', 'La contraseña es obligatoria.');
            esValido = false;
        } else if (password.length < 6) {
            // Utilizamos el mismo mínimo de 6 caracteres que en el registro para consistencia
            mostrarError('password', 'La contraseña debe tener al menos 6 caracteres.');
            esValido = false;
        }

        // 6. Si todas las validaciones pasan, simular inicio de sesión
        if (esValido) {
            // En un sistema real, aquí se enviarían los datos al servidor para verificar credenciales.
            alert(`¡Inicio de sesión exitoso para: ${email}! Redirigiendo a Escritorio... (Simulación)`);
            
            // **IMPORTANTE:** Si el inicio de sesión es exitoso, podrías redirigir así:
            // window.location.href = 'escritorio.html'; 
            
            formulario.reset(); // Limpia el formulario después del éxito simulado
        }
    });

    // --- Funciones Auxiliares para Manejo de Errores ---

    // Función para mostrar mensajes de error debajo del campo
    function mostrarError(campoId, mensaje) {
        const inputElement = document.getElementById(campoId);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'red'; 
        errorDiv.style.fontSize = '0.8em';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = mensaje;
        
        // Insertar el error justo después del input
        inputElement.parentNode.appendChild(errorDiv);
        
        // Señalizar el campo inválido con un borde rojo
        inputElement.style.border = '1px solid red';
    }

    // Función para limpiar todos los errores (para el siguiente intento)
    function limpiarErrores() {
        const mensajesDeError = document.querySelectorAll('.error-message');
        mensajesDeError.forEach(msg => msg.remove());
        
        const formulario = document.getElementById('formularioLogin');
        const inputs = formulario.querySelectorAll('input, select');
        inputs.forEach(input => {
            // Restaurar el borde al color original definido en CSS
            // Usamos una fallback por si la variable CSS no carga
            input.style.border = '1px solid var(--color-gris-claro, #D3D3D3)'; 
        });
    }

    // Función simple de validación de formato de email
    function validarEmailFormato(email) {
        // Expresión regular estándar para formato de email
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});