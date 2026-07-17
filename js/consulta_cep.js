//PEGANDO ELEMENETO DO DOM
const inputCep = document.querySelector('#cep')

//CAPTURANDO O EVENTO change
inputCep.addEventListener('change', (evt) => {

    //PEGANDO OS NÚMEROS DOS INPUTCEP
    const numCep = evt.target.value.replace(/\D/g, "")

    //VERIFICA SE POSSUI 8 DIGITOS
    if (numCep.length !== 8) {
        alert("CEP INVALIDO")

        return
    }

    //CHAMA A FUNÇÃO consultaCEP
    consultaCEP(numCep)

})


//FUNÇÃO CONSULTA CEP VIACEP
const consultaCEP = async (cep) => {

    //TENTA CONECTAR A API
    try {
    
        //FAZ A COMUNICAÇÃO COM A API DO VIA CEP
        //AWAIT - GUARDA ATÉ OBTER UM PROMISSE
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

        //SE O STATUS DA RESPOSTA NÃO FOR OK. DISPARA UMA EXCESSÃO
        if (!resposta.ok) {
            throw new Error("ERRO NA REQUISIÇÃO")
        }

        //OBTEM OS DADOS DA API
        const dadosEndereco = await resposta.json()


        //VERIFICANDO SE OS DADOS SÃO VÁLIDOS
        if (dadosEndereco.erro) {
            alert("CEP NÃO LOCALIZADO")

            return
        }

        //CHAMA A FUNÇÃO carregaInput
        carregaInput(dadosEndereco)

    //CASO HAJA QUALQUER ERRO É DISPARADA UMA EXCEÇÃO
    } catch (erro) {
        console.log("ERRO", erro.message)
    }

}

//OBJETO LITERAL DOS  INPUTS
const campos = {
    logradouro:  document.querySelector ('#logradouro'),
    bairro: document.querySelector('#bairro'),
    localidade: document.querySelector('#localidade'),
    uf: document.querySelector('#uf')
}

//FUNÇÃO CARREGA INPUTS
const carregaInput = (objEndereco)=>{
    const divEndereco = document.querySelector('#div-dados-endereço')
    for(let campo in objEndereco){
        campos[campo].value = objEndereco[campo]
        campos[campo].value = objEndereco[campo]

    }

}

