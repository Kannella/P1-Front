class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano;
    this.mes = mes;
    this.dia = dia;
    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor;
  }

  validarDados() {
    for (let i in this) {
      if (this[i] == undefined || this[i] == "" || this[i] == null) {
        return false;
      }
    }
    return true;
  }
}

class Bd {
  constructor() {
    let id = localStorage.getItem("id");

    if (id === null) {
      localStorage.setItem("id", 0);
    }
  }

  getProximoId() {
    let proximoId = localStorage.getItem("id");
    return parseInt(proximoId) + 1;
  }

  gravar(d) {
    let id = this.getProximoId();

    localStorage.setItem(id, JSON.stringify(d));

    localStorage.setItem("id", id);
  }

  recuperarTodosRegistros() { 
    //recupera o valor associado à chave 'id' no local storage (banco de dados) no momento e atribui a uma variavel id

    let despesas = Array()

    let id = localStorage.getItem("id");

    // comeca com i = 1 (pois os registros iniciam em 1) e a cada loop ele checa se esse valor eh menor ou igual ao id que estamos recuperando, e a cada loop acrescentamos uma unidade a variavel i
    for (let i = 1; i <= id; i++) {
      // pega o valor associado ao indice i que esta no momento do loop
      let despesa = JSON.parse(localStorage.getItem(i)); // converti uma string json em um objeto literal

      //verifica se existe a possivilidade de haver indices que foram removidos
      //nesse caso nos vamos literalmente pular esses indices

      if(despesas === null) {
        continue //ele continua a iteracao e desconsidera tudo que tiver abaixo desse codigo, ou seja, ates que o push seja realizado, ou seja, antes de passar o objeto para o array, ou seja, nao vai passar o objeto se for null
      }


      despesa.id = i

      despesas.push(despesa) // passa o objjeto no momento da iteacao para o array despesa

    }

    return despesas // volta um array de objetos com todos os registros de despesas

    
  }

  pesquisar(despesa) {
    let despesasFiltradas = Array()
    despesasFiltradas = this.recuperarTodosRegistros() //this recupera algum atributo ou metodo do objeto atual. No caso recupera todos os dados em um formato de array
    console.log(despesasFiltradas);
    console.log(despesa);


    if(despesa.ano != '') {
      despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano);
    }

    if(despesa.ano != '') {
      despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes);
    }

    if(despesa.ano != '') {
      despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia);
    }

    if(despesa.ano != '') {
      despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo);
    }

    if(despesa.ano != '') {
      despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao);
    }

    if(despesa.ano != '') {
      despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor);
    }

    return despesasFiltradas
    
    
  }

  remover(id) {
    localStorage.removeItem(id)
  }

  
}

let bd = new Bd();

function cadastrarDespesa() {
  let ano = document.getElementById("ano");
  let mes = document.getElementById("mes");
  let dia = document.getElementById("dia");
  let tipo = document.getElementById("tipo");
  let descricao = document.getElementById("descricao");
  let valor = document.getElementById("valor");

  let despesa = new Despesa(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value
  );

  if (despesa.validarDados()) {
    bd.gravar(despesa);

    document.getElementById("modal_titulo").innerHTML =
      "Registro inserido com sucesso";
    document.getElementById("modal_titulo_div").className =
      "modal-header text-success";
    document.getElementById("modal_conteudo").innerHTML =
      "Despesa foi cadastrada com sucesso!";
    document.getElementById("modal_btn").innerHTML = "Voltar";
    document.getElementById("modal_btn").className = "btn btn-success";

    //dialog de sucesso
    $("#modalRegistraDespesa").modal("show");

    document.getElementById('ano').value = ''
    document.getElementById('mes').value = ''
    document.getElementById('dia').value = ''
    document.getElementById('tipo').value = ''
    document.getElementById('descricao').value = ''
    document.getElementById('valor').value = ''

  } else {
    document.getElementById("modal_titulo").innerHTML =
      "Erro na inclusão do registro";
    document.getElementById("modal_titulo_div").className =
      "modal-header text-danger";
    document.getElementById("modal_conteudo").innerHTML =
      "Erro na gravação, verifique se todos os campos foram preenchidos corretamente!";
    document.getElementById("modal_btn").innerHTML = "Voltar e corrigir";
    document.getElementById("modal_btn").className = "btn btn-danger";

    //dialog de erro
    $("#modalRegistraDespesa").modal("show");
  }

 
 
  

}

function carregaListaDespesas(despesas = Array(), filter = false) {

  if(despesas.length == 0 && filter == false) {
  despesas = bd.recuperarTodosRegistros() // array despesas recebe o array de objetos contendo todos os registros de despesas atraves do metodo recuperarTodosRegistros
  }

  var listaDespesas = document.getElementById('listaDespesas')
  listaDespesas.innerHTML = ''

  /*
  <tr>
      <td>15/02/2023</td>
      <td>Alimentacao</td>
      <td>Compras do mes</td>
      <td>1232,40</td>
  </tr>
  */

  //percorrer o array despesas, listando cada despesas de forma dinamica ->forEach
  //forEach: para cada uma das posicoes do array recupera o valor de cada, sendo que esse valor eh recuperado e colocado (no 'd') dentro de uma funcao que eh passada pro forEach
  despesas.forEach(function(d){

    //criando linha(tr) e atribuindo a vairavel linha
    let linha = listaDespesas.insertRow() 

    //criar as colunas (td) // innerHTML: representa o conteudo interno de uma tag, no caso o conteudo interno da td
    linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`//coluna 0

    //ajustar o tipo
    switch(parseInt(d.tipo)) { // sobrepoe o value em string (que transformamos para int) de cada tipo pela descricao mesmo
      case 1 : d.tipo = 'Alimentacao'
        break
      case 2 : d.tipo = 'Educacao'
        break
      case 3 : d.tipo = 'Lazer'
        break
      case 4 : d.tipo = 'Saude'
        break 
      case 5 : d.tipo = 'Transporte'
        break
    }

    linha.insertCell(1).innerHTML = d.tipo //1 coluna
    linha.insertCell(2).innerHTML = d.descricao//2 coluna
    linha.insertCell(3).innerHTML = d.valor//3 coluna

    //criar botao de exclusao
    let btn = document.createElement('button')
    btn.className = 'btn btn-danger'
    btn.innerHTML = '<i class = "fas fa-times"></i>'
    btn.id = `id_despesa_${d.id}`
    btn.onclick = function(){
      //remover despesa
      let id = this.id.replace('id_despesa_', '' )

      bd.remover(id)

      

      

      window.location.reload
      
    }
    linha.insertCell(4).append(btn) //4 coluna

  }) 


}


//atraves da funcao pesquisar despesas ja estamos recupernado os dados da view em app.js, montando um objeto despesa baseado nos dados da view em conjunto com a classe despesa (usando seus atributos e metodos) e na sequencia estamos encaminhando esse objeto despesa como parametro para o metodo pesquisar de bd (no banco de dados, no caso, o local storage)
  
function pesquisarDespesa() {
  //variaeveis com o value
  let ano = document.getElementById('ano').value
  let mes = document.getElementById('mes').value
  let dia = document.getElementById('dia').value
  let tipo = document.getElementById('tipo').value
  let descricao = document.getElementById('descricao').value
  let valor = document.getElementById('valor').value

  //colocando ja o value nos parametros do objeto
  let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

  let despesas = bd.pesquisar(despesa)

  carregaListaDespesas(despesas, true)




  



} 
