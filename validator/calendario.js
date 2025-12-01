const calendarGrid = document.getElementById('calendarGrid');
const monthYear = document.getElementById('monthYear');
const listaCitas = document.getElementById('listaCitas');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

let currentDate = new Date();

// Cargar citas desde localStorage
const citas = JSON.parse(localStorage.getItem('citasProfesional')) || [];

function renderCalendar() {
  calendarGrid.innerHTML = '';
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();

  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  daysOfWeek.forEach(day => {
    const div = document.createElement('div');
    div.textContent = day;
    div.style.fontWeight = 'bold';
    calendarGrid.appendChild(div);
  });

  for(let i = 0; i < firstDay; i++) {
    calendarGrid.appendChild(document.createElement('div'));
  }

  for(let day = 1; day <= lastDay; day++) {
    const div = document.createElement('div');
    div.textContent = day;
    div.classList.add('day');

    const today = new Date();
    if(day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      div.classList.add('today');
    }

    const fechaStr = `${year}-${(month+1).toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`;
    if(citas.some(c => c.fecha === fechaStr)) div.classList.add('has-cita');

    div.addEventListener('click', () => mostrarCitasDelDia(fechaStr));
    calendarGrid.appendChild(div);
  }

  monthYear.textContent = `${currentDate.toLocaleString('es-ES', { month: 'long' })} ${year}`;
}

function mostrarCitasDelDia(fechaStr) {
  listaCitas.innerHTML = '';
  const citasDia = citas.filter(c => c.fecha === fechaStr);
  if(citasDia.length === 0) {
    listaCitas.innerHTML = '<li>No hay citas</li>';
    return;
  }
  citasDia.forEach(c => {
    const li = document.createElement('li');
    li.textContent = `${c.hora} - ${c.cliente} (${c.servicio})`;
    listaCitas.appendChild(li);
  });
}

prevMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
  listaCitas.innerHTML = '<li>Selecciona un día para ver citas</li>';
});

nextMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
  listaCitas.innerHTML = '<li>Selecciona un día para ver citas</li>';
});

renderCalendar();
listaCitas.innerHTML = '<li>Selecciona un día para ver citas</li>';
