document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. UTILIDADES DE ALMACENAMIENTO ---
    
    // Obtiene usuarios de LocalStorage (simulación de base de datos)
    const obtenerUsuarios = () => {
        const usuariosJSON = localStorage.getItem('usuarios');
        let usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
        
        // Inicializar con un administrador si no hay usuarios
        if (usuarios.length === 0) {
            const adminDefault = {
                id: 1,
                nombre: 'Admin Principal',
                email: 'admin@gatos.com',
                password: 'password123',
                rol: 'Administrador',
                estado: 'Activo'
            };
            usuarios.push(adminDefault);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }
        return usuarios;
    };

    // Guarda los usuarios en LocalStorage
    const guardarUsuarios = (usuarios) => {
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    };

    let usuarios = obtenerUsuarios();
    
    // --- 2. LÓGICA DE REGISTRO (Para registro.html) ---

    const formRegistro = document.getElementById('formRegistro');
    if (formRegistro) {
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('registroNombre').value.trim();
            const email = document.getElementById('registroEmail').value.trim();
            const password = document.getElementById('registroPassword').value.trim();
            const rol = document.getElementById('registroRol') ? document.getElementById('registroRol').value : 'Cliente';
            
            if (password.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres.');
                return;
            }

            if (usuarios.some(u => u.email === email)) {
                alert('⚠️ Este correo electrónico ya está registrado.');
                return;
            }

            const nuevoUsuario = {
                id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
                nombre: nombre,
                email: email,
                password: password,
                rol: rol,
                estado: 'Activo'
            };

            usuarios.push(nuevoUsuario);
            guardarUsuarios(usuarios);

            alert('✅ Registro exitoso. ¡Ahora puedes iniciar sesión con tu cuenta!');
            window.location.href = 'index.html';
        });
    }

    // --- 3. LÓGICA DE INICIO DE SESIÓN (Para index.html) ---

    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value.trim();

            const usuarioEncontrado = usuarios.find(u => u.email === email);

            if (!usuarioEncontrado) {
                alert('❌ Correo electrónico no encontrado.');
                return;
            }

            if (usuarioEncontrado.password !== password) {
                alert('❌ Contraseña incorrecta.');
                return;
            }

            if (usuarioEncontrado.estado === 'Suspendido') {
                 alert('⚠️ Tu cuenta está suspendida. Contacta al soporte.');
                return;
            }

            // Inicio de sesión exitoso: guardar datos básicos para el header
            sessionStorage.setItem('usuarioLogueado', JSON.stringify({
                nombre: usuarioEncontrado.nombre,
                rol: usuarioEncontrado.rol,
                email: usuarioEncontrado.email,
            }));

            alert(`👋 ¡Bienvenido, ${usuarioEncontrado.nombre}!`);
            window.location.href = 'escritorio.html'; 
        });
    }
    
    // --- 4. FUNCIÓN GLOBAL DE CERRAR SESIÓN ---
    
    // Esta función se llama desde el header del escritorio o de cualquier otra página
    window.cerrarSesion = function() {
        sessionStorage.removeItem('usuarioLogueado');
        alert("Sesión cerrada. Redirigiendo a la página de inicio.");
        window.location.href = 'index.html'; 
    };
});