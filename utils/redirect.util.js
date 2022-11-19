
export function getPath() {
  const hostname = location.hostname;

  if(hostname === 'localhost' || hostname === '127.0.0.1') {
    return '';
  }
  else {
    return '/carl-backpack-shop';
  }
}