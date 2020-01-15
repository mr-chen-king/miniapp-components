// components/split-box-input/box-input.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // 输入框的数量
        inputLength: {
            type: Number,
            value: 8,
        },
        // 单个输入框的宽度
        inputWidth: {
            type: String,
            value: '100rpx'
        },

        inputHeight: {
            type: String,
            value: '100rpx'
        },

        // 是否显示输入的值，默认隐藏
        showValue: {
            type: Boolean,
            value: false
        }

    },

    data: {
        // 当前获取焦点的输入框index
        currentIndex: 0,
        // 输入框获取焦点时的样式
        inputsClass: [],
        // 输入框的值数组
        inputsValue: [],
        // 输入框是否获取焦点
        inputsFocus: [],
    },

    attached(){
        this._init()
    },

    methods: {
        _init(){
            var inputsClass = []
            var inputsValue = []
            var inputsFocus = []
            for(var length=0;length<this.data.inputLength;length++){
                inputsClass.push('')
                inputsValue.push('')
                inputsFocus.push(false)
            }
            this.setData({
                inputsClass: inputsClass,
                inputsValue: inputsValue,
                inputsFocus: inputsFocus,
            })
            console.log(this.data.inputsClass)
        },
        // 点击伪装的input时，让隐藏的input获得焦点
        _focusInput(event) {
            this._changeClass(event)
        },

        _input(e) {
            let ind = e.currentTarget.dataset.index
            let inputsValue = this.data.inputsValue
            if (e.detail.value.trim().length >= 1) {
                this._changeClass(ind + 1)
                inputsValue[ind] = e.detail.value.substr(-1, 1)
            } else {
                this._changeClass(ind - 1)
                inputsValue[ind] = ''
            }
            this.setData({
                inputsValue: inputsValue
            })
            console.log(this.data.inputsValue)
            var emptyA = this.data.inputsValue.filter(function (value, index) {
                return value == '';
            })

            if (emptyA.length == 0) {
                var value = this.data.inputsValue.join('')
                this._complete(value);
                return
            }
        },
        _changeClass(event) {
            if (typeof event === 'number' && !isNaN(event)) {
                var ind = event
            } else {
                var ind = event.currentTarget.dataset.index
            }

            console.log(this.data.inputLength)
            if (ind >= this.data.inputLength) {
                ind = this.data.inputLength - 1
            }

            this.setData({
                currentIndex: ind
            })

            var that = this
            this.data.inputsClass.forEach(function (item, index) {
                if (ind == index) {

                    that.setData({
                        ['inputsClass['+ index +']']: 'border-shadow',
                        ['inputsFocus['+ index +']']: true
                    })
                } else {
                    that.setData({
                        ['inputsClass['+ index +']']: '',
                        //此处是重点,不应该将值设置为false,否则数字输入时面板会有个收起弹出的过程，很不友好
                        //此处利用that.setData的特性，只有在调用这个方法时页面才会动态改变，而与之前的值无关,所以其它输入框的focus属性是true也不影响此输入框获取焦点
                        //['inputsFocus['+ index +']']: false
                    })
                }
            })

        },

        // 派发完成事件

        _complete(value) {
            this.triggerEvent('complete', value)
        },

        // 提供给外部调用的方法，显示/隐藏密码。接收一个参数，可以显性修改展示的状态。
        toggleValue(state) {
            this.setData({showValue: state != undefined ? state : !this.data.showValue})
        },


    }
})
