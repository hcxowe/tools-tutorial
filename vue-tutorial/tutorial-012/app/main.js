// 过渡状态
var Vue = require('vue');

var app = new Vue({
    el: '#app',
    data: {
        number: 0,
        animatedNumber: 0
    },
    watch: {
        number: function(newNum, oldNum) {
            var vm = this;
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }

            new TWEEN.Tween({ tweeningNumber: oldNum })
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ tweeningNumber: newNum }, 500)
                .onUpdate(function() {
                    vm.animatedNumber = this.tweeningNumber.toFixed(0);
                })
                .start();

            animate();
        }
    }
});

var Color = net.brehaut.Color
var app1 = new Vue({
    el: '#app1',
    data: {
        colorQuery: '',
        color: {
        red: 0,
        green: 0,
        blue: 0,
        alpha: 1
        },
        tweenedColor: {}
    },
    created: function () {
        this.tweenedColor = Object.assign({}, this.color)
    },
    watch: {
        color: function () {
        function animate (time) {
            requestAnimationFrame(animate)
            TWEEN.update(time)
        }
        new TWEEN.Tween(this.tweenedColor)
            .to(this.color, 750)
            .start()
        animate()
        }
    },
    computed: {
        tweenedCSSColor: function () {
        return new Color({
            red: this.tweenedColor.red,
            green: this.tweenedColor.green,
            blue: this.tweenedColor.blue,
            alpha: this.tweenedColor.alpha
        }).toCSS()
        }
    },
    methods: {
        updateColor: function () {
        this.color = new Color(this.colorQuery).toRGB()
        this.colorQuery = ''
        }
    }
});


Vue.component('animated-integer', {
    template: '<span>{{ tweeningValue }}</span>',
    props: {
        value: {
            type: Number,
            required: true
        }
    },
    data: function () {
        return {
            tweeningValue: 0
        }
    },
    watch: {
        value: function (newValue, oldValue) {
            this.tween(oldValue, newValue)
        }
    },
    mounted: function () {
        this.tween(0, this.value)
    },
    methods: {
        tween: function (startValue, endValue) {
            var vm = this

            function animate(time) {
                requestAnimationFrame(animate)
                TWEEN.update(time)
            }
            new TWEEN.Tween({
                    tweeningValue: startValue
                })
                .to({
                    tweeningValue: endValue
                }, 500)
                .onUpdate(function () {
                    vm.tweeningValue = this.tweeningValue.toFixed(0)
                })
                .start()
            animate()
        }
    }
});

var app3 = new Vue({
    el: '#app2',
    data: {
        firstNumber: 20,
        secondNumber: 40
    },
    computed: {
        result: function () {
        return this.firstNumber + this.secondNumber
        }
    }
});

