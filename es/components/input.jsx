import * as tslib_1 from "tslib";
import { Component, Watch, Vue, Prop } from "vue-property-decorator";
import event from "../tools/event";
import "../style/input.css";
let Input = class Input extends Vue {
    constructor() {
        super(...arguments);
        this.newValue = "";
    }
    onValueChange(val) {
        const v = Object.is(val, NaN) ? "0" : val;
        this.newValue = v;
    }
    onNewValueChange(val) {
        if (this.isReadonly && Object.is(Number(val), NaN)) {
            return;
        }
        const data = {
            value: val,
            prop: this.editPropName,
            parentColumnId: this.parentColumnId
        };
        try {
            event.emit(`inputChange-${this.componentName}`, data);
        }
        catch (err) {
            // console.error("error", data, val, err);
        }
    }
    render() {
        return (<div>
        <div class="el-input">
          <input type="text" disabled={this.isReadonly} v-model={this.newValue} parentColumnId={this.parentColumnId} autocomplete="off" class="el-input__inner__1" readonly={this.isReadonly} style={this.addStyle}/>
        </div>
      </div>);
    }
};
tslib_1.__decorate([
    Prop({
        type: [String, Number],
        default: ""
    })
], Input.prototype, "value", void 0);
tslib_1.__decorate([
    Prop({
        type: Object,
        default: {}
    })
], Input.prototype, "addStyle", void 0);
tslib_1.__decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Input.prototype, "isReadonly", void 0);
tslib_1.__decorate([
    Prop({
        type: [String, Number],
        default: ""
    })
], Input.prototype, "parentColumnId", void 0);
tslib_1.__decorate([
    Prop({
        type: [String],
        default: ""
    })
], Input.prototype, "editPropName", void 0);
tslib_1.__decorate([
    Prop({
        type: [String],
        default: ""
    })
], Input.prototype, "componentName", void 0);
tslib_1.__decorate([
    Watch("value", {
        immediate: true
    })
], Input.prototype, "onValueChange", null);
tslib_1.__decorate([
    Watch("newValue")
], Input.prototype, "onNewValueChange", null);
Input = tslib_1.__decorate([
    Component({
        name: "My-Input"
    })
], Input);
export default Input;
//# sourceMappingURL=input.jsx.map