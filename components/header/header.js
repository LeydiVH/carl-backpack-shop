import {setItem} from '../../utils/storage.utils.js'

function setLinkActions() {
  const rucksackLink = document.getElementById('rucksackLink')
  const backpackLink = document.getElementById('backpackLink')
  const lunchboxLink = document.getElementById('lunchboxLink')
  const pencilCaseLink = document.getElementById('pencilCaseLink');
  const allLink = document.getElementById('allLink');
  const aboutLink = document.getElementById('aboutLink');
  const homeLink = document.getElementById('homeLink');
  const cartLink = document.getElementById('cartLink');
  
  rucksackLink.addEventListener('click', goToRucksackList);
  backpackLink.addEventListener('click', goToBackpackList);
  lunchboxLink.addEventListener('click', goToLunchboxList);
  pencilCaseLink.addEventListener('click', goToPencilCaseList);
  allLink.addEventListener('click', goToAllLink);
  aboutLink.addEventListener('click', goToAbout);
  homeLink.addEventListener('click', goToHome);
  cartLink.addEventListener('click', goToCart)
}

function goToRucksackList() {
  setItem('list', 'rucksack');
  location.href = '/pages/results/results.html';
}

function goToBackpackList() {
  setItem('list', 'backpack');
  location.href = '/pages/results/results.html';
}

function goToLunchboxList() {
  setItem('list', 'lunchbox');
  location.href = '/pages/results/results.html';
}

function goToPencilCaseList() {
  setItem('list', 'pencilCase');
  location.href = '/pages/results/results.html';
}

function goToAllLink() {
  setItem('list', 'all');
  location.href = '/pages/results/results.html';
}

function goToAbout() {
  location.href = '/pages/about/about.html';
}

function goToHome() {
  location.href = '/pages/home/home.html';
}

function goToCart() {
  location.href = '/pages/cart/cart.html';
}

setLinkActions();