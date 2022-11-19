import { getPath } from "../../utils/redirect.util.js";
import { getItem, setItem } from "../../utils/storage.utils.js";


export function setCartInformation() {


  const cart = getItem('cart');

  console.log(cart);
  if(cart && cart.length > 0) {
    const lastCartProduct = cart[cart.length - 1];
    const {product} = lastCartProduct;
    console.log(cart);
    const quantityCartProduct = document.getElementById('quantityCartProducts');
  
  
    if(quantityCartProduct > 1) {
      quantityCartProduct.innerText = `EXISTE ${cart.length} PRODUCTOS EN SU CARRITO`;
    } else {
      quantityCartProduct.innerText = `EXISTE ${cart.length} PRODUCTO EN SU CARRITO`;
    }
  
    const nameCartProductAdded = document.getElementById('nameCartProductAdded');
    
    nameCartProductAdded.innerText = product.name;
    
    setCartProducts(cart);

    setTotalCartPrice(cart);
  }

}

function setButtonsActions() {
  const buttonGoToCheckout = document.getElementById('buttonGoToCheckout');
  buttonGoToCheckout.addEventListener('click', goToCheckout);
  
  const buttonGoToAllProducts = document.getElementById('buttonGoToAllProducts');
  buttonGoToAllProducts.addEventListener('click', goToAllProducts);
}

function goToCheckout() {
  location.href = `${getPath()}/pages/checkout/information/information.html`;
}

function goToAllProducts() {
  setItem('list', 'all');
  location.href = `${getPath()}/pages/results/results.html`;
}

function setTotalCartPrice(cart) {

  const totalCartPrice = document.getElementById('totalCartPrice');
  let total = 0;

  for (const cartProduct of cart) {
    const {quantity, product} = cartProduct;
    total += quantity*product.price;
  }

  totalCartPrice.innerText = `TOTAL: S/${total.toFixed(2)}`;

}

function setCartProducts(cart) {
  const cartProductList = document.getElementById('cartProductList');
  cartProductList.innerHTML = '';
  
  for(let cartProduct of cart) {
    const cartProductItem = createCartProduct(cartProduct);

    cartProductList.appendChild(cartProductItem);
  }
}

function createCartProduct(cartProduct) {

  const {product, quantity, id} = cartProduct;
  const {colors, name, images, price} = product;
  console.log(images);
  const firstColorName = colors[0].name;
  const firstColorValue = colors[0].value;
  const mainImage = images[firstColorValue][0];

  const rowCartProduct = document.createElement('div');
  rowCartProduct.classList.add('row');

  const colCartProductInfo = document.createElement('div');
  colCartProductInfo.classList.add('col-6');

  const rowCartProductContainer = document.createElement('div');
  rowCartProductContainer.classList.add('row', 'align-items-center');

  const colDeleteCartProduct = document.createElement('div');
  colDeleteCartProduct.classList.add('col-2');

  const iconDeleteCartProduct = document.createElement('i');
  iconDeleteCartProduct.classList.add('fa-solid', 'fa-trash');

  colDeleteCartProduct.appendChild(iconDeleteCartProduct);

  const colImageCartProduct = document.createElement('div');
  colImageCartProduct.classList.add('col-4');

  const imageCartProduct = document.createElement('img');
  imageCartProduct.alt = 'Carl Product';
  imageCartProduct.width = 60;
  imageCartProduct.src = mainImage;

  colImageCartProduct.appendChild(imageCartProduct);

  const colInfoCartProduct = document.createElement('div');
  colInfoCartProduct.classList.add('col-6');

  const nameCartProduct = document.createElement('h6');
  nameCartProduct.innerText = name;
  nameCartProduct.style.fontWeight = 'bolder';

  const colorCartProduct = document.createElement('h6');
  colorCartProduct.innerText = `COLOR: ${firstColorName}`;

  colInfoCartProduct.appendChild(nameCartProduct);
  colInfoCartProduct.appendChild(colorCartProduct);

  rowCartProductContainer.appendChild(colDeleteCartProduct);
  rowCartProductContainer.appendChild(colImageCartProduct);
  rowCartProductContainer.appendChild(colInfoCartProduct);

  colCartProductInfo.appendChild(rowCartProductContainer);
  
  // Segunda parte de la info

  const colCartProductQuantity = document.createElement('div');
  colCartProductQuantity.classList.add('col-6');

  const rowCartProductQuantityContainer = document.createElement('div');
  rowCartProductQuantityContainer.classList.add('row', 'align-items-center', 'justify-content-center', 'text-center');
  

  ///

  const colCartProductPrice = document.createElement('div');
  colCartProductPrice.classList.add('col-3');

  const cartProductPrice = document.createElement('small');
  cartProductPrice.innerText = `S/${price.toFixed(2)}`;
  cartProductPrice.style.fontWeight = 'bolder';


  colCartProductPrice.appendChild(cartProductPrice);
  //

  const colCartProductQuantityInput = document.createElement('div');
  colCartProductQuantityInput.classList.add('col-5');

  const rowCartProductQuantityInput = document.createElement('div');
  rowCartProductQuantityInput.classList.add('row');

  const inputGroupQuantity = document.createElement('div');
  inputGroupQuantity.classList.add('input-group', 'modal__productQuantity');

  const inputGroupQuantityPrepend = document.createElement('div');
  inputGroupQuantityPrepend.classList.add('input-group-prepend', 'modal__productButtonQuantityContainer');
  inputGroupQuantityPrepend.dataset.id = id;
  inputGroupQuantityPrepend.addEventListener('click', removeProductToCart)


  const buttonQuantityDeleteProduct = document.createElement('div');
  buttonQuantityDeleteProduct.classList.add('input-group-text', 'modal__productButtonQuantity');

  const iconQuantityDeleteProduct = document.createElement('i');
  iconQuantityDeleteProduct.classList.add('fa-solid', 'fa-minus');

  buttonQuantityDeleteProduct.appendChild(iconQuantityDeleteProduct);
  inputGroupQuantityPrepend.appendChild(buttonQuantityDeleteProduct);

  const inputQuantityProduct = document.createElement('input');
  inputQuantityProduct.value = quantity;
  inputQuantityProduct.readOnly = true;
  inputQuantityProduct.type = 'text';
  inputQuantityProduct.classList.add('form-control', 'modal__productInputQuantity');

  const inputGroupQuantityAppend = document.createElement('div');
  inputGroupQuantityAppend.classList.add('input-group-append', 'modal__productButtonQuantityContainer');
  inputGroupQuantityAppend.dataset.id = id;
  inputGroupQuantityAppend.addEventListener('click', addProductToCart)

  const buttonQuantityAddProduct = document.createElement('div');
  buttonQuantityAddProduct.classList.add('input-group-text', 'modal__productButtonQuantity');

  const iconQuantityAddProduct = document.createElement('i');
  iconQuantityAddProduct.classList.add('fa-solid', 'fa-plus');

  buttonQuantityAddProduct.appendChild(iconQuantityAddProduct);
  inputGroupQuantityAppend.appendChild(buttonQuantityAddProduct);

  ///

  const colCartProductTotalPrice = document.createElement('div');
  colCartProductTotalPrice.classList.add('col-4');

  const cartProductTotalPrice = document.createElement('small');
  cartProductTotalPrice.innerText = `S/ ${(price * quantity).toFixed(2)}`;

  colCartProductTotalPrice.appendChild(cartProductTotalPrice);


  inputGroupQuantity.appendChild(inputGroupQuantityPrepend);
  inputGroupQuantity.appendChild(inputQuantityProduct);
  inputGroupQuantity.appendChild(inputGroupQuantityAppend);

  rowCartProductQuantityInput.appendChild(inputGroupQuantity);
  colCartProductQuantityInput.appendChild(rowCartProductQuantityInput);


  rowCartProductQuantityContainer.appendChild(colCartProductPrice)
  rowCartProductQuantityContainer.appendChild(colCartProductQuantityInput)
  rowCartProductQuantityContainer.appendChild(colCartProductTotalPrice)

  colCartProductQuantity.appendChild(rowCartProductQuantityContainer);

  // Agregar las dos columnas al row geneal

  rowCartProduct.appendChild(colCartProductInfo);
  rowCartProduct.appendChild(colCartProductQuantity);

  return rowCartProduct;
}

function addProductToCart() {
  const productId = parseInt(this.dataset.id);
  
  let cart = getItem('cart');
  
  console.log(cart);
  cart = cart.map(cartItem => {
    let {product} = cartItem;
    const {colors, quantity} = product;
    const firstColorValue = colors[0].value;

    const firstQuantity = quantity[firstColorValue];
    if (cartItem.id === productId && cartItem.quantity < firstQuantity) {
      console.log('Entre aqui if');
      let {quantity} = cartItem;
      quantity++; 
      return {
        ...cartItem,
        quantity
      }
    } else {
      console.log('Entre aqui else');
      return cartItem;
    }
  })

  console.log(cart);
  setItem('cart', cart);


  setCartInformation();
}


function removeProductToCart() {
  console.log(this);

  const productId = parseInt(this.dataset.id);
  let cart = getItem('cart');
  
  console.log(cart);
  cart = cart.map(cartItem => {
    if (cartItem.id === productId && cartItem.quantity > 1) {
      console.log('Entre aqui if');
      let {quantity} = cartItem;
      quantity--;
      return {
        ...cartItem,
        quantity
      }
    } else {
      console.log('Entre aqui else');
      return cartItem;
    }
  })

  console.log(cart);
  setItem('cart', cart);
  setCartInformation();
}

setButtonsActions();
