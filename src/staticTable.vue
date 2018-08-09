<script>
import MyInput from './input.vue'

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
    }
  
  },
  components:{MyInput},
  
  methods: {
    //渲染表body
    renderPanelBody() {
      return (
        <table style={{border: `1px solid ${this.tableBorderColor}`, borderBottom: "none",width:'100%'}}>
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
                <span class="flexBox" style={{ flex: 1 }}>
                  {item.name}
                </span>
                <MyInput style={{ flex: 2 }} addStyle={{borderTop:'none',borderBottom:'none',borderRadius:'0'}} value={item.value} readonly />
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

