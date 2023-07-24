const header = document.getElementById('title');
header.style.fontFamily = 'Helvetica';
header.style.fontSize = '12px';
header.style.paddingTop = '5px';
header.style.paddingBottom = '5px';

let linhasPixel = 5;
const boardSize = JSON.parse(localStorage.getItem('boardSize'));
if (boardSize > 5) {
  linhasPixel = boardSize;
}

const localStorageFunctionBoard = (numeroPixels) => {
  localStorage.clear();
  localStorage.setItem('boardSize', JSON.stringify(numeroPixels));
};

const preencherBoard = () => {
  const pixels = document.getElementsByClassName('pixel');
  const pixelBoard = document.getElementById('pixel-board');
  if (pixels) { pixelBoard.innerHTML = ''; }
  for (let index = 0; index < linhasPixel; index += 1) {
    const div = document.createElement('div');
    pixelBoard.appendChild(div);
    for (let indexPixel = 0; indexPixel < linhasPixel; indexPixel += 1) {
      const pixel2 = document.createElement('div');
      pixel2.className = 'pixel';
      pixel2.style.border = '1px solid black';
      pixel2.style.width = '40px';
      pixel2.style.height = '40px';
      pixel2.style.backgroundColor = 'white';
      pixel2.style.display = 'inline-block';
      pixelBoard.appendChild(pixel2);
    }
  }
};

preencherBoard();

const selectColor = () => {
  const colors = document.getElementsByClassName('color');
  for (let index = 0; index < colors.length; index += 1) {
    colors[index].addEventListener('click', (event) => {
      const previouslySelected = document.querySelector('.selected');
      previouslySelected.classList.remove('selected');
      event.target.classList.add('selected');
    });
  }
};

selectColor();

const localStorageFunction = () => {
  localStorage.removeItem('pixelBoard');
  const obj = [];
  const pixel = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixel.length; index += 1) {
    const style = window.getComputedStyle(pixel[index]);
    const color = style.getPropertyValue('background-color');
    obj.push({
      indexPixel: index,
      cor: color,
    });
  }
  localStorage.setItem('pixelBoard', JSON.stringify(obj));
};

const setColorPixel = () => {
  const pixel = document.getElementsByClassName('pixel');
  for (let indexPixel = 0; indexPixel < pixel.length; indexPixel += 1) {
    pixel[indexPixel].addEventListener('click', (event) => {
      const previouslySelected = document.querySelector('.selected');
      const style = window.getComputedStyle(previouslySelected);
      const color = style.getPropertyValue('background-color');
      const evento = event;
      if (previouslySelected !== null) {
        evento.target.style.backgroundColor = color;
      } else {
        evento.target.style.backgroundColor = 'white';
      }
      localStorageFunction();
    });
  }
};

setColorPixel();

const botaoLimpar = () => {
  const pixel = document.getElementsByClassName('pixel');
  for (let indexBotao = 0; indexBotao < pixel.length; indexBotao += 1) {
    pixel[indexBotao].style.backgroundColor = 'white';
  }
  localStorageFunction();
};

const botoes = document.getElementById('botões');
const criarBotaoLimpar = document.createElement('button');
criarBotaoLimpar.id = 'clear-board';
criarBotaoLimpar.innerText = 'Limpar';
botoes.appendChild(criarBotaoLimpar);

const botao = document.getElementById('clear-board');
botao.addEventListener('click', botaoLimpar);

const botaoCoresAleatorias = document.createElement('button');
botaoCoresAleatorias.id = 'button-random-color';
botaoCoresAleatorias.innerText = 'Cores aleatórias';
botaoCoresAleatorias.style.marginLeft = '10px';
botoes.appendChild(botaoCoresAleatorias);

const funcaoCoresAleatorias = () => {
  const colors = document.getElementsByClassName('color');
  for (let indexCores = 0; indexCores < colors.length; indexCores += 1) {
    const cores = colors[indexCores];
    const corAleatoria1 = Math.floor(Math.random() * 255);
    const corAleatoria2 = Math.floor(Math.random() * 255);
    const corAleatoria3 = Math.floor(Math.random() * 255);
    cores.style.backgroundColor = `rgb(${corAleatoria1}, ${corAleatoria2}, ${corAleatoria3})`;
  }
};

const coresAleatoriasBotao = document.getElementById('button-random-color');
coresAleatoriasBotao.addEventListener('click', funcaoCoresAleatorias);

window.onload = () => {
  const pixel = document.getElementsByClassName('pixel');
  const localStorageItems = JSON.parse(localStorage.getItem('pixelBoard'));
  for (let index = 0; index < pixel.length; index += 1) {
    if (localStorageItems !== null && index === localStorageItems[index].indexPixel) {
      pixel[index].style.backgroundColor = localStorageItems[index].cor;
    }
  }
};

const criandoVQV = () => {
  const inputVQV = document.createElement('input');
  inputVQV.id = 'board-size';
  inputVQV.style.marginLeft = '10px';
  inputVQV.type = 'number';
  inputVQV.min = '1';
  botoes.appendChild(inputVQV);
  const buttonVQV = document.createElement('button');
  buttonVQV.id = 'generate-board';
  buttonVQV.innerText = 'VQV';
  buttonVQV.style.marginLeft = '10px';
  botoes.appendChild(buttonVQV);
};

criandoVQV();

const botaoInputFunction = () => {
  const inputVQV = document.getElementById('board-size');
  const valor = inputVQV.value;
  if (valor === '') {
    window.alert('Board inválido!');
  } else if (valor < 5) {
    linhasPixel = 5;
  } else if (valor > 50) {
    linhasPixel = 50;
  } else if (valor >= 5 && valor <= 50) {
    linhasPixel = valor;
  }
  preencherBoard();
  setColorPixel();
  localStorageFunctionBoard(linhasPixel);
};

const botaoVQV = document.getElementById('generate-board');
botaoVQV.addEventListener('click', botaoInputFunction);
