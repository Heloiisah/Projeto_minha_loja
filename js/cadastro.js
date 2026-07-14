// FORMULÁRIO
const formulario = document.querySelector("#frm-pessoa");

// CAMPOS
const campoCpf = document.querySelector("#cpf");
const campoTelefone = document.querySelector("#telefone");
const campoCep = document.querySelector("#cep");

// MÁSCARA DO CPF
campoCpf.addEventListener("input", function(){

    let valor = campoCpf.value;

    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    campoCpf.value = valor;

});

// MÁSCARA DO TELEFONE
campoTelefone.addEventListener("input", function(){

    let valor = campoTelefone.value;

    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/(\d{2})(\d)/, "($1) $2");
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

    campoTelefone.value = valor;

});

// MÁSCARA DO CEP
campoCep.addEventListener("input", function(){

    let valor = campoCep.value;

    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

    campoCep.value = valor;

});

// CADASTRO
formulario.addEventListener("submit", function(e){

    e.preventDefault();

    const nome = document.querySelector("#nome").value.trim();
    const cpf = document.querySelector("#cpf").value.trim();
    const data = document.querySelector("#data").value;
    const telefone = document.querySelector("#telefone").value.trim();
    const email = document.querySelector("#email").value.trim();
    const endereco = document.querySelector("#endereco").value.trim();
    const bairro = document.querySelector("#bairro").value.trim();
    const cidade = document.querySelector("#cidade").value.trim();
    const estado = document.querySelector("#estado").value;
    const cep = document.querySelector("#cep").value.trim();
    const senha = document.querySelector("#senha").value;
    const confirmar = document.querySelector("#confirmar").value;
    const novidades = document.querySelector("#novidades").checked;

    if(
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
    ){
        alert("Preencha todos os campos.");
        return;
    }

    if(senha != confirmar){
        alert("As senhas não coincidem.");
        return;
    }

    const cliente = {
        nome,
        cpf,
        data,
        telefone,
        email,
        endereco,
        bairro,
        cidade,
        estado,
        cep,
        senha,
        novidades
    };

    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    clientes.push(cliente);

    localStorage.setItem("clientes", JSON.stringify(clientes));

    alert("Cadastro realizado com sucesso!");

    formulario.reset();

});