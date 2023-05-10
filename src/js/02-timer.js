import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const btnEl = document.querySelector('button[data-start]');
const counterDays = document.querySelector('span[data-days]');
const counterHours = document.querySelector('span[data-hours]');
const counterMinutes = document.querySelector('span[data-minutes]');
const counterSeconds = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = new Date();
    if (selectedDates[0] <= date) {
      btnEl.setAttribute('disabled', 'true');
      alert('Please choose a date in the future');
    } else {
      btnEl.removeAttribute('disabled');
    }
  },
};
const fp = flatpickr('input#datetime-picker', options);
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
let intervalId;

function startTimer() {
  const currentDate = new Date();
  const selectedDate = new Date(
    document.querySelector('input#datetime-picker').value
  );
  const timeInMs = selectedDate.getTime() - currentDate.getTime();
  if (timeInMs <= 0) {
    counterDays.innerText = '00';
    counterHours.innerText = '00';
    counterMinutes.innerText = '00';
    counterSeconds.innerText = '00';
    btnEl.setAttribute('disabled', 'true');
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeInMs);

  counterDays.innerText = days.toString().padStart(2, '0');
  counterHours.innerText = hours.toString().padStart(2, '0');
  counterMinutes.innerText = minutes.toString().padStart(2, '0');
  counterSeconds.innerText = seconds.toString().padStart(2, '0');
}
btnEl.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = setInterval(startTimer, 1000);
});
