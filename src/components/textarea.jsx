import * as tslib_1 from "tslib";
import { Component, Watch, Vue, Prop } from "vue-property-decorator";
import event from "../tools/event";
import "../style/textarea.css";
let TextArea = class TextArea extends Vue {
    constructor() {
        super(...arguments);
        this.textAreaContent = "";
    }
    mounted() {
        this.textAreaContent = this.propContent;
    }
    textAreaContentChange(val) {
        event.emit("textarea-change", val);
    }
    render() {
        const { isReadonly, textAreaContent, addStyle } = this;
        return (<div class={["el-textarea"]}>
        <textarea class={["el-textarea__inner__1"]} readonly={isReadonly} wrap="off" v-model={textAreaContent} style={addStyle} placeholder="说明"/>
      </div>);
    }
};
tslib_1.__decorate([
    Prop({
        type: String,
        default: ""
    })
], TextArea.prototype, "propContent", void 0);
tslib_1.__decorate([
    Prop({
        type: Boolean,
        default: false
    })
], TextArea.prototype, "isReadonly", void 0);
tslib_1.__decorate([
    Prop({
        type: Object,
        default: Object.create(null)
    })
], TextArea.prototype, "addStyle", void 0);
tslib_1.__decorate([
    Watch("textAreaContent")
], TextArea.prototype, "textAreaContentChange", null);
TextArea = tslib_1.__decorate([
    Component({
        name: "text-area"
    })
], TextArea);
export default TextArea;
