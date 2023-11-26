// setTimeout(function () {
//     console.log('Dentro do timeout');
// }, 0)

// const a = new Date()
// const w = a.getTime + 1000
// while (w <= a) {
//     console.log('no script principal')
// }

function demorada (tempo) {
    console.log('entrei na demorada ' + tempo);
    
    const x = 1 + 1
    return x
}

setTimeout(() => demorada (1000), 2000);
setTimeout(() => demorada (1500), 1000); //esse vai entrar antes