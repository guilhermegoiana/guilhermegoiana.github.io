const createElementHeader = () => {
  const header = document.createElement('header');
  document.body.appendChild(header);
};

createElementHeader();

const header = document.querySelector('header');

const createH1 = () => {
  const h1 = document.createElement('h1');
  h1.innerText = 'Minha Lista de Tarefas';
  header.appendChild(h1);
};

createH1();

const createElementParagraph = () => {
  const paragraph = document.createElement('p');
  paragraph.innerText = 'Clique duas vezes em um item para marcá-lo como completo';
  paragraph.id = 'funcionamento';
  header.appendChild(paragraph);
};

createElementParagraph();

const createMain = () => {
  const mainTag = document.createElement('main');
  header.appendChild(mainTag);
};

createMain();

const mainGet = document.querySelector('main');

const createInput = () => {
  const input = document.createElement('input');
  input.id = 'texto-tarefa';
  mainGet.appendChild(input);
};

createInput();

const createToDoList = () => {
  const ordenedList = document.createElement('ol');
  ordenedList.id = 'lista-tarefas';
  header.appendChild(ordenedList);
};

createToDoList();

const createButtonTarefa = () => {
  const botao = document.createElement('button');
  botao.id = 'criar-tarefa';
  botao.innerText = 'Adicionar';
  mainGet.appendChild(botao);
};

createButtonTarefa();

const eventBotao = (text, classes) => {
  const ordenedList = document.getElementById('lista-tarefas');
  const texto = document.createElement('li');
  texto.innerText = text;
  if (classes !== null) {
    for (let index = 0; index < classes.length; index += 1) {
      texto.classList.add(classes[index]);
    }
  }
  texto.addEventListener('click', () => {
    const previouslySelected = document.querySelector('.selected');
    if (previouslySelected !== null) {
      previouslySelected.classList.remove('selected');
    }
    texto.classList.add('selected');
  });
  texto.addEventListener('dblclick', (event) => {
    const eventTarget = event.target;
    eventTarget.classList.toggle('completed');
  });
  ordenedList.appendChild(texto);
  text.value = '';
};

const input = () => {
  const inputValue = document.getElementById('texto-tarefa');
  const text = inputValue.value;
  inputValue.value = '';
  eventBotao(text, null);
};

const botao = document.getElementById('criar-tarefa');
botao.addEventListener('click', input);

const createButtonApagar = () => {
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = 'Limpar lista';
  botaoApagar.id = 'apaga-tudo';
  botaoApagar.className = 'buttons';
  header.appendChild(botaoApagar);
};

createButtonApagar();

const botaoApagar = document.querySelector('#apaga-tudo');
botaoApagar.addEventListener('click', () => {
  const lists = document.querySelectorAll('#lista-tarefas li');
  lists.forEach((list) => {
    list.remove();
  });
});

const createButtonFinalizados = () => {
  const apagarFinalizados = document.createElement('button');
  apagarFinalizados.innerText = 'Limpar concluídos';
  apagarFinalizados.id = 'remover-finalizados';
  apagarFinalizados.className = 'buttons';
  header.appendChild(apagarFinalizados);
};

createButtonFinalizados();

const botaoFinalizados = document.querySelector('#remover-finalizados');
botaoFinalizados.addEventListener('click', () => {
  const lists = document.querySelectorAll('#lista-tarefas li');
  lists.forEach((list) => {
    if (list.classList.contains('completed')) {
      list.remove();
    }
  });
});

const createButtonSalvar = () => {
  const salvar = document.createElement('button');
  salvar.innerText = 'Salvar tarefas';
  salvar.id = 'salvar-tarefas';
  salvar.className = 'buttons';
  header.appendChild(salvar);
};
createButtonSalvar();

const webStorageLista = () => {
  localStorage.clear();
  const obj = [];
  const lists = document.querySelectorAll('#lista-tarefas li');
  lists.forEach((list) => {
    if (list.classList.contains('completed') && list.classList.contains('selected')) {
      obj.push({
        index: 1,
        texto: list.innerText,
        class1: 'completed',
        class2: 'selected',
      });
    } else if (list.classList.contains('selected')) {
      obj.push({
        index: 1,
        texto: list.innerText,
        class2: 'selected',
      });
    } else if (list.classList.contains('completed')) {
      obj.push({
        index: 1,
        texto: list.innerText,
        class1: 'completed',
      });
    } else {
      obj.push({
        index: 1,
        texto: list.innerText,
      });
    }
  });
  if (obj[0] !== undefined) {
    localStorage.setItem('tarefas salvas', JSON.stringify(obj));
  } else {
    localStorage.clear();
  }
};

const salvar = document.getElementById('salvar-tarefas');
salvar.addEventListener('click', webStorageLista);

window.onload = () => {
  const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas salvas'));
  if (tarefasSalvas !== null) {
    for (let index = 0; index < tarefasSalvas.length; index += 1) {
      const salvasTarefas = tarefasSalvas[index].texto;
      const classes = [];
      if (tarefasSalvas[index].class2 === 'selected' && tarefasSalvas[index].class1 === 'completed') {
        classes.push('selected');
        classes.push('completed');
      } else if (tarefasSalvas[index].class1 === 'completed') {
        classes.push('completed');
      } else if (tarefasSalvas[index].class2 === 'selected') {
        classes.push('selected');
      }
      eventBotao(salvasTarefas, classes);
    }
  }
};

const createButtonCima = () => {
  const cima = document.createElement('button');
  cima.innerText = 'Subir';
  cima.id = 'mover-cima';
  cima.className = 'buttons';
  header.appendChild(cima);
};
createButtonCima();

const cima = document.getElementById('mover-cima');
cima.addEventListener('click', () => {
  const lists = document.querySelectorAll('#lista-tarefas li');
  for (let index = 0; index < lists.length; index += 1) {
    if (lists[index].classList.contains('selected') && index !== 0) {
      const anterior = lists[index - 1].innerHTML;
      const anteriorClass = lists[index - 1].classList;
      const selecionado = lists[index].innerHTML;
      const selecionadoClass = lists[index].classList;
      lists[index - 1].innerHTML = selecionado;
      lists[index].innerHTML = anterior;
      if (anteriorClass.contains('completed') && selecionadoClass.contains('completed')) {
        lists[index - 1].classList.add('completed');
        lists[index].classList.add('completed');
      } else if (anteriorClass.contains('completed')) {
        lists[index].classList.add('completed');
        lists[index - 1].classList.remove('completed');
      } else if (selecionadoClass.contains('completed')) {
        lists[index - 1].classList.add('completed');
        lists[index].classList.remove('completed');
      } else {
        lists[index].classList.remove();
        lists[index - 1].classList.remove();
      }
      lists[index].classList.remove('selected');
      lists[index - 1].classList.add('selected');
    }
  }
});

const createButtonBaixo = () => {
  const baixo = document.createElement('button');
  baixo.innerText = 'Descer';
  baixo.id = 'mover-baixo';
  baixo.className = 'buttons';
  header.appendChild(baixo);
};
createButtonBaixo();

const baixo = document.getElementById('mover-baixo');
baixo.addEventListener('click', () => {
  const lists1 = document.querySelectorAll('#lista-tarefas li');
  for (let indexBaixo = lists1.length - 2; indexBaixo >= 0; indexBaixo -= 1) {
    if (lists1[indexBaixo].classList.contains('selected')) {
      const proxima = lists1[indexBaixo + 1].innerHTML;
      const proximaClass = lists1[indexBaixo + 1].classList;
      const selecionado = lists1[indexBaixo].innerHTML;
      const selecionadoClass = lists1[indexBaixo].classList;
      lists1[indexBaixo + 1].innerHTML = selecionado;
      lists1[indexBaixo].innerHTML = proxima;
      if (proximaClass.contains('completed') && selecionadoClass.contains('completed')) {
        lists1[indexBaixo + 1].classList.add('completed');
        lists1[indexBaixo].classList.add('completed');
      } else if (proximaClass.contains('completed')) {
        lists1[indexBaixo].classList.add('completed');
        lists1[indexBaixo + 1].classList.remove('completed');
      } else if (selecionadoClass.contains('completed')) {
        lists1[indexBaixo + 1].classList.add('completed');
        lists1[indexBaixo].classList.remove('completed');
      } else {
        lists1[indexBaixo].classList.remove();
        lists1[indexBaixo + 1].classList.remove();
      }
      lists1[indexBaixo].classList.remove('selected');
      lists1[indexBaixo + 1].classList.add('selected');
    }
  }
});

const createLimparSelecionado = () => {
  const selecionado = document.createElement('button');
  selecionado.innerText = 'Limpar selecionado';
  selecionado.id = 'remover-selecionado';
  selecionado.className = 'buttons';
  header.appendChild(selecionado);
};
createLimparSelecionado();

const selecionado = document.getElementById('remover-selecionado');
selecionado.addEventListener('click', () => {
  const lists1 = document.querySelectorAll('#lista-tarefas li');
  for (let indexSelecionado = 0; indexSelecionado < lists1.length; indexSelecionado += 1) {
    if (lists1[indexSelecionado].classList.contains('selected')) {
      lists1[indexSelecionado].remove();
    }
  }
});
