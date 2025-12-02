document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Variables Globales y Selectores del DOM ---
    const tablaCuerpo = document.querySelector('.tabla-usuarios tbody');
    const filtroBusqueda = document.getElementById('filtroBusqueda');
    const btnAgregar = document.querySelector('.btn-agregar');
    
    const modal = document.getElementById('modalUsuario');
    const modalTitle = document.getElementById('modalTitle');
    const closeBtn = document.querySelector('.close-btn');
    const formUsuario = document.getElementById('formUsuario');
    const passwordGroup = document.getElementById('passwordGroup');
    
    // Almacenamiento simulado de datos de usuarios
    let usuarios = [
        { id: 1, nombre: 'Juan Pérez', email: 'juan.perez@admin.com', rol: 'Administrador', estado: 'Activo' },
        { id: 2, nombre: 'Ana García', email: 'ana.garcia@cliente.com', rol: 'Cliente', estado: 'Activo' },
        { id: 3, nombre: 'Pedro López', email: 'pedro.lopez@yahoo.com', rol: 'Cliente', estado: 'Suspendido' },
        { id: 4, nombre: 'Maria Rodriguez', email: 'maria.r@tienda.com', rol: 'Cliente', estado: 'Activo' }
    ];

    let nextId = 5; // ID para el próximo usuario a agregar

    // --- 2. Funciones de Renderizado y Filtro ---

    function renderizarTabla(listaUsuarios) {
        tablaCuerpo.innerHTML = ''; // Limpiar contenido anterior

        listaUsuarios.forEach(usuario => {
            const row = tablaCuerpo.insertRow();
            
            // Asignar clases para estilos de color basados en rol/estado
            const rolClass = usuario.rol === 'Administrador' ? 'rol-admin' : 'rol-cliente';
            const estadoClass = usuario.estado === 'Suspendido' ? 'estado-suspendido' : '';

            row.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.email}</td>
                <td class="${rolClass}">${usuario.rol}</td>
                <td class="${estadoClass}">${usuario.estado}</td>
                <td>
                    <button class="btn-accion btn-editar" data-id="${usuario.id}">Editar</button>
                    <button class="btn-accion btn-eliminar" data-id="${usuario.id}">Eliminar</button>
                </td>
            `;
        });
        // Después de renderizar, adjuntar listeners a los nuevos botones
        adjuntarListenersAcciones();
    }

    function filtrarUsuarios() {
        const busqueda = filtroBusqueda.value.toLowerCase();
        const usuariosFiltrados = usuarios.filter(usuario => 
            usuario.nombre.toLowerCase().includes(busqueda) ||
            usuario.email.toLowerCase().includes(busqueda)
        );
        renderizarTabla(usuariosFiltrados);
    }

    // --- 3. Funciones del Modal y CRUD (Simulado) ---

    function abrirModal(usuarioId = null) {
        formUsuario.reset(); // Limpiar formulario
        passwordGroup.style.display = 'block'; // Mostrar siempre el campo de contraseña por defecto

        if (usuarioId) {
            // Modo Edición
            const usuario = usuarios.find(u => u.id == usuarioId);
            if (usuario) {
                modalTitle.textContent = 'Editar Usuario: ' + usuario.nombre;
                
                // Llenar el formulario con datos del usuario
                document.getElementById('userId').value = usuario.id;
                document.getElementById('modalNombre').value = usuario.nombre;
                document.getElementById('modalEmail').value = usuario.email;
                document.getElementById('modalRol').value = usuario.rol;
                document.getElementById('modalEstado').value = usuario.estado;
                
                // Ocultar el campo de contraseña en edición (el usuario debe cambiarla por separado)
                passwordGroup.style.display = 'none'; 
            }
        } else {
            // Modo Agregar
            modalTitle.textContent = 'Agregar Nuevo Usuario';
            document.getElementById('userId').value = ''; 
        }
        modal.style.display = 'block';
    }

    function cerrarModal() {
        modal.style.display = 'none';
    }

    function guardarUsuario(event) {
        event.preventDefault();

        // 1. Obtener datos del formulario
        const id = document.getElementById('userId').value;
        const nombre = document.getElementById('modalNombre').value;
        const email = document.getElementById('modalEmail').value;
        const rol = document.getElementById('modalRol').value;
        const estado = document.getElementById('modalEstado').value;
        const password = document.getElementById('modalPassword').value;

        // Validación simple (Deberías mejorarla con la lógica de registro.js)
        if (!nombre || !email || !rol || !estado) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        if (!id && password.length < 6) {
             alert("La contraseña es obligatoria y debe tener al menos 6 caracteres.");
             return;
        }

        // 2. Lógica de Guardado/Actualización
        if (id) {
            // Actualizar usuario existente
            const index = usuarios.findIndex(u => u.id == id);
            if (index !== -1) {
                usuarios[index] = { id: Number(id), nombre, email, rol, estado };
                alert(`Usuario ${nombre} actualizado con éxito.`);
            }
        } else {
            // Agregar nuevo usuario
            const nuevoUsuario = { id: nextId++, nombre, email, rol, estado };
            usuarios.push(nuevoUsuario);
            alert(`Usuario ${nombre} agregado con éxito. Contraseña: ${password} (SIMULADO)`);
        }
        
        // 3. Cerrar y actualizar la vista
        cerrarModal();
        renderizarTabla(usuarios);
    }

    function eliminarUsuario(usuarioId) {
        if (confirm(`¿Estás seguro de que deseas eliminar el usuario con ID ${usuarioId}?`)) {
            usuarios = usuarios.filter(u => u.id != usuarioId);
            renderizarTabla(usuarios);
            alert("Usuario eliminado.");
        }
    }

    // --- 4. Event Listeners ---

    // Listener para el botón global de Agregar
    btnAgregar.addEventListener('click', () => abrirModal());
    
    // Listeners para cerrar el modal
    closeBtn.addEventListener('click', cerrarModal);
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            cerrarModal();
        }
    });

    // Listener para guardar el formulario del modal
    formUsuario.addEventListener('submit', guardarUsuario);

    // Listener para el filtro de búsqueda
    filtroBusqueda.addEventListener('keyup', filtrarUsuarios);

    // Adjuntar listeners a botones de Editar/Eliminar (dinámicamente)
    function adjuntarListenersAcciones() {
        document.querySelectorAll('.btn-editar').forEach(button => {
            button.addEventListener('click', (e) => {
                abrirModal(e.target.dataset.id);
            });
        });

        document.querySelectorAll('.btn-eliminar').forEach(button => {
            button.addEventListener('click', (e) => {
                eliminarUsuario(e.target.dataset.id);
            });
        });
    }

    // --- 5. Inicialización ---
    renderizarTabla(usuarios);
});