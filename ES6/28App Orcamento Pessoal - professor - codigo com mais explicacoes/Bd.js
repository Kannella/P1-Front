class Bd {
  constructor() {
    let id = localStorage.getItem("id");

    if (id === null) {
      // se a inform nao existir o retorno sera null, se for null, setamos o id inicial como 0
      localStorage.setItem("id", 0);
    }
  }

  getProximoId() {
    // atribui na variavel proximoId o metodo getItem do recurso de localstorage (getItem: serve para recuperar um valor dentro de localStorage, no caso recupera o valor de 'id')
    //so que nao temos nenhum valor cadastrado em localStorage que possui id como chave. Entao o retorno seria Null. Entao, criamos uma logica para que toda vez que se inform nao existir e o retorno for null, setaremos o valor da chave id inicial como 0. E dessa forma, ao clicar em gravar o retorno nao ser null mais pois agora temos um valor existente no localStorage, mesmo que 0, que sera recuperado a partir da chave id la no localStorage. Agora quando ele for recuperar o valor de id no localStorage, na primeira vez, vai retonar como 0 pois na primeira vez a informacao nao existe (null).
    //    let proximoId = localStorage.getItem('id')
    //    console.log(proximoId) -> recuperaria 0 e mostraria 0 no console
    //como queremos o proximo id, somaremos o valor 1
    let proximoId = localStorage.getItem("id");
    return parseInt(proximoId) + 1; //sempre quando houver a tentativa de gravacao o valor 1 sera retornado. Pois apos a gravacao, precisamos atualizar o valor contido nesse indice
  }

  gravar(d) {
    let id = this.getProximoId(); // sempre que o metodo gravar for executado, vamos pegar o proximo id (getProximoId) e vamos atualizar o documento de chave id com o valor de id recuperado

    localStorage.setItem("id", id);

    localStorage.setItem(id, JSON.stringify(d));
  }
}
