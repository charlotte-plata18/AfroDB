// Referencias a inputs, botones y tabla
const nombreInput = document.getElementById('nombre');
const precioInput = document.getElementById('precio');
const cantidadInput = document.getElementById('cantidad');
const btnAgregar = document.getElementById('btnAgregar');
const tabla = document.getElementById('tablaInventario').querySelector('tbody');

let inventario = [];

// Función para renderizar la tabla con estilo de tu CSS
function renderTabla() {
  tabla.innerHTML = '';
  inventario.forEach((producto, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${producto.nombre}</td>
      <td>${producto.precio}</td>
      <td>${producto.cantidad}</td>
      <td>
        <button class="btn" onclick="editarProducto(${index})">Editar</button>
        <button class="btn" onclick="borrarProducto(${index})">Borrar</button>
      </td>
    `;
    tabla.appendChild(row);
  });
}

// Función para agregar producto
btnAgregar.addEventListener('click', () => {
  const nombre = nombreInput.value.trim();
  const precio = parseFloat(precioInput.value);
  const cantidad = parseInt(cantidadInput.value);

  if(!nombre || isNaN(precio) || isNaN(cantidad)) {
    alert('Completa todos los campos correctamente');
    return;
  }

  inventario.push({nombre, precio, cantidad});
  nombreInput.value = '';
  precioInput.value = '';
  cantidadInput.value = '';
  renderTabla();
});

// Función para editar producto
function editarProducto(index) {
  const producto = inventario[index];
  nombreInput.value = producto.nombre;
  precioInput.value = producto.precio;
  cantidadInput.value = producto.cantidad;

  btnAgregar.textContent = 'Actualizar';
  btnAgregar.onclick = () => {
    producto.nombre = nombreInput.value;
    producto.precio = parseFloat(precioInput.value);
    producto.cantidad = parseInt(cantidadInput.value);

    nombreInput.value = '';
    precioInput.value = '';
    cantidadInput.value = '';
    btnAgregar.textContent = 'Agregar';
    btnAgregar.onclick = agregarProducto;

    renderTabla();
  };
}

// Reinicia la función original
function agregarProducto() {
  btnAgregar.click();
}

// Función para borrar producto
function borrarProducto(index) {
  if(confirm(`¿Deseas eliminar "${inventario[index].nombre}"?`)) {
    inventario.splice(index, 1);
    renderTabla();
  }
}
