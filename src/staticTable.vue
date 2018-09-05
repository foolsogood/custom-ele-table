<script>

export default {
  name: "staticTable",
  props: {
    tableData: {
      type: Array,
      default: () => new Array()
    },
      //表格边框颜色
    tableBorderColor: {
      type: String,
      default: "#ddd"
    },
    //单元格高度
    cellHeight: {
      type: [String, Number],
      default: "40"
    },
     //header样式
    headerStyle: {
      type: Object,
      default: () =>
        new Object({
          background: "rgb(230, 242, 246)",
          color: "#333"
        })
    },
    //body单元格样式
    cellStyle: {
      type: Object,
      default: () =>
        new Object({
          background: "#fff",
          color: "#333"
        })
    }
  
  },
  
  methods: {
    //渲染表body
    renderPanelBody() {
      return (
        <table style={{border: `1px solid ${this.tableBorderColor}`, borderBottom: "none",borderLeft:'none',width:'100%'}}>
          <tbody style={{width:'100%'}}>
            {this.tableData.map(item => this.renderTableColumn(item))}
          </tbody>
        </table>
      );
    },

    //渲染表的每行
    renderTableColumn(colOptions) {
      return (
        <tr class="flexBox" style={{width:'100%'}}>
          {colOptions.map(item => {
            return (
              <td class="flexBox flex-1 " style={{borderBottom:`1px solid ${this.tableBorderColor}`}}>
                <span class="flexBox" style={{ flex: 1,height: `${this.cellHeight}px`,borderLeft:`1px solid ${this.tableBorderColor}`,...this.headerStyle}}>
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
                  }}
                >
                  {item.value}
                </span>
              </td>
            );
          })}
        </tr>
      );
    }
  },
  render() {
    return <section>{this.renderPanelBody()}</section>;
  }
};
</script>

