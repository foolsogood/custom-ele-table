import { Component, Watch, Vue, Prop } from "vue-property-decorator";
import event from "../tools/event";
import "../style/input.css";
@Component({
  name: "My-Input"
})
export default class Input extends Vue {
  @Prop({
    type: [String, Number],
    default: ""
  })
  public readonly value!: string | number;
  @Prop({
    type: Object,
    default: {}
  })
  public readonly addStyle!: CSSStyleDeclaration;
  @Prop({
    type: Boolean,
    default: false
  })
  public readonly isReadonly!: boolean;
  //所在行的id唯一标识
  @Prop({
    type: [String, Number],
    default: ""
  })
  public readonly parentColumnId!: string | number;
  //编辑属性字段
  @Prop({
    type: [String],
    default: ""
  })
  public readonly editPropName!: string;
  //父组件名字
  @Prop({
    type: [String],
    default: ""
  })
  public readonly componentName!: string;

  public newValue: string = "";
  @Watch("value", {
    immediate: true
  })
  public onValueChange(val: string) {
    const v = Object.is(val, NaN) ? "0" : val;
    this.newValue = v;
  }
  @Watch("newValue")
  public onNewValueChange(val: string) {
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
    } catch (err) {
      // console.error("error", data, val, err);
    }
  }
  public render() {
    return (
      <div>
        <div class="el-input">
          <input
            type="text"
            disabled={this.isReadonly}
            v-model={this.newValue}
            parentColumnId={this.parentColumnId}
            autocomplete="off"
            class="el-input__inner__1"
            readonly={this.isReadonly}
            style={this.addStyle}
          />
        </div>
      </div>
    );
  }
}
