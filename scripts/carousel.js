document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  const items = document.querySelectorAll('.comics, .canon, .envelope');
  const buttonRight = document.querySelector('.button-right');
  const buttonLeft = document.querySelector('.button-left');

  if (!carousel || !buttonRight || !buttonLeft) {
    console.error('Не найдены элементы карусели или кнопки');
    return;
  }

  function updatePositions() {
    items.forEach(item => {
      const position = item.classList.contains('position-center') ? 'center' :
                      item.classList.contains('position-left') ? 'left' :
                      'right';

      if (position === 'center') {
        item.classList.remove('position-center');
        item.classList.add('position-left');
      } else if (position === 'right') {
        item.classList.remove('position-right');
        item.classList.add('position-center');
      } else if (position === 'left') {
        item.classList.remove('position-left');
        item.classList.add('position-right');
      }
    });
  }

  function updateReversePositions() {
    items.forEach(item => {
      const position = item.classList.contains('position-center') ? 'center' :
                      item.classList.contains('position-left') ? 'left' :
                      'right';

      if (position === 'center') {
        item.classList.remove('position-center');
        item.classList.add('position-right');
      } else if (position === 'right') {
        item.classList.remove('position-right');
        item.classList.add('position-left');
      } else if (position === 'left') {
        item.classList.remove('position-left');
        item.classList.add('position-center');
      }
    });
  }

  buttonRight.addEventListener('click', () => {
    console.log('Кнопка вправо нажата');
    updatePositions();
  });

  buttonLeft.addEventListener('click', () => {
    console.log('Кнопка влево нажата');
    updateReversePositions();
  });
});