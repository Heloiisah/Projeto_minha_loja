// Aguarda carregar toda a página
document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("frm-pessoa");

    formulario.addEventListener("submit", function(e){

        e.preventDefault();

        // Campos
        const nome = document.getElementById("nome").value.trim();
        const cpf = document.getElementById("cpf").value.trim();
        const data = document.getElementById("data").value;
        const telefone = document.getElementById("telefone").value.trim();
        const email = document.getElementById("email").value.trim();
        const endereco = document.getElementById("endereco").value.trim();
        const bairro = document.getElementById("bairro").value.trim();
        const cidade = document.getElementById("cidade").value.trim();
        const estado = document.getElementById("estado").value;
        const cep = document.getElementById("cep").value.trim();
        const senha = document.getElementById("senha").value;
        const confirmar = document.getElementById("confirmar").value;
        const novidades = document.getElementById("novidades").checked;

        // Validação dos campos
        if(
            nome === "" ||
            cpf === "" ||
            data === "" ||
            telefone === "" ||
            email === "" ||
            endereco === "" ||
            bairro === "" ||
            cidade === "" ||
            estado === "" ||
            senha === "" ||
            confirmar === ""
        ){
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        // CPF
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

        if(!cpfRegex.test(cpf)){
            alert("CPF inválido.\nUse o formato 000.000.000-00");
            return;
        }

        // Telefone
        const telRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;

        if(!telRegex.test(telefone)){
            alert("Telefone inválido.\nUse o formato (79) 99999-9999");
            return;
        }

        // CEP
        if(cep !== ""){

            const cepRegex = /^\d{5}-\d{3}$/;

            if(!cepRegex.test(cep)){
                alert("CEP inválido.");
                return;
            }

        }

        // Senhas
        if(senha !== confirmar){
            alert("As senhas não coincidem.");
            return;
        }

        // Objeto do cliente
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

        // Recupera lista
        let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

        clientes.push(cliente);

        localStorage.setItem("clientes", JSON.stringify(clientes));

        alert("Cadastro realizado com sucesso!");

        formulario.reset();

    });

});