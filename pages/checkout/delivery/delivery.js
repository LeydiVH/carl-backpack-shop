import {getItem, setItem} from '../../../utils/storage.utils.js'

function setCartInfo() {
  const cart = getItem('cart');

  const listProductsCart = document.getElementById('listProductsCart');
  listProductsCart.innerHTML = '';
  let deliveryPrice = 0, total = 0, subTotal = 0;
  for (const cartProduct of cart) {
    const {product, quantity} = cartProduct;
    listProductsCart.appendChild(createCartProductItem(cartProduct));
    subTotal += product.price * quantity;
  }
  
  total = subTotal;

  if(getItem('typeDelivery')) {
    deliveryPrice = getItem('typeDelivery').value;
  }

  const subTotalText = document.getElementById('subTotal');
  subTotalText.innerText = `S/${subTotal.toFixed(2)}`;

  const deliveryPriceText = document.getElementById('deliveryPrice')
  deliveryPriceText.innerText = `S/${deliveryPrice.toFixed(2)}`;

  const totalText = document.getElementById('total');
  totalText.innerText = `S/${(total + deliveryPrice).toFixed(2)}`

  const taxText = document.getElementById('tax');
  taxText.innerText = `${(total*0.18).toFixed(2)}`;
}

function setCheckoutInformation() {
  const information = getItem('information');
  const {emailPhone, address} = information;

  const emailText = document.getElementById('emailText');
  const addressText = document.getElementById('addressText');

  emailText.innerText = emailPhone;
  addressText.innerText = address;

  if(getItem('typeDelivery')) {
    const typeDelivery= getItem('typeDelivery').name;
    if(typeDelivery === 'slowDelivery') {
      const slowDeliveryInput = document.getElementById('slowDelivery');
      slowDeliveryInput.checked = true;
    }
    else {
      const fastDeliveryInput = document.getElementById('fastDelivery');
      fastDeliveryInput.checked = true;
    }
  }
}

function createCartProductItem(cartProduct) {
  const {quantity, product} = cartProduct;
  const {images, colors, name, price} = product;

  const firstColor = colors[0].value;
  const firstImage = images[firstColor][0];
  console.log(firstImage);

  const rowCartItem = document.createElement('div');
  rowCartItem.classList.add('row', 'mb-2');

  const colCartItemImage = document.createElement('div');
  colCartItemImage.classList.add('col-2', 'd-flex', 'justify-content-center', 'align-items-center');

  const cartItemImage = document.createElement('img');
  cartItemImage.classList.add('information__productResumeImage');
  cartItemImage.width = 80;
  cartItemImage.src = `../${firstImage}`;

  colCartItemImage.appendChild(cartItemImage);


  const colCartItemTitle = document.createElement('div');
  colCartItemTitle.classList.add('col-7', 'd-flex', 'align-items-center');

  const containerCartItemTitle = document.createElement('div');

  const cartItemTitle = document.createElement('h6');
  cartItemTitle.textContent = name;

  containerCartItemTitle.appendChild(cartItemTitle);
  colCartItemTitle.appendChild(containerCartItemTitle);

  
  const colCartItemPrice = document.createElement('div');
  colCartItemPrice.classList.add('col-3', 'd-flex', 'align-items-center');

  const cartItemPrice = document.createElement('small');
  cartItemPrice.innerText = `S/${(price*quantity).toFixed(2)}`;

  colCartItemPrice.appendChild(cartItemPrice);

  rowCartItem.appendChild(colCartItemImage)
  rowCartItem.appendChild(colCartItemTitle)
  rowCartItem.appendChild(colCartItemPrice)

  return rowCartItem;
}


function setButtonActions() {
  const slowDeliveryInput = document.getElementById('slowDelivery');
  const fastDeliveryInput = document.getElementById('fastDelivery');
  const buttonToInformation = document.getElementById('buttonToInformation');
  const buttonToPayment = document.getElementById('buttonToPayment');


  
  slowDeliveryInput.addEventListener('click', setTypeDelivery);

  fastDeliveryInput.addEventListener('click', setTypeDelivery);

  buttonToPayment.addEventListener('click', goToPayment);

  buttonToInformation.addEventListener('click', goToInformation);
}

function setTypeDelivery() {

  const typeDeliveryValue = parseInt(this.value);
  let typeDelivery =  {};
  if(typeDeliveryValue === 10) {
    typeDelivery = {
      value: typeDeliveryValue,
      name: 'slowDelivery',
      text: 'Envío a Lima de 3 a 4 días habiles',
    }
  }
  else {
    typeDelivery = {
      value: typeDeliveryValue,
      name: 'fastDelivery',
      text: 'Envío rapido a Lima de 1 a 2 días habiles'
    }
  }
  setItem('typeDelivery', typeDelivery);

  setCartInfo();
}

function goToPayment() {
  location.href = '/pages/checkout/payment/payment.html';
}

function goToInformation() {
  location.href = '/pages/checkout/information/information.html';
}


setCartInfo();
setCheckoutInformation();
setButtonActions();