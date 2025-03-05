# Projeto 01 Bonfire.com
 - **Kauan Oliveira Freitas e Thays da Silva Mariano**

# Sobre a Página

## Dados dos usuários

Os dados que coletamos dos usuários são:

- Nome Completo
- Nome de Usuário
- Email (Chave Primária / ID)
- Telefone
- Plano Selecionado

Os dados registrados ao pagamento são:

- ID (formado por hora, minuto e segundo do momento da inserção do dado, e um valor aleatório entre 1000 e 9999)
- Email (Chave Estrangeira, usada para identificar de qual usuário é o pagamento)
- Valor
- Data

## Página Principal

### Planos
Na sessão dos Planos ocorre um efeito quando o mouse passa entre os planos disponíveis. Para o efeito ocorrer os blocos dos planos ficam por trás da Sessão Galeria que vêm abaixo, e quando o mouse passa pelos blocos uso:

```CSS
   transform: translateY(-30px);
```

### Galeria
Na Galeria ocorre um efeito quando o mouse passa pelas imagens parecido com o da sessão dos planos, com a diferença que quando o mouse passa por cima eu aumento o tamanho das imagens e adiciono um box shadow.

Quando o usuário clica em uma das imagens, a imagem aumenta e aparece uma pequena descrição e o nome do jogo que está na imagem. Para isso ocorrer, para cada imagem quando clicada, é chamada uma função que adiciona as propriedades da imagem selecionada. Para as descrições existe um Array que as contém na mesma ordem que aparece as imagens, o mesmo ocorre para os nomes.

Dependendo da seta clicada, o id da imagem aumenta ou diminui, fazendo com que atualize as informações.

### Contato
Na sessão de Contato o input que recebe o nome da pessoa, tem um efeito interessante, esse feito ocorre utilizando o input text e o deixando transparente, um span que possui a descrição do que deve ser escrito no botão, e um elemento genérico i, o qual é a linha que fica logo abaixo do input.

O efeito então quando clica no input, faz com que o span suba para a parte de cima do input, e o i que apenas era uma pequena linha, ela cresce e ocupa o espaço inteiro do input e quando o usuário digita dentro do input, continua essa estrutura.

## Página de Cadastro

### Planos
Ao acessar a página de cadastro por uma das opções da página principal um plano é marcado automaticamente de acordo com a opção selecioanda. Tal informação vem por meio do URL da página com a identificação "plano=[NomeDoPlano]".
```JS
function marcarPlanoNoCadastro() {
   //identifica qual parametro quero pegar
    function getParametro(nomePlano) {
        const urlParams = new URLSearchParams(window.location.search); 
        return urlParams.get(nomePlano); 
    }

    const planoSelecionado = getParametro("plano"); //salva por ex. Aventureiro 

   //dá o check
    if (planoSelecionado) {
        const radio = document.getElementById(`plano-${planoSelecionado}`);
        if (radio) {
            radio.checked = true;
        }
    }
}
```

### Informações do Usuário 
O campo de informações pessoais salva os dados, já listados anteriormente, do usuário, com conferência de senha. Após isso os novos dados são salvos no LocalStorage.

```JS
//Mostrar na tela mensagem de enviado com sucesso
btn.addEventListener("click", (event) => {
    event.preventDefault();
    if (confirmacaoSenhaUsuario() === true) {
        if (definirPlanoSelecionado() !== null) {
            console.log("plano selecionado corretamente")
            alert(nomeUsuario.value + ', seu cadastro foi feito com sucesso')
            //mostrar dados no console
            verificarTestesConsoleLog();

            salvarDadosLocalStorage();
        } else {
            alert("Nenhum plano selecionado")
        }
    } else {
        console.log("senhas incorretas")
    }
});
```



## Página do Admin

### Tabela

A tabela é gerada pelo JavaScript, que pega as informações do LocalStorage e utilizando um for eu pego cada uma das informações dos usuários e construo a tabela.

```JS
   document.getElementById("tab").innerHTML = "";

   document.getElementById("tab").innerHTML = "<thead><th>Nome Completo</th><th>Nome Usuário</th><th>Plano</th><th>Telefone</th><th>Email</th><th>Editar</th><th>Excluir</th></thead>";

   for (let index = 0; index < users.length; index++) {
      document.getElementById("tab").innerHTML += "<tr><td>" + users[index].nomeCompleto + "</td> <td>" + users[index].nomeUsuario + "</td>" + 
      "<td>" + users[index].planoSelecionado + "<td>" + users[index].telefone +"</td>"+ "<td>" + users[index].email +"</td>"+ "<td> <a href='/editar.html?plano="+ 
      users[index].planoSelecionado +"&nome="+ users[index].nomeCompleto +"&usuario="+users[index].nomeUsuario+"&telefone="+ users[index].telefone +"&email="+ 
      users[index].email +"'><button> Editar </button></a> </td>"+ "<td> <button onclick='deletar(" + index + ")'> Excluir </button> </td>"+ "</tr>";
   }  
```

### Apagando usuário

Quando um usuário é apagado eu removo a linha onde ele está usando a posição dele no Array.

```JS
   users.splice(index, 1);
   localStorage.setItem('users', JSON.stringify(users));

   loadData(); // Atualiza a tabela
```

### Editar Usuário
Ao entrar na página de edição de usuário todos os dados (menos a senha) do usuário selecionado são enviados por meio da URL. Esses aparecem nos seus respectivos inputs sendo o email bloqueado para alterações já que é nosso ID. Qualquer alteração feita é salva posteriormente sobre os dados do usuário.
```JS
        // colocar cada dado no seu input
        nomeUsuario.value = urlParams.get('nome');
        telefoneUsuario.value = urlParams.get('telefone');
        emailUsuario.value = urlParams.get('email');
        email = urlParams.get('email');
        nickUsuario.value = urlParams.get('usuario');
```

### Buscando um Usuário
Para buscar um usuário na tabela utilizamos como base a função **startsWith()** juntamente com o **toLowerCase()**. É possível encontrar o usuário por qualquer uma das informações cadastradas (menos a senha, claro). O for percorre todo o array de usuários procurando os dados referente ao user requisitado.

Para exibir os usuários encontrados utilizamos o JavaScript, buscando os resultados ao clicar no botão de pesquisa. Ao pressionar o botão de fechar, a tabela original é reescrita e o search.value é definido como nulo.

````JS
function pesquisarUser(){
    
    document.getElementById("tab").innerHTML = "";

    document.getElementById("tab").innerHTML = "<thead><th>Nome Completo</th><th>Nome Usuário</th><th>Plano</th><th>Telefone</th><th>Email</th><th>Editar</th><th>Excluir</th></thead>";

    for(let i =0; i<users.length; i++){
        if((users[i].nomeCompleto.toLowerCase().startsWith(search.value.toLowerCase()))||(users[i].nomeUsuario.toLowerCase().startsWith(search.value.toLowerCase()))||(users[i].email.toLowerCase().startsWith(search.value.toLowerCase()))||(users[i].telefone.toLowerCase().startsWith(search.value.toLowerCase()))||(users[i].planoSelecionado.toLowerCase().startsWith(search.value.toLowerCase()))){
            document.getElementById("tab").innerHTML += "<tr><td>" + users[i].nomeCompleto + "</td> <td>" + users[i].nomeUsuario + "</td>" + 
            "<td>" + users[i].planoSelecionado + "<td>" + users[i].telefone +"</td>"+ "<td>" + users[i].email +"</td>"+ "<td> <a href='/editar.html?plano="+ 
            users[i].planoSelecionado +"&nome="+ users[i].nomeCompleto +"&usuario="+users[i].nomeUsuario+"&telefone="+ users[i].telefone +"&email="+ 
            users[i].email +"'><button> Editar </button></a> </td>"+ "<td> <button onclick='deletar(" + i + ")'> Excluir </button> </td>"+ "</tr>";
        }
    }
}
````

````JS
//limpar o value do input de pesquisa
limparPsq.addEventListener("click", (event)=>{
  loadData();
  search.value=null;
})
````


## Página de Pagamentos 

### Tabela

A tabela é exatamente igual ao da página de usuário, só se difere nos dados.

```JS
   document.getElementById("tab").innerHTML = "";

   document.getElementById("tab").innerHTML = "<thead><th>ID</th><th>Email</th><th>Valor</th><th>Data</th><th>Excluir</th>";

   for (let index = 0; index < pagamentos.length; index++) {
      document.getElementById("tab").innerHTML += "<tr><td>" + pagamentos[index].id + "</td> <td>" + pagamentos[index].email + "</td>" + 
      "<td>" + "R$" + pagamentos[index].valor + "<td>" + pagamentos[index].data + "</td> <td> <button onclick='deletar(" + index + ")'> Excluir </button> </td> </tr>";
   }  
```

### Apagando pagamento

O pagamento é deletado do Array de pagamentos e adicionado no Array de pagamentos deletados.

```JS
   pagamentosDeletados.push(pagamentos[index]);
   localStorage.setItem('pagamentosDeletados', JSON.stringify(pagamentosDeletados));

   pagamentos.splice(index, 1);
   localStorage.setItem('pagamentos', JSON.stringify(pagamentos));

   loadData(); // Atualiza a tabela
```

### Buscando um Pagamento
Segue e mesma lógica de buscar um usuário, diferindo apenas pelos itens utilizados para pesquisa. Segue a mesma lógica para criação de tabelas.
````JS
function pesquisarUser(){
    
    document.getElementById("tab").innerHTML = "";

    document.getElementById("tab").innerHTML = "<thead><th>Id</th><th>Email</th><th>Valor</th><th>Data</th><th>Editar</th></thead>";

    for(let i =0; i<pagamentos.length; i++){
        if((pagamentos[i].id.toLowerCase().startsWith(search.value.toLowerCase()))||(pagamentos[i].email.toLowerCase().startsWith(search.value.toLowerCase()))||(pagamentos[i].valor.toLowerCase().startsWith(search.value.toLowerCase()))||(pagamentos[i].data.toLowerCase().startsWith(search.value.toLowerCase()))){
            document.getElementById("tab").innerHTML += "<tr><td>" + pagamentos[i].id + "</td> <td>" + pagamentos[i].email + "</td>" + 
            "<td> R$" + pagamentos[i].valor + "<td>" + pagamentos[i].data +" </td>"+ "<td> <button onclick='deletar(" + i + ")'> Excluir </button> </td>"+ "</tr>";
        }
    }
}
````


## Página de Edição de Membros


### Atualizando os dados

Quando o usuário clica no botão, o sistema procura no LocalStorage uma linha que tenha o email igual ao do usuário cadastrado. Quando o encontra atualiza seus dados.

Se o usuário trocar o plano anteriormente cadastrado é criado outro pagamento.

Caso algum problema ocorra, aparece um alert escrito "Não foi possível editar".

```JS
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
```

## Página de Relatórios

Na página de relatório eu percorro meus Array do LocalStorage, e coloco em forma de texto no textarea, onde para cada usuário é verificado se nos Pagamentos ou Pagamentos Deletados possui algum pagamento que possui seu email, se possuir, eles são escritos logo abaixo dos dados do usuário.

```JS
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
```

# Requisitos

> TODOS OS REQUISITOS FORAM ENTREGUES

### 1. Requisitos Funcionais
   - RF1 Gerenciar membros da instituição
      - RF1.1 Cadastrar membros: O usuário deve poder cadastrar membros da instituição, fornecendo nome e outras informações relevantes para a instituição. O sistema deve gerar um ID único para cada membro cadastrado;
      - RF1.2 Excluir membros: O usuário deve poder excluir membros da instituição selecionando o membro a ser excluído a partir de uma lista de membros cadastrados;
      - RF1.3 Editar membros: O usuário deve poder editar as informaçõoes de um membro da instituição selecionando o membro a ser editado a partir de uma lista de membros cadastrados;
      - RF1.4 Buscar membros: O usuário deve poder buscar por membros a partir de seu nome (completo ou parcial), ID ou alguma das informaçõoes cadastradas. Todas as correspondẽncias encontradas devem ser exibidas na tela.
   - RF2 Gerenciar pagamentos dos membros
      - RF2.1 Registrar pagamentos: O usuário deve poder registrar os pagamentos realizados pelos membros da instituição. Deve ser registrado o valor pago e a data do pagamento. O sistema deve gerar um ID único para cada pagamento registrado. Todos os pagamentos devem estar associados a um membro;
      - RF2.2 Excluir pagamentos: O usuário deve poder excluir pagamentos registrados selecionando o pagamento a ser excluído a partir de uma lista de pagamentos registrados. Pagamentos excluídos devem deixar de ser exibidos em tela, mas não podem ser removidos do sistema;
      - RF2.3 Buscar pagamentos: O usuário deve poder buscar por pagamentos a partir de seu ID, valor, data ou membro associado. Todas as correspondências encontradas devem ser exibidas na tela.
   - RF3 Emitir relatórios
      - RF3.1 Relatório de membros: O usuário deve poder emitir um relatório com a lista de membros cadastrados na instituição, contendo as informações de cada membro;
      - RF3.2 Relatório de pagamentos: O usuário deve poder emitir um relatório com a lista de pagamentos registrados na instituição, contendo as informações de cada pagamento.
   - RF4 Divulgar as atividades da instituição
      - RF4.1 Galeria de imagens: A aplicação deve conter uma galeria de imagens com fotos das atividades realizadas pela instituição;
      - RF4.2 Descrição das atividades: A aplicação deve apresentar uma descrição das atividades realizadas pela instituição;
      - RF4.3 Contato: A aplicação deve conter informações de contato da instituição, como endereço, telefone e e-mail. Além disso, deve conter um formulário para facilitar o contato dos interessados.
### 1. Requisitos Não Funcionais
   - RNF1 O sistema deve ser desenvolvido utilizando HTML, CSS e JavaScript; Nenhuma biblioteca ou framework externo deve ser utilizado. Recursos externos, como fontes e imagens, podem ser utilizados;
   - RNF2 O sistema deve ser responsivo e se adaptar a pelo menos três tamanhos de tela (desktop, tablet e smartphone);
   - RNF3 O sistema deve conter pelo menos três páginas (documentos HTML separados);
   - RNF4 Todos os elementos HTML devem possuir semântica adequada. Caso precise utilizar elementos genéricos, a semãntica deve ser atribuída por meio dos atribuitos id e class;
   - RNF5 Os dados dos membros e pagamentos devem ser armazenados localmente, em um arquivo JSON e/ou localStorage;
   - RNF6 O código deve estar bem organizado e separado em arquivos diferentes (HTML, CSS e JS), de acordo com a responsabilidade de cada um;
   - RNF7 O código deve estar validado de acordo com os padrões W3C para HTML e CSS.
