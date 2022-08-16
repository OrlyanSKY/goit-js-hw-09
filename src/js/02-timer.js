import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('[data-start]');
const timerInput = document.querySelector('#datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Report.failure(
        'IT was in the PAST!',
        'Please choose a date in the future',
        'OK'
      );
    }
    timerStartTime = selectedDates[0];
  },
  onChange(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      btnStart.disabled = false;
    } else {
      btnStart.disabled = true;
    }
  },
};

let timerStartTime = null;
let isTimerRun = false;
btnStart.disabled = true;

const fp = flatpickr(timerInput, options);

btnStart.addEventListener('click', () => {
  timerStart(timerStartTime);
});

function timerStart(selectedDates) {
  if (isTimerRun) {
    Notify.success('Timer is alredy run!');
    return;
  }

  const timerId = setInterval(() => {
    let differenceInTime = selectedDates - Date.now();
    isTimerRun = true;

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
  Notify.success('Timer off');
  isTimerRun = false;
  btnStart.disabled = true;
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
