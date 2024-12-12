  document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    const eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
    const saveButton = document.getElementById('saveEventButton');
    const eventNameInput = document.getElementById('eventName');
    const eventTimeInput = document.getElementById('eventTime');

    let selectedDate = null;

    function createCalendar(year, month) {
      calendarEl.innerHTML = '';

      const date = new Date(year, month);
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDay = date.getDay();

      // Пустые ячейки до первого дня
      for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        calendarEl.appendChild(emptyDiv);
      }

      // Дни месяца
      for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = day;
        dayDiv.dataset.date = `${year}-${month + 1}-${day}`;

        // Открытие модального окна при клике на день
        dayDiv.addEventListener('click', () => {
          selectedDate = dayDiv;
          eventModal.show();
        });

        calendarEl.appendChild(dayDiv);
      }
    }

    saveButton.addEventListener('click', () => {
      const eventName = eventNameInput.value.trim();
      const eventTime = eventTimeInput.value.trim();

      if (eventName && eventTime && selectedDate) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.textContent = `${eventName} (${eventTime})`;

        selectedDate.appendChild(eventDiv);

        eventNameInput.value = '';
        eventTimeInput.value = '';
        eventModal.hide();
      }
    });

    // Создаем календарь для текущего месяца
    const today = new Date();
    createCalendar(today.getFullYear(), today.getMonth());
  });
