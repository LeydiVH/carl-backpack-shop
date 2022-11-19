import { getPath } from "./utils/redirect.util.js";

function setBasePage() {
    const basePath = document.getElementById('basePath');
    const hostname = location.hostname;
    
    if(hostname === 'localhost' || hostname === '127.0.0.1') {
        basePath.href = '/';
    }
    else {
        basePath.href = 'https://leydivh.github.io/carl-backpack-shop/'
    }
}

window.addEventListener('load', () => {
    console.log('Hola');
    location.href = `${getPath()}/pages/home/home.html`;
})

setBasePage();