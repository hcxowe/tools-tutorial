;(function($) {
    var Datagrid = function($el, options) {
        this.defaults = {
            numerical: true,
            checkbox: true,
            data: [],
            columns: [
                {
                    title: '标题',
                    filed: 'title',
                    width: 150,
                    editor: {
                        type: 'input'
                    }
                },
                {
                    title: '描述',
                    filed: 'desc',
                    width: 250,
                    editor: {
                        type: 'textarea'
                    }
                },
                {
                    title: '类型',
                    filed: 'type',
                    width: 100,
                    editor: {
                        type: 'select',
                        label: 'label',
                        value: 'value',
                        options: [
                            {
                                label: 'x',
                                value: 1
                            },
                            {
                                label: 'y',
                                value: 2
                            },
                            {
                                label: 'z',
                                value: 3
                            }
                        ]
                    }
                }
            ]
        },

        this.$element = $el
        this.options = $.extend({}, this.defaults, options)

        this.rowHeight = 40
        this.pageSize = 30
        this.page = [0, 1]

        this.init()
    }

    Datagrid.prototype = {
        init: function() {
            this.totalHeight = this.options.data.length * this.rowHeight
            this.pageHeight = this.rowHeight * this.pageSize
            this.startRowHeight = 0
            this.endRowHeight = this.totalHeight
            this.total = this.options.data.length
            this.options.data.forEach(function(el, index) {
                el.index = index
                el.checked = false
            })

            this.zwTR = []
            this.zwTR.push('<tr style="height: 0;">')

            this.zwTR.push('<td style="width:50px;height: 0;border:none;' + (this.options.numerical ? '' : 'display:none;') + '"></td>')
            this.zwTR.push('<td style="width:50px;height: 0;border:none;' + (this.options.checkbox ? '' : 'display:none;') + '"></td>')

            this.options.columns.forEach(function(item) {
                this.zwTR.push('<td style="width:' + item.width + 'px;height: 0;border:none;"></td>')
            }.bind(this))

            this.zwTR.push('<td style="height: 0;"></td>')
            this.zwTR.push('</tr>')
            this.zwTR = this.zwTR.join('')

            this.trTemplate = []
            this.trTemplate.push('<tr>')
            this.trTemplate.push('<td style="' + (this.options.numerical ? '' : 'display:none;') + '">{{index}}</td>')
            this.trTemplate.push('<td style="' + (this.options.checkbox ? '' : 'display:none;') + '"><input type="checkbox" {{checked}}/></td>')

            this.options.columns.forEach(function(item) {
                this.trTemplate.push('<td>{{'+ item.filed +'}}</td>')
            }.bind(this))

            this.trTemplate.push('<td></td>')
            this.trTemplate.push('</tr>')
            this.trTemplate = this.trTemplate.join('')

            this.startZW = '<tr class="row-start-zaiwei"></tr>'
            this.endZW = '<tr class="row-end-zaiwei"></tr>'
        },
        render: function() {
            var htmlAry = []
            htmlAry.push('<div class="datagrid">')
            htmlAry.push(this.renderHeader())
            htmlAry.push(this.renderBody())
            htmlAry.push('</div>')

            this.$element.append(htmlAry.join(''))

            $('.row-start-zaiwei').height(this.startRowHeight)
            $('.row-end-zaiwei').height(this.totalHeight)

            if (this.options.data.length == 0) {
                $('.datagrid-row-body', this.$element).html(zwTR + '<td colspan=' + (this.options.columns.length + 2) + '>暂无数据</td>')
                return
            }

            this.scrollShow(0)

            var preScrollLeft = 0
            var preScrollTop = 0
            var timer = null
            $('.datagrid-view').scroll(function(evt) {
                if (preScrollLeft != evt.target.scrollLeft) {
                    preScrollLeft = evt.target.scrollLeft
                    $('.datagrid-header', this.$element)[0].scrollLeft = evt.target.scrollLeft
                }

                if (preScrollTop != evt.target.scrollTop) {
                    preScrollTop = evt.target.scrollTop

                    clearTimeout(timer);

                    timer = setTimeout(function() {
                        this.scrollShow(evt.target.scrollTop)
                    }.bind(this), 500)
                }
            }.bind(this))
        },
        renderHeader: function() {
            var htmlAry = []
            htmlAry.push('<div class="datagrid-header">')
            htmlAry.push('<table cellspacing="0" cellpadding="0">')
            htmlAry.push('<tbody>')
            htmlAry.push('<tr style="height: 0;">')

            htmlAry.push('<td style="width:50px;height: 0;border:none;' + (this.options.numerical ? '' : 'display:none;') + '"></td>')
            htmlAry.push('<td style="width:50px;height: 0;border:none;' + (this.options.checkbox ? '' : 'display:none;') + '"></td>')

            this.options.columns.forEach(function(item) {
                htmlAry.push('<td style="width:' + item.width + 'px;height: 0;border:none;"></td>')
            })

            htmlAry.push('<td style="height: 0;border:none;"></td>')
            htmlAry.push('<td style="width:16px;height: 0;border:none;"></td>')
            htmlAry.push('</tr>')

            htmlAry.push('<tr style="height: 40px;">')

            htmlAry.push('<td style="' + (this.options.numerical ? '' : 'display:none;') + '">序号</td>')
            htmlAry.push('<td style="' + (this.options.checkbox ? '' : 'display:none;') + '"><input type="checkbox" /></td>')

            this.options.columns.forEach(function(item) {
                htmlAry.push('<td>' + item.title + '</td>')
            })

            htmlAry.push('<td></td>')
            htmlAry.push('<td></td>')
            htmlAry.push('</tr>')
            htmlAry.push('</tbody>')
            htmlAry.push('</table>')
            htmlAry.push('</div>')

            return htmlAry.join('')
        },
        renderBody: function() {
            var htmlAry = []
            htmlAry.push('<div class="datagrid-body">')
            htmlAry.push('<div class="datagrid-view" style="overflow: auto;height: 100%;">')
            htmlAry.push('<div>')
            htmlAry.push('<table cellspacing="0" cellpadding="0">')
            htmlAry.push('<tbody class="datagrid-row-body">')
            htmlAry.push('<tr class="row-start-zaiwei"></tr>')
            htmlAry.push('<tr class="row-end-zaiwei"></tr>')
            htmlAry.push('</tbody>')
            htmlAry.push('</table>')
            htmlAry.push('</div>')
            htmlAry.push('</div>')
            htmlAry.push('</div>')

            return htmlAry.join('')
        },
        scrollShow: function(scrollTop) {
            var endPosition = $('.row-end-zaiwei', this.$element).position()
            var startPosition = $('.row-start-zaiwei', this.$element).position()
            var startHeight = $('.row-start-zaiwei', this.$element).height()

            if (endPosition.top <= this.pageHeight || startPosition.top + startHeight + this.pageHeight >= 0) {
                var index = Math.floor(scrollTop / this.rowHeight)
                var showPage = Math.floor((index + 1) / this.pageSize)

                if (showPage == 0) {
                    this.page = [0, 1]
                }
                else {
                    this.page = [showPage-1, showPage, showPage+1]
                }

                var endIndex = this.page[0]*this.pageSize + this.pageSize * this.page.length > this.total ? this.total : this.page[0]*this.pageSize + this.pageSize * this.page.length

                $('.datagrid-row-body').html(this.zwTR + this.startZW + this.options.data.slice(this.page[0]*this.pageSize, endIndex).map(function(item){
                    return this.trTemplate.replace(/{{(\w+)}}/g, function(string, filed) {
                        if (filed == "checked") {
                            return item[filed] ? 'checked' : ''
                        }

                        if (filed == "index") {
                            return item[filed] + 1
                        }

                        return item[filed]
                    })
                }.bind(this)).join('') + this.endZW)

                $('.row-start-zaiwei').height(this.page[0] * this.pageHeight)
                $('.row-end-zaiwei').height(this.totalHeight - endIndex * this.rowHeight)
            }
        }
    }

    $.fn.sstDatagrid = function(options) {
        var dg = new Datagrid(this, options)

        dg.render()

        return dg
    }
}(jQuery))