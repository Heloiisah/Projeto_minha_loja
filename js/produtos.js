// IMPORTANDO OS PRODUTOS
import { produtos } from "./lista_produtos.js";

// PEGANDO ELEMENTO DO DOM
const sectionCards = document.querySelector("#cards");

//CARREGANDO OS CARDS
const listarProdutos = () => {
    montaCards(produtos)
}

//MONTANDO OS MENUS SEÇÕES
const menuSecoes = () => {

    const mapSecoes = new Map()

    //PECORRENDO O ARRAY PRODUTO
    produtos.forEach((elem) => {
        mapSecoes.set(elem.id_secao, elem)
    })

    //CONVERTENDO MAP EM ARRAY
    const secoesFiltradas = Array.from(mapSecoes.values())

    //RETORNANDO O ARRAY SELECIONADO
    return secoesFiltradas
}

//FUNÇÃO PARA INSERIR OS MENUS NA LISTA
const carregaSecoes = () => {

    //PEGANDO O ELEMENTO ul menu-secoes DO DOM
    const ulMenuSecoes = document.querySelector('#menu-secoes')

    //LIMPANDO O ELEMENTO DO DOM
    ulMenuSecoes.innerHTML = ''

    //CHAMANDO A FUNÇÃO menuSecoes E PERCORRENDO O ARRAY DE SEÇÕES JA SELECIONADAS
    menuSecoes().forEach((elem, i) => {

        //CRIANDO ELEMENTO li
        const liMenu = document.createElement('li')

        //CRIANDO O ELEMENTO a ATRIBUINDO O NOME DA SEÇÃO
        const aMenu = document.createElement('a')
        aMenu.setAttribute('href', '#')
        aMenu.setAttribute('class', 'lnk-secao')
        aMenu.innerHTML = elem.secao

        aMenu.addEventListener('click', () => {
            montaCards(filtroProduto(elem.id_secao))
        })

        //ADICIONANDO O ELEMENTO FILHO a NO li
        liMenu.appendChild(aMenu)

        //ADICIONANDO O ELEMENTO FILHO liMenu NO OBJETO DOM
        ulMenuSecoes.appendChild(liMenu)

    })

}

//FUNÇÃO FILTRO PRODUTO
const filtroProduto = (idSecao) => {

    //FILTRANDO OS PRODUTOS A PARTIR DA REPETIÇÃO filter
    return produtos.filter(elem => elem.id_secao === idSecao)

}

//FUNÇÃO MONTA CARD
const montaCards = (objProdutos) => {

    //LIMPANDO A SECTION cards
    sectionCards.innerHTML = ''

    //PECORRENDO O ARRAY DE objProdutos
    objProdutos.forEach((elem, i) => {

        //CRIANDO O ELEMENTO DIV E DEFININDO O ATRIBUTO CARD
        const divCard = document.createElement('div')
        divCard.setAttribute('class', 'card')

        //CRIANDO O ELEMENTO img E DEFININDO OS ATRIBUTOS SRC E ALT
        const imgCard = document.createElement('img')
        imgCard.setAttribute('src', elem.caminho_imagem)
        imgCard.setAttribute('alt', elem.descricao_produto)

        //CRIANDO O ELEMENTO p
        const pCard = document.createElement('p')
        pCard.innerHTML = elem.descricao_produto

        //CRIANDO O ELEMENTO h2
        const h2Card = document.createElement('h2')
        h2Card.innerHTML = `R$ ${parseFloat(elem.valor_unitario).toFixed(2).replace('.', ',')}`

        //CRIANDO O ELEMENTO button
        const btnCard = document.createElement('button')
        btnCard.setAttribute('class', 'btn-add')
        btnCard.innerHTML = 'Adicionar'

        //ADICIONANDO OS ELEMENTOS FILHOS AO divCard
        divCard.appendChild(imgCard)
        divCard.appendChild(pCard)
        divCard.appendChild(h2Card)
        divCard.appendChild(btnCard)

        //ADICIONANDO O divCard À SECTION CARDS
        sectionCards.appendChild(divCard)

    })

}

//CHAMANDO AS FUNÇÕES
listarProdutos()
carregaSecoes()