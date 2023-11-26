// console.log('primeiro');
// console.log('segundo');
// console.log('terceiro');

// const a = 1 + 1
// const b = 15
// const c = a + b
// console.log(c);

function demorada () {
    const agoraMais = new Date().getTime() + 2000;
    while (new Date().getTime() <= agoraMais){
        const x = 1 + 1
        return x
    }
}


const a = 4 + 5
const b = 3 * 3
const d  = demorada()
const c  = 2 * a + b
console.log(c);

