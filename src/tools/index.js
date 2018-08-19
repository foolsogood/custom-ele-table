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
    //两个对象是否相等,这里值处理了基本类型和数组及对象， Date对象和正则没有处理
    checkIfObjectEqual(objA, objB) {
        const isType = (obj) => Object.prototype.toString.call(obj).slice(8, -1)

        let typeA = isType(objA);
        let typeB = isType(objB);
        //如果类型不一样直接false
        if (typeA != typeB) {
            console.log("构造函数不一致");
            return false;
        }
        //是引用类型
        if (typeof objA == "object") {
            //传入的是数组
            if (typeA == "Array") {

                if (objA.length != objB.length) {
                    console.log("数组长度不一");
                    return false;
                }
                if (objA.length) {
                    for (let i = 0; i < objA.length; i++) {
                        //某下标值为引用值，递归
                        if (typeof objA[i] == "object") {
                            this.checkIfObjectEqual(objA[i], objB[i]);
                        } else {
                            //如果某个下标值不一致 直接false
                            if (objA[i] != objB[i]) {
                                console.log("数组某个值不一样", objA[i], objB[i]);
                                return false;
                            }
                        }
                    }
                } else {
                    return true;
                }
            }
            //传入的是集合
            if (typeA == "Object") {
                //遍历objA
                for (let key in objA) {
                    //递归
                    if (typeof objA[key] == "object") {
                        // console.log(key, objA[key])
                        this.checkIfObjectEqual(objA[key], objB[key]);
                    } else {
                        //如果objB中没有对应key
                        if (!objB[key]) {
                            console.log("对象无此key");
                            return false;
                        }
                        if (objA[key] != objB[key]) {
                            return false
                        }
                    }
                }
            }
        } else {
            //都是基本类型直接比较
            return objA === objB;
        }
        return true;
    }
}

//这里用单例模式确保不会重复创建多个实例
let getTool = (function () {
    let tool
    return function () {
        if (!tool) {
            tool = new tools()
        }
        return tool
    }
})()()
export default getTool
