var pagamentos;
var pagamentosDeletados;

window.onload = function () {
    loadData();
}

function loadData() {

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

    document.getElementById("tab").innerHTML = "";

    document.getElementById("tab").innerHTML = "<thead><th>ID</th><th>Email</th><th>Valor</th><th>Data</th><th>Excluir</th>";

    for (let index = 0; index < pagamentos.length; index++) {
        document.getElementById("tab").innerHTML += "<tr><td>" + pagamentos[index].id + "</td> <td>" + pagamentos[index].email + "</td>" +
            "<td>" + "R$" + pagamentos[index].valor + "<td>" + pagamentos[index].data + "</td> <td> <button onclick='deletar(" + index + ")'> Excluir </button> </td> </tr>";
    }

    pagamentosDeletados = localStorage.getItem('pagamentosDeletados');
    pagamentosDeletados = JSON.parse(pagamentosDeletados);

    if (pagamentosDeletados == null) {
        pagamentosDeletados = [];
    }
}

function deletar(index) {
    pagamentosDeletados.push(pagamentos[index]);
    localStorage.setItem('pagamentosDeletados', JSON.stringify(pagamentosDeletados));

    pagamentos.splice(index, 1);
    localStorage.setItem('pagamentos', JSON.stringify(pagamentos));

    loadData();
}

//variavies 
btn = document.querySelector('#pesquisarUser')
search = document.querySelector('#searchId')
limparPsq = document.querySelector("#limparPesquisa")

//funcao procurar os pagamentos
function pesquisarUser() {

    document.getElementById("tab").innerHTML = "";

    document.getElementById("tab").innerHTML = "<thead><th>Id</th><th>Email</th><th>Valor</th><th>Data</th><th>Editar</th></thead>";

    for (let i = 0; i < pagamentos.length; i++) {
        if ((pagamentos[i].id.toLowerCase().startsWith(search.value.toLowerCase())) || (pagamentos[i].email.toLowerCase().startsWith(search.value.toLowerCase())) || (pagamentos[i].valor.toLowerCase().startsWith(search.value.toLowerCase())) || (pagamentos[i].data.toLowerCase().startsWith(search.value.toLowerCase()))) {
            document.getElementById("tab").innerHTML += "<tr><td>" + pagamentos[i].id + "</td> <td>" + pagamentos[i].email + "</td>" +
                "<td> R$" + pagamentos[i].valor + "<td>" + pagamentos[i].data + " </td>" + "<td> <button onclick='deletar(" + i + ")'> Excluir </button> </td>" + "</tr>";
        }
    }

}

//botão para enviar a pesquisa
btn.addEventListener("click", (event) => {
    event.preventDefault();
    pesquisarUser();
})

//botão para limpar a pesqusia
limparPsq.addEventListener("click", (event) => {
    loadData();
    search.value = null;

})
