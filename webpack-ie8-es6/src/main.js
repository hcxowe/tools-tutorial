require('babel-polyfill')
require('es5-shim')
require('console-polyfill')
const sum = require('./b.js').sum

let a = 1,
    b = () => {
        return a;
    },
    c = {
        class: 'ddcd'
    }

console.log(b())

document.write(b())
document.write(sum(3, 4))
