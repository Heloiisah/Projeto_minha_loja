// Recupera os produtos do SessionStorage
const itensCarrinho = JSON.parse(sessionStorage.getItem("carrinhoSessao")) || [];

// Espera a página carregar
window.onload = function () {

    listarItens();

    const btnFinalizar = document.querySelector(".btnFinalizar");

    btnFinalizar.addEventListener("click", finalizarCompra);

};

// Lista os produtos na tabela
function listarItens() {

    const tabela = document.querySelector("#listaProdutos table");

    if (!tabela) {
        return;
    }

    // Remove todas as linhas, menos o cabeçalho
    while (tabela.rows.length > 1) {
        tabela.deleteRow(1);
    }

    let total = 0;

    itensCarrinho.forEach(function (item) {

        let subtotal = Number(item.valor_unitario) * item.quantidade;

        total += subtotal;

        let linha = tabela.insertRow();

        let coluna1 = linha.insertCell();
        let coluna2 = linha.insertCell();
        let coluna3 = linha.insertCell();
        let coluna4 = linha.insertCell();
        let coluna5 = linha.insertCell();

        coluna1.innerHTML = item.descricao_produto;

        coluna2.innerHTML =
            "<img src='" + item.caminho_imagem + "' width='80'>";

        coluna3.innerHTML = item.quantidade;

        coluna4.innerHTML =
            "R$ " + Number(item.valor_unitario).toFixed(2).replace(".", ",");

        coluna5.innerHTML =
            "R$ " + subtotal.toFixed(2).replace(".", ",");

    });

    let frete = 15;

    document.getElementById("valorProdutos").innerHTML =
        "R$ " + total.toFixed(2).replace(".", ",");

    document.getElementById("valorFrete").innerHTML =
        "R$ " + frete.toFixed(2).replace(".", ",");

    document.getElementById("valorTotal").innerHTML =
        "R$ " + (total + frete).toFixed(2).replace(".", ",");

}

// Finalizar compra
function finalizarCompra() {

    let cep = document.getElementById("cep").value;

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