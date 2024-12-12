// Получаем элементы
const serviceTiles = document.getElementById('serviceTiles');
const addServiceTile = document.getElementById('addServiceTile');
const editLinksButton = document.getElementById('editLinksButton');
const linksModal = new bootstrap.Modal(document.getElementById('linksModal'));
const linksList = document.getElementById('linksList');

// Список сервисов, добавленных администратором
const availableServices = [
    "Service 1",
    "Service 2",
    "Service 3"
];

// Список сервисов, выбранных пользователем
let userServices = JSON.parse(localStorage.getItem('userServices')) || [];

// Функция для обновления отображения плиток
function updateDisplay() {
    serviceTiles.innerHTML = '';

    // Рендерим плитки выбранных сервисов
    userServices.forEach((serviceName) => {
        const newTile = document.createElement('div');
        newTile.classList.add('tile');
        newTile.innerHTML = `
            <span>${serviceName}</span>
        `;
        serviceTiles.appendChild(newTile);
    });

    // Добавляем плитку для добавления нового сервиса
    serviceTiles.appendChild(addServiceTile);
}

// Функция для отображения списка ссылок в модальном окне
function renderLinksList() {
    linksList.innerHTML = '';
    userServices.forEach((serviceName) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        listItem.innerHTML = `
            <span>${serviceName}</span>
            <button class="btn btn-sm btn-danger" onclick="deleteService('${serviceName}')">Delete</button>
        `;
        linksList.appendChild(listItem);
    });
}

// Функция для удаления сервиса
function deleteService(serviceName) {
    userServices = userServices.filter(service => service !== serviceName);
    localStorage.setItem('userServices', JSON.stringify(userServices));
    updateDisplay();
    renderLinksList();
}

// Функция для выбора сервиса из доступных
function selectService(serviceName) {
    if (!userServices.includes(serviceName)) {
        userServices.push(serviceName);
        localStorage.setItem('userServices', JSON.stringify(userServices));
        updateDisplay();
    }
}

// Функция для отображения доступных сервисов в модальном окне
function renderAvailableServices() {
    const modalBody = document.querySelector('#addServiceModal .modal-body .row');
    modalBody.innerHTML = '';

    availableServices.forEach((serviceName) => {
        const serviceCard = document.createElement('div');
        serviceCard.classList.add('col-md-4', 'mb-3');
        serviceCard.innerHTML = `
            <div class="card service-tile" onclick="selectService('${serviceName}')">
                <div class="card-body text-center">
                    <h5 class="card-title">${serviceName}</h5>
                </div>
            </div>
        `;
        modalBody.appendChild(serviceCard);
    });
}

// Открытие модального окна для редактирования ссылок
editLinksButton.addEventListener('click', () => {
    renderLinksList();
    linksModal.show();
});

// Инициализация
updateDisplay();
renderAvailableServices();
