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
  this.getX = ()=> parseInt(this.elemento.style.left.split('px')[0]);

  this.setX = x => this.elemento.style.left = `${x}px`;

  this.getLargura = () => this.elemento.clientWidth;

  this.sortearAbertura()
  this.setX(x)
}
// const b = new ParDeBarreiras(700,200,700);
// document.querySelector('[tp-flappy]').appendChild(b.elemento)

function Barreiras(altura, largura, abertura, espaco, notificarPonto){
  this.pares = [
    new ParDeBarreiras(altura, abertura, largura),
    new ParDeBarreiras(altura, abertura, largura+espaco),
    new ParDeBarreiras(altura, abertura, largura+espaco*2),
    new ParDeBarreiras(altura, abertura, largura+espaco*3)
  ]
  const deslocamento = 3;

  this.animar = () => {
      this.pares.forEach(par =>{
        par.setX(par.getX() - deslocamento);

        if(par.getX()< -par.getLargura()){
          par.setX(par.getX()+espaco * this.pares.length);
          par.sortearAbertura();
        }
        const meio = largura /2;
        const cruzouOMeio = par.getX() + deslocamento >= meio && par.getX()< meio;
        if(cruzouOMeio) notificarPonto();
      })
  }  
}

function Passaro (alturaDoJogo){
  let voando = false;
  
  this.elemento = newElement('img', 'passaro')
  this.elemento.src = './imagens/passaro.png'
  
  this.getY = () =>parseInt(this.elemento.style.bottom.split('px')[0]);
  this.setY = y => this.elemento.style.bottom = `${y}px`;
  
  window.onkeydown = e => voando = true;
  window.onkeyup = e => voando = false;
  window.onmousedown = e => voando = true;
  window.onmouseup = e => voando = false;
  
  this.animar = () =>{
    const novoY = this.getY()+(voando ? 8 : -5);
    const alturaMax = alturaDoJogo - this.elemento.clientHeight;
    
    if(novoY <= 0){
      this.setY(0);
    }else if (novoY >= alturaMax){
      this.setY(alturaMax);
    } else {
      this.setY(novoY);
    }
  }
  this.setY(alturaDoJogo/2)
} 

function Progresso() {
  this.elemento = newElement('span', 'progresso');

  this.atualizarPontos = pontos => {
    this.elemento.innerHTML = pontos;
  }
  this.atualizarPontos(0)
}

/*
const barreiras = new Barreiras(700, 1200, 200, 400);
const passaro = new Passaro(700);
const areaDoJogo = document.querySelector('[tp-flappy]');

areaDoJogo.appendChild(new Progresso().elemento)
areaDoJogo.appendChild(passaro.elemento);
barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elemento));
setInterval(()=>{
  barreiras.animar();
  passaro.animar();
  }, 20)*/
  
  function FlappyBird() {
    let pontos= 0;
    
    const areaDoJogo = document.querySelector('[tp-flappy]');
    const altura = areaDoJogo.clientHeight;
    const largura = areaDoJogo.clientWidth;

    const progresso = new Progresso();
    const barreiras = new Barreiras(altura, largura, 200, 400, 
      ()=>progresso.atualizarPontos(++pontos));

    const passaro = new Passaro(altura);

    areaDoJogo.appendChild(progresso.elemento);
    areaDoJogo.appendChild(passaro.elemento);

    barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elemento));

    this.start = () =>{
      const temporizador = setInterval (()=>{
        barreiras.animar();
        passaro.animar()
      }, 20);
    }
}
new FlappyBird().start()