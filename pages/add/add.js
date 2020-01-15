// pages/add/add.js
var app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        inputLenth: 8,
        dev:'',
        scanValue:'',
        inputWidth:'100rpx',
        inputHeight:'60rpx'
    },
    onLoad: function () {

    },

    onShow: function () {
        this.passwordBox = this.selectComponent('#passwordBox') // 获取密码框组件，用来操作组件内部的方法
    },

    setupPasswordComplete(event) {
        this.setData({'dev': event.detail})
        console.log(this.data.dev)
    },


})
