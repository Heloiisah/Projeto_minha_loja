// Recupera os produtos do SessionStorage
let itensCarrinho = JSON.parse(sessionStorage.getItem("carrinhoSessao")) || [];


// Carrega a página
window.onload = function () {

    listarItens();

    const btnFinalizar = document.querySelector(".btnFinalizar");

    btnFinalizar.addEventListener("click", finalizarCompra);

};


// Lista os produtos
function listarItens() {

    const tabela = document.querySelector("#listaProdutos table");

    if (!tabela) {
        return;
    }


    // Limpa a tabela
    while (tabela.rows.length > 1) {
        tabela.deleteRow(1);
    }


    let total = 0;


    itensCarrinho.forEach(function(item, indice){


        let subtotal = Number(item.valor_unitario) * item.quantidade;

        total += subtotal;


        let linha = tabela.insertRow();


        let coluna1 = linha.insertCell();
        let coluna2 = linha.insertCell();
        let coluna3 = linha.insertCell();
        let coluna4 = linha.insertCell();
        let coluna5 = linha.insertCell();
        let coluna6 = linha.insertCell();



        // Produto
        coluna1.innerHTML = item.descricao_produto;


        // Imagem
        coluna2.innerHTML =
        "<img src='" + item.caminho_imagem + "' width='80'>";



        // Quantidade com + e -
        coluna3.innerHTML = `

            <div class="controleQuantidade">

                <button onclick="alterarQuantidade(${indice}, -1)">
                    -
                </button>


                <input value="${item.quantidade}" readonly>


                <button onclick="alterarQuantidade(${indice}, 1)">
                    +
                </button>

            </div>

        `;



        // Preço
        coluna4.innerHTML =
        "R$ " + Number(item.valor_unitario)
        .toFixed(2)
        .replace(".", ",");



        // Subtotal
        coluna5.innerHTML =
        "R$ " + subtotal
        .toFixed(2)
        .replace(".", ",");



        // Remover
        coluna6.innerHTML =
        `
        <button class="btnRemover"
        onclick="removerItem(${indice})">
        ✖
        </button>
        `;


    });



    let frete = 15;


    document.getElementById("valorProdutos").innerHTML =
    "R$ " + total.toFixed(2).replace(".", ",");



    document.getElementById("valorFrete").innerHTML =
    "R$ " + frete.toFixed(2).replace(".", ",");



    document.getElementById("valorTotal").innerHTML =
    "R$ " + (total + frete)
    .toFixed(2)
    .replace(".", ",");

}




// Aumenta ou diminui quantidade
function alterarQuantidade(indice, valor){


    itensCarrinho[indice].quantidade += valor;



    // Não deixa ficar zero
    if(itensCarrinho[indice].quantidade < 1){

        itensCarrinho[indice].quantidade = 1;

    }



    sessionStorage.setItem(
        "carrinhoSessao",
        JSON.stringify(itensCarrinho)
    );


    listarItens();

}





// Remove produto
function removerItem(indice){


    if(confirm("Deseja remover este produto do carrinho?")){


        itensCarrinho.splice(indice,1);



        sessionStorage.setItem(
            "carrinhoSessao",
            JSON.stringify(itensCarrinho)
        );



        listarItens();

    }

}




// Finalizar compra
function finalizarCompra(){


    let cep = document.getElementById("cep").value;



    if(cep == ""){

        alert("Digite o CEP.");
        return;

    }



    if(itensCarrinho.length == 0){

        alert("Seu carrinho está vazio.");
        return;

    }



    alert("Compra realizada com sucesso!");



    sessionStorage.removeItem("carrinhoSessao");


    location.reload();

}