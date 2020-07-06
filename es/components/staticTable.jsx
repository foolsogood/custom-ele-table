import * as tslib_1 from "tslib";
import { Component, Vue, Prop } from "vue-property-decorator";
let StaticTable = class StaticTable extends Vue {
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
                minWidth: "100px",
                flex: 1,
                height: `${this.cellHeight}px`,
                borderLeft: `1px solid ${this.tableBorderColor}`,
                ...this.headerStyle
            }}>
                {item.name}
              </span>
              <span class="flexBox " style={{
                padding: "0 25px",
                minWidth: "100px",
                borderLeft: `1px solid ${this.tableBorderColor}`,
                height: `${this.cellHeight}px`,
                flex: 2,
                ...this.cellStyle
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
tslib_1.__decorate([
    Prop({
        type: Array,
        default: []
    })
], StaticTable.prototype, "tableData", void 0);
tslib_1.__decorate([
    Prop({
        type: String,
        default: "#ddd"
    })
], StaticTable.prototype, "tableBorderColor", void 0);
tslib_1.__decorate([
    Prop({
        type: Number,
        default: 40
    })
], StaticTable.prototype, "cellHeight", void 0);
tslib_1.__decorate([
    Prop({
        type: Object,
        default: () => ({
            background: "rgb(230, 242, 246)",
            color: "#333"
        })
    })
], StaticTable.prototype, "headerStyle", void 0);
tslib_1.__decorate([
    Prop({
        type: Object,
        default: () => ({
            background: "#fff",
            color: "#333"
        })
    })
], StaticTable.prototype, "cellStyle", void 0);
StaticTable = tslib_1.__decorate([
    Component({
        name: "StaticTable"
    })
], StaticTable);
export { StaticTable };
export default StaticTable;
//# sourceMappingURL=staticTable.jsx.map