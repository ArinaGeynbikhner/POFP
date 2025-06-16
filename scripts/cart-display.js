document.addEventListener('DOMContentLoaded', () => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  const amount = document.querySelector('.amount');
  amount.textContent = `[ ${cartItems.length} ]`;

  const productSets = [
    {
      product: document.querySelector('.product'),
      image: document.querySelector('.product-img'),
      name: document.querySelector('.product-name'),
      size: document.querySelector('.size'),
      sizeName: document.querySelector('.size-name'),
      piece: document.querySelector('.piece'),
      pieceName: document.querySelector('.piece-name'),
      price: document.querySelector('.price'),
      priceName: document.querySelector('.price-name')
    },
    {
      product: document.querySelector('.product-2'),
      image: document.querySelector('.product-2-img'),
      name: document.querySelector('.product-name-2'),
      size: document.querySelector('.size-2'),
      sizeName: document.querySelector('.size-name-2'),
      piece: document.querySelector('.piece-2'),
      pieceName: document.querySelector('.piece-name-2'),
      price: document.querySelector('.price-2'),
      priceName: document.querySelector('.price-name-2')
    },
    {
      product: document.querySelector('.product-3'),
      image: document.querySelector('.product-3-img'),
      name: document.querySelector('.product-name-3'),
      size: document.querySelector('.size-3'),
      sizeName: document.querySelector('.size-name-3'),
      piece: document.querySelector('.piece-3'),
      pieceName: document.querySelector('.piece-name-3'),
      price: document.querySelector('.price-3'),
      priceName: document.querySelector('.price-name-3')
    }
  ];

  // дефолтом скрыть
  productSets.forEach(set => {
    if (set.product) set.product.style.display = 'none';
    if (set.image) set.image.style.display = 'none';
    if (set.name) set.name.style.display = 'none';
    if (set.size) set.size.style.display = 'none';
    if (set.sizeName) set.sizeName.style.display = 'none';
    if (set.piece) set.piece.style.display = 'none';
    if (set.pieceName) set.pieceName.style.display = 'none';
    if (set.price) set.price.style.display = 'none';
    if (set.priceName) set.priceName.style.display = 'none';
  });

  // обнов корзины + счет
  let totalAmount = 0;
  cartItems.forEach((item, index) => {
    if (index < productSets.length && productSets[index]) {
      const set = productSets[index];
      if (set.product) set.product.style.display = 'block';
      if (set.image) {
        set.image.style.display = 'block';
        const imgElement = set.image.querySelector('img');
        if (imgElement) {
          const defaultImage = imgElement.getAttribute('data-image');
          imgElement.src = item.image || defaultImage;
          imgElement.alt = item.name || 'Товар';
        }
      }
      if (set.name) set.name.style.display = 'block';
      if (set.size) set.size.style.display = 'block';
      if (set.sizeName) {
        set.sizeName.style.display = 'block';
        set.sizeName.textContent = item.size || '—';
      }
      if (set.piece) set.piece.style.display = 'block';
      if (set.pieceName) {
        set.pieceName.style.display = 'block';
        set.pieceName.textContent = item.piece || '1';
      }
      if (set.price) set.price.style.display = 'block';
      if (set.priceName) {
        set.priceName.style.display = 'block';
        set.priceName.textContent = item.price || '0 ₽';
        const priceValue = parseInt(item.price.replace(/\D/g, '')) || 0;
        totalAmount += priceValue;
      }
    }
  });

  // обнов значения итога
  const totalAmountElement = document.querySelector('.total-amount');
  if (totalAmountElement) {
    totalAmountElement.textContent = `${totalAmount} ₽`;
  }

  // обработчик клика 
  const buyButton = document.querySelector('.button-buy');
  if (buyButton) {
    buyButton.addEventListener('click', () => {
      window.location.href = '404.html';
    });
  }
});