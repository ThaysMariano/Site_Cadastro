// Variaveis 

const reescreverSenha = document.querySelector('.reescreverSenha')
var users;
var pagamentos;

//forms
const form = document.querySelector('#form');
const btn = document.querySelector('#botao-enviar')

//Dados pessoais
const nomeUsuario = document.querySelector('#nome')
const senhaUsuario = document.querySelector('#senha')
const confirmarSenhaUsuario = document.querySelector('#confirmarsenha')
const telefoneUsuario = document.querySelector('#telefone')
const emailUsuario = document.querySelector('#email')
const nickUsuario = document.querySelector("#usuario")

//planos
const planos = document.getElementsByName("plano");

//-----------------------------------------------------



//Testes no console
function verificarTestesConsoleLog() {
    console.log(nomeUsuario.value, senhaUsuario.value, confirmarSenhaUsuario.value, emailUsuario.value, telefoneUsuario.value, nickUsuario.value)
    definirPlanoSelecionado();
}



//pegar o plano selecionado originalmente na pg inicial 
function marcarPlanoNoCadastro() {
    function getParametro(nomePlano) {
        const urlParams = new URLSearchParams(window.location.search); //depois do ?
        return urlParams.get(nomePlano); //retorna o nome(value) do plano
    }

    const planoSelecionado = getParametro("plano"); //salva por ex. Aventureiro 

    if (planoSelecionado) {
        const radio = document.getElementById(`plano-${planoSelecionado}`);
        if (radio) {
            radio.checked = true;
        }
    }
}



//Pegar a informação de qual plano foi selecionado
function definirPlanoSelecionado() {
    for (let i = 0; i < planos.length; i++) {
        if (planos[i].checked) {
            return planos[i].value;
        }
    }
    return null;
}

function definirValor() {
    let plano = definirPlanoSelecionado();

    if (plano == "Explorador") {
        return "14.99";
    } else if (plano == "Aventureiro") {
        return "24.99";
    } else if (plano == "Lendário") {
        return "29,99";
    }
    return null;
}

//Verificar se Senha e ConfirmarSenha sao iguais
function confirmacaoSenhaUsuario() {
    if (senhaUsuario.value !== confirmarSenhaUsuario.value) {
        console.log('senhas diferentes');
        reescreverSenha.classList.add("block")
        return false
    } else {
        console.log('ok')
        reescreverSenha.classList.remove("block")
        return true
    }
}

//salvar dados no LocalStorage
function salvarDadosLocalStorage() {
    users = JSON.parse(localStorage.getItem('users'));

    let usuario = {
        nomeCompleto: nomeUsuario.value,
        email: emailUsuario.value,
        telefone: telefoneUsuario.value,
        nomeUsuario: nickUsuario.value,
        planoSelecionado: definirPlanoSelecionado(),
    }
    users.push(usuario);
    localStorage.setItem('users', JSON.stringify(users));

    pagamentos = JSON.parse(localStorage.getItem('pagamentos'));

    let dataAtual = new Date(Date.now());
    let data = dataAtual.getDate() + "/" + (dataAtual.getMonth() + 1) + "/" + dataAtual.getFullYear();

    let pagamento = {
        id: gerarId(),
        email: emailUsuario.value,
        valor: definirValor(),
        data: data
    }

    pagamentos.push(pagamento);
    localStorage.setItem('pagamentos', JSON.stringify(pagamentos));
}

//Marcar o plano selecionado ao entrar
marcarPlanoNoCadastro();

//Mostrar na tela mensagem de enviado com sucesso
btn.addEventListener("click", (event) => {
    event.preventDefault();

    if (confirmacaoSenhaUsuario() === true) {
        if (definirPlanoSelecionado() !== null) {
            console.log("plano selecionado corretamente")
            alert(nomeUsuario.value + ', seu cadastro foi feito com sucesso')
            //teste pegar dados inseridos
            verificarTestesConsoleLog();
            salvarDadosLocalStorage();
        } else {
            alert("Nenhum plano selecionado")
        }
    } else {
        console.log("senhas incorretas")
    }
});

function gerarId() {
    let dataAtual = new Date(Date.now());
    let id = dataAtual.getHours() + "" + dataAtual.getMinutes() + "" + dataAtual.getSeconds() + "" + getRandom(1000, 9999);

    return id;
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}












