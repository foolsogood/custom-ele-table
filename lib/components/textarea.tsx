import { Component, Watch, Vue, Prop } from "vue-property-decorator";
import event from "../tools/event";
import "../style/textarea.css";
@Component({
  name: "text-area"
})
export default class TextArea extends Vue {
  @Prop({
    type: String,
    default: ""
  })
  public readonly propContent!: string;
  @Prop({
    type: Boolean,
    default: false
  })
  public readonly isReadonly!: boolean;
  @Prop({
    type: Object,
    default: Object.create(null)
  })
  public readonly addStyle!: object;

  public textAreaContent: string = "";
  public mounted() {
    this.textAreaContent = this.propContent;
  }
  @Watch("textAreaContent")
  public textAreaContentChange(val: string) {
    event.emit("textarea-change", val);
  }
  public render() {
    const { isReadonly, textAreaContent, addStyle } = this;
    return (
      <div class={["el-textarea"]}>
        <textarea
          class={["el-textarea__inner__1"]}
          readonly={isReadonly}
          wrap="off"
          v-model={textAreaContent}
          style={addStyle}
          placeholder="说明"
        />
      </div>
    );
  }
}
