<script>
import tools from "./tools/index";
import MyInput from "./input.vue";
import Textarea from "./textarea.vue";
import event from "./event.js";

export default {
  name: "RowEditableTable",
  props: {
    tableData: {
      type: Array,
      default: () => new Array()
    },
    //表头
    tableHeader: {
      type: Array,
      default: () => new Array()
    },
    //表体不显示得属性
    bodyNotShowProps: {
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
    //唯一标识
    uniqueKey: {
      type: String,
      default: ""
    },
    //点击第一个th触发事件
    firstThClickHandler: {
      type: Function
    },
    //firstThClickHandler属性是否可用
    isFirstThEableClick: {
      type: Boolean,
      default: false
    },
    //首位th样式
    firstThStyle: {
      type: Object,
      default: () => {}
    },
    //该表格是否只读
    isReadOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ossTableHeader: [],
      ossTableData: [], //处理过表体
      onlyOneCellBodyArr: [],
      headerArr: [],
      bodyNotShowPropData: ["cell_id"],
      curTableData: [], //
      textAreaContent: "",
      oneCellData: {
        code: "",
        key: ""
      }
    };
  },
  created() {
    event.on("textarea-change", val => {
      this.textAreaContent = val;
    });
    event.on(`inputChange-${this.$options.name}`, val => {
      let _temp = this.curTableData.find(
        item => item[this.uniqueKey] == val.parentColumnId
      );
      let _idx = this.curTableData.findIndex(
        item => item[this.uniqueKey] == val.parentColumnId
      );
      if (_temp) {
        this.$set(_temp, val.prop, val.value);
        this.$set(this.curTableData, _idx, _temp);
        this.$emit("rowEditTableDataChange", this.curTableData);
      }
    });
  },
  watch: {
    tableHeader: {
      handler(val) {
        this.initData();
      },
      immediate: true
    },
    textAreaContent: {
      handler(val) {
        let _idx = this.curTableData.findIndex(
          item => item[this.uniqueKey] == this.oneCellData.code
        );
        let _temp = this.curTableData.find(
          item => item[this.uniqueKey] == this.oneCellData.code
        );
        this.$set(_temp, this.oneCellData.key, val);
        this.$set(this.curTableData, _idx, _temp);
        this.$emit("rowEditTableDataChange", this.curTableData);
      },
      deep: true
    }
  },

  components: { MyInput, Textarea },
  methods: {
    //检查表头是否存在一个单元格的项目
    initData() {
      this.ossTableHeader = tools.deepCopy(this.tableHeader);
      this.ossTableData = tools.deepCopy(this.tableData);
      this.curTableData = tools.deepCopy(this.tableData);
      this.oneCellData.code = this.tableData[0][this.uniqueKey];
      this.bodyNotShowProps.map(item => {
        this.bodyNotShowPropData.push(item);
      });
      this.ossTableData.map(item => {
        if (!this.uniqueKey) {
          if (!item.cell_id) {
            item.cell_id = tools.guid();
          }
        } else {
          if (!item.cell_id) {
            item.cell_id = item[this.uniqueKey];
          }
        }
      });
      this.ossTableHeader.forEach((item, idx) => {
        if (item.onlyOneCell) {
          let _temp = item;
          let _idx = this.onlyOneCellBodyArr.findIndex(i => i.key == _temp.key);
          if (_idx == -1) {
            this.onlyOneCellBodyArr.push(_temp);
            this.oneCellData.key = _temp.key;
            this.textAreaContent = this.tableData[0][_temp.key];
          }
          setTimeout(() => {
            this.ossTableHeader.splice(idx, 1);
          }, 0);
        }
      });
      this.giveIdx2Item(this.ossTableHeader);
      this.getHeaderItemArr(this.ossTableHeader);
    },
    giveIdx2Item(arr, parentSortId = "", classifyId = 0) {
      arr.map((item, idx) => {
        if (!item.sortIdx) {
          item.sortIdx = (parentSortId ? parentSortId + "" : "") + idx;
        }
        item.classifyId = classifyId;
        if (item.children && item.children.length) {
          this.giveIdx2Item(item.children, item.sortIdx, classifyId + 1);
        }
      });
    },
    //返回header某项
    getHeaderItemArr(arr) {
      let bianli = arr => {
        arr.map(item => {
          if (item.children) {
            let idx = this.headerArr.findIndex(_ => _.title == item.title);
            if (idx == -1) {
              let _temp = tools.deepCopy(item);
              delete _temp.children;
              this.headerArr.push({
                ..._temp,
                childLength: item.children.length
              });
            }
            bianli(item.children);
          } else {
            let _idx = this.headerArr.findIndex(_ => _.key == item.key);
            if (_idx == -1) {
              this.headerArr.push(item);
            }
          }
        });
      };
      bianli(arr);
    },
    //返回header某项的排列索引
    getHeaderItemIndex(target_key) {
      let _target = this.headerArr.find(item => item.key == target_key);
      return _target.sortIdx;
    },
    //通过key查找表头
    getHeaderItemByKey(key) {
      let _temp = this.tableHeader.find(item => item.key == key);
      return _temp;
    },

    //渲染只有一个单元格的项
    renderOneCellItem() {
      if (!this.onlyOneCellBodyArr.length) {
        return null;
      }
      return (
        <div class="flexBox " style={{ width: "100%" }}>
          {this.onlyOneCellBodyArr.map(item => {
            return (
              <div
                class="flexBox flex-ver-box alItSt "
                style={{
                  overflow: "hidden",
                  border: `1px solid ${this.tableBorderColor}`,
                  borderLeft: "none",
                  width: "100%"
                }}
                key={item.key}
              >
                <div
                  id={item.key}
                  style={{
                    lineHeight: `${this.cellHeight}px`,
                    borderBottom: `1px solid ${this.tableBorderColor}`
                  }}
                  class="flexBox Ellipsis"
                >
                  <span style={{ padding: "0 20px" }}>{item.title}</span>
                </div>
                <Textarea
                  propContent={this.textAreaContent}
                  ossTableDataLength={this.ossTableData.length}
                  isReadonly={this.isReadOnly}
                />
              </div>
            );
          })}
        </div>
      );
    },
    //渲染表body
    renderPanelBody() {
      return (
        <table
          style={{
            width: "100%",
            border: `1px solid ${this.tableBorderColor}`,
            borderBottom: "none"
          }}
        >
          <thead class="flexBox">
            {this.ossTableHeader.map((item, idx) =>
              this.renderHeader(item, idx)
            )}
          </thead>
          <tbody style={{ borderTop: `1px solid ${this.tableBorderColor}` }}>
            {this.ossTableData.map(item => this.renderTableColumn(item))}
          </tbody>
        </table>
      );
    },
    //渲染表头
    renderHeader(header, idx) {
      let common = {
        lineHeight: `${this.cellHeight}px`,
        borderLeft: `1px solid ${this.tableBorderColor}`
      };
      return (
        <th
          class="flex-1"
          style={
            idx == 0 && this.isFirstThEableClick
              ? { ...common, ...this.firstThStyle, cursor: "pointer" }
              : common
          }
          onClick={() => {
            if (!this.isFirstThEableClick) {
              return;
            }
            if (idx != 0) {
              return;
            }
            // 点击第一个th单元格触发事件
            this.firstThClickHandler();
          }}
        >
          {header.title}
        </th>
      );
    },
    //返回只有一个单元格的项的字段
    getOneCellItemByKey(key) {
      let _temp = this.onlyOneCellBodyArr.find(item => item.key == key);
      return _temp;
    },
    //渲染表的每行
    renderTableColumn(colOptions) {
      return (
        <tr class="flexBox" style={{ width: "100%" }}>
          {Object.keys(colOptions)
            .filter(item => !this.bodyNotShowPropData.includes(item))
            .filter(item => !this.getOneCellItemByKey(item))
            .sort(
              (a, b) => this.getHeaderItemIndex(a) - this.getHeaderItemIndex(b)
            )
            .map(item => {
              return this.bodyNotShowPropData.includes(item) ? null : (
                <td
                  class=" flexBox flex-1 row-td"
                  style={{ borderBottom: `1px solid ${this.tableBorderColor}` }}
                >
                  {this.isReadOnly ? (
                    <MyInput
                      style={{ flex: 2 }}
                      readonly
                      value={colOptions[item]}
                      componentName={this.$options.name}
                      parentColumnId={colOptions["cell_id"]}
                      editPropName={item}
                      addStyle={{
                        borderTop: "none",
                        borderBottom: "none",
                        borderRadius: "0",
                        borderRight: "none"
                      }}
                    />
                  ) : this.getHeaderItemByKey(item).isCanEdit ? (
                    <MyInput
                      style={{ flex: 1 }}
                      addStyle={{
                        borderTop: "none",
                        borderBottom: "none",
                        borderRadius: "0"
                      }}
                      parentColumnId={colOptions["cell_id"]}
                      componentName={this.$options.name}
                      editPropName={item}
                      value={colOptions[item]}
                    />
                  ) : (
                    <MyInput
                      style={{ flex: 2 }}
                      readonly
                      value={colOptions[item]}
                      componentName={this.$options.name}
                      parentColumnId={colOptions["cell_id"]}
                      editPropName={item}
                      addStyle={{
                        borderTop: "none",
                        borderBottom: "none",
                        borderRadius: "0",
                        borderRight: "none"
                      }}
                    />
                  )}
                </td>
              );
            })}
        </tr>
      );
    }
  },
  render() {
    return (
      <section class="flexBox  alItSt" style={{ width: "100%" }}>
        <div>{this.renderPanelBody()}</div>
        <div class="flex-1" style={{ width: "100%" }}>
          {this.renderOneCellItem()}
        </div>
      </section>
    );
  }
};
</script>
<style>
.row-td .el-input__inner__1 {
  border-top: none;
  border-bottom: none;
  border-radius: 0;
}
</style>



