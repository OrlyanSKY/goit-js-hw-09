import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('[data-start]');
const timerInput = document.querySelector('#datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timerStartTime = selectedDates[0];
  },
  onChange(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      btnStart.disabled = false;
      Notify.success(`Ok. Let's go`);
      stopTimer(timerId);
      timerRender(convertMs(0));
    } else {
      btnStart.disabled = true;
      Notify.failure('Please choose a date in the future');
    }
  },
};
let timerStartTime = null;
let timerId = null;

const fp = flatpickr(timerInput, options);

btnStart.addEventListener('click', () => {
  timerStart(timerStartTime);
});

function timerStart(selectedDates) {
  btnStart.disabled = true;

  timerId = setInterval(() => {
    let differenceInTime = selectedDates - Date.now();

    if (differenceInTime < 0) {
      stopTimer(timerId);
      return;
    }
    timerRender(convertMs(differenceInTime));
  }, 1000);
}
function timerRender(obj) {
  for (const key in obj) {
    document.querySelector(`[data-${key}]`).innerHTML = String(
      obj[key]
    ).padStart(2, '0');
  }
}
function stopTimer(timerID) {
  clearInterval(timerID);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
