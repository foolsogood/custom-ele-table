class tools {
    constructor() { }
    //判断变量类型 返回 'String' 'Object'等构造函数名
    // isType(obj) {return Object.prototype.toString.call(obj).slice(8, -1) }
    //深拷贝
    deepCopy(obj1) {
        let type = Object.prototype.toString.call(obj1)
        let resObj = undefined
        //引用类型
        if (type.includes('object')) {
            if (type === '[object Array]') {
                resObj = []
                for (let i = 0; i < obj1.length; i++) {
                    if (typeof obj1[i] == 'object') {
                        resObj[i] = this.deepCopy(obj1[i])
                    } else {
                        resObj[i] = obj1[i]
                    }
                }
            }
            if (type === '[object Object]') {
                resObj = {}
                for (let key in obj1) {
                    if (typeof obj1[key] == 'object') {
                        resObj[key] = this.deepCopy(obj1[key])
                    } else {
                        resObj[key] = obj1[key]
                    }
                }
            }
        } else {
            //基本类型
            resObj = obj1
        }
        return resObj
    }
    guid() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
}

export default new tools()