const categoriaSelect = document.getElementById("categoria");
const servicioSelect = document.getElementById("servicio");
const btnReservar = document.querySelector(".btn-reservar");

const usuarioRegistrado = JSON.parse(localStorage.getItem("usuarioRegistrado"));
const usuarioLogueado = localStorage.getItem("usuarioLogueado"); 

const servicios = {
  cabello: [
    "Corte en capas",
    "Corte bob",
    "Peinado Con ondas suaves",
    "Trenzas Clásicas",
    "Moño Elegante",
    "Corte Pixie",
    "Peinados con trenzas africanas",
    "Alisado con plancha"
  ],
  uñas: [
    "Uñas Tradicionales",
    "Uñas Semi-permanentes",
    "Diseño Artístico",
    "Uñas acrílicas",
    "Uñas de gel",
    "Manicure Spa",
    "Arte 3D en uñas",
    "Pedicure"
  ],
  Belleza: [
    "Limpieza facial",
    "Exfoliación facil",
    "Mascarilla hidratante",
    "Tratamiento anti-edad",
    "Masaje facial",
    "Microdermoabrasión"
  ],
  Tratamientos: [
    "Hidratación Capilar",
    "Reparación Capilar",
    "Nutrición Capilar",
    "Fortalecimiento Capilar",
    "Tratamiento con keratina",
    "Mascarilla Capilar"
  ]
};

const horasOcupadas = ["09:00", "11:30", "15:00"];

categoriaSelect.addEventListener("change", () => {
  const categoria = categoriaSelect.value;
  servicioSelect.innerHTML = '<option value="">-- Selecciona un servicio --</option>';

  if (categoria) {
    servicioSelect.disabled = false;
    servicios[categoria].forEach(serv => {
      const option = document.createElement("option");
      option.value = serv;
      option.textContent = serv;
      servicioSelect.appendChild(option);
    });
  } else {
    servicioSelect.disabled = true;
  }
});

btnReservar.addEventListener("click", () => {

  if (!usuarioRegistrado) {
    alert("Debes registrarte antes de agendar una cita.");
    window.location.href = "../Pages/Registro.html";
    return;
  }

  if (usuarioLogueado !== "true") {
    alert("Debes iniciar sesión para agendar una cita.");
    window.location.href = "../Pages/Login.html";
    return;
  }

  const fecha = document.querySelector(".calendar-input").value;
  const profesional = document.querySelector('input[name="pro"]:checked');
  const servicio = servicioSelect.value;
  const hora = document.querySelector(".hora-select").value;

  if (!fecha) {
    alert("Selecciona una fecha.");
    return;
  }
  if (!servicio) {
    alert("Debes seleccionar una categoría y un servicio.");
    return;
  }
  if (!profesional) {
    alert("Selecciona un profesional.");
    return;
  }
  if (!hora) {
    alert("Selecciona una hora.");
    return;
  }

  if (horasOcupadas.includes(hora)) {
    alert("Esta hora ya está ocupada. Selecciona otra.");
    return;
  }

  window.location.href = "../Pages/CitaExitosa.html";
});
