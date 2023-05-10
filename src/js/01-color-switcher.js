function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const bodyEl = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', 'true');
  changeColor = setInterval(() => {
    bodyEl.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
});
stopBtn.addEventListener('click', () => {
  startBtn.removeAttribute('disabled');
  clearInterval(changeColor);
});
