document.addEventListener('DOMContentLoaded', () => {
  const productContainers = document.querySelectorAll('.product-container');
  const amountElement = document.querySelector('.amount');

  function updateCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    amountElement.textContent = `[ ${cart.length} ]`;

    productContainers.forEach(container => container.classList.add('hidden'));
    cart.forEach((item, index) => {
      if (index < productContainers.length) {
        const container = productContainers[index];
        container.classList.remove('hidden');
        container.querySelector('.product-name').textContent = item.name;
        container.querySelector('.size-name').textContent = item.size;
        container.querySelector('.piece-name').textContent = item.quantity;
        container.querySelector('.price-name').textContent = `${item.price} ₽`;
      }
    });
  }

  // Инициализация
  updateCart();
});