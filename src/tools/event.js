//用于组件的通信
import event from "events";
const ee = new event.EventEmitter();
//扩大默认调用栈数量
ee.setMaxListeners(50);
export default ee;
