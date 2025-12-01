const menuIcon = document.getElementById('menuIcon');
const sideMenu = document.getElementById('sideMenu');
const btnEnter = document.getElementById('btnPin');
const pinInput = document.getElementById('pinInput');

menuIcon.addEventListener('click', () => {
  sideMenu.classList.toggle('active');
  pinInput.focus(); 
});


function validarPIN() {
  const pin = pinInput.value.trim();
  if(pin === "1234") {
    window.location.href = "../Pages/admin.html"; 
  } else if(pin === "5678") {
    window.location.href = "../Pages/profesional.html"; 
  } else {
    alert("PIN incorrecto");
    pinInput.value = "";
    pinInput.focus();
  }
}

document.addEventListener('click', (e) => {
  const menuClicked = sideMenu.contains(e.target);
  const iconClicked = menuIcon.contains(e.target);

  if (!menuClicked && !iconClicked) {
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
  }
});

btnEnter.addEventListener('click', validarPIN);


pinInput.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') validarPIN();
  
});