document.addEventListener('DOMContentLoaded', () => {
  const choiceButtonDefault = document.querySelector('.choice-button-default');
  const choiceButtonAlt = document.querySelector('.choice-button-alt');
  const items = document.querySelectorAll('.comics, .canon, .envelope');

  function addToCart(item) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const itemData = {
      name: item.getAttribute('data-object'),
      size: item.getAttribute('data-info').match(/РАЗМЕР<br>([\s\S]*?)<br>/)[1].trim(),
      piece: 1,
      price: item.getAttribute('data-price').match(/(\d+[\s\d]*\₽)/)[1],
      image: item.getAttribute('data-image')
    };
    cartItems.push(itemData);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert('Товар добавлен в корзину!');
  }

  choiceButtonDefault.addEventListener('click', () => {
    const centerItem = document.querySelector('.position-center');
    if (centerItem) {
      addToCart(centerItem);
    }
  });

  choiceButtonAlt.addEventListener('click', () => {
    const centerItem = document.querySelector('.position-center');
    if (centerItem) {
      addToCart(centerItem);
    }
  });
});