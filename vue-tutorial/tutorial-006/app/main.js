 // 列表渲染
var Vue = require('vue');

var list = new Vue({
    el: '#list',
    data: {
        forIn: '在 v-for 块中，我们拥有对父作用域属性的完全访问权限',
        items: [
            {message:'v-for 指令根据一组数组的选项列表进行渲染'},
            {message:'v-for 指令需要以 item in items 形式的特殊语法'},
            {message:'items 是源数据数组并且 item 是数组元素迭代的别名'}
        ]
    }
});

var list2 = new Vue({
    el: '#list2',
    data: {
        dataObj: {
            one: 1,
            two: 2
        }
    }
});

// 需要运行构建方式
// Vue.component('todo-item', {
//   template: '\
//     <li>\
//       {{ title }}\
//       <button v-on:click="$emit(\'remove\')">X</button>\
//     </li>\
//   ',
//   props: ['title']
// });

// var list3 = new Vue({
//     el: '#to-do-demo',
//     data: {
//         newTodoText: '',
//         todos: [
//             '11111111111111',
//             '22222222222222',
//             '33333333333333'
//         ]
//     },
//     methods: {
//         addNew: function() {
//             this.todos.push(this.newTodoText);
//             this.newTodoText = '';
//         }
//     }
// });