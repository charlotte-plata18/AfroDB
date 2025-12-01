// --- PERFIL ---
const editForm = document.getElementById('editForm');
const fotoPerfilInput = document.getElementById('fotoPerfil');
const fotoPerfilContainer = document.getElementById('fotoPerfilContainer');

// Cargar datos guardados en localStorage
function cargarPerfil() {
    const perfil = JSON.parse(localStorage.getItem('perfilProfesional')) || {};
    document.getElementById('nombre').value = perfil.nombre || '';
    document.getElementById('apellido').value = perfil.apellido || '';
    document.getElementById('correo').value = perfil.correo || '';
    document.getElementById('contacto').value = perfil.contacto || '';
    document.getElementById('cargo').value = perfil.cargo || '';

    if (perfil.fotoPerfil) mostrarFotoPerfil(perfil.fotoPerfil);
}
cargarPerfil();

// Función para mostrar foto de perfil con botón eliminar
function mostrarFotoPerfil(src) {
    fotoPerfilContainer.innerHTML = `
        <div class="foto-card">
            <img src="${src}" class="foto-perfil">
            <button id="eliminarFotoPerfil">Eliminar</button>
        </div>
    `;

    // Botón de eliminar
    document.getElementById('eliminarFotoPerfil').addEventListener('click', () => {
        fotoPerfilContainer.innerHTML = '';
        const perfil = JSON.parse(localStorage.getItem('perfilProfesional')) || {};
        delete perfil.fotoPerfil;
        localStorage.setItem('perfilProfesional', JSON.stringify(perfil));
    });
}

// Guardar cambios de perfil
editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const contacto = document.getElementById('contacto').value.trim();
    const cargo = document.getElementById('cargo').value.trim();

    const dominioCorreo = correo.split("@")[1];
    const dominiosValidos = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com"];

    if (!dominioCorreo || !dominiosValidos.includes(dominioCorreo)) {
        alert("Ingresa un correo válido (gmail, hotmail, outlook, yahoo)");
        return;
    }

    const perfil = { nombre, apellido, correo, contacto, cargo };

    // Guardar foto de perfil si existe
    const fotoImg = fotoPerfilContainer.querySelector('img');
    if (fotoImg) perfil.fotoPerfil = fotoImg.src;

    localStorage.setItem('perfilProfesional', JSON.stringify(perfil));
    alert("Perfil actualizado correctamente!");
});

// --- FOTO DE PERFIL ---
fotoPerfilInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        mostrarFotoPerfil(event.target.result);
    }
    reader.readAsDataURL(file);
});

// --- CITAS ---
const citas = JSON.parse(localStorage.getItem('citasProfesional')) || [];

function mostrarCitas() {
    const contenedor = document.getElementById('citasContainer');
    if (!contenedor) return;

    contenedor.innerHTML = '';
    if (citas.length === 0) {
        contenedor.innerHTML = '<p>No tienes citas agendadas</p>';
        return;
    }

    citas.forEach(cita => {
        const div = document.createElement('div');
        div.className = 'cita';
        div.innerHTML = `<strong>${cita.fecha}</strong> - ${cita.cliente} (${cita.servicio})`;
        contenedor.appendChild(div);
    });
}
mostrarCitas();

// --- GALERÍA DE TRABAJO ---
const uploadInput = document.getElementById('uploadFotos');
const galeria = document.getElementById('galeria');
let fotosTrabajo = JSON.parse(localStorage.getItem('fotosTrabajo')) || [];

function renderGaleria() {
    galeria.innerHTML = '';
    fotosTrabajo.forEach((src, index) => {
        const card = document.createElement('div');
        card.className = 'foto-card';
        card.innerHTML = `<img src="${src}">
                          <button onclick="eliminarFoto(${index})">Eliminar</button>`;
        galeria.appendChild(card);
    });
}
renderGaleria();

uploadInput.addEventListener('change', (e) => {
    const files = e.target.files;
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(event) {
            fotosTrabajo.push(event.target.result);
            localStorage.setItem('fotosTrabajo', JSON.stringify(fotosTrabajo));
            renderGaleria();
        }
        reader.readAsDataURL(file);
    });
});

function eliminarFoto(index) {
    fotosTrabajo.splice(index, 1);
    localStorage.setItem('fotosTrabajo', JSON.stringify(fotosTrabajo));
    renderGaleria();
}

// --- COMENTARIOS ---
const comentarios = JSON.parse(localStorage.getItem('comentariosProfesional')) || [];
function mostrarComentarios() {
    const contenedor = document.getElementById('comentariosContainer');
    if (!contenedor) return;

    contenedor.innerHTML = '';
    if (comentarios.length === 0) {
        contenedor.innerHTML = '<p>No hay comentarios aún</p>';
        return;
    }

    comentarios.forEach(c => {
        const div = document.createElement('div');
        div.className = 'comentario';
        div.innerHTML = `<strong>${c.cliente}:</strong> ${c.texto}`;
        contenedor.appendChild(div);
    });
}
mostrarComentarios();
