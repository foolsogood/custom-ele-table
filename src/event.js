//用于组件的通信
const { EventEmitter } = require('events');
let ee=new EventEmitter()
//扩大默认调用栈数量
ee.setMaxListeners(50)
export default ee
