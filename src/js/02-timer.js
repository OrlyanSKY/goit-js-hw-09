import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const timerInput = document.querySelector('#datetime-picker');
const fp = flatpickr(timerInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
});
