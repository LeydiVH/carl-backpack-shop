import { getItem, setItem } from '../../utils/storage.utils.js';
import { setCartInformation } from '../../components/modal/modal.js';
import { getPath } from '../../utils/redirect.util.js';


window.addEventListener('load', () => {
  const productSelected = getItem('productSelected');
  if(!productSelected) {
    location.href = `${getPath()}/pages/home/home.html`;
  } else {
    setProductInformation();
  }
})

function setProductInformation() {
  const product = getItem('productSelected');

  
  const {name, colors, price, description, volume, sizes, material, images} = product;
  const firstColor = colors[0].value;


  setProductTitle(name);
  setProductPrice(price);
  setProductColor(colors);
  setProductColors(colors);
  setProductData(description, sizes, volume, material);
  setProductImages(images, firstColor);


  const addProductButton = document.getElementById('buttonAddProduct');
  addProductButton.addEventListener('click', increaseQuantityProduct);

  const deleteProductButton = document.getElementById('buttonDeleteProduct');
  deleteProductButton.addEventListener('click', reduceQuantityProduct);
  
  const openCartModalButton = document.getElementById('buttonOpenCartModal');
  openCartModalButton.addEventListener('click', addProductToCart);
}

function setProductTitle(name) {
  const titleProduct = document.getElementById('titleProduct');
  titleProduct.innerText = name;
}

function setProductPrice(price) {
  const priceProduct = document.getElementById('priceProduct');
  priceProduct.innerText = `S/ ${price.toFixed(2)}`
}

function setProductColor(colors) {
  const firstColor = colors[0];
  const colorProduct = document.getElementById('colorProduct');
  colorProduct.innerText = `COLOR: ${firstColor.name}`;
}

function setProductColors(colors) {
  const productColorsContainer = document.getElementById('productColors');

  for (let i = 0; i < colors.length; i++) {
    const productColorContainer = document.createElement('div');
    productColorContainer.classList.add('product__colorContainer');
  
    const productColor = document.createElement('div');
    productColor.classList.add('product__color');
    productColor.style.backgroundColor = colors[i].value;
  
    productColorContainer.appendChild(productColor);

    productColorsContainer.appendChild(productColorContainer);
  }
}

function setProductData(description, sizes, volume, material) {
  const productDescription = document.getElementById('productDescription');
  productDescription.innerText = description;

  const productSizes = document.getElementById('productSizes');
  const colSizes = document.createElement('div');
  colSizes.classList.add('col-3');
  if(sizes) {
    const titleSizes = document.createElement('h6');
    titleSizes.innerText = 'MEDIDAS';

    const descriptionSizes = document.createElement('p');
    descriptionSizes.innerText = `${sizes.height}x${sizes.width}x${sizes.deepen}`;

    colSizes.appendChild(titleSizes);
    colSizes.appendChild(descriptionSizes);
  }

  if(volume) {
    const volumenSize = document.createElement('p');
    volumenSize.innerText = `${volume}L`;
    colSizes.appendChild(volumenSize);
  }
  productSizes.appendChild(colSizes);

  const productMaterial = document.getElementById('productMaterial');
  const colMaterial = document.createElement('div');
  colMaterial.classList.add('col-3');
  if(material) {
    const titleMaterial = document.createElement('h6');
    titleMaterial.innerText = 'MATERIAL';

    const descriptionMaterial = document.createElement('p');
    descriptionMaterial.innerText = `${material}`;
   
    colMaterial.appendChild(titleMaterial);
    colMaterial.appendChild(descriptionMaterial);
  }
  productMaterial.appendChild(colMaterial);
}

function createProductImage(imageSource) {
  const productImageContainer = document.createElement('div');
  productImageContainer.classList.add('product__imageProductWrapper');

  const productImage = document.createElement('img');
  productImage.src = imageSource;
  productImage.alt = 'Carl Product';
  productImage.classList.add('product__imageProduct');
  productImage.width = 150;

  productImageContainer.appendChild(productImage);

  return productImageContainer;
}

function setProductImages(images, color) {
  const imagesFirstColor = images[color];
  const mainImageProduct = document.getElementById('mainImageProduct');
  mainImageProduct.src = imagesFirstColor[0];

  const secondaryImageProduct = document.getElementById('secondaryImageProduct');
  secondaryImageProduct.src = imagesFirstColor[1];

  const productImagesContainer = document.getElementById('productImagesContainer');


  for (let i = 0; i < imagesFirstColor.length; i++) {
    console.log(imagesFirstColor[i]);
    const productImage = createProductImage(imagesFirstColor[i]);
    console.log(productImage);
    productImagesContainer.appendChild(productImage);
  }
}

function increaseQuantityProduct() {
  console.log('Entre');
  // validar que color de producto es
  const product = getItem('productSelected');
  const {colors, quantity} = product;
  const firstColor = colors[0].value;

  const productQuantity = quantity[firstColor];

  const quantityProductInput = document.getElementById('quantityProduct');
  const inputValue = quantityProductInput.value;

  if(inputValue < productQuantity) {
    quantityProductInput.value++;
  }
}

function reduceQuantityProduct() {
  const product = getItem('productSelected');
  const {colors, quantity} = product;
  const firstColor = colors[0].value;

  const productQuantity = quantity[firstColor];

  const quantityProductInput = document.getElementById('quantityProduct');
  const inputValue = quantityProductInput.value;

  if(inputValue > 1) {
    quantityProductInput.value--;
  }
}

function addProductToCart() {
  console.log('Entre aqui');
  const newProduct = getItem('productSelected');
  let cart = getItem('cart');
  const quantity = parseInt(document.getElementById('quantityProduct').value);
  // Validar carrito
  if(!cart) {
    cart = [
      {
        id: newProduct.id,
        product: newProduct,
        quantity
      }
    ]
  } else {
    let isFound = false;
    cart = cart.map(cartItem => {
      if(cartItem.id === newProduct.id){
        isFound = true;
        cartItem = {
          ...cartItem,
          quantity,
        }
      }
      return cartItem;
    })

    if(!isFound) {
      cart = [
        ...cart, 
        {
          id: newProduct.id,
          product: newProduct,
          quantity
        }
      ]
    }
  }

 setItem('cart', cart);
 setCartInformation();
}

