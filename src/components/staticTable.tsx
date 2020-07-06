import { Component, Vue, Prop } from "vue-property-decorator";
interface Item {
  key: string;
  name: string;
  value: string;
}
@Component({
  name: "StaticTable"
})
export class StaticTable extends Vue {
  @Prop({
    type: Array,
    default: []
  })
  public readonly tableData!: Item[][];
  //表格边框颜色
  @Prop({
    type: String,
    default: "#ddd"
  })
  public readonly tableBorderColor!: string;
  //单元格高度
  @Prop({
    type: Number,
    default: 40
  })
  public readonly cellHeight!: number;
  //header样式
  @Prop({
    type: Object,
    default: () => ({
      background: "rgb(230, 242, 246)",
      color: "#333"
    })
  })
  public readonly headerStyle!: CSSStyleDeclaration;
  //body单元格样式
  @Prop({
    type: Object,
    default: () => ({
      background: "#fff",
      color: "#333"
    })
  })
  public readonly cellStyle!: CSSStyleDeclaration;

  //渲染表body
  public renderPanelBody() {
    return (
      <table
        style={{
          border: `1px solid ${this.tableBorderColor}`,
          borderBottom: "none",
          borderLeft: "none",
          width: "100%"
        }}>
        <tbody style={{ width: "100%" }}>
          {this.tableData.map(item => this.renderTableColumn(item))}
        </tbody>
      </table>
    );
  }

  //渲染表的每行
  public renderTableColumn(colOptions: Item[]) {
    return (
      <tr class="flexBox" style={{ width: "100%" }}>
        {colOptions.map(item => {
          return (
            <td
              class="flexBox flex-1 "
              style={{ borderBottom: `1px solid ${this.tableBorderColor}` }}>
              <span
                class="flexBox"
                style={{
                  minWidth: "100px",
                  flex: 1,
                  height: `${this.cellHeight}px`,
                  borderLeft: `1px solid ${this.tableBorderColor}`,
                  ...this.headerStyle
                }}>
                {item.name}
              </span>
              <span
                class="flexBox "
                style={{
                  padding: "0 25px",
                  minWidth: "100px",
                  borderLeft: `1px solid ${this.tableBorderColor}`,
                  height: `${this.cellHeight}px`,
                  flex: 2,
                  ...this.cellStyle
                }}>
                {item.value}
              </span>
            </td>
          );
        })}
      </tr>
    );
  }
  public render() {
    return (
      <section class="nui-scroll nui-scroll-x">
        {this.renderPanelBody()}
      </section>
    );
  }
}

export default StaticTable;
