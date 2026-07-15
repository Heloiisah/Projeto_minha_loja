// RECUPERA OS PRODUTOS
let itensCarrinho = JSON.parse(sessionStorage.getItem("carrinhoSessao")) || [];

// CARREGA A PÁGINA

window.onload = function () {

    listarItens();

    let btnFinalizar = document.querySelector(".btnFinalizar");

    btnFinalizar.onclick = function () {

        finalizarCompra();

    };

};

// LISTA OS PRODUTOS
function listarItens() {

    let tabela = document.querySelector("#listaProdutos table");

    if (tabela == null) {

        return;

    }

   // LIMPA A TABELA

    while (tabela.rows.length > 1) {

        tabela.deleteRow(1);

    }

    let total = 0;

    itensCarrinho.forEach(function (item, indice) {

        let subtotal = item.valor_unitario * item.quantidade;

        total = total + subtotal;

        let linha = tabela.insertRow();

        let coluna1 = linha.insertCell();
        let coluna2 = linha.insertCell();
        let coluna3 = linha.insertCell();
        let coluna4 = linha.insertCell();
        let coluna5 = linha.insertCell();
        let coluna6 = linha.insertCell();

       // PRODUTO
        coluna1.innerHTML = item.descricao_produto;

        // IMAGEM
        coluna2.innerHTML =
            "<img src='" + item.caminho_imagem + "' width='80'>";

        // QUANTIDADE
        coluna3.innerHTML =
            "<div class='controleQuantidade'>" +
            "<button onclick='alterarQuantidade(" + indice + ", -1)'>-</button>" +
            "<input value='" + item.quantidade + "' readonly>" +
            "<button onclick='alterarQuantidade(" + indice + ", 1)'>+</button>" +
            "</div>";

        // VALOR UNITÁRIO
        coluna4.innerHTML =
            "R$ " +
            Number(item.valor_unitario)
                .toFixed(2)
                .replace(".", ",");

       // SUBTOTAL
        coluna5.innerHTML =
            "R$ " +
            subtotal
                .toFixed(2)
                .replace(".", ",");

        // REMOVER
        coluna6.innerHTML =
            "<button class='btnRemover' onclick='removerItem(" + indice + ")'>✖</button>";

    });

    let frete = 10;

    document.querySelector("#valorProdutos").innerHTML =
        "R$ " + total.toFixed(2).replace(".", ",");

    document.querySelector("#valorFrete").innerHTML =
        "R$ " + frete.toFixed(2).replace(".", ",");

    document.querySelector("#valorTotal").innerHTML =
        "R$ " + (total + frete).toFixed(2).replace(".", ",");

}

// AUMENTA OU DIMINUI QUANTIDADE
function alterarQuantidade(indice, valor) {

    itensCarrinho[indice].quantidade =
        itensCarrinho[indice].quantidade + valor;

    if (itensCarrinho[indice].quantidade < 1) {

        itensCarrinho[indice].quantidade = 1;

    }

    sessionStorage.setItem(
        "carrinhoSessao",
        JSON.stringify(itensCarrinho)
    );

    listarItens();

}

// REMOVE PRODUTO
function removerItem(indice) {

    let resposta = confirm("Deseja remover este produto do carrinho?");

    if (resposta) {

        itensCarrinho.splice(indice, 1);

        sessionStorage.setItem(
            "carrinhoSessao",
            JSON.stringify(itensCarrinho)
        );

        listarItens();

    }

}

// FINALIZAR COMPRA
function finalizarCompra() {

    let cep = document.querySelector("#cep").value;

    if (cep == "") {

        alert("Digite o CEP.");
        return;

    }

    if (itensCarrinho.length == 0) {

        alert("Seu carrinho está vazio.");
        return;

    }

    alert("Compra realizada com sucesso!");

    sessionStorage.removeItem("carrinhoSessao");

    location.reload();

}