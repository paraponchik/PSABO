// Получаем элементы
const serviceTable = document.getElementById('serviceTable');
const saveServiceButton = document.getElementById('saveServiceButton');
const serviceNameInput = document.getElementById('serviceName');
const serviceLinkInput = document.getElementById('serviceLink');
const serviceIdInput = document.getElementById('serviceId');
const searchInput = document.querySelector('.search-bar input');
let services = []; // Хранение всех сервисов

// Функция для обновления таблицы
function updateTable(filter = '') {
  serviceTable.innerHTML = '';
  services
    .filter(service =>
      service.name.toLowerCase().includes(filter.toLowerCase()) ||
      service.link.toLowerCase().includes(filter.toLowerCase())
    )
    .forEach((service, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${service.name}</td>
        <td><a href="${service.link}" target="_blank">${service.link}</a></td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editService(${index})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteService(${index})">Delete</button>
        </td>
      `;
      serviceTable.appendChild(row);
    });
}

// Добавление/обновление сервиса
saveServiceButton.addEventListener('click', () => {
  const name = serviceNameInput.value;
  const link = serviceLinkInput.value;
  const id = serviceIdInput.value;

  if (name && link) {
    if (id) {
      // Обновление существующего сервиса
      services[id] = { name, link };
    } else {
      // Добавление нового сервиса
      services.push({ name, link });
    }

    bootstrap.Modal.getInstance(document.getElementById('addServiceModal')).hide();
    updateTable();
    clearForm();
  }
});

// Редактирование сервиса
function editService(index) {
  const service = services[index];
  serviceIdInput.value = index;
  serviceNameInput.value = service.name;
  serviceLinkInput.value = service.link;
  const addModal = new bootstrap.Modal(document.getElementById('addServiceModal'));
  addModal.show();
}

// Удаление сервиса
function deleteService(index) {
  services.splice(index, 1);
  updateTable();
}

// Очистка формы
function clearForm() {
  serviceIdInput.value = '';
  serviceNameInput.value = '';
  serviceLinkInput.value = '';
}

// Обработка поиска
searchInput.addEventListener('input', () => {
  const filter = searchInput.value;
  updateTable(filter);
});

// Инициализация данных (пример данных для тестирования)
services = [
  { name: 'Example Service 1', link: 'https://example.com/1' },
  { name: 'Example Service 2', link: 'https://example.com/2' },
];
updateTable();
