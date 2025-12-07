document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("editForm");
    const saveBtn = document.querySelector(".btn-save");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let nombre = document.getElementById("nombre").value.trim();
        let apellido = document.getElementById("apellido").value.trim();
        let correo = document.getElementById("correo").value.trim();
        let telefono = document.getElementById("telefono").value.trim();
        let fecha = document.getElementById("fecha").value.trim();
        let direccion = document.getElementById("direccion").value.trim();

        if (nombre.length < 2) {
            alert("El nombre debe tener al menos 2 caracteres");
            return;
        }

        if (apellido.length < 2) {
            alert("El apellido debe tener al menos 2 caracteres");
            return;
        }

        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            alert("Ingrese un correo electrónico válido");
            return;
        }

        if (!/^\d{10}$/.test(telefono)) {
            alert("El número de teléfono debe tener 10 dígitos");
            return;
        }

        if (fecha === "") {
            alert("Seleccione una fecha de nacimiento");
            return;
        }

        if (direccion.length < 5) {
            alert("Ingrese una dirección válida");
            return;
        }

        saveBtn.disabled = true;
        saveBtn.textContent = "Guardando...";

        setTimeout(() => {
            alert("Datos actualizados exitosamente ✨");
            saveBtn.disabled = false;
            saveBtn.textContent = "Guardar Cambios";
        }, 1200);
    });

});
