// IMPORTANDO OS PRODUTOS
import { produtos } from "./lista_produtos.js";

// PEGANDO ELEMENTO DO DOM
const sectionCards = document.querySelector("#cards");

// CARREGANDO OS CARDS
const listarProdutos = () => {
    montaCards(produtos);
}

// MONTANDO OS MENUS DAS SEÇÕES
const menuSecoes = () => {

    const mapSecoes = new Map();

    produtos.forEach((elem) => {
        mapSecoes.set(elem.id_secao, elem);
    });

    return Array.from(mapSecoes.values());

}

// CARREGA AS SEÇÕES
const carregaSecoes = () => {

    const ulMenuSecoes = document.querySelector("#menu-secoes");

    ulMenuSecoes.innerHTML = "";

    // MENU TODOS
    const liTodos = document.createElement("li");

    const aTodos = document.createElement("a");
    aTodos.href = "#";
    aTodos.className = "lnk-secao";
    aTodos.innerHTML = "TODOS";

    aTodos.addEventListener("click", function () {
        montaCards(produtos);
    });

    liTodos.appendChild(aTodos);
    ulMenuSecoes.appendChild(liTodos);

    menuSecoes().forEach(function (elem) {

        const liMenu = document.createElement("li");

        const aMenu = document.createElement("a");
        aMenu.href = "#";
        aMenu.className = "lnk-secao";
        aMenu.innerHTML = elem.secao;

        aMenu.addEventListener("click", function () {
            montaCards(filtroProduto(elem.id_secao));
        });

        liMenu.appendChild(aMenu);
        ulMenuSecoes.appendChild(liMenu);

    });

}

// FILTRO DOS PRODUTOS
const filtroProduto = (idSecao) => {

    return produtos.filter(function (elem) {
        return elem.id_secao === idSecao;
    });

}

// MONTA OS CARDS
const montaCards = (objProdutos) => {

    sectionCards.innerHTML = "";

    objProdutos.forEach(function (elem) {

        const divCard = document.createElement("div");
        divCard.className = "card";

        const imgCard = document.createElement("img");
        imgCard.src = elem.caminho_imagem;
        imgCard.alt = elem.descricao_produto;

        const pCard = document.createElement("p");
        pCard.innerHTML = elem.descricao_produto;

        const h2Card = document.createElement("h2");
        h2Card.innerHTML =
            "R$ " + Number(elem.valor_unitario).toFixed(2).replace(".", ",");

        const btnCard = document.createElement("button");
        btnCard.className = "btn-add";
        btnCard.innerHTML = "Adicionar";

        // ADICIONAR AO CARRINHO
        btnCard.addEventListener("click", function () {

            let carrinho = JSON.parse(sessionStorage.getItem("carrinhoSessao")) || [];

            let existe = false;

            carrinho.forEach(function (item) {

                if (item.descricao_produto == elem.descricao_produto) {

                    item.quantidade++;
                    existe = true;

                }

            });

            if (!existe) {

                carrinho.push({

                    descricao_produto: elem.descricao_produto,
                    caminho_imagem: elem.caminho_imagem,
                    valor_unitario: Number(elem.valor_unitario),
                    quantidade: 1

                });

            }

            sessionStorage.setItem(
                "carrinhoSessao",
                JSON.stringify(carrinho)
            );

            // Vai para o carrinho
            window.location.href = "paginas/carrinho.html";

        });

        divCard.appendChild(imgCard);
        divCard.appendChild(pCard);
        divCard.appendChild(h2Card);
        divCard.appendChild(btnCard);

        sectionCards.appendChild(divCard);

    });

}

// CHAMANDO AS FUNÇÕES
listarProdutos();
carregaSecoes();