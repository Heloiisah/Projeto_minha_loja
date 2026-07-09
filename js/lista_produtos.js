// IMPORTANDO OS PRODUTOS
import { produtos } from "./produtos.js";

// PEGANDO ELEMENTO DO DOM
const sectionCards = document.querySelector("#cards");

// CARREGANDO OS CARDS
const listarProdutos = () => {

    sectionCards.innerHTML = "";

    produtos.forEach((elem) => {

        const divCard = document.createElement("div");
        divCard.className = "card";

        const imgCard = document.createElement("img");
        imgCard.src = elem.caminho_imagem;
        imgCard.alt = elem.descricao_produto;

        const pCard = document.createElement("p");
        pCard.textContent = elem.descricao_produto;

        const h2Card = document.createElement("h2");
        h2Card.textContent = `R$ ${elem.valor_unitario.toFixed(2).replace(".", ",")}`;

        const btnCard = document.createElement("button");
        btnCard.className = "btn-add";
        btnCard.textContent = "Adicionar";

        divCard.appendChild(imgCard);
        divCard.appendChild(pCard);
        divCard.appendChild(h2Card);
        divCard.appendChild(btnCard);

        sectionCards.appendChild(divCard);

    });

};

listarProdutos();