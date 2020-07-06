class Tools {
    convert2Zero(a) {
        return Object.is(Number(a), NaN) ? 0 : a;
    }
    //浮点型加法函数
    floatAdd(a, b) {
        let r1;
        let r2;
        try {
            r1 = a.toString().split(".")[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = b.toString().split(".")[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        const m = Math.pow(10, Math.max(r1, r2));
        return ((a * m + b * m) / m).toFixed(3);
    }
    //浮点型乘法
    floatMul(a, b) {
        let c = 0;
        const d = a.toString();
        const e = b.toString();
        try {
            c += d.split(".")[1].length;
        }
        catch (f) {
            //;
        }
        try {
            c += e.split(".")[1].length;
        }
        catch (f) {
            //;
        }
        return ((Number(d.replace(".", "")) * Number(e.replace(".", ""))) /
            Math.pow(10, c));
    }
    //浮点型除法
    floatDiv(a, b) {
        function floatMul(A, B) {
            let c = 0;
            const d = A.toString();
            const e = B.toString();
            try {
                c += d.split(".")[1].length;
            }
            catch (f) {
                //;
            }
            try {
                c += e.split(".")[1].length;
            }
            catch (f) {
                //;
            }
            return ((Number(d.replace(".", "")) * Number(e.replace(".", ""))) /
                Math.pow(10, c));
        }
        let c;
        let d;
        let e = 0;
        let f = 0;
        try {
            e = a.toString().split(".")[1].length;
        }
        catch (g) {
            //;
        }
        try {
            f = b.toString().split(".")[1].length;
        }
        catch (g) {
            //;
        }
        return ((c = Number(a.toString().replace(".", ""))),
            (d = Number(b.toString().replace(".", ""))),
            floatMul(c / d, Math.pow(10, f - e)));
    }
    //判断变量类型 返回 'String' 'Object'等构造函数名
    // isType(obj) {return Object.prototype.toString.call(obj).slice(8, -1) }
    //深拷贝
    deepCopy(obj1) {
        const type = Object.prototype.toString.call(obj1).slice(8, -1);
        let resObj;
        //引用类型
        if (typeof obj1 === "object") {
            //   if (type === "Array") {
            if (obj1 instanceof Array) {
                resObj = [];
                for (let i = 0; i < obj1.length; i++) {
                    const cur = obj1[i];
                    if (typeof obj1[i] === "object") {
                        resObj[i] = this.deepCopy(obj1[i]);
                    }
                    else {
                        resObj[i] = obj1[i];
                    }
                }
            }
            if (type === "Object") {
                resObj = {};
                for (const key in obj1) {
                    if (typeof obj1[key] === "object") {
                        resObj[key] = this.deepCopy(obj1[key]);
                    }
                    else {
                        resObj[key] = obj1[key];
                    }
                }
            }
        }
        else {
            //基本类型
            resObj = obj1;
        }
        return resObj;
    }
    //节流
    throttle(fn, delay) {
        let endTime;
        let timer;
        const self = this;
        // tslint:disable-next-line: only-arrow-functions
        return function (...args) {
            const startTime = +new Date();
            if (endTime && Math.abs(endTime - startTime) < delay) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    endTime = +new Date();
                    fn.apply(self, args);
                }, delay);
            }
            else {
                endTime = +new Date();
                fn.apply(self, args);
            }
        };
    }
    guid() {
        function S4() {
            // tslint:disable-next-line: no-bitwise
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() +
            S4() +
            "-" +
            S4() +
            "-" +
            S4() +
            "-" +
            S4() +
            "-" +
            S4() +
            S4() +
            S4());
    }
    //两个对象是否相等,这里值处理了基本类型和数组及对象， Date对象和正则没有处理
    checkIfObjectEqual(objA, objB) {
        // tslint:disable-next-line: only-arrow-functions
        const isType = function (obj) {
            return Object.prototype.toString.call(obj).slice(8, -1);
        };
        const typeA = isType(objA);
        const typeB = isType(objB);
        //如果类型不一样直接false
        if (typeA !== typeB) {
            // console.log("构造函数不一致");
            return false;
        }
        //是引用类型
        if (typeof objA === "object") {
            //传入的是数组
            //   if (typeA === "Array") {
            if (objA instanceof Array && objB instanceof Array) {
                if (objA.length !== objB.length) {
                    // console.log("数组长度不一");
                    return false;
                }
                if (objA.length) {
                    for (let i = 0; i < objA.length; i++) {
                        //某下标值为引用值，递归
                        if (typeof objA[i] === "object") {
                            this.checkIfObjectEqual(objA[i], objB[i]);
                        }
                        else {
                            //如果某个下标值不一致 直接false
                            if (objA[i] !== objB[i]) {
                                // console.log("数组某个值不一样", objA[i], objB[i]);
                                return false;
                            }
                        }
                    }
                }
                else {
                    return true;
                }
            }
            //传入的是集合
            if (typeA === "Object") {
                //遍历objA
                // tslint:disable-next-line: forin
                for (const key in objA) {
                    if (!Reflect.has(objB, key)) {
                        return false;
                    }
                    //递归
                    if (typeof objA[key] === "object") {
                        // console.log(key, objA[key])
                        this.checkIfObjectEqual(objA[key], objB[key]);
                    }
                    else {
                        //如果objB中没有对应key
                        if (!objB[key]) {
                            // console.log("对象无此key");
                            return false;
                        }
                        if (objA[key] !== objB[key]) {
                            return false;
                        }
                    }
                }
            }
        }
        else {
            //都是基本类型直接比较
            return objA === objB;
        }
        return true;
    }
}
//这里用单例模式确保不会重复创建多个实例
const getTool = (() => {
    let tool;
    return () => {
        if (!tool) {
            tool = new Tools();
        }
        return tool;
    };
})()();
export default getTool;
//# sourceMappingURL=index.js.map