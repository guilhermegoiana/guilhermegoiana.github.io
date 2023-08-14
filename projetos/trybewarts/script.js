const inputEmail = document.querySelector('#email');
const inputPassword = document.querySelector('#password');
const button = document.querySelector('#btn-submit');

button.addEventListener('click', () => {
  if (inputEmail.value === 'tryber@teste.com' && inputPassword.value === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
});

const habilitarBotao = () => {
  const botao = document.querySelector('#submit-btn');
  const agreement = document.querySelector('#agreement');
  botao.disabled = !agreement.checked;
};

window.onload = function onload() {
  const agreement = document.querySelector('#agreement');
  agreement.addEventListener('change', habilitarBotao);
};

const contadorFunction = (contagem) => {
  const contador = document.querySelector('#counter');
  contador.innerText = `Contador: ${contagem}`;
};

const textarea = document.querySelector('#textarea');

textarea.addEventListener('click', () => {
  if (textarea.value === 'Escreva aqui os seus principais pontos de aprendizado.') {
    textarea.value = '';
  }
});

const functionContagem = () => {
  let contagem = 500;
  const valor = textarea.value;
  for (let index = 0; index < valor.length; index += 1) {
    contagem -= 1;
  }
  contadorFunction(contagem);
};

textarea.addEventListener('keyup', functionContagem);

const submit = document.getElementById('submit-btn');

const fimNome = document.querySelector('#nome');
const fimEmail = document.querySelector('#emailP');
const fimCasa = document.querySelector('#casa');
const fimFamilia = document.querySelector('#familia');
const fimMaterias = document.querySelector('#materias');
const avaliacao = document.querySelector('#avaliacao');
const observacoes = document.querySelector('#observacoes');
const formData = document.getElementById('form-data');
const formTitle = document.getElementById('form-title');

const functionMaterias = () => {
  const checkboxes = document.querySelectorAll('input[name="button1"]');
  const materias = [];
  for (let i = 0; i < checkboxes.length; i += 1) {
    if (checkboxes[i].checked) {
      materias.push(checkboxes[i].value);
    }
  }
  console.log(materias);
  return materias.join(', ');
};

submit.addEventListener('click', (event) => {
  event.preventDefault();
  const name = document.querySelector('#input-name');
  const lastName = document.querySelector('#input-lastname');
  const email = document.querySelector('#input-email');
  const casa = document.querySelector('#house');
  const family = document.querySelector('input[name="family"]:checked').value;
  const nota = document.querySelector('input[name="rate"]:checked').value;
  const formulario = document.getElementById('evaluation-form');
  formulario.style.display = 'none';
  formTitle.style.display = 'none';
  formData.style.display = 'flex';
  fimNome.innerHTML = `Nome: ${name.value} ${lastName.value}`;
  fimEmail.innerHTML = `Email: ${email.value}`;
  fimCasa.innerHTML = `Casa: ${casa.options[casa.selectedIndex].value}`;
  fimFamilia.innerHTML = `Família: ${family}`;
  fimMaterias.innerHTML = `Matérias: ${functionMaterias()}`;
  avaliacao.innerHTML = `Avaliação: ${nota}`;
  observacoes.innerHTML = `Observações: ${textarea.value}`;
});
