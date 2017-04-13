var Vue = require('vue');
var _ = require('lodash');

var app = new Vue({
    el: '#example',
    data: {
        message: 'Hello Vue!',
        firstname: '',
        secondname: '',
    },
    // 计算属性，基于它们的依赖进行缓存的，计算属性只有在它的相关依赖发生改变时才会重新求值
    computed: {
        reverseMessage: function() {
            return this.message.split('').reverse().join('');
        },

        fullname: {
            get: function() {
                return this.firstname + " " + this.secondname;
            },

            set: function(name) {
                name = name.split(' ');
                this.firstname = name[0];
                this.secondname = name[1];
            }
        }
    },
    // 只要发生重新渲染，method 调用总会执行该函数
    methods: {
        now: function() {
            return new Date().toString();
        }
    }
});

app.fullname = 'wang bing';

var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  // 当你想要在数据变化响应时，执行异步操作或开销较大的操作，这是很有用的
  watch: {
    // 如果 question 发生改变，这个函数就会运行
    question: function (newQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.getAnswer()
    }
  },
  methods: {
    // _.debounce 是一个通过 lodash 限制操作频率的函数。
    getAnswer: _.debounce(
      function () {
        var vm = this;
        if (this.question.indexOf('?') === -1) {
          vm.answer = '问题通常需要一个？';
          return;
        }
        vm.answer = 'good';
      },
      // 这是我们为用户停止输入等待的毫秒数
      500
    )
  }
});