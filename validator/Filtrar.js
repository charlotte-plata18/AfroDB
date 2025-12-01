const buscador = document.querySelector(".search-box input");
const productos = document.querySelectorAll(".card");

buscador.addEventListener("input", () => {
    const valor = buscador.value.trim().toLowerCase();

    productos.forEach(card => {
        const nombre = card.querySelector("h3").textContent.toLowerCase();

        if (valor === "") {
            card.style.display = "block";
            return;
        }

        if (nombre.startsWith(valor[0])) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});
