import _ from 'lodash';
import './style.css';
import moment from 'moment';
import $ from 'jquery';

function component() {
    var element = document.createElement('div');

    /* 需要引入 lodash，下一行才能正常工作 */
    element.innerHTML = _.join(['Hello', 'webpackxxx'], ' ');
    element.innerHTML += ' ' + moment().format();

    return element;
}

//document.body.appendChild(component());
$('body').append(component());