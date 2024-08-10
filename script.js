const continenteFormatado = {
  'america': 'América',
  'asia': 'Ásia',
  'africa': 'África',
  'europa': 'Europa',
  'oceania': 'Oceania'
}

const pais = document.getElementById('pais')
const proximo = document.getElementById('proximo')
const feedback = document.getElementById('feedback')
const respostaCorreta = document.getElementById('resposta-correta')
let paisContinente = [['null', 'null']]
let numerosSorteados = []
let paisesIncorretos = []

// Iniciar jogo e escolher nível de dificuldade
function iniciarJogo(dificuldade) {
  document.getElementById('tela-inicial').classList.add('hidden')
  document.getElementById('tela-jogo').classList.remove('hidden')
  if (dificuldade === 'facil') {
    paisContinente = paisContinenteFacil
  } else if (dificuldade === 'medio') {
    paisContinente = paisContinenteMedio
  } else if (dificuldade === 'dificil') {
    paisContinente = paisContinenteDificil
  }

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
    } else {
      feedback.style.color = '#d93e3e'
      feedback.textContent = 'ERROU!'
      respostaCorreta.textContent = `Correto seria: ${continenteFormatado[paisContinente[numeroSorteado][1]]}`
      paisesIncorretos.push(paisContinente[numeroSorteado])
    }

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

// Sortear número
function sortearNumero() {
  if (numerosSorteados.length === paisContinente.length) {
    if (paisesIncorretos.length > 0) {
      let confirmar = confirm('Todos os países foram exibidos, deseja jogar com os países que você errou?')

      if (confirmar) {
        paisContinente = paisesIncorretos
      } else {
        window.location.reload()
      }

      paisesIncorretos = []
      numerosSorteados = []
    } else {
      alert('Acertou todos os países! Parabéns!')
      window.location.reload()
      return
    }
  }

  let numero

  do {
    numero = Math.floor(Math.random() * paisContinente.length)
  } while (numerosSorteados.includes(numero));

  numerosSorteados.push(numero)
  return numero
}