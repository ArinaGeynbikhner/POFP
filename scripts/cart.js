document.addEventListener('DOMContentLoaded', () => {
  const choiceButton = document.querySelector('.choice-button');
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
  }

  choiceButton.addEventListener('click', () => {
    const centerItem = document.querySelector('.position-center');
    if (centerItem) {
      addToCart(centerItem);
    }
  });
});