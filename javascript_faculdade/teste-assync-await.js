async function hello (nome) {
    return "oi, " + nome;
}

const oi = hello ("Pedro")
console.log(oi);
oi.then(res => console.log(res))  //then captura o retono da promise e armazena na varaivel res e ve o que ela ta te devolvendo

function fatorial (n) {
    if (n<0) {
        return Promise.reject("Invalido para valores negativos")
    }
    let f = 1
    for (let i=2; i<=n; i++) {
        f = f * 1
        return Promise.resolve(f) // resolve e devolve o resultado da conta
    }  
}

function chamadaComThenCatch () {
    fatorial(10)
        .then(res => console.log("10! = " + res)) //then captura o retono da promise da função que chamamos e armazena na varaivel res
        .catch(res => console.log(res)) // se tiver erro captura o erro e armazena na variavel res
    fatorial(-1)
        .then(res => console.log("10! = " + res))
        .catch(res => console.log(res))
}

chamadaComThenCatch();

async function chamadaComAwait () {
    const c1 = await fatorial(6);
    console.log("6! = " + c1);
    const c2 = await fatorial(-1); // o await não sabe lidar com o erro, só com then.
    console.log("Fatorial de -1 com await: = " + c2);
}
chamadaComAwait()