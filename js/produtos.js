//IMPORTANDO OS PRODUTOS DO ARQUIVO lista_produtos.js
import { produtos } from "./lista_produtos";

// PEGANDO ELEMENTOS DO DOM
const sectionCards = document.querySelector('#cards')

// CARREGANDO OS CARDS
const listarProdutos = () => {

    sectionCards.innerHTML = ''

    produtos.forEach((elem, i) => 



        const divCards = document.createElement('div')
        divCards.setAttribute('class', 'card')

        const imgCard = document.createElement('img')
        imgCard.setAttribute('src', elem.caminho_imagem)
        imgCard.setAttribute('alt', elem.descricao_produto)

        const pCard = document.createElement('p')
        pCard.innerHTML = elem.descricao_produto

        const h2Card = document.createElement('h2')
        h2Card.innerHTML = `R$ ${parseFloat(elem.valor_unitario)
            .toFixed(2)
            .replace('.', ',')}`
    )}
      