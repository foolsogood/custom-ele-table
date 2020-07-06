import { Component, Watch, Vue, Prop } from "vue-property-decorator";
import event from "../tools/event";
import "../style/toast.css";
@Component({
  name: "My-Toast"
})
export default class Toast extends Vue {
  public showWrap: boolean = true;
  public showContent: boolean = false;
  public text: string = "文本";
  public created() {
    interface Ia {
      text: string;
    }
    event.on("show-toast", ({ text }: Ia) => {
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
  public render() {
    const { text, showContent } = this;
    const cls = "wrap flexBox alItSt";
    return (
      <div
        v-show="showWrap"
        class={showContent ? `${cls} fadein` : `${cls} fadeout`}>
        <span>{text}</span>
      </div>
    );
  }
}
