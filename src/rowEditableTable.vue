<script>
import tools from "./tools/index";
import MyInput from "./input.vue";
import Textarea from "./textarea.vue";
import event from "./event.js";
import fns from './tools/fns'

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
    },
    //表体无数据显示的提示语
    bodyEmptyTips: {
      type: String,
      default: "暂无数据"
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
  data() {
    return {
      ossTableHeader: [],
      ossTableData: [], //处理过表体
      onlyOneCellBodyArr: [],
      headerArr: [],
      bodyNotShowPropData: ["cell_id"],
      curTableData: [], //
      curEditTdId: "",
      textAreaContent: "",
      isBodyEmpty: false, //表体是否无数据
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
      // console.log("val", val);
      let _check = obj => {
        let flag = false;
        for (let [k, v] of Object.entries(obj)) {
          if (typeof v == "object") {
            // console.log('v',v)
            flag =
              v.fnParms &&
              v.fnParms.some(
                item => item.code == val.parentColumnId || item.key == val.prop
              );
          }
        }
        return flag;
      };
      //该数据变化后 受影响的
      let target_arr = this.curTableData.filter(
        item => item[this.uniqueKey] == val.parentColumnId || _check(item)
      );
      //找到数据变化的那一行tr
      let _temp = this.curTableData.find(
        item => item[this.uniqueKey] == val.parentColumnId
      );
      if (typeof _temp[val.prop] == "object") {
        this.$set(
          _temp,
          val.prop,
          Object.assign(_temp[val.prop], { value: val.value })
        );
      } else {
        this.$set(_temp, val.prop, val.value);
      }
      if (_temp) {
        this.$set(this.curTableData, _idx, _temp);
        this.$emit("TableDataChange", this.curTableData);
      }
      let _idx = this.curTableData.findIndex(
        item => item[this.uniqueKey] == val.parentColumnId
      );
      let _temp_oss = this.ossTableData.find(
        item => item[this.uniqueKey] == val.parentColumnId
      );
      if (typeof _temp[val.prop] == "object") {
        this.$set(
          _temp_oss,
          val.prop,
          Object.assign(_temp_oss[val.prop], { value: val.value })
        );
      } else {
        this.$set(_temp_oss, val.prop, val.value);
      }
      let _idx_oss = this.ossTableData.findIndex(
        item => item[this.uniqueKey] == val.parentColumnId
      );
      if (target_arr.length > 1) {
        // console.log("target_arr", target_arr);
        target_arr.forEach(item => {
          for (let [k, v] of Object.entries(item)) {
            if (typeof v == "object") {
              if (v.fn) {
                if (
                  v.fnParms &&
                  v.fnParms.every(_val => {
                    return this.getValueFromColumn(_val.code, _val.key);
                  })
                ) {
                  //参数数值的数组
                  let argsArr = v.fnParms.map(_val => {
                    return this.getValueFromColumn(_val.code, _val.key);
                  });
                  // console.log(v.fnParms, argsArr);
                  let f = v.fn;
                  /**
                   * 解析函数字符串，计算公式
                   * TODO 性能不好 后期考虑用 new Function() @fsg 2018.8.16
                   */
                  let res = eval("(" + f + `)(${argsArr.toString()})`);
                  let flag = ["NaN%", "Infinity%", "NaN", "Infinity"].includes(
                    res
                  );
                  // console.log(res, flag);
                  //如果输入非数字或0则不变化
                  if (flag) {
                    this.$set(v, "value", "");
                  } else {
                    this.$set(v, "value", res);
                  }
                } else {
                  this.$set(v, "value", "");
                }
              }
            }
          }
        });
        let copyCurTD = tools.deepCopy(this.curTableData);
        let copyOssTD = tools.deepCopy(this.ossTableData);
        //TODO
        target_arr.forEach(item => {
          copyCurTD.forEach((_val, _index) => {
            if (item[this.uniqueKey] == _val.code) {
              this.$set(this.curTableData, _index, item);
              let c_index = copyOssTD.findIndex(
                _item => _item[this.uniqueKey] == _val.code
              );
              this.$set(
                this.ossTableData,
                c_index,
                Object.assign({}, this.ossTableData[c_index], item)
              );
            }
          });
        });
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
        this.$emit("TableDataChange", this.curTableData);
      },
      deep: true
    }
  },

  components: { MyInput, Textarea },
  methods: {
    //匹配对应行的值
    getValueFromColumn(code, key) {
      let _target;
      let res;
      _target = this.curTableData.find(item => item[this.uniqueKey] == code);
      if (_target) {
        if (typeof _target[key] == "object") {
          return _target[key].value;
        } else {
          return _target[key];
        }
      } else {
        return "";
      }
    },
    //判断是否为数字，不是则输出0
    checkIfNum(n) {
      return Number(n) != NaN ? Number(n) : 0;
    },
    //检查表头是否存在一个单元格的项目
    initData() {
      this.ossTableHeader = tools.deepCopy(this.tableHeader);
      this.ossTableData = tools.deepCopy(this.tableData);
      this.curTableData = tools.deepCopy(this.tableData);
      if (this.tableData.length && this.tableData[0][this.uniqueKey]) {
        this.oneCellData.code = this.tableData[0][this.uniqueKey];
      }
      this.isBodyEmpty = !this.ossTableData.length;
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
            if (this.tableData.length) {
              this.textAreaContent = this.tableData[0][_temp.key];
            }
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
          item.sortIdx = (parentSortId ? parentSortId + "_" : "") + idx;
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
      try {
        return _target.sortIdx;
      } catch (err) {
        console.error(_target, target_key);
      }
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
        <div class="flexBox ">
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
                    borderBottom: `1px solid ${this.tableBorderColor}`,
                    ...this.headerStyle
                  }}
                  class="flexBox Ellipsis"
                >
                  <span style={{ padding: "0 20px" }}>{item.title}</span>
                </div>
                {this.isBodyEmpty ? null : (
                  <Textarea
                    addStyle={{
                      height: `${this.ossTableData.length * 40 +
                        this.ossTableData.length -
                        1}px`,
                      ...this.cellStyle
                    }}
                    propContent={this.textAreaContent}
                    isReadonly={this.isReadOnly}
                  />
                )}
              </div>
            );
          })}
        </div>
      );
    },
    //渲染表body
    renderPanelBody() {
      //body有数据
      const renderBody = () => {
        return (
          <tbody
            style={{
              borderTop: `1px solid ${this.tableBorderColor}`
            }}
          >
            {this.ossTableData.map(item => this.renderTableColumn(item))}
          </tbody>
        );
      };
      return (
        <div>
          <table
            style={{
              width: "100%",
              border: `1px solid ${this.tableBorderColor}`,
              borderBottom: "none",
              borderLeft: "none"
            }}
          >
            <thead style={{ width: "100%" }}>
              {this.ossTableHeader.map((item, idx) =>
                this.renderHeader(item, idx)
              )}
            </thead>
            {renderBody()}
          </table>
        </div>
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
          style={
            idx == 0 && this.isFirstThEableClick
              ? {
                  ...common,
                  ...this.firstThStyle,
                  cursor: "pointer",
                  ...this.headerStyle,
                  width: `${1 / this.ossTableHeader.length * 100}%`
                }
              : { ...common, ...this.headerStyle }
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
    //单元格点击事件
    tdClickHandler(tableId) {
      //响应操作单元格传入的函数

      this.curEditTdId = tableId;
    },
    //排序A是否应该排在B前面 -1是1否
    isAfrontB(A, B) {
      let A_arr = A.split("_");
      let B_arr = B.split("_");
      const len = Math.min(...[A_arr.length, B_arr.length]);
      for (let i = 0; i < len; i++) {
        if (A_arr[i] - B_arr[i] > 0) {
          return 1;
        } else if (A_arr[i] - B_arr[i] < 0) {
          return -1;
        }
      }
      return 0;
    },
      //返回header某项的排列索引
    getHeaderItemSortIndex(target_key) {
      let _target = this.headerArr.find(item => item.key == target_key);
      if (!_target) {
        console.error(_target, target_key);
      }
      return _target.sortIdx;
    },
    //渲染表的每行
    renderTableColumn(colOptions) {
      const sortArr = Object.keys(colOptions)
        .filter(item => !this.bodyNotShowPropData.includes(item))
        .filter(item => !this.getOneCellItemByKey(item))
        .sort((a, b) => {
          return this.isAfrontB(
            this.getHeaderItemSortIndex(a),
            this.getHeaderItemSortIndex(b)
          );
        });

      return (
        <tr style={{ width: "100%" }}>
          {sortArr.map((item, idx) => {
            const readonlyInput = (() => {
              return (
                <MyInput
                  style={{ width: "100%" }}
                  readonly
                  value={
                    typeof colOptions[item] == "object"
                      ? colOptions[item].value
                      : colOptions[item]
                  }
                  componentName={this.$options.name}
                  parentColumnId={colOptions["cell_id"]}
                  editPropName={item}
                  addStyle={{
                    borderTop: "none",
                    borderBottom: "none",
                    borderRadius: "0",
                    borderRight: "none",
                    ...this.cellStyle
                  }}
                />
              );
            })();
            const editInput = (() => {
              return (
                <MyInput
                  style={{ width: "100%" }}
                  addStyle={
                    `td_id_${colOptions[this.uniqueKey]}_${item}_${idx}` !=
                    this.curEditTdId
                      ? {
                          borderTop: "none",
                          borderBottom: "none",
                          // borderLeft: "none",
                          borderRight: "none",
                          cursor: "pointer",
                          borderRadius: 0,
                          ...this.cellStyle
                        }
                      : {}
                  }
                  parentColumnId={colOptions["cell_id"]}
                  componentName={this.$options.name}
                  editPropName={item}
                  value={
                    typeof colOptions[item] == "object"
                      ? colOptions[item].value
                      : colOptions[item]
                  }
                />
              );
            })();
            return this.bodyNotShowPropData.includes(item) ? null : (
              <td
                class="row-td"
                id={`td_id_${colOptions[this.uniqueKey]}_${item}_${idx}`}
                style={{
                  borderBottom: `1px solid ${this.tableBorderColor}`,
                  width: `${1 / this.ossTableHeader.length * 100}%`
                }}
                onClick={this.tdClickHandler.bind(
                  this,
                  `td_id_${colOptions[this.uniqueKey]}_${item}_${idx}`
                )}
              >
                {this.isReadOnly
                  ? readonlyInput
                  : this.getHeaderItemByKey(item).isCanEdit
                    ? typeof colOptions[item] == "object" &&
                      colOptions[item].isCanEdit == 0
                      ? readonlyInput
                      : editInput
                    : readonlyInput}
              </td>
            );
          })}
        </tr>
      );
    }
  },
  render() {
    //body无数据
    const emptyBody = () => {
      return (
        <div
          class="flexBox"
          style={{
            height: "100px",
            border: `1px solid ${this.tableBorderColor}`
          }}
        >
          {this.bodyEmptyTips}
        </div>
      );
    };
    return (
      <section class="nui-scroll" style={{ width: "100%" }}>
        <div class="flexBox  alItSt" style={{ width: "100%" }}>
          <div class="flex-1">{this.renderPanelBody()}</div>
          <div style={{ maxWidth: "300px" }}>{this.renderOneCellItem()}</div>
        </div>
        {this.isBodyEmpty ? emptyBody() : null}
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



