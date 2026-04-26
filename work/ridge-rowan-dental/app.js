const availableSlots = {
  'next': ['09:00 AM', '10:30 AM', '12:00 PM', '02:30 PM', '04:00 PM'],
  'later': ['09:30 AM', '11:00 AM', '01:00 PM', '03:00 PM']
};

function formatDate(date){
  return date.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'});
}

function buildDateOptions(){
  const dateInput = document.querySelector('#appointment-date');
  if (!dateInput) return;
  const today = new Date();
  for (let i=1; i<=8; i++){
    const next = new Date(today);
    next.setDate(today.getDate() + i);
    const option = document.createElement('option');
    option.value = next.toISOString().slice(0,10);
    option.textContent = formatDate(next);
    dateInput.appendChild(option);
  }
}

function updateTimes(){
  const dateInput = document.querySelector('#appointment-date');
  const slotContainer = document.querySelector('#available-times');
  if (!dateInput || !slotContainer) return;
  slotContainer.innerHTML = '';
  const selected = new Date(dateInput.value);
  const day = selected.getDay();
  const slots = day === 0 || day === 6 ? availableSlots.later : availableSlots.next;
  slots.forEach(time => {
    const pill = document.createElement('div');
    pill.className = 'time-pill';
    pill.textContent = time;
    slotContainer.appendChild(pill);
  });
}

function showConfirmation(details){
  const confirmation = document.querySelector('#booking-confirmation');
  confirmation.innerHTML = `
    <strong>Appointment request received.</strong>
    <p>We’ve reserved a provisional slot for <strong>${details.service}</strong> on <strong>${details.date}</strong> at <strong>${details.time}</strong>. Our patient care team will follow up by email within 15 minutes to confirm your booking.</p>
  `;
  confirmation.scrollIntoView({behavior:'smooth',block:'center'});
}

function bindBookingForm(){
  const form = document.querySelector('#booking-form');
  if (!form) return;
  form.addEventListener('submit', event => {
    event.preventDefault();
    const service = form.querySelector('#service-type').value;
    const date = form.querySelector('#appointment-date').selectedOptions[0].textContent;
    const time = form.querySelector('#appointment-time').value;
    showConfirmation({service,date,time});
    form.reset();
    form.querySelector('#appointment-date').selectedIndex = 0;
    updateTimes();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  buildDateOptions();
  updateTimes();
  bindBookingForm();
  const dateInput = document.querySelector('#appointment-date');
  if (dateInput) dateInput.addEventListener('change', updateTimes);
});
