const form = document.querySelector("form");

form.addEventListener("submit", function(e) {
    e.preventDefault(); 

    const documento = document.querySelector('input[placeholder="#Documento"]').value.trim();
    const tipoDoc = document.querySelector('select').value;
    const nombres = document.querySelector('input[placeholder="Nombres y Apellidos"]').value.trim();
    const direccion = document.querySelector('input[placeholder="Dirección"]').value.trim();
    const telefono = document.querySelector('input[placeholder="Telefono"]').value.trim();
    const correo = document.querySelector('input[placeholder="Correo electrónico"]').value.trim();
    const clave = document.querySelector('input[placeholder="clave"]').value.trim();

    if (!documento || tipoDoc === "Tipo de documento" || !nombres || !direccion || !telefono || !correo || !clave) {
        alert("Por favor completa todos los campos");
        return;
    }

    if (!/^\d+$/.test(documento)) {
        alert("Documento solo puede contener números");
        return;
    }

    if (!/^\d{7,15}$/.test(telefono)) {
        alert("Teléfono debe tener entre 7 y 15 números");
        return;
    }

    const dominiosValidos = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com"];
    const dominioCorreo = correo.split("@")[1];

    if (!dominioCorreo || !dominiosValidos.includes(dominioCorreo)) {
        alert("Ingresa un correo válido (gmail, hotmail, outlook, yahoo)");
        return;
    }

    if (clave.length < 6) {
        alert("La clave debe tener mínimo 6 caracteres");
        return;
    }

   
    const nuevoUsuario = {
        documento,
        tipoDoc,
        nombres,
        direccion,
        telefono,
        correo,
        password: clave
    };

    localStorage.setItem("usuarioRegistrado", JSON.stringify(nuevoUsuario));

    alert("¡Registro exitoso! 🎉");
    window.location.href = "../Pages/index.html";

    form.reset();
});
