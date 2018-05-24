import './style.css'
// import Icon from './1.png'

import { cube } from './main.js'

import printMe from './print.js'

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

function component() {
    let element = document.createElement('div')
    element.innerHTML = _.join(['hello', 'webpack', cube(5)], ' ')
    element.classList.add('hello')

    var button = document.createElement('button')

    // var myIcon = new Image();
    // myIcon.src = Icon;
    // element.appendChild(myIcon);

    button.innerHTML = 'Click me!'
    button.onclick = printMe
    element.appendChild(button)

    return element
}

let element = component()
document.body.appendChild(element)


if (module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printMe module!')
        //printMe()

        document.removeChild(element)
        let element = component()
        document.body.appendChild(element)
    })
}