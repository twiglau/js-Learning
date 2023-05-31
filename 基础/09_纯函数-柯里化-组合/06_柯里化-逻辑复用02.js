function log(date, type, message) {
    console.log(`[${date.getHours()}:${date.getMinutes()}][${type}]:[${message}]`)
}

log(new Date(), "DEBUG", "查找到轮播图的bug")
log(new Date(), "DEBUG", "查找到菜单的bug")

// 柯里化的优化
var logger = date => type => message => {
    console.log(`[${date.getHours()}:${date.getMinutes()}][${type}]:[${message}]`)
}

// 如果我现在打印的都是当前时间
var nowLog = logger(new Date())
nowLog("DEBUG")("查询轮播bug")
nowLog("FETURE")("新增了添加用户的功能")

var nowAndDebugLog = logger(new Date())("DEBUG")
nowAndDebugLog("查找到轮播图的bug")
nowAndDebugLog("查找到首页的bug")