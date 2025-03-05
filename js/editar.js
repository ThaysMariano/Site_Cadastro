
// Carregar a página antes do js para pegar os dados
document.addEventListener("DOMContentLoaded", function () {

    //pegar os users do banco de dados
    var users = JSON.parse(localStorage.getItem('users'));
    var pagamentos = JSON.parse(localStorage.getItem('pagamentos'));
    var email;

    // dados do html
    const nomeUsuario = document.querySelector('#nome');
    const telefoneUsuario = document.querySelector('#telefone');
    const emailUsuario = document.querySelector('#email');
    const nickUsuario = document.querySelector('#usuario');
    const btn = document.querySelector('#botao-enviar');
    const planos = document.getElementsByName("plano");


    // Colocar os dados do URL nos inputs
    function colocarDadosURL() {
        //acessar a url
        const urlParams = new URLSearchParams(window.location.search);

        // colocar cada dado no seu input
        nomeUsuario.value = urlParams.get('nome');
        telefoneUsuario.value = urlParams.get('telefone');
        emailUsuario.value = urlParams.get('email');
        email = urlParams.get('email');
        nickUsuario.value = urlParams.get('usuario');


        //marcar o plano salvo de acordo com  o url
        const planoSelecionado = urlParams.get('plano');
        planos.forEach(radio => {
            if (radio.value === planoSelecionado) {
                radio.checked = true;
            }
        });

    }
    colocarDadosURL();

    //quando aperta o botão de envio reenvia os dados para o index do usuario correspondente para atualizar os dados
    btn.addEventListener("click", (event) => {
        let editou = false;
        event.preventDefault();
        for (let index = 0; index < users.length; index++) {
            if (users[index].email == email) {
                if (users[index].planoSelecionado != definirPlanoSelecionado()) {
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
                users[index].nomeCompleto = nomeUsuario.value;
                users[index].nomeUsuario = nickUsuario.value;
                users[index].telefone = telefoneUsuario.value;
                users[index].planoSelecionado = definirPlanoSelecionado();
                localStorage.setItem('users', JSON.stringify(users));
                editou = true;
                alert("Edição efetivada!");
            }
        }
        if (!editou) {
            alert("Não foi possível editar");
        }
    });

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

    function gerarId() {
        let dataAtual = new Date(Date.now());
        let id = dataAtual.getHours() + "" + dataAtual.getMinutes() + "" + dataAtual.getSeconds() + "" + getRandom(1000, 9999);

        return id;
    }

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
});
