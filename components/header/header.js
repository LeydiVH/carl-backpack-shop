import { getPath } from '../../utils/redirect.util.js';
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
  location.href = `${getPath()}/pages/results/results.html`;
}

function goToBackpackList() {
  setItem('list', 'backpack');
  location.href = `${getPath()}/pages/results/results.html`;
}

function goToLunchboxList() {
  setItem('list', 'lunchbox');
  location.href = `${getPath()}/pages/results/results.html`;
}

function goToPencilCaseList() {
  setItem('list', 'pencilCase');
  location.href = `${getPath()}/pages/results/results.html`;
}

function goToAllLink() {
  setItem('list', 'all');
  location.href = `${getPath()}/pages/results/results.html`;
}

function goToAbout() {
  location.href = `${getPath()}/pages/about/about.html`;
}

function goToHome() {
  location.href = `${getPath()}/pages/home/home.html`;
}

function goToCart() {
  location.href = `${getPath()}/pages/cart/cart.html`;
}

setLinkActions();