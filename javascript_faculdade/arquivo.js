const fs = require('fs')

const abreArquivo = function (nomeArquivo) {
    const exibeArquivo = function(erro, conteudo) {
        if (erro) {
            console.log('erro: ' + erro);
        } else {
            console.log(conteudo.toString());
        }
    };
    fs.readFile(nomeArquivo, exibeArquivo)
}

abreArquivo('entrada.txt')
