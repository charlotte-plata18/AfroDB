const userForm = document.getElementById('userForm');
const userTable = document.getElementById('userTable').querySelector('tbody');

userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const contacto = document.getElementById('contacto').value.trim();
  const tipo = document.getElementById('tipoUsuario').value;


  const dominiosValidos = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com"];
  const dominioCorreo = correo.split("@")[1];

  if (!dominioCorreo || !dominiosValidos.includes(dominioCorreo)) {
      alert("Ingresa un correo válido (gmail, hotmail, outlook, yahoo)");
      return;
  }

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${nombre}</td>
    <td>${apellido}</td>
    <td>${correo}</td>
    <td>${contacto}</td>
    <td>${tipo}</td>
    <td>
      <button onclick="editarUsuario(this)">Editar</button>
      <button onclick="eliminarUsuario(this)">Eliminar</button>
    </td>
  `;
  
  userTable.appendChild(row);
  userForm.reset();
});

function editarUsuario(btn) {
  const row = btn.closest('tr');
  document.getElementById('nombre').value = row.cells[0].textContent;
  document.getElementById('apellido').value = row.cells[1].textContent;
  document.getElementById('correo').value = row.cells[2].textContent;
  document.getElementById('contacto').value = row.cells[3].textContent;
  document.getElementById('tipoUsuario').value = row.cells[4].textContent;
  row.remove();
}

function eliminarUsuario(btn) {
  const row = btn.closest('tr');
  row.remove();
}
