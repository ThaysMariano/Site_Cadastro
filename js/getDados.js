var users;

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

    document.getElementById("tab").innerHTML = "";

    document.getElementById("tab").innerHTML = "<thead><th>Nome Completo</th><th>Nome Usuário</th><th>Plano</th><th>Telefone</th><th>Email</th><th>Editar</th><th>Excluir</th></thead>";

    for (let index = 0; index < users.length; index++) {
        document.getElementById("tab").innerHTML += "<tr><td>" + users[index].nomeCompleto + "</td> <td>" + users[index].nomeUsuario + "</td>" +
            "<td>" + users[index].planoSelecionado + "<td>" + users[index].telefone + "</td>" + "<td>" + users[index].email + "</td>" + "<td> <a href='/editar.html?plano=" +
            users[index].planoSelecionado + "&nome=" + users[index].nomeCompleto + "&usuario=" + users[index].nomeUsuario + "&telefone=" + users[index].telefone + "&email=" +
            users[index].email + "'><button> Editar </button></a> </td>" + "<td> <button onclick='deletar(" + index + ")'> Excluir </button> </td>" + "</tr>";
    }

}

//Pesquisar user variáveis
btn = document.querySelector('#pesquisarUser')
search = document.querySelector('#searchId')
limparPsq = document.querySelector("#limparPesquisa")

//funcao procurar o user pelos dados
function pesquisarUser() {

    document.getElementById("tab").innerHTML = "";

    document.getElementById("tab").innerHTML = "<thead><th>Nome Completo</th><th>Nome Usuário</th><th>Plano</th><th>Telefone</th><th>Email</th><th>Editar</th><th>Excluir</th></thead>";

    for (let i = 0; i < users.length; i++) {
        if ((users[i].nomeCompleto.toLowerCase().startsWith(search.value.toLowerCase())) || (users[i].nomeUsuario.toLowerCase().startsWith(search.value.toLowerCase())) || (users[i].email.toLowerCase().startsWith(search.value.toLowerCase())) || (users[i].telefone.toLowerCase().startsWith(search.value.toLowerCase())) || (users[i].planoSelecionado.toLowerCase().startsWith(search.value.toLowerCase()))) {
            document.getElementById("tab").innerHTML += "<tr><td>" + users[i].nomeCompleto + "</td> <td>" + users[i].nomeUsuario + "</td>" +
                "<td>" + users[i].planoSelecionado + "<td>" + users[i].telefone + "</td>" + "<td>" + users[i].email + "</td>" + "<td> <a href='/editar.html?plano=" +
                users[i].planoSelecionado + "&nome=" + users[i].nomeCompleto + "&usuario=" + users[i].nomeUsuario + "&telefone=" + users[i].telefone + "&email=" +
                users[i].email + "'><button> Editar </button></a> </td>" + "<td> <button onclick='deletar(" + i + ")'> Excluir </button> </td>" + "</tr>";
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








function deletar(index) {
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));

    loadData();
}