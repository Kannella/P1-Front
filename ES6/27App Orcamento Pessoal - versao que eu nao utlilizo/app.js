class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
}

function cadastrarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    gravar(despesa) // Chamei uma nova funcao chamada gravar e que recebe o objeto despesa como parametro

}

// criando a funcao gravar
function gravar(d) { // FUNCAO GRAVAR RECEBENDO UM OBJETO DENTRO DA FUNCAO E PRECISAMOS TRANSFORMAR ESSE OBJETO LITERAL EM UMA NOTACAO JSON -> COMO? Utilizando o objeto JSON, nativo do js. a PARTIR DELE PODEMOS EXECUTAR O METODO stringfy passando por parametro o objeto literal que queremos converter para uma notacao JSON.

    //acessa o recurso de localstorage e retorna um objeto de manipulacao do localStorage e assim temos acesso a alguns metodos, no caso acessamos o metodo setItem, que permite passar 2 parametros(identificacao do objeto que vamos armazenar dentro de localStorage, item que queremos armazenar [sendo que esse dado precisa ser encaminhado atraves de uma notacao JSON, e por isso vamos ter que converter nosso objeto literal em uma notacao JSON] )
    localStorage.setItem('despesa', JSON.stringify(d))
}





// Criando um objeto com base na nossa classe, utilizando os parametros acima
// Criei uma variavel chamada despesa e atribui a instancia do objeto Despesa.
// Instanciei um objeto com base na classe Despesa
// Essa classe despesa recebe os parametros que eu atribui na instancia do objeto despesa
// Atribui os parametros da classe aos atributos do nosso objeto Despesa