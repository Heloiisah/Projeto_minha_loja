import { listItens, removeItem } from "./carrinho.js";

const montaTelaCarrinho = () => {

    const tabelaProdutos = document.querySelector("#listaProdutos tbody");

    tabelaProdutos.innerHTML = "";

    let total = 0;

    listItens().forEach((elem, i) => {

        const linha = document.createElement("tr");

        /* PRODUTO */

        const tdProduto = document.createElement("td");
        tdProduto.innerHTML = elem.descricao_produto;

        /* IMAGEM */

        const tdImagem = document.createElement("td");

        const imgItem = document.createElement("img");
        imgItem.setAttribute("src", elem.caminho_imagem);
        imgItem.setAttribute("alt", elem.descricao_produto);

        tdImagem.appendChild(imgItem);

        /* QUANTIDADE */

        const tdQuantidade = document.createElement("td");

        const divQuantidade = document.createElement("div");
        divQuantidade.setAttribute("class", "controleQuantidade");

        const btnMenos = document.createElement("button");
        btnMenos.innerHTML = "-";

        const inputQuantidade = document.createElement("input");
        inputQuantidade.setAttribute("type", "number");
        inputQuantidade.setAttribute("name", `quant${i}`);
        inputQuantidade.setAttribute("id", `quant${i}`);
        inputQuantidade.setAttribute("class", "quantidade");
        inputQuantidade.setAttribute("value", elem.quantidade);
        inputQuantidade.setAttribute("readonly", true);

        const btnMais = document.createElement("button");
        btnMais.innerHTML = "+";

        btnMenos.addEventListener("click", () => {

            if (elem.quantidade > 1) {

                elem.quantidade--;

                let itens = listItens();

                itens[i].quantidade = elem.quantidade;

                sessionStorage.setItem(
                    "carrinhoSessao",
                    JSON.stringify(itens)
                );

                montaTelaCarrinho();

            }

        });

        btnMais.addEventListener("click", () => {

            elem.quantidade++;

            let itens = listItens();

            itens[i].quantidade = elem.quantidade;

            sessionStorage.setItem(
                "carrinhoSessao",
                JSON.stringify(itens)
            );

            montaTelaCarrinho();

        });

        divQuantidade.appendChild(btnMenos);
        divQuantidade.appendChild(inputQuantidade);
        divQuantidade.appendChild(btnMais);

        tdQuantidade.appendChild(divQuantidade);

        /* PREÇO */

        const tdPreco = document.createElement("td");
        tdPreco.innerHTML =
            `R$ ${parseFloat(elem.valor_unitario).toFixed(2).replace(".", ",")}`;

        /* SUBTOTAL */

        const tdSubtotal = document.createElement("td");

        const subtotal = elem.valor_unitario * elem.quantidade;

        total += subtotal;

        tdSubtotal.innerHTML =
            `R$ ${subtotal.toFixed(2).replace(".", ",")}`;

        /* REMOVER */

        const tdRemover = document.createElement("td");

        const btnRemover = document.createElement("button");
        btnRemover.setAttribute("class", "btnRemover");
        btnRemover.innerHTML = "Remover";

        btnRemover.addEventListener("click", () => {

            if (confirm(`Tem certeza que deseja remover ${elem.descricao_produto} do carrinho?`)) {

                removerItemTela(i);

            }

        });

        tdRemover.appendChild(btnRemover);

        /* MONTANDO A LINHA */

        linha.appendChild(tdProduto);
        linha.appendChild(tdImagem);
        linha.appendChild(tdQuantidade);
        linha.appendChild(tdPreco);
        linha.appendChild(tdSubtotal);
        linha.appendChild(tdRemover);

        tabelaProdutos.appendChild(linha);

    });

    const frete = 10;

    document.querySelector("#valorProdutos").innerHTML =
        `R$ ${total.toFixed(2).replace(".", ",")}`;

    document.querySelector("#valorFrete").innerHTML =
        `R$ ${frete.toFixed(2).replace(".", ",")}`;

    document.querySelector("#valorTotal").innerHTML =
        `R$ ${(total + frete).toFixed(2).replace(".", ",")}`;

}

montaTelaCarrinho();

const removerItemTela = (pos) => {

    removeItem(pos);

    montaTelaCarrinho();

}