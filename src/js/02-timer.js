import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const btnStart = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');
 const timerInput = document.querySelector('#datetime-picker');
const fp = flatpickr(timerInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedData = selectedDates;
    console.log(selectedData);
  },
});
