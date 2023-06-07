//Selecting Elements
const timeBtns = document.querySelectorAll('.btn-time');
const timer = document.querySelector('.timer');
const btnsContainer = document.querySelector('.btn-time-container');
const breakBtnsContainer = document.querySelector('.btn-break-container');
const shortBreak = document.querySelector('.btn-break--short');
const longBreak = document.querySelector('.btn-break--long');
const startBtn = document.querySelector('.btn-start');
const breakBtn = document.querySelector('.btn-start-break');
const body = document.querySelector('body');

//Selecting timer
let tick;
let counterRunning = false;

timeBtns.forEach((btn) =>
  btn.addEventListener('click', function () {
    clearInterval(tick);
    counterRunning = false;
    if (!counterRunning) startBtn.textContent = 'Start';
    timer.textContent = btn.textContent;
  })
);

const counterBreak = () => {
  counterRunning = false;
  body.style.backgroundColor = '#1B9C85';
  timer.textContent = `05:00`;
  btnsContainer.style.display = 'none';
  breakBtnsContainer.style.display = 'flex';
  startBtn.style.display = 'none';
  breakBtn.style.display = 'block';

  const updateBtns = function () {
    counterRunning = false;
    clearInterval(tick);
    if (!counterRunning) breakBtn.textContent = 'Start';
  };

  shortBreak.addEventListener('click', () => {
    timer.textContent = `05:00`;
    updateBtns();
  });
  longBreak.addEventListener('click', () => {
    timer.textContent = `15:00`;
    updateBtns();
  });
  breakBtn.addEventListener('click', checkCounter);
};

const startCounter = function (min, sec) {
  min = +timer.textContent.slice(0, 2);
  sec = +timer.textContent.slice(3);
  let duration = min * 60 + sec;

  const countdown = function () {
    let minutes = Math.trunc(duration / 60);
    let seconds = duration % 60;

    timer.textContent = `${minutes}`.padStart(2, 0) + ':' + `${seconds}`.padStart(2, 0);

    if (duration === 0) {
      clearInterval(tick);
      counterBreak();
    }
    duration--;
  };
  countdown();
  const tick = setInterval(countdown, 1000);
  return tick;
};

const checkCounter = function () {
  counterRunning = !counterRunning;
  this.textContent = counterRunning ? 'Pause' : 'Start';

  if (counterRunning) {
    tick && clearInterval(tick);
    tick = startCounter();
  } else {
    tick && clearInterval(tick);
  }
};
startBtn.addEventListener('click', checkCounter);
