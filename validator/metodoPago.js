document.getElementById("formPago").addEventListener("submit", function(e) {
    e.preventDefault();

   
    let metodo = document.querySelector('input[name="pago"]:checked');

    if (!metodo) {
        alert("Por favor selecciona un método de pago.");
        return;
    }

    
    metodo = metodo.value;

    alert("✔ Pago confirmado con: " + metodo.toUpperCase());

    
    window.location.href = "../Pages/Salon Homepage.html";
});
