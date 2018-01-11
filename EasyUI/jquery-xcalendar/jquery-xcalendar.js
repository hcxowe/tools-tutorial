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
                            '<span class="year"></span>' +
                            ' - ' +
                            '<span class="month"></span>' +
                        '</div>' +

                        '<div class="xcal-selyear">' +
                            '<div class="year-wrap">' +
                                '<div class="year-title">' +
                                    '<span class="xcal-btn year-up">' +
                                        '<i class="fa fa-chevron-up" aria-hidden="true"></i>' +
                                    '</span>' +
                                    '<span class="xcal-yeararea">' +
                                    '</span>' +
                                    '<span class="xcal-btn year-down">' +
                                        '<i class="fa fa-chevron-down" aria-hidden="true"></i>' +
                                    '</span>' +
                                '</div>' +
                                '<div class="year-selbox">' +
                                    '<span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>' +
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
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day01">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day02">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day03">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day04">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day05">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day06 no-workday">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                '</tr>' +
                                '<tr>' +
                                    '<td class="day10 no-workday">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day11">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day12">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day13">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day14">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day15">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day16 no-workday">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                '</tr>' +
                                '<tr>' +
                                    '<td class="day20 no-workday">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day21">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day22">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day23">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day24">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day25">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day26 no-workday">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                '</tr>' +
                                '<tr>' +
                                    '<td class="day30 no-workday">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day31">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day32">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day33">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day34">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day35">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day36 no-workday">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                '</tr>' +
                                '<tr>' +
                                    '<td class="day40 no-workday">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day41">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day42">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day43">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day44">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day45">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day46 no-workday">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                '</tr>' +
                                '<tr>' +
                                    '<td class="day50 no-workday">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day51">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day52">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day53">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day54">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day55">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                    '<td class="day56 no-workday">' +
                                        '<div class="day"></div>' +
                                        '<p class="work-time"></p>' +
                                    '</td>' +
                                '</tr>' +
                            '</tbody>' +
                        '</table>' +
                    '</div>' +
                '</div>' +
            '</div>'

    if (!Function.prototype.xbind) {
        Function.prototype.xbind = function(context) {
            var args    = Array.prototype.slice(arguments, 1),
                F       = function(){},
                self    = this,
                bound   = function(){
                    var innerArgs = Array.prototype.slice.call(arguments)
                    var finalArgs = args.concat(innerArgs)
                    return self.apply((this instanceof F ? this : context), finalArgs)
                }
            
            F.prototype = self.prototype
            bound.prototype = new F()
            return bound
        }
    }

    function getDateCount(year, month) {
        var m1 = moment({year: year, month: month}),
            m2 = m1.clone().add(1, 'month')

        return (m2 - m1) / 1000 / 3600 / 24
    }

    var XCalendar = function(el, opts) {
        this.$el = el
        this.options = $.extend({}, defaults, opts)
        this.date = moment()
        this.workData = []

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

            this.$yearSelBox= this.$el.find('.year-selbox')
            this.$yearUp    = this.$el.find('.year-up')
            this.$yearDown  = this.$el.find('.year-down')
            this.$yearTitle = this.$el.find('.xcal-yeararea')

            // 更新年月日
            this.updateYearMonth()

            // 年份选择框
            this.updateYearSelBox()

            // 月份选择框
            this.updateMonthSelBox()

            // 选择框点击不关闭自己
            this.$selBox.on('click', function(evt) {
                evt.stopPropagation()
            })

            this.$yearUp.on('click', function(evt) {
                evt.stopPropagation();

                startYear = self.$yearSelBox.find('span:first-child').text() - 20;
                $('span', self.$yearSelBox).removeClass('sel-active').each(function(index, element) {
                    var $el = $(element);
                    
                    if (self.date.year() == startYear) {
                        $el.addClass('sel-active')
                    }

                    $el.text(startYear++)
                })

                self.$yearTitle.text(self.$yearSelBox.find('span:first-child').text() + ' - ' + self.$yearSelBox.find('span:last-child').text())
            })

            this.$yearDown.on('click', function(evt) {
                evt.stopPropagation();
                
                startYear = +self.$yearSelBox.find('span:last-child').text() + 1;
                $('span', self.$yearSelBox).removeClass('sel-active').each(function(index, element) {
                    var $el = $(element);
                    
                    if (self.date.year() == startYear) {
                        $el.addClass('sel-active')
                    }

                    $el.text(startYear++)
                })

                self.$yearTitle.text(self.$yearSelBox.find('span:first-child').text() + ' - ' + self.$yearSelBox.find('span:last-child').text())
            })

            self.$yearSelBox.on('click', 'span', function() {
                var $el = $(this)
                self.date.year($el.text())
                self.$selBox.hide()
                self.updateYearMonth()

                $el.addClass('sel-active').siblings().removeClass('sel-active');
            })

            self.$monthBox.on('click', 'span', function() {
                var $el = $(this)
                self.date.month(parseInt($el.text()) - 1)
                self.$selBox.hide()
                self.updateYearMonth()
                
                $el.addClass('sel-active').siblings().removeClass('sel-active');
            })

            this.$upSpan.on('click', function() {
                var oldYear = self.date.year()
                self.date.subtract(1, 'month')

                if (self.date.year() != oldYear) {
                    self.updateYearSelBox();
                }

                self.updateYearMonth()
            })

            this.$downSpan.on('click', function() {
                var oldYear = self.date.year()
                self.date.add(1, 'month')

                if (self.date.year() != oldYear) {
                    self.updateYearSelBox();
                }

                self.updateYearMonth()
            })

            this.$el.on('click', function() {
                self.$selBox.hide()
            })

            this.$yearSpan.on('click', function(evt) {
                self.$selBox.show()
                self.$monthBox.hide()
                self.$yearBox.show()

                evt.stopPropagation()
            })

            this.$monthSpan.on('click', function(evt) {
                self.$selBox.show()
                self.$yearBox.hide()
                self.$monthBox.show()

                evt.stopPropagation()
            })
        },
        updateYearSelBox: function() {
            var self = this
            var startYear = this.date.year() - 9
            $('span', this.$yearSelBox).each(function(index, element) {
                var $el = $(element);
                
                if (self.date.year() == startYear) {
                    $el.addClass('sel-active')
                }

                $el.text(startYear++)
            })
            
            this.$yearTitle.text(this.$yearSelBox.find('span:first-child').text() + ' - ' + this.$yearSelBox.find('span:last-child').text())
        },
        updateMonthSelBox: function() {
            var self = this

            $('span', this.$monthBox).each(function(index, element) {
                var $el = $(element);
                
                if (self.date.month() == (parseInt($el.text()) - 1)) {
                    $el.addClass('sel-active')
                    return false
                }
            })
        },
        updateYearMonth: function() {
            this.$yearSpan.text(this.date.year())
            this.$monthSpan.text(this.date.month()+1)

            this.updatedYearMonthDay();
        },
        updatedYearMonthDay: function() {
            this.$yearSpan.text(this.date.year())
            this.$monthSpan.text(this.date.month()+1)

            var daysCount = getDateCount(this.date.year(), this.date.month())
            var startWeek = this.date.clone().date(1).day()
            var upMonthLastDate = this.date.clone().date(1).subtract(1, 'days').date()

            var dates = []

            var index = 0;
            for (var i=0; i < startWeek; i++) {
                $(this.$days[index]).find('.day').text(upMonthLastDate - startWeek + 1 + i).addClass('day-grey')
                index++;
            }

            for (var i=1; i <= daysCount; i++) {
                $(this.$days[index]).find('.day').text(i).removeClass('day-grey')
                index++;
            }

            for (var i=1; i <= 15; i++) {
                $(this.$days[index]).find('.day').text(i).addClass('day-grey')
                index++;
            }
        },
        setDayData: function(data) {
            var item = this.workData.find(function(ele) {
                return ele.date == data.date
            })

            if (item) {
                item.isWork = data.isWork
                item.desc   = data.desc
                item.time   = data.time
            }
            else {
                this.workData.push(date)
            }
        },
        getWorkDate: function() {
            return this.workData
        },
        /**
         * @param {any} data 
         * data.startDate string
         * data.endDate string
         * data.time  number
         * data.weeks array  el. [0,1,2,3,4,5,6]
         */
        setWorkDate: function(data) {
            var sM = moment(data.startDate),
                eM = moment(data.endDate)

            while (sM <= eM) {
                this.setDayData({
                    date: sM.format('YYYY-M-D'),
                    time: data.time,
                    isWork: !~data.weeks.find(sM.day()),
                    desc: ''
                })
            }
        }
    }

    $.fn.xCalendar = function(type, opts) {
        var el = this[0];

        switch (type) {
            case 'create': 
                for (var i=0; i<calendarAry.length; i++) {
                    if (calendarAry[i].$el[0] == el) {
                        calendarAry[i].$el.remove();
                        calendarAry[i] = null
                        calendarAry.splice(i, 1)
                        break
                    }
                }

                var calendar = new XCalendar($(el), opts)
                calendarAry.push(calendar)
                break
            
            case 'setDayData': 
                for (var i=0; i<calendarAry.length; i++) {
                    if (calendarAry[i].$el[0] == el) {
                        calendarAry[i].setDayData(opts)
                        break
                    }
                }

                throw(new Error('calendar was not created'))
                break

            case 'setWorkDate': 
                for (var i=0; i<calendarAry.length; i++) {
                    if (calendarAry[i].$el[0] == el) {
                        calendarAry[i].setWorkData(opts)
                        break
                    }
                }

                throw(new Error('calendar was not created'))
                break

            case 'getWorkDate': 
                for (var i=0; i<calendarAry.length; i++) {
                    if (calendarAry[i].$el[0] == el) {
                        calendarAry[i].getWorkData()
                        break
                    }
                }

                throw(new Error('calendar was not created'))
                break

            default: 
                break
        }
    }
}(jQuery, window))