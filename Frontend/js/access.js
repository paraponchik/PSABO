const requestTable = document.getElementById('requestTable');
const requestForm = document.getElementById('requestForm');

// Load requests from LocalStorage
const loadRequests = () => {
  const requests = JSON.parse(localStorage.getItem('accessRequests')) || [];
  requestTable.innerHTML = requests.map((req, index) => `
    <tr>
      <td>${req.service}</td>
      <td>${req.date}</td>
      <td>${req.status}</td>
      <td><span class="button-action button-cancel" onclick="cancelRequest(${index})">Cancel</span></td>
    </tr>
  `).join('');
};

// Save request to LocalStorage
const saveRequest = (service, accessLevel) => {
  const requests = JSON.parse(localStorage.getItem('accessRequests')) || [];
  const newRequest = {
    service,
    date: new Date().toLocaleDateString(),
    status: 'Pending',
  };
  requests.push(newRequest);
  localStorage.setItem('accessRequests', JSON.stringify(requests));
  loadRequests();
};

// Cancel a request
const cancelRequest = (index) => {
  const requests = JSON.parse(localStorage.getItem('accessRequests')) || [];
  requests.splice(index, 1);
  localStorage.setItem('accessRequests', JSON.stringify(requests));
  loadRequests();
};

// Handle form submission
requestForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const service = document.getElementById('serviceSelect').value;
  const accessLevel = document.getElementById('accessLevel').value;
  saveRequest(service, accessLevel);
  requestForm.reset();
  const modal = bootstrap.Modal.getInstance(document.getElementById('requestModal'));
  modal.hide();
});

// Initial load
loadRequests();
