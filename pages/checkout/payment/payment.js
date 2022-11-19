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
  const typeDelivery= getItem('typeDelivery');
  const {name, text, value} = typeDelivery;

  const emailText = document.getElementById('emailText');
  const addressText = document.getElementById('addressText');
  const deliveryText = document.getElementById('deliveryText');

  emailText.innerText = emailPhone;
  addressText.innerText = address;
  deliveryText.innerText = `${text} - S/${value.toFixed(2)}`;

  if(getItem('billing')) {
    const {text, value} = getItem('billing');
    const sameAddressButton = document.getElementById('sameAddress');
    const otherAddressButton = document.getElementById('otherAddress');
    
    if(value === 'same') {
      sameAddressButton.checked = true;
    }
    else {
      otherAddressButton.checked = true;
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

  rowCartItem.appendChild(colCartItemImage);
  rowCartItem.appendChild(colCartItemTitle);
  rowCartItem.appendChild(colCartItemPrice);

  return rowCartItem;
}


function setBillingAddress() {
  const value = this.value;
  let billingAddress = {};
  if(value === 'same'){
    billingAddress = {
      value,
      text: 'La misma dirección de envío'
    }

  } else {
    billingAddress = {
      value,
      text: 'Usar una direccion de facturación distinta'
    }
  }

  setItem('billing', billingAddress);
}


function finishPayment() {

  if(getItem('billing')) {
    $('#paymentSuccess').modal('show');
  }
}

function goToHome() {
  // limpiar local
  location.href = '/carl-backpack-shop/pages/home/home.html';
}

function setButtonsAction() {
  const sameAddressButton = document.getElementById('sameAddress');
  const otherAddressButton = document.getElementById('otherAddress');
  const buttonFinishPayment = document.getElementById('buttonFinishPayment');
  const buttonToHome = document.getElementById('goToHome');

  sameAddressButton.addEventListener('click', setBillingAddress);
  otherAddressButton.addEventListener('click', setBillingAddress);
  buttonFinishPayment.addEventListener('click', finishPayment);
  buttonToHome.addEventListener('click', goToHome);
}

setButtonsAction();
setCheckoutInformation();
setCartInfo();