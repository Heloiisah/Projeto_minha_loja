// PEGANDO ELEMENTO DO DOM
const inputCep = document.querySelector("#cep");

// CAPTURANDO O EVENTO CHANGE
inputCep.addEventListener("change", (evt) => {

    // REMOVE TUDO QUE NÃO FOR NÚMERO
    const numCep = evt.target.value.replace(/\D/g, "");

    // VERIFICA SE POSSUI 8 DÍGITOS
    if (numCep.length !== 8) {
        alert("CEP INVÁLIDO");
        return;
    }

    // CHAMA A FUNÇÃO
    consultaCEP(numCep);

});

// FUNÇÃO CONSULTA CEP
const consultaCEP = async (cep) => {

    try {

        // CONSULTA A API
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

        if (!resposta.ok) {
            throw new Error("Erro ao consultar o CEP.");
        }

        const dadosEndereco = await resposta.json();

        if (dadosEndereco.erro) {
            alert("CEP NÃO LOCALIZADO");
            return;
        }

        carregaInput(dadosEndereco);

    } catch (erro) {

        console.log("ERRO:", erro.message);
        alert("Erro ao consultar o CEP.");

    }

};

// OBJETO COM OS CAMPOS DO FORMULÁRIO
const campos = {

    endereco: document.querySelector("#endereco"),
    bairro: document.querySelector("#bairro"),
    cidade: document.querySelector("#cidade"),
    estado: document.querySelector("#estado")

};

// PREENCHE OS CAMPOS
const carregaInput = (objEndereco) => {

    campos.endereco.value = objEndereco.logradouro;
    campos.bairro.value = objEndereco.bairro;
    campos.cidade.value = objEndereco.localidade;
    campos.estado.value = objEndereco.uf;

    campos.endereco.disabled = true;
    campos.bairro.disabled = true;
    campos.cidade.disabled = true;
    campos.estado.disabled = true;

};