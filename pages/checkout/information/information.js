import { getPath } from '../../../utils/redirect.util.js';
import {getItem, setItem} from '../../../utils/storage.utils.js'

function validateEmailPhoneInput() {
  const emailPhoneInput = document.getElementById('emailPhoneInput');
  const emailPhoneInputValue = emailPhoneInput.value;

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const phoneRegex = /^9[0-9]{8}$/;

  if(!emailRegex.test(emailPhoneInputValue) && !phoneRegex.test(emailPhoneInputValue)) {
    emailPhoneInput.classList.add('is-invalid');
    emailPhoneInput.classList.remove('is-valid');
    return false;
  }
  else {
     emailPhoneInput.classList.remove('is-invalid');
     emailPhoneInput.classList.add('is-valid');
     return true;
  }
}

function validateName() {
  const nameInput = document.getElementById('nameInput');
  const nameInputValue = nameInput.value;

  const nameRegex = /^[a-zA-Z ]{3,20}$/;
  if(!nameRegex.test(nameInputValue)) { 
    nameInput.classList.add('is-invalid');
    nameInput.classList.remove('is-valid');
    return false;
  }
  else {
    nameInput.classList.remove('is-invalid');
    nameInput.classList.add('is-valid');
    return true;
  }
}

function validateLastName() {
  const lastNameInput = document.getElementById('lastNameInput');
  const lastNameInputValue = lastNameInput.value;

  const lastNameRegex = /^[a-zA-Z ]{3,20}$/;
  if(!lastNameRegex.test(lastNameInputValue)) { 
    lastNameInput.classList.add('is-invalid');
    lastNameInput.classList.remove('is-valid');
    return false;
  }
  else {
    lastNameInput.classList.remove('is-invalid');
    lastNameInput.classList.add('is-valid');
    return true;
  }
}

function validateAddress() {
  const addressInput = document.getElementById('addressInput');
  const addressInputValue = addressInput.value;

  const addressRegex = /^[a-zA-Z0-9\'\-\"\_ ]{5,20}$/;

  if(!addressRegex.test(addressInputValue)) { 
    addressInput.classList.add('is-invalid');
    addressInput.classList.remove('is-valid');
    return false;
  }
  else {
    addressInput.classList.remove('is-invalid');
    addressInput.classList.add('is-valid');
    return true;
  }
}

function validateAddressAditional() {
  const addressAditionalInput = document.getElementById('addressAditionalInput');
  const addressAditionalInputValue = addressAditionalInput.value;

  const addressAditionalRegex = /^[a-zA-Z\'\-\"\_ ]{0,20}$/;
  if(!addressAditionalRegex.test(addressAditionalInputValue)) { 
    addressAditionalInput.classList.add('is-invalid');
    addressAditionalInput.classList.remove('is-valid');
    return false;
  }
  else {
    addressAditionalInput.classList.remove('is-invalid');
    addressAditionalInput.classList.add('is-valid');
    return true;
  }
}

function validateDistrict() {
  const districtInput = document.getElementById('districtInput');
  console.log(districtInput);

  const districtInputValue = districtInput.value;
  const districtRegex = /^[a-zA-Z ]{0,30}$/;

  if(!districtRegex.test(districtInputValue)) {
    districtInput.classList.add('is-invalid');
    districtInput.classList.remove('is-valid');
    return false;
  } else {
    districtInput.classList.remove('is-invalid');
    districtInput.classList.add('is-valid');
    return true;
  }
}

function validateRegion() {
  const regionInput = document.getElementById('regionInput');
  const {options, selectedIndex} = regionInput;

  console.log(options, selectedIndex);
  if(selectedIndex === 0) {
    regionInput.classList.add('is-invalid');
    regionInput.classList.remove('is-valid');
    return false;
  }
  else {
    regionInput.classList.remove('is-invalid');
    regionInput.classList.add('is-valid');
    return true;
  }
}

function validateDocument() {
  const documentInput = document.getElementById('documentInput');
  const documentInputValue = documentInput.value;

  const documentRegex = /^[0-9]{8}$/;

  if(!documentRegex.test(documentInputValue)) {
    documentInput.classList.add('is-invalid');
    documentInput.classList.remove('is-valid');
    return false;
  }
  else {
    documentInput.classList.remove('is-invalid');
    documentInput.classList.add('is-valid');
    return true;
  }
}

function validatePhone() {
  const phoneInput = document.getElementById('phoneInput');
  const phoneInputValue = phoneInput.value;

  const phoneRegex = /^9[0-9]{8}$/;

  if(!phoneRegex.test(phoneInputValue)) {
    phoneInput.classList.add('is-invalid');
    phoneInput.classList.remove('is-valid');
    return false;
  }
  else {
     phoneInput.classList.remove('is-invalid');
     phoneInput.classList.add('is-valid');
     return true;
  }
}


function setValidators() {
  const emailPhoneInput = document.getElementById('emailPhoneInput');
  emailPhoneInput.addEventListener('input', validateEmailPhoneInput);

  const nameInput = document.getElementById('nameInput');
  nameInput.addEventListener('input', validateName);

  const lastNameInput = document.getElementById('lastNameInput');
  lastNameInput.addEventListener('input', validateLastName)

  const addressInput = document.getElementById('addressInput');
  addressInput.addEventListener('input', validateAddress);

  const addressAditionalInput = document.getElementById('addressAditionalInput');
  addressAditionalInput.addEventListener('input', validateAddressAditional);

  const districtInput = document.getElementById('districtInput');
  districtInput.addEventListener('input', validateDistrict);

  const regionInput = document.getElementById('regionInput');
  regionInput.addEventListener('change', validateRegion);

  const documentInput = document.getElementById('documentInput');
  documentInput.addEventListener('input', validateDocument);

  const phoneInput = document.getElementById('phoneInput');
  phoneInput.addEventListener('input', validatePhone);

  const buttonDelivery = document.getElementById('buttonDelivery');
  buttonDelivery.addEventListener('click', saveCheckoutInformation);

  const buttonToCart = document.getElementById('buttonToCart');
  buttonToCart.addEventListener('click', goToCart);

}



function saveCheckoutInformation() {
  let isFormValid = true;
  const validInputs = [
    validateEmailPhoneInput(),
    validateName(),
    validateLastName(),
    validateAddress(),
    validateAddressAditional(),
    validateDistrict(),
    validateRegion(),
    validateDocument(),
    validatePhone(),
  ]
  console.log(validInputs);
  validInputs.forEach(validInput => {
    if(!validInput) {
      isFormValid = false;
    }
  });

  if(isFormValid) {
    const checkoutInformation = getCheckoutInformation();
    setItem('information', checkoutInformation);
    location.href = `${getPath()}/pages/checkout/delivery/delivery.html`;
  }
}

function goToCart() {
  location.href = `${getPath()}/pages/cart/cart.html`;
}

function getCheckoutInformation() {
  const emailPhoneInput = document.getElementById('emailPhoneInput');
  const emailPhoneInputValue = emailPhoneInput.value;

  const offertInput = document.getElementById('offertInput');
  const {selected: offertSelected} = offertInput;

  const countryInput = document.getElementById('countryInput');
 const {options: countryOptions, selectedIndex: countrySelectedIndex} = countryInput;


  const nameInput = document.getElementById('nameInput');
  const nameInputValue = nameInput.value;

  const lastNameInput = document.getElementById('lastNameInput');
  const lastNameInputValue = lastNameInput.value;

  const addressInput = document.getElementById('addressInput');
  const addressInputValue = addressInput.value;

  const addressAditionalInput = document.getElementById('addressAditionalInput');
  const addressAditionalInputValue = addressAditionalInput.value;

  const districtInput = document.getElementById('districtInput');
  const districtInputValue = districtInput.value;

  const regionInput = document.getElementById('regionInput');
  const {options: regionOptions, selectedIndex: regionSelectedIndex} = regionInput;


  const documentInput = document.getElementById('documentInput');
  const documentInputValue = documentInput.value;

  const phoneInput = document.getElementById('phoneInput');
  const phoneInputValue = phoneInput.value;

  const data = {
    emailPhone: emailPhoneInputValue,
    offert: offertSelected,
    country: {
      index: countrySelectedIndex,
      option: countryOptions[countrySelectedIndex]
    },
    name: nameInputValue,
    lastName: lastNameInputValue,
    address: addressInputValue,
    addressAditional: addressAditionalInputValue,
    district: districtInputValue,
    region: {
      index: regionSelectedIndex,
      option: regionOptions[regionSelectedIndex]
    },
    document: documentInputValue,
    phoneInput: phoneInputValue
  }

  return data;
}

function setCartInfo() {
  const cart = getItem('cart');

  const listProductsCart = document.getElementById('listProductsCart');
  let total = 0, subTotal = 0;
  for (const cartProduct of cart) {
    const {product, quantity} = cartProduct;
    listProductsCart.appendChild(createCartProductItem(cartProduct));
    subTotal += product.price * quantity;
  }

  total = subTotal;

  const subTotalText = document.getElementById('subTotal');
  subTotalText.innerText = `S/${subTotal.toFixed(2)}`;

  const totalText = document.getElementById('total');
  totalText.innerText = `S/${total.toFixed(2)}`

  const taxText = document.getElementById('tax');
  taxText.innerText = `${(total*0.18).toFixed(2)}`
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

setValidators();

setCartInfo();