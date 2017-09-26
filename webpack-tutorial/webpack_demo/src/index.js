import _ from 'lodash'
import './style.css'
import img from './niao.png'
import Data from './data.xml'

function component() {
    var element = document.createElement('div');

    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    var icon = new Image();
    icon.src = img;

    element.appendChild(icon);

    console.log(Data);

    return element;
}

document.body.appendChild(component());