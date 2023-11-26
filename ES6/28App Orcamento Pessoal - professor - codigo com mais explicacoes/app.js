class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano
    this.mes = mes
    this.dia = dia
    this.tipo = tipo
    this.descricao = descricao
    this.valor = valor
  }

  validarDados() {
    // for in permite, tambem, percorrer as chaves (nomes dos atributos) de um objeto.
    // percorre cada um dos atributos contidos dentro do objeto despesa, a partir da execucao do metodo validadarDados
    // i retorna os atributos de um determinado objeto, no caso o objeto atual despesa
    // for(let i in this) -> """para cada aributo i no objeto atual sendo iterado""" 
    // this se refere ao objeto atual (baseado em uma classe, no caso) em que o loop for...in está sendo executado. O loop irá percorrer todos os atributos deste objeto e i representara o NOME de cada atributo que esta sendo iterado.
    // i representa o nome do atributo atual que esta sendo iterado.
//-------------------------------------------------------------------------------
    //console.log(i) //imprime o nome do atributo no console a cada iteração.
//-------------------------------------------------------------------------------
    //console.log(i, this[i]) //(nome do atributo, valor do atributo do objeto)
    //this[i] -> eh equivalente acessar o valor do atributo do objeto usando o ponto -> this.ano por exemplo
//-------------------------------------------------------------------------------
    for(let i in this) {
      if (this[i] == undefined || this[i] == '' || this[i] == null) {
        false
      }
    }
    return true
  }
}
// A classe Bd é criada para lidar com operações de armazenamento e recuperação de despesas usando o localStorage. O localStorage é um mecanismo de armazenamento local no navegador que permite armazenar dados como pares chave-valor.
class Bd { 

  constructor(){
    // tenta obter o valor associado à chave 'id' no localStorage usando localStorage.getItem('id')
    let id = localStorage.getItem('id') //recupera o valor associado à chave 'id' no local storage e aramzena na variavel id


    //Se o valor associado à chave 'id' não existir (ou seja, for null), ele cria a chave id e define o valor dessa chave 'id' como 0 usando localStorage.setItem('id', 0).
    // se a inform nao existir o retorno sera null, se for null, setamos o id inicial como 0
    if (id === null) { 
      localStorage.setItem('id', 0)
    }
    //Portanto, essa é a parte do código que define o valor inicial de 0 para a chave 'id' no localStorage. A verificação if (id === null) verifica se a chave 'id' já existe no localStorage; se não existir, o código cria essa chave e a define como 0. Caso contrário, se já existir um valor associado à chave 'id', ele não o altera.

    //A verificação if (id === null) é uma maneira de garantir que a chave 'id' esteja presente no localStorage, mesmo quando o código é executado pela primeira vez ou após a exclusão do valor associado a essa chave. Se a chave já existe, o código não faz nada com ela, evitando sobrescrever um valor que já está definido. Caso contrário, ele inicializa a chave 'id' com o valor 0.
  }

  getProximoId() { //metodo que verifica se ja existe um id armazenado em localStorage
    // atribui na variavel proximoId o metodo getItem do recurso de localstorage (getItem: serve para recuperar um valor dentro de localStorage, no caso recupera o valor de 'id')
    //so que nao temos nenhum valor cadastrado em localStorage que possui id como chave. Entao o retorno seria Null. Entao, criamos uma logica para que toda vez que se inform nao existir e o retorno for null, setaremos o valor da chave id inicial como 0. E dessa forma, ao clicar em gravar o retorno nao ser null mais pois agora temos um valor existente no localStorage, mesmo que 0, que sera recuperado a partir da chave id la no localStorage. Agora quando ele for recuperar o valor de id no localStorage, na primeira vez, vai retonar como 0 pois na primeira vez a informacao nao existe (null).
    //    let proximoId = localStorage.getItem('id') 
    //    console.log(proximoId) -> recuperaria 0 e mostraria 0 no console
    
    //como queremos o proximo id, somaremos o valor 1
    let proximoId = localStorage.getItem('id') //obtem o valor atual de 'id' no localStorage
    return parseInt(proximoId) + 1 
    // Apos obter o valor do id atual, converte-o em um número inteiro e incrementa 1, retornando o próximo ID disponível.
    //sempre quando houver a tentativa de gravacao o valor 1 sera retornado. Pois apos a gravacao, precisamos atualizar o valor contido nesse indice

  }
  
  gravar(d) { //metodo do objeto bd

    

    let id = this.getProximoId() 
    //Ele chama o método getProximoId para obter o próximo ID disponível. Caso nao tenha, ele cria no local storage uma chave id e atribui o valor 0 a ela 
    // sempre que o metodo gravar for executado, vamos pegar o proximo id (getProximoId) e vamos atualizar o documento de chave id com o valor de id recuperado

    localStorage.setItem(id, JSON.stringify(d))
    //Armazena a despesa (d) - nosso objeto - no localStorage, usando o id atual como chave e usando como valor a converso do objeto despesa recebido como parametro em uma string JSON.

    localStorage.setItem('id', id) 
    //Atualiza o valor de 'id' no localStorage para refletir o novo ID disponível.

    

  }
}

let bd = new Bd

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

  if(despesa.validarDados()) {
    //bd.gravar(despesa) // Chamei o metodo do objeto gravar passando o objeto despesa como parametro
    console.log('Dados validos')
    //dialog de sucesso
  } else {
    // selecionar a div que contem o nosso modal e vamos exibir esse modal pro usuario.
      $('#erroGravacao').modal('show')
  }
  
  
}


// criando a funcao gravar
/*function gravar(d) { // FUNCAO GRAVAR RECEBENDO UM OBJETO DENTRO DA FUNCAO E PRECISAMOS TRANSFORMAR ESSE OBJETO EM UMA NOTACAO JSON -> COMO? Utilizando o objeto JSON, nativo do js. a PARTIR DELE PODEMOS EXECUTAR O METODO stringfy passando por parametro o objeto literal que queremos converter para uma notacao JSON.

   //acessa o recurso de localstorage e retorna um objeto de manipulacao do localStorage e assim temos acesso a alguns metodos, no caso acessamos o metodo setItem (setItem: funcao que contem um protocolo que vai abrir uma comunicacao com o localStorage), a qual permite passar 2 parametros(identificacao do objeto que vamos armazenar dentro de localStorage (chave/indice), item que queremos armazenar [sendo que esse dado, no caso um objeto, precisa ser encaminhado atraves de uma notacao JSON, pelo fato de que objetos não podem ser transitados nesse processo, isso porque eles são objetos, sendo que esses objetos existem apenas na instância da aplicação. Logo nós precisamos de alguma forma transcrever esse objeto em uma notação de texto (string), que é o caso aqui da notação JSON desse objeto, de tal modo que ao ser recuperado dentro da aplicacao web, dentro do localStorage, a aplicacao tenha, se necessario, a inteligencia de fazer o parse dessa informacao, convertendo essa informacao em um novo objeto. ] )

  localStorage.setItem('despesa', JSON.stringify(d))
}
*/


//--------------------------------------------------------------------------------------------------

// Criando um objeto com base na nossa classe, utilizando os parametros acima
// Criei uma variavel chamada despesa e atribui a instancia do objeto Despesa.
// Instanciei um objeto com base na classe Despesa
// Essa classe despesa recebe os parametros que eu atribui na instancia do objeto despesa
// Atribui os parametros da classe aos atributos do nosso objeto Despesa

//--------------------------------------------------------------------------------------------------
//Temos um problema que a instancia do objeto que criamos existe somente dentro da instnacia de uma aplicacao. Quando a nossa aplicação ela precisar se comunicar seja com o servidor ou seja com outras aplicações (como é o caso do local storage, que eh uma aplicacao interna do browser, ou seja, a nossa aplicação web está se comunicando com uma aplicação interna do browser). Embora o local storage seja uma aplicação interna do browser, ela é uma aplicação externa da nossa aplicacao web e consequentemente nós precisamos se comunicar. Nesses casos de comunicação entre aplicações, ou até mesmo com um servidor, nos precisamos estabelecer um protocolo de comunicação e nesse protocolo nós precisamos transitar os dados. Porém objetos literais eles não podem ser transitados nesse processo isso porque eles são objetos, sendo que esses objetos existem apenas na instância da aplicação. Logo nós precisamos de alguma forma transcrever esse objeto em uma notação de texto (string), que é o caso aqui da notação JSON, para que esse texto seja anexado a essa comunicação que podera ser feita dessa forma, sendo por meio de strings e nao objetos, e seja feita essa comunicacao com o próprio back end da aplicação web, ou com outras aplicações. O JSON, portanto, atua nesse meio de campo de comunicacao. O JSON não é o único recurso que pode ser utilizado para isso mas é um recurso que tem se destacado muito, justamente porque o JSON é suportado nativamente pelas linguagens de programação em geral como por exemplo o JavaScript. Facilmente nós podemos converter uma string JSON em um objeto que pode ser manipulado pela linguagem e um objeto em uma string JSON. Eh nesse ponto que entra a biblioteca JSON:

// Receber um objeto literal e converter para uma string JSON -> Usamos a biblioteca JSON do js para isso -> JSON.stringfy(objeto literal).
// Receber uma string JSON e converter para um objeto literal -> Usamos a biblioteca JSON do js para isso tambem-> JSON.parse(string que representa um JSON valido) -> O resultado disse eh um objeto instanciado dentro da nossa aplicacao no browser, no local storage.

//--------------------------------------------------------------------------------------------------
/*
A ordem de interpretação do navegador ao executar o código que você forneceu é a seguinte:

    Primeiro, as classes Despesa e Bd são definidas, mas nenhum código dentro delas é executado ainda.

    Uma instância da classe Bd é criada com let bd = new Bd. Isso aciona a execução do construtor da classe Bd, onde a verificação do localStorage é feita para garantir que a chave 'id' esteja definida. Se a chave 'id' não existir no localStorage, ela é criada e definida como 0.

    A função cadastrarDespesa não é executada neste momento. Ela é apenas definida, e sua execução será acionada posteriormente, normalmente em resposta a alguma ação do usuário, como clicar em um botão ou enviar um formulário.

    O código no construtor da classe Bd é executado quando a instância bd é criada. Se a chave 'id' não existir no localStorage, o valor 0 é definido como seu valor inicial.

    O restante do código, incluindo a função cadastrarDespesa, é apenas definido, mas não executado até que seja chamado posteriormente.

A execução do código dentro da função cadastrarDespesa ocorrerá quando o usuário realizar alguma ação que acione essa função, no caso clicar no botao que tem a funcao onclick. Ela cria uma nova instância da classe Despesa com os valores dos campos do formulário e, em seguida, chama o método gravar da instância bd para salvar a nova despesa no localStorage.

Em resumo, a ordem de interpretação do navegador é determinada pelo fluxo de execução do código e pelas ações do usuário que acionam funções específicas. A maior parte do código que você forneceu é definida, mas a execução real ocorre em resposta a eventos ou chamadas de função posteriores.

Portanto, a definição das classes Despesa e Bd ocorre automaticamente assim que o navegador carrega a página. No entanto, a execução real do código dentro dessas classes e funções só acontece quando você interage com a página, por exemplo, ao clicar no botão que chama a função cadastrarDespesa().

*/
//--------------------------------------------------------------------------------------------------