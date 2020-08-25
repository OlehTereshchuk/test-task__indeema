const button = document.getElementById('button');
const main = document.getElementById('main');
const modalWidth = 200;
const modalHeight = 200;

const getRandomPosition = () => {
  const randomX = Math.random();
  const randomY = Math.random();

  return {
    x: document.documentElement.clientWidth * randomX,
    y: document.documentElement.clientHeight * randomY
  }
}

button.addEventListener('click', () => {
  const div = document.createElement('div');
  const closeButton = document.createElement('div');
  closeButton.innerHTML = 'CLOSE';
  closeButton.classList.add('btn', 'btn-danger');
  div.classList.add('modal-window');

  closeButton.addEventListener('click', (event) => {
    const modal = event.target.parentElement;
    modal.style.animationName = 'fadeOut';
    setTimeout(() => modal.remove(), 500)
  });

  let {x, y} = getRandomPosition();

  while(
    x > document.documentElement.clientWidth - modalWidth
    || y > document.documentElement.clientHeight - modalHeight
  ){
    newPosition = getRandomPosition()
    x = newPosition.x;
    y = newPosition.y;
  }

  div.style.top = y + 'px';
  div.style.left = x + 'px';
  div.style.width = modalWidth + 'px';
  div.style.height = modalHeight + 'px';

  div.append(closeButton)
  main.append(div);
});
