const header = document.createElement('header');
document.body.appendChild(header);

const createH1 = () => {
  const h1 = document.createElement('h1');
  h1.id = 'title';
  h1.innerText = 'Adivinhe a cor!';
  h1.style.textAlign = 'center';
  header.appendChild(h1);
};

createH1();

const createMain = () => {
  const main = document.createElement('main');
  document.body.appendChild(main);
};

createMain();

const main = document.querySelector('main');

const createParagraph = () => {
  const paragraph = document.createElement('p');
  paragraph.id = 'rgb-color';
  paragraph.innerText = '';
  main.appendChild(paragraph);
};

createParagraph();

const paragraph = document.querySelector('#rgb-color');

let placar = 0;

const createScore = () => {
  const score = document.createElement('p');
  score.id = 'score';
  score.innerText = `Seu placar é: ${placar}`;
  main.appendChild(score);
};

createScore();

const score = document.querySelector('#score');

const createNewParagraph = () => {
  const newParagraph = document.createElement('p');
  newParagraph.id = 'answer';
  newParagraph.innerText = '';
  document.body.appendChild(newParagraph);
};

createNewParagraph();

const newParagraph = document.querySelector('#answer');

window.onload = () => {
  newParagraph.innerText = 'Escolha uma cor';
};

const createDivs = () => {
  const createSection = () => {
    const section = document.createElement('section');
    main.appendChild(section);
  };

  createSection();

  const section = document.querySelector('section');

  const numeroInicial = `${Math.floor(Math.random() * 5)}`;
  for (let index = 0; index < 6; index += 1) {
    const ball = document.createElement('div');
    ball.className = 'ball';
    ball.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
    ball.addEventListener('click', () => {
      if (ball.style.backgroundColor === paragraph.innerText) {
        newParagraph.innerText = 'Acertou!';
        placar += 3;
        score.innerText = `Seu placar é: ${placar}`;
      } else {
        newParagraph.innerText = 'Errou! Tente novamente!';
      }
    });
    if (index == numeroInicial) {
      paragraph.innerText = ball.style.backgroundColor;
    }
    section.appendChild(ball);
  }
};

createDivs();

const createButtonReset = () => {
  const button = document.createElement('button');
  button.id = 'reset-game';
  button.innerText = 'Resetar o jogo';
  document.body.appendChild(button);
};

createButtonReset();

const button = document.querySelector('#reset-game');

button.addEventListener('click', () => {
  const section = document.querySelector('section');
  section.remove();
  createDivs();
  newParagraph.innerText = 'Escolha uma cor';
});
