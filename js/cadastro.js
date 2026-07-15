// FORMULÁRIO
const formulario = document.querySelector("#frm-pessoa");

// CAMPOS
const campoCpf = document.querySelector("#cpf");
const campoTelefone = document.querySelector("#telefone");
const campoCep = document.querySelector("#cep");

// MÁSCARA DO CPF
campoCpf.oninput = function () {

    let valor = campoCpf.value;

    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    campoCpf.value = valor;

};

// MÁSCARA DO TELEFONE
campoTelefone.oninput = function () {

    let valor = campoTelefone.value;

    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/(\d{2})(\d)/, "($1) $2");
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

    campoTelefone.value = valor;

};

// MÁSCARA DO CEP
campoCep.oninput = function () {

    let valor = campoCep.value;

    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

    campoCep.value = valor;

};

// CADASTRO
formulario.onsubmit = function (e) {

    e.preventDefault();

    let nome = document.querySelector("#nome").value.trim();
    let cpf = document.querySelector("#cpf").value.trim();
    let data = document.querySelector("#data").value;
    let telefone = document.querySelector("#telefone").value.trim();
    let email = document.querySelector("#email").value.trim();
    let endereco = document.querySelector("#endereco").value.trim();
    let bairro = document.querySelector("#bairro").value.trim();
    let cidade = document.querySelector("#cidade").value.trim();
    let estado = document.querySelector("#estado").value;
    let cep = document.querySelector("#cep").value.trim();
    let senha = document.querySelector("#senha").value;
    let confirmar = document.querySelector("#confirmar").value;
    let novidades = document.querySelector("#novidades").checked;

    if (
        nome == "" ||
        cpf == "" ||
        data == "" ||
        telefone == "" ||
        email == "" ||
        endereco == "" ||
        bairro == "" ||
        cidade == "" ||
        estado == "" ||
        senha == "" ||
        confirmar == ""
    ) {

        alert("Preencha todos os campos.");
        return;

    }

    if (senha != confirmar) {

        alert("As senhas não coincidem.");
        return;

    }

    let cliente = {

        nome: nome,
        cpf: cpf,
        data: data,
        telefone: telefone,
        email: email,
        endereco: endereco,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        cep: cep,
        senha: senha,
        novidades: novidades

    };

    let clientes = JSON.parse(localStorage.getItem("clientes"));

    if (clientes == null) {

        clientes = [];

    }

    clientes.push(cliente);

    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );

    alert("Cadastro realizado com sucesso!");

    formulario.reset();

};

