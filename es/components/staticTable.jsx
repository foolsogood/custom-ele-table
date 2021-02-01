import { __decorate } from "tslib";
import { Component, Vue, Prop } from "vue-property-decorator";
let staticTable = class staticTable extends Vue {
    //渲染表body
    renderPanelBody() {
        return (<table style={{
            border: `1px solid ${this.tableBorderColor}`,
            borderBottom: "none",
            borderLeft: "none",
            width: "100%"
        }}>
        <tbody style={{ width: "100%" }}>
          {this.tableData.map(item => this.renderTableColumn(item))}
        </tbody>
      </table>);
    }
    //渲染表的每行
    renderTableColumn(colOptions) {
        return (<tr class="flexBox" style={{ width: "100%" }}>
        {colOptions.map(item => {
            return (<td class="flexBox flex-1 " style={{ borderBottom: `1px solid ${this.tableBorderColor}` }}>
              <span class="flexBox" style={{
                ...this.headerStyle,
                minWidth: "100px",
                flex: 1,
                height: `${this.cellHeight}px`,
                borderLeft: `1px solid ${this.tableBorderColor}`
            }}>
                {item.name}
              </span>
              <span class="flexBox " style={{
                ...this.cellStyle,
                padding: "0 25px",
                minWidth: "100px",
                borderLeft: `1px solid ${this.tableBorderColor}`,
                height: `${this.cellHeight}px`,
                flex: 2
            }}>
                {item.value}
              </span>
            </td>);
        })}
      </tr>);
    }
    render() {
        return (<section class="nui-scroll nui-scroll-x">
        {this.renderPanelBody()}
      </section>);
    }
};
__decorate([
    Prop({
        type: Array,
        default: []
    })
], staticTable.prototype, "tableData", void 0);
__decorate([
    Prop({
        type: String,
        default: "#ddd"
    })
], staticTable.prototype, "tableBorderColor", void 0);
__decorate([
    Prop({
        type: Number,
        default: 40
    })
], staticTable.prototype, "cellHeight", void 0);
__decorate([
    Prop({
        type: Object,
        default: () => ({
            background: "rgb(230, 242, 246)",
            color: "#333"
        })
    })
], staticTable.prototype, "headerStyle", void 0);
__decorate([
    Prop({
        type: Object,
        default: () => ({
            background: "#fff",
            color: "#333"
        })
    })
], staticTable.prototype, "cellStyle", void 0);
staticTable = __decorate([
    Component({
        name: "staticTable"
    })
], staticTable);
export default staticTable;
//# sourceMappingURL=staticTable.jsx.map