document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  const items = document.querySelectorAll('.comics, .canon, .envelope');
  const buttonRight = document.querySelector('.button-right');
  const buttonLeft = document.querySelector('.button-left');
  const infoProtocol = document.querySelector('.information-protocol');
  const priceProtocol = document.querySelector('.price-protocol');
  const numberProtocol = document.querySelector('.number');
  const nalichieProtocol = document.querySelector('.information-nalichie-protocol');
  const objectProtocol = document.querySelector('.object-protocol');
  const choiceButtonDefault = document.querySelector('.choice-button-default');
  const choiceButtonAlt = document.querySelector('.choice-button-alt');


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
        // текст
        infoProtocol.innerHTML = item.getAttribute('data-info');
        priceProtocol.innerHTML = item.getAttribute('data-price');
        numberProtocol.innerHTML = item.getAttribute('data-number');
        nalichieProtocol.innerHTML = item.getAttribute('data-nalichie');
        objectProtocol.innerHTML = item.getAttribute('data-object');
        // управ кнопками
        if (item.classList.contains('comics') || item.classList.contains('canon')) {
          choiceButtonDefault.classList.remove('hidden');
          choiceButtonAlt.classList.add('hidden');
        } else if (item.classList.contains('envelope')) {
          choiceButtonDefault.classList.add('hidden');
          choiceButtonAlt.classList.remove('hidden');
        }
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
        // текст 
        infoProtocol.innerHTML = item.getAttribute('data-info');
        priceProtocol.innerHTML = item.getAttribute('data-price');
        numberProtocol.innerHTML = item.getAttribute('data-number');
        nalichieProtocol.innerHTML = item.getAttribute('data-nalichie');
        objectProtocol.innerHTML = item.getAttribute('data-object');
        // управ кнопками
        if (item.classList.contains('comics') || item.classList.contains('canon')) {
          choiceButtonDefault.classList.remove('hidden');
          choiceButtonAlt.classList.add('hidden');
        } else if (item.classList.contains('envelope')) {
          choiceButtonDefault.classList.add('hidden');
          choiceButtonAlt.classList.remove('hidden');
        }
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

  // инициализация
  const initialCenterItem = document.querySelector('.position-center');
  if (initialCenterItem) {
    infoProtocol.innerHTML = initialCenterItem.getAttribute('data-info');
    priceProtocol.innerHTML = initialCenterItem.getAttribute('data-price');
    numberProtocol.innerHTML = initialCenterItem.getAttribute('data-number');
    nalichieProtocol.innerHTML = initialCenterItem.getAttribute('data-nalichie');
    objectProtocol.innerHTML = initialCenterItem.getAttribute('data-object');
    if (initialCenterItem.classList.contains('comics') || initialCenterItem.classList.contains('canon')) {
      choiceButtonDefault.classList.remove('hidden');
      choiceButtonAlt.classList.add('hidden');
    } else if (initialCenterItem.classList.contains('envelope')) {
      choiceButtonDefault.classList.add('hidden');
      choiceButtonAlt.classList.remove('hidden');
    }
  }
});