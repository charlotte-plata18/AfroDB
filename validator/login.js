const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const correo = loginForm.querySelector('input[type="email"]').value.trim();
    const clave = loginForm.querySelector('input[type="password"]').value.trim();

    if (!correo || !clave) {
        alert("Por favor completa ambos campos");
        return;
    }

    const dominiosValidos = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com"];
    const dominioCorreo = correo.split("@")[1];

    if (!dominioCorreo || !dominiosValidos.includes(dominioCorreo)) {
        alert("Ingresa un correo válido (gmail, hotmail, outlook, yahoo)");
        return;
    }

    if (clave.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres");
        return;
    }

    const usuarioPrueba = "pruebaafrodb@gmail.com";
    const clavePrueba = "123456";

    const usuarioRegistrado = JSON.parse(localStorage.getItem("usuarioRegistrado"));

    const coincideRegistrado =
        usuarioRegistrado &&
        correo === usuarioRegistrado.correo &&
        clave === usuarioRegistrado.password;

    const coincidePrueba = correo === usuarioPrueba && clave === clavePrueba;

    if (coincideRegistrado || coincidePrueba) {
        localStorage.setItem("usuarioLogueado", "true"); 
        alert("¡Inicio de sesión exitoso! 🎉");
        window.location.href = "../Pages/Salon Homepage.html";
    } else {
        alert("Correo o contraseña incorrectos");
    }
});
