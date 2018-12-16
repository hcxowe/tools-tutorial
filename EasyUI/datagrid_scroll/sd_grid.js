/**
 * @author hcxowe
 * version: 1.1.0
 * table for smart document project
 */

(function($) {
    'use strict'

    // 格式化输出字符串
    var sprintf = function(str) {
        var args = arguments,
            flag = true,
            i = 1

        str = str.replace(/%s/g, function() {
            var arg = args[i++]

            // 参数不匹配, 返回空字符串
            if (typeof arg === 'undefined') {
                flag = false
                return ''
            }

            return arg
        });

        return flag ? str : ''
    }
    // console.log(sprintf('1%s2%s3%s', 'h', 'c', 'x')) // '1h2c3x'
    // console.log(sprintf('1%s2%s3%s', 'h', 'c')) // ''

    // 匹配 .from == value 返回 .to
    var getPropertyFromOther = function(list, from, to, value) {
        var result = ''
        $.each(list, function (i, item) {
            if (item[from] === value) {
                result = item[to];
                return false;
            }

            return true;
        })

        return result
    }
    //console.log(getPropertyFromOther([{field: 'name', title: '名称'}], 'field', 'title', 'name')) // '名称'

    // 获取滚动条宽度
    var getScrollBarWidth = function() {
        if (cachedWidth === null) {
            var inner = $('<p/>'),
                outer = $('<div/>'),
                w1,
                w2

            outer.append(inner)
            $('body').append(outer)

            w1 = inner[0].offsetWidth
            outer.css('overflow', 'scroll')
            w2 = inner[0].offsetWidth

            if (w1 === w2) {
                w2 = outer[0].clientWidth
            }

            outer.remove()
            cachedWidth = w1 - w2
        }

        return cachedWidth
    }

    var calculateObjectValue = function(self, name, args, defaultValue) {
        var func = name

        if (typeof name === 'string') {
            var names = name.split('.')

            if (names.length > 1) {
                func = window
                $.each(names, function(i, name) {
                    func = func[name]
                })
            }
            else {
                func = window[name]
            }
        }

        if (typeof func === 'object') {
            return func
        }

        if (typeof func === 'function') {
            return func.apply(self, args || [])
        }

        if (!func && typeof name === 'string' && sprintf.apply(this, [name].concat(args))) {
            return sprintf.apply(this, [name].concat(args))
        }

        return defaultValue
    }

    // 获取自身属性
    var getOwnPropertyNames = Object.getOwnPropertyNames || function(obj) {
        var arr = []
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                arr.push(k)
            }
        }

        return arr
    }

    // 编码 html 特殊字符
    var escapeHTML = function (text) {
        if (typeof text === 'string') {
            return text
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;')
                .replace(/`/g, '&#x60;')
        }

        return text
    }

    // 驼峰属性 => - 连字属性  whatFuck => what-fuck
    var getRealDataAttr = function (dataAttr) {
        for (var attr in dataAttr) {
            var auxAttr = attr.split(/(?=[A-Z])/).join('-').toLowerCase()
            if (auxAttr !== attr) {
                dataAttr[auxAttr] = dataAttr[attr]
                delete dataAttr[attr]
            }
        }

        return dataAttr
    }

    // 获取指定属性值 支持 x.y 模式
    var getItemField = function (item, field, escape) {
        var value = item

        if (typeof field !== 'string' || item.hasOwnProperty(field)) {
            return escape ? escapeHTML(item[field]) : item[field]
        }

        var props = field.split('.')
        for (var p in props) {
            if (props.hasOwnProperty(p)) {
                value = value && value[props[p]]
            }
        }
        return escape ? escapeHTML(value) : value
    }

    // 判断IE
    var isIEBrowser = function () {
        return !!(navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
    }
}(jQuery))