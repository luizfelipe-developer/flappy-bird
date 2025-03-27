function newElement(tagname, className){
  const element = document.createElement(tagname);
  element.className = className;
  return element;
}
function Barreira(reverse = false){
  this.elemento = newElement('div', 'barreira');
  
  const borda = newElement('div', 'borda');
  const corpo = newElement('div', 'corpo');

  this.elemento.appendChild(reverse?corpo:borda);
  this.elemento.appendChild(reverse?borda:corpo);
}