import {getItem, setItem} from '../../utils/storage.utils.js';
import {BACKPACKS_DATA} from '../../data/backpacks-data.js';
import {BAG_DATA} from '../../data/bag-data.js';
import {CARTRIDGEBOX_DATA} from '../../data/cartridgebox-data.js';
import {LUNCHBOX_DATA} from '../../data/lunchbox-data.js';


function setProducts() {
  const typeList = getItem('list');
  let products = [];

  switch(typeList) {
    case 'rucksack': {
      products = [
        ...BAG_DATA
      ]
    };
    break;
    case 'backpack': {
      products = [
        ...BACKPACKS_DATA
      ]
    };
    break;
    case 'lunchbox': {
      products = [
        ...LUNCHBOX_DATA
      ]
    };
    break;
    case 'pencilCase': {
      products = [
        ...CARTRIDGEBOX_DATA
      ]
    };
    break;
    case 'all': {
      products = [
        ...BAG_DATA,
        ...BACKPACKS_DATA,
        ...LUNCHBOX_DATA,
        ...CARTRIDGEBOX_DATA
      ]
    };
    break;
    default: {
      location.href = '/pages/home/home.html';
    }
  }

  let listItems = document.getElementById('listItems');
  for (let i = 0; i < products.length; i++) {
    const bagInfo = products[i];    
    const bagCard = createBagCard(bagInfo);
    listItems.appendChild(bagCard);
  }
}


function createBagCard(bagInfo) {

  const {name, price, colors, id, images} = bagInfo;
  console.log(images, colors)
  const firstColor = colors[0].value;
  const firstImage = images[firstColor][0];
  const secondImage = images[firstColor][1];


  let columnDiv = document.createElement('div');
  columnDiv.classList.add('col-4')

  let rowDiv = document.createElement('div');
  rowDiv.classList.add('row');
  
  let productCardContainer = document.createElement('div');
  productCardContainer.classList.add('col-12', 'd-flex', 'flex-column', 'justify-content-center', 'productList__cardContainer');

  let rowProductImage = createRowProductImage(id, firstImage, secondImage, 'AGREGAR');
  let rowTitle = createRowTitle(name);
  let rowPrice = createRowPrice(price);
  let rowColors = createRowColors(colors);
 
  productCardContainer.appendChild(rowProductImage);
  productCardContainer.appendChild(rowTitle);
  productCardContainer.appendChild(rowPrice);
  productCardContainer.appendChild(rowColors);

  rowDiv.appendChild(productCardContainer);
  columnDiv.appendChild(productCardContainer);

  console.log(columnDiv);

  return columnDiv;
}

function createRowProductImage(id, firstImage, secondImage, textButton = 'AGREGAR') {
  let rowProductImage = document.createElement('div');
  rowProductImage.classList.add('row');

  let productImageGeneralContainer = document.createElement('div');
  productImageGeneralContainer.classList.add('col-12', 'productList__imageGeneralContainer');


  let productImageContainerOne = document.createElement('div');
  productImageContainerOne.classList.add('productList__imageContainer--one');

  let productImageOne = document.createElement('img');
  productImageOne.classList.add('productList__image', 'productList__image--one');
  productImageOne.alt = 'Carl product';
  productImageOne.width = 250;
  productImageOne.src = firstImage;

  let productImageContainerTwo = document.createElement('div');
  productImageContainerTwo.classList.add('productList__imageContainer--two');

  let productImageTwo = document.createElement('img');
  productImageTwo.classList.add('productList__image', 'productList__image--two');
  productImageTwo.alt = 'Carl product';
  productImageTwo.width = 250;
  productImageTwo.src = secondImage;
  productImageTwo.dataset.id = id;
  productImageTwo.addEventListener('click', goToProductPage);


  let productButtonContainer = document.createElement('div');
  productButtonContainer.classList.add('col-12', 'productList__buttonContainer');

  let productButton = document.createElement('button');
  productButton.classList.add('btn', 'btn-primary', 'productList__button')
  productButton.dataset.id = id;
  

  let productButtonText = document.createElement('span');
  productButtonText.innerText = textButton;

  // ===========  Anidar elementos de la imagen
  productImageContainerOne.appendChild(productImageOne);
  productImageContainerTwo.appendChild(productImageTwo);

  productButton.appendChild(productButtonText);
  productButtonContainer.appendChild(productButton);


  productImageGeneralContainer.appendChild(productImageContainerOne);
  productImageGeneralContainer.appendChild(productImageContainerTwo);
  productImageGeneralContainer.appendChild(productButtonContainer);

  rowProductImage.appendChild(productImageGeneralContainer);

  return rowProductImage;
}

function createRowTitle(name) {
  let rowProductTitle = document.createElement('div');
  rowProductTitle.classList.add('row');

  let colProductTitle = document.createElement('div');
  colProductTitle.classList.add('col-12');

  let productTitle = document.createElement('h3');
  productTitle.classList.add('productList__titleProduct');
  productTitle.innerText = name;

  // ======== Anidar elementos del titulo
  colProductTitle.appendChild(productTitle);
  rowProductTitle.appendChild(colProductTitle);
  return rowProductTitle;
}

function createRowPrice(price) {
  let rowProductPrice = document.createElement('div');
  rowProductPrice.classList.add('row');

  let colProductPrice = document.createElement('div');
  colProductPrice.classList.add('col-12', 'productList__priceProductContainer');

  let productPrice = document.createElement('span');
  productPrice.innerText = `S/ ${price.toFixed(2)}`;

  // ======= Anidar elementos del precio
  colProductPrice.appendChild(productPrice);
  rowProductPrice.appendChild(colProductPrice);

  return rowProductPrice;
}

function createRowColors(colors) {
  let rowColors = document.createElement('div');
  rowColors.classList.add('row');

  let productColorsContainer = document.createElement('div');
  productColorsContainer.classList.add('col-12', 'productList__colorContainer');

  let productColorItemContainer = document.createElement('div');
  productColorItemContainer.classList.add('productList__itemContainer');


  // FOR AQUI PARA TODOS LOS COLORES

  for (let i = 0; i < colors.length; i++) {
    let productColorItemWrapper = document.createElement('div');
    productColorItemWrapper.classList.add('productList__itemWrapper');
  
    let productColorItem = document.createElement('div');
    productColorItem.classList.add('productList__itemColor');
    // Agregar color al elemento;
    productColorItem.style.backgroundColor = colors[i].value;

    productColorItemWrapper.appendChild(productColorItem);
    productColorItemContainer.appendChild(productColorItemWrapper);
  }

  // FIN DE FOR

  let productColorQuantityWrapper = document.createElement('div');
  productColorQuantityWrapper.classList.add('productList__itemWrapper');

  let productColorQuantity = document.createElement('span');
  productColorQuantity.classList.add('productList__itemTextQuantity');
  productColorQuantity.innerText = `+${colors.length}`

  productColorQuantityWrapper.appendChild(productColorQuantity);
  productColorItemContainer.appendChild(productColorQuantityWrapper);
  productColorsContainer.appendChild(productColorItemContainer);
  rowColors.appendChild(productColorsContainer);

  return rowColors;
}

function goToProductPage() {
  const id = parseInt(this.dataset.id);

  const bagSelected = BAG_DATA.find(bag => bag.id === id);

  console.log(bagSelected);
  setItem('productSelected', bagSelected);
  
  location.href = '/pages/product/product.html';
}

setProducts();