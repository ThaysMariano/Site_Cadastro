var users;
var pagamentos;
var pagamentosDeletados;

var i;
var j;

window.onload = function () {
    loadData();
}

function loadData() {

    users = localStorage.getItem('users');
    if (users == null) {
        let request = new XMLHttpRequest();
        request.open("GET", "/data/init.json", true);

        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let init = JSON.parse(request.responseText);
                
                localStorage.setItem('users', JSON.stringify(init.users));
            }
        }

        request.send();
    }

    users = JSON.parse(users);


    pagamentos = localStorage.getItem('pagamentos');

    if (pagamentos == null) {
        let request = new XMLHttpRequest();
        request.open("GET", "/data/pagamentosInit.json", true);

        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let pagamentosInit = JSON.parse(request.responseText);
                localStorage.setItem('pagamentos', JSON.stringify(pagamentosInit.pagamentos));
            }
        }

        request.send();
    }
    
    pagamentos = JSON.parse(pagamentos);

   
    pagamentosDeletados = localStorage.getItem('pagamentosDeletados');
    
    if (pagamentosDeletados != null) {
       
        pagamentosDeletados = JSON.parse(pagamentosDeletados);
    } else {
        pagamentosDeletados = [];
    }

    for (i = 0; i < users.length; i++) {
        document.getElementById("relatorio").textContent += "USUÁRIO";
        document.getElementById("relatorio").textContent += JSON.stringify(users[i], null, '\t');
        document.getElementById("relatorio").textContent += "PAGAMENTOS";
        for (j = 0; j < pagamentos.length; j++) {
            if (users[i].email == pagamentos[j].email) {
                document.getElementById("relatorio").textContent += JSON.stringify(pagamentos[j], null, '\t');
            }
        }
        for (let index = 0; index < pagamentosDeletados.length; index++) {
            if (users[i].email == pagamentosDeletados[index].email) {
                document.getElementById("relatorio").textContent += JSON.stringify(pagamentosDeletados[index], null, '\t');
            }
        }
    }
    
}