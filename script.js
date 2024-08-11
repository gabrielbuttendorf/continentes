const continenteFormatado = {
  'america': 'América',
  'asia': 'Ásia',
  'africa': 'África',
  'europa': 'Europa',
  'oceania': 'Oceania'
}

let paisContinente = [['null', 'null']]

// Variáveis globais
const pais = document.getElementById('pais')
const proximo = document.getElementById('proximo')
const feedback = document.getElementById('feedback')
const respostaCorreta = document.getElementById('resposta-correta')
const elementoAcertos = document.getElementsByClassName('acertos')[0]
const elementoErros = document.getElementsByClassName('erros')[0]
let dificuldade = ''
let qtdPais = 0
let numerosSorteados = []
let paisesIncorretos = []
let numeroAcertos = 0
let numeroErros = 0

// Iniciar jogo e escolher nível de dificuldade
function iniciarJogo(quantidade) {
  exibirTelaJogo()

  if (dificuldade === 'facil') {
    paisContinente = paisContinenteFacil
  } else if (dificuldade === 'medio') {
    paisContinente = paisContinenteMedio
  } else if (dificuldade === 'dificil') {
    paisContinente = paisContinenteDificil
  } else {
    paisContinente = paisContinenteGeral
  }

  qtdPais = Number(quantidade)
  let numeroSorteado = sortearNumero()

  // Inserir o nome do país sorteado no SPAN
pais.textContent = `${paisContinente[numeroSorteado][0]}`

// Verificar o botão clicado
const buttons = document.querySelectorAll('#opcoes button')

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const value = event.target.value

    buttons.forEach(button => button.classList.add('disabled'))

    // Exibir erro ou acerto
    if (value === paisContinente[numeroSorteado][1]) {
      feedback.style.color = '#3ed953'
      feedback.textContent = 'CORRETO!'
      respostaCorreta.textContent = ''
      numeroAcertos ++
    } else {
      feedback.style.color = '#d93e3e'
      feedback.textContent = 'ERROU!'
      respostaCorreta.textContent = `Correto seria: ${continenteFormatado[paisContinente[numeroSorteado][1]]}`
      paisesIncorretos.push(paisContinente[numeroSorteado])
      numeroErros++
    }

    atualizarErrosAcertos()
    proximo.classList.remove('disabled')
  })
})

// Sortear e exibir um novo país
proximo.addEventListener('click', () => {
  numeroSorteado = sortearNumero()
  proximo.classList.add('disabled')
  pais.textContent = `${paisContinente[numeroSorteado][0]}`
  feedback.textContent = ''
  respostaCorreta.textContent = ''
  buttons.forEach(button => button.classList.remove('disabled'))
})
}

// Selecionar dificuldade e ir para a tela de escolher quantidade de países
function selecionarDificuldade(dificuldadeEscolhida) {
  dificuldade = dificuldadeEscolhida
  exibirTelaSecundaria()
}

// Sortear número
function sortearNumero() {
  if (numerosSorteados.length === qtdPais) {
    if (paisesIncorretos.length > 0) {
      let confirmar = confirm('Todos os países foram exibidos, deseja jogar com os países que você errou?')

      if (confirmar) {
        paisContinente = paisesIncorretos
        numerosSorteados = []
        qtdPais = paisContinente.length
        numeroAcertos = 0
        numeroErros = 0
        atualizarErrosAcertos()
      } else {
        reiniciarJogo()
        return
      }

      paisesIncorretos = []
    } else {
      alert('Acertou todos os países! Parabéns!')
      reiniciarJogo()
      return
    }
  }

  let numero

  do {
    numero = Math.floor(Math.random() * paisContinente.length)
  } while (numerosSorteados.includes(numero))

  numerosSorteados.push(numero)
  return numero
}

// Atualizar erros e acertos na tela
function atualizarErrosAcertos() {
  elementoErros.textContent = numeroErros
  elementoAcertos.textContent = numeroAcertos
}

// Exibe a tela secundária e oculta a tela inicial
function exibirTelaSecundaria() {
  document.getElementById('tela-inicial').classList.add('hidden')
  document.getElementById('tela-secundaria').classList.remove('hidden')
}

// Exibe a tela jogo e oculta a tela secundária
function exibirTelaJogo() {
  document.getElementById('tela-secundaria').classList.add('hidden')
  document.getElementById('tela-jogo').classList.remove('hidden')
}

// Reinicia o jogo recarregando a página
function reiniciarJogo() {
  window.location.reload()
}