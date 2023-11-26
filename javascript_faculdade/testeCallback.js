const fs = require('fs')
const abreArquivo = function (nomeArquivo) {
    const exibeConteudo = function (erro, conteudo) {

        if (erro) {
            console.log(erro)

        }

        else {
            console.log(conteudo.toString());
            const dobro = 2 * conteudo.toString()
            const salvar = function(erro){
                if(erro) {
                    console.log(`ups:  + ${erro}`);
                }
                else {
                    console.log('arquivo salvo com sucesso!');
                }
            }
            fs.writeFile('dobro.txt', dobro.toString(), salvar)
        }

    }
    fs.readFile(nomeArquivo, exibeConteudo)
}

abreArquivo ('entrada.txt')