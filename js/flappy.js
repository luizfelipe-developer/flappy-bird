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

  this.setAltura= altura => corpo.style.height= `${altura}px`
}

// const b = new Barreira(true)
// b.setAltura(200)
// document.querySelector('[tp-flappy]').appendChild(b.elemento)

function ParDeBarreiras(altura, abertura, x){
  this.elemento = newElement('div', 'par-de-barreiras');

  this.superior = new Barreira(true)
  this.inferior = new Barreira(false)

  this.elemento.appendChild(this.superior.elemento);
  this.elemento.appendChild(this.inferior.elemento);

  this.sortearAbertura = () =>{
    const alturaSupeior = Math.random() * (altura - abertura)
    const alturaInferior = altura - abertura - alturaSupeior

    this.superior.setAltura(alturaSupeior);
    this.inferior.setAltura(alturaInferior);
  }
  this.getX = ()=> parent(this.elemento.style.left.split('px'));

  this.setX = x => this.elemento.style.left = `${x}px`;

  this.getLargura = () => this.elemento.clientWidth;

  this.sortearAbertura()
  this.setX(x)
}
const b = new ParDeBarreiras(700,200,700);
document.querySelector('[tp-flappy]').appendChild(b.elemento)