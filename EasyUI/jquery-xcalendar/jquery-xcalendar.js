;(function($, window, undefined){
    var pluginName  = 'xCalendar',
        calendarAry = [],
        defaults    = {
            data: [],
            type: 'eidt', // readonly or edit
        },
        template    = '' + 
            '<div class="calendar-wrap">' +
                '<div class="xcal-header">' +
                    '<div class="xcal-toolbar">' +
                        '<div class="xcal-toolleft">' +
                            '<span class="xcal-btn">' +
                                '<i class="fa fa-chevron-left" aria-hidden="true"></i>' +
                            '</span>' +
                            '<span class="xcal-btn">' +
                                '<i class="fa fa-chevron-right" aria-hidden="true"></i>' +
                            '</span>' +
                        '</div>' +

                        '<div class="xcal-toolcenter">' +
                            '<span class="year" href="javascript:void(0);">2018</span>' +
                            ' - ' +
                            '<span class="month" href="javascript:void(0);">1</span>' +
                        '</div>' +

                        '<div class="xcal-selyear">' +
                            '<div class="year-wrap">' +
                                '<div class="year-title">' +
                                    '<span class="xcal-btn">' +
                                        '<i class="fa fa-chevron-up" aria-hidden="true"></i>' +
                                    '</span>' +
                                    '<span class="xcal-yeararea">' +
                                        '<em>2019</em>-<em>2038</em>' +
                                    '</span>' +
                                    '<span class="xcal-btn">' +
                                        '<i class="fa fa-chevron-down" aria-hidden="true"></i>' +
                                    '</span>' +
                                '</div>' +
                                '<div class="year-selbox">' +
                                    '<span>2019</span><span>2020</span><span>2021</span><span>2022</span><span>2023</span><span>2024</span><span>2025</span><span>2026</span><span>2027</span><span>2028</span><span class="active">2029</span><span>2030</span><span>2031</span><span>2032</span><span>2033</span><span>2034</span><span>2035</span><span>2036</span><span>2037</span><span>2038</span>' +
                                '</div>' +
                            '</div>' +

                            '<div class="month-wrap">' +
                                '<span>1月</span><span>2月</span><span>3月</span><span>4月</span><span>5月</span><span>6月</span><span>7月</span><span>8月</span><span>9月</span><span>10月</span><span>11月</span><span>12月</span>' +
                            '</div>' +
                        '</div>' +

                        '<div class="xcal-toolright">' +
                            '<span><i class="fa fa-plus" aria-hidden="true"></i>新增工作时间</span>' +
                        '</div>' +
                    '</div>' +
                '</div>' +

                '<div class="xcal-main">' +
                    '<div class="xcal-calendar">' +
                        '<table class="xcal-table">' +
                            '<thead>' +
                                '<tr class="xcal-week">' +
                                    '<td>Sun</td>' +
                                    '<td>Mon</td>' +
                                    '<td>Tue</td>' +
                                    '<td>Web</td>' +
                                    '<td>Thu</td>' +
                                    '<td>Fri</td>' +
                                    '<td>Sta</td>' +
                                '</tr>' +
                            '</thead>' +
                            '<tbody class="xcal-body">' +
                                '<tr>' +
                                    '<td class="day00 no-workday">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day01">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day02">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day03">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day04">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day05">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day06 no-workday">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                '</tr>' +
                                '<tr>' +
                                    '<td class="day10 no-workday">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day11">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day12">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day13">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day14">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day15">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day16 no-workday">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                '</tr>' +
                                '<tr>' +
                                    '<td class="day20 no-workday">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day21">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day22">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day23">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day24">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day25">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day26 no-workday">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                '</tr>' +
                                '<tr>' +
                                    '<td class="day30 no-workday">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day31">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day32">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day33">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day34">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day35">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day36 no-workday">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                '</tr>' +
                                '<tr>' +
                                    '<td class="day40 no-workday">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day41">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day42">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day43">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day44">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day45">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day46 no-workday">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                '</tr>' +
                                '<tr>' +
                                    '<td class="day50 no-workday">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day51">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day52">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day53">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day54">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day55">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                    '<td class="day56 no-workday">' +
                                        '<div class="day">1</div>' +
                                        '<p class="work-time">22.5H</p>' +
                                    '</td>' +
                                '</tr>' +
                            '</tbody>' +
                        '</table>' +
                    '</div>' +
                '</div>' +
            '</div>'

    var XCalendar = function(el, opts) {
        this.$el = el
        this.options = $.extend({}, defaults, opts)
        this.moment = moment();

        this.init()
    }

    XCalendar.prototype = {
        init: function() {
            var self = this

            this.$el.empty().append(template)

            this.$yearSpan  = this.$el.find('.year')
            this.$monthSpan = this.$el.find('.month')
            this.$selBox    = this.$el.find('.xcal-selyear')
            this.$yearBox   = this.$el.find('.year-wrap')
            this.$monthBox  = this.$el.find('.month-wrap')
            this.$days      = this.$el.find('.xcal-body td')
            this.$upSpan    = this.$el.find('.fa-chevron-left')
            this.$downSpan  = this.$el.find('.fa-chevron-right')

            this.updateYearMonth()

            this.$upSpan.on('click', function() {
                self.moment.subtract(1, 'month')
                self.updateYearMonth()
            })

            this.$downSpan.on('click', function() {
                self.moment.add(1, 'month')
                self.updateYearMonth()
            })

            $(document).on('click', function() {
                self.$selBox.hide();
            })

            this.$yearSpan.on('click', function(evt) {
                self.$selBox.show();
                self.$monthBox.hide();
                self.$yearBox.show();

                evt.stopPropagation();
            })

            this.$monthSpan.on('click', function(evt) {
                self.$selBox.show();
                self.$yearBox.hide();
                self.$monthBox.show();

                evt.stopPropagation();
            })


        },
        updateYearMonth: function() {
            this.$yearSpan.text(this.moment.year())
            this.$monthSpan.text(this.moment.month()+1)
        },
        updatedMonthDay: function() {
            
        },
        setDayData: function() {

        },
        getDayData: function() {

        },
        getData: function() {
            
        },
        setData: function() {
            
        }
    }

    $.fn.xCalendar = function(type, opts) {
        this.each(function(index, el) {
            switch (type) {
                case 'create': 
                    for (var i=0; i<calendarAry.length; i++) {
                        if (calendarAry[i].$el[0] == $el[0]) {
                            calendarAry[i].$el.remove();
                            calendarAry[i] = null
                            calendarAry.splice(i, 1)
                            break
                        }
                    }

                    var calendar = new XCalendar($(el), opts)
                    calendarAry.push(calendar)
                    break
                    
                default: 
                    break
            }
        })
    }
}(jQuery, window))