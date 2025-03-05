var users;
var pagamentos;

window.onload = function () {
    loadUsers();
}

function loadUsers() {
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
    } else {
        users = JSON.parse(users);
    }

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
    } else {
        pagamentos = JSON.parse(pagamentos);
    }
}