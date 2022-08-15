import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', evt => {
  evt.preventDefault();

  const delay = Number(evt.currentTarget.elements['delay'].value);
  const step = Number(evt.currentTarget.elements['step'].value);
  const amount = Number(evt.currentTarget.elements['amount'].value);

  toGeneratePromises(delay, step, amount);
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

function toGeneratePromises(delay, step, amount) {
  for (let i = 1; i <= amount; i++) {
    const promise = createPromise(i, delay);
    promise
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}
