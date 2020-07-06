import * as tslib_1 from "tslib";
import { Component, Vue } from "vue-property-decorator";
import event from "../tools/event";
import "../style/toast.css";
let Toast = class Toast extends Vue {
    constructor() {
        super(...arguments);
        this.showWrap = true;
        this.showContent = false;
        this.text = "文本";
    }
    created() {
        event.on("show-toast", ({ text }) => {
            this.text = text;
            this.showWrap = true;
            this.showContent = true;
            setTimeout(() => {
                this.showContent = false;
                setTimeout(() => {
                    this.showWrap = false;
                }, 0);
            }, 1000 * 3);
        });
    }
    render() {
        const { text, showContent } = this;
        const cls = "wrap flexBox alItSt";
        return (<div v-show="showWrap" class={showContent ? `${cls} fadein` : `${cls} fadeout`}>
        <span>{text}</span>
      </div>);
    }
};
Toast = tslib_1.__decorate([
    Component({
        name: "My-Toast"
    })
], Toast);
export default Toast;
//# sourceMappingURL=toast.jsx.map