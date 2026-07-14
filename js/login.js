// Aguarda carregar toda a página
document.addEventListener("DOMContentLoaded", function () {

    // Pega o formulário
    const formulario = document.getElementById("frm-pessoa");

    // Evento de login
    formulario.addEventListener("submit", function(event){

        // Impede o envio do formulário
        event.preventDefault();

        // Dados digitados
        let email = document.getElementById("email").value;
        let senha = document.getElementById("senha").value;

        // Recupera os clientes cadastrados
        let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

        let usuarioEncontrado = false;
        let nomeUsuario = "";

        // Procura o usuário
        for(let i = 0; i < clientes.length; i++){

            if(clientes[i].email == email &&
               clientes[i].senha == senha){

                usuarioEncontrado = true;
                nomeUsuario = clientes[i].nome;
                break;

            }

        }

        if(usuarioEncontrado){

            alert("Login realizado com sucesso!");

            sessionStorage.setItem("usuarioLogado", nomeUsuario);

            window.location.href = "../index.html";

        }else{

            alert("E-mail ou senha incorretos!");

        }

    });

});