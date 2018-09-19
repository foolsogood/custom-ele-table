<script>
import tools from "./tools/index";
import MyInput from "./input.vue";
import Textarea from "./textarea.vue";
import event from "./event.js";
import fnModules from "./tools/fns";
import Toast from "./toast.vue";
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
    },
    //需要公式计算的单元格的样式
    calcCellStyle: {
      type: Object,
      default: () =>
        new Object({
          background: "#999",
          color: "#fff"
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
  computed: {
    //表头层级
    headerClasses() {
      let arr = this.headerArr.map(item => item.classifyId);
      return [...new Set(arr)];
    }
  },
  created() {
    event.on("textarea-change", val => {
      this.textAreaContent = val;
    });
    event.on(`inputChange-${this.$options.name}`, val => {
      if (Object.is(Number(val.value), NaN)) {
        event.emit("show-toast", { text: "请输入数字" });
        return;
      }
      let _check = obj => {
        let flag = false;
        for (let [k, v] of Object.entries(obj)) {
          if (val.prop == k) {
            return true;
          }
          if (typeof v == "object") {
            let flag =
              v.fnParms &&
              v.fnParms.some(item => {
                return (
                  item[this.uniqueKey] == val.parentColumnId &&
                  item.key == val.prop
                );
              });

            if (flag) {
              return true;
            }
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
          Object.assign({}, _temp[val.prop], { value: val.value })
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
      if (target_arr.length) {
        target_arr.forEach(item => {
          for (let [k, v] of Object.entries(item)) {
            if (typeof v == "object") {
              if (v.fn && v.fnParms && v.fnParms.length) {
                if (v.fnParms.some(_val => _val.key == val.prop)) {
                  //参数数值的数组
                  let argsArr = v.fnParms.map(_val => {
                    return this.getValueFromColumn(_val.code, _val.key);
                  });
                  let f = v.fn;
                  //加入浮点型计算
                  const { floatAdd, floatMul, floatDiv } = tools;
                  // console.log(k, v.code, fnModules[f], argsArr);

                  if (fnModules[f]) {
                    f = fnModules[f];
                  }
                  try {
                    /**
                     * 解析函数字符串，计算公式
                     * TODO 性能不好 后期考虑用 new Function() @fsg 2018.8.16
                     */
                    let res = eval("(" + f + `)(${argsArr.toString()})`);
                    if (["false", false].includes(res)) {
                      event.emit("show-toast", { text: "公式运算错误,请检查" });
                      return;
                    }
                    if (Number(res) !== NaN) {
                      res = Number(res).toFixed(3);
                    }
                    let flag = [
                      "NaN%",
                      "Infinity%",
                      "NaN",
                      "Infinity",
                      false,
                      "false"
                    ].includes(res);
                    //如果输入非数字或0则不变化
                    if (flag) {
                      this.$set(v, "value", "");
                    } else {
                      this.$set(v, "value", res);
                    }
                  } catch (err) {
                    throw err;
                  }
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
          return _target[key].value ? _target[key].value : 0;
        } else {
          return _target[key] ? _target[key] : 0;
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
      this.headerArr = [];
      this.onlyOneCellBodyArr = [];
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

      this.ossTableData.forEach(item => {
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
          if (item.onlyOneCell == 1) {
            return;
          }
          if (item.children && item.children.length) {
            let idx = this.headerArr.findIndex(
              val => val.title == item.title && val.sortIdx == item.sortIdx
            );
            if (idx == -1) {
              let _temp = tools.deepCopy(item);
              delete _temp.children;
              this.headerArr.push(_temp);
            }
            bianli(item.children);
          } else {
            let _idx = this.headerArr.findIndex(val => val.key == item.key);
            if (_idx == -1) {
              this.headerArr.push(item);
            }
          }
        });
      };
      bianli(arr);
    },

    //通过key查找表头
    getHeaderItemByKey(key) {
      let _temp = this.headerArr.find(item => item.key == key);
      return _temp;
    },
    //渲染只有一个单元格项的头部
    oneCellHeader() {
      const getOneCellHeaderArr = (
        origArr = this.onlyOneCellBodyArr,
        resArr = []
      ) => {
        let arr = tools.deepCopy(origArr);
        arr.forEach(item => {
          let _temp = tools.deepCopy(item);
          delete _temp.children;
          resArr.push(_temp);
          if (item.children && item.children.length) {
            getOneCellHeaderArr(item.children, resArr);
          }
        });
        return resArr;
      };
      const oneCellHeaderArr = getOneCellHeaderArr().filter(item => item.title);
      return (
        <div style={{ borderTop: `1px solid ${this.tableBorderColor}` }}>
          {oneCellHeaderArr.map(item => {
            return (
              <div
                id={item.title}
                style={{
                  lineHeight: `${this.cellHeight * item.rowSpan}px`,
                  borderRight: `1px solid ${this.tableBorderColor}`,
                  borderBottom: `1px solid ${this.tableBorderColor}`,
                  width: "300px",
                  ...this.headerStyle
                }}
                class="flexBox Ellipsis"
              >
                <span style={{ padding: "0 20px" }}>{item.title}</span>
              </div>
            );
          })}
        </div>
      );
    },
    //渲染只有一个单元格的项
    renderOneCellItem() {
      if (!this.onlyOneCellBodyArr.length) {
        return null;
      }
      return (
        <div class="flexBox flex-ver-box alItSt" style={{ width: "300px" }}>
          {this.oneCellHeader()}
          {this.onlyOneCellBodyArr.map(item => {
            return (
              <div
                // class="flexBox flex-ver-box alItSt "
                style={{
                  overflow: "hidden",
                  border: `1px solid ${this.tableBorderColor}`,
                  borderLeft: "none",
                  borderTop: "none",

                  width: "300px"
                }}
                key={item.key}
              >
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
            <thead>
              {this.headerClasses.map(val => {
                return (
                  <tr
                    style={{
                      ...this.headerStyle,
                      borderTop: `1px solid ${this.tableBorderColor}`
                    }}
                  >
                    {this.headerArr
                      .filter(item => item.classifyId == val)
                      .filter(item => item.title)
                      .map((item, _idx) => {
                        return this.renderHeader(item, _idx);
                      })}
                  </tr>
                );
              })}
            </thead>
            {renderBody()}
          </table>
        </div>
      );
    },
    getRowspan(cell) {
      return cell.rowSpan ? cell.rowSpan : 1;
    },
    //渲染表头
    renderHeader(item, _idx) {
      let common = {
        verticalAlign: "middle",
        borderLeft: `1px solid ${this.tableBorderColor}`
      };
      return (
        <th
          rowspan={this.getRowspan(item)}
          colspan={item.colSpan ? item.colSpan : 1}
          style={
            _idx == 0 &&
            this.isFirstThEableClick &&
            item.sortIdx == 0 &&
            item.classifyId == 0
              ? {
                  ...common,
                  ...this.firstThStyle,
                  cursor: "pointer",
                  height: `${this.cellHeight * this.getRowspan(item)}px`
                }
              : {
                  ...common,
                  height: `${this.cellHeight * this.getRowspan(item)}px`
                }
          }
          onClick={() => {
            if (
              !this.isFirstThEableClick ||
              _idx != 0 ||
              item.sortIdx != 0 ||
              item.classifyId != 0
            ) {
              return;
            }
            // 点击第一个th单元格触发事件
            this.firstThClickHandler();
          }}
        >
          <span>{item.title}</span>
        </th>
      );
    },
    //返回只有一个单元格的项的字段
    getOneCellItemByKey(key, arr = this.onlyOneCellBodyArr) {
      let _temp = arr.find(item => {
        if (item.key) {
          return item.key == key;
        } else if (item.children && item.children.length) {
          return this.getOneCellItemByKey(key, item.children);
        }
      });
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
        .filter(item => item != "undefined")
        .filter(item => !this.bodyNotShowPropData.includes(item))
        .filter(item => !this.getOneCellItemByKey(item))
        .sort((a, b) => {
          try {
            return this.isAfrontB(
              this.getHeaderItemSortIndex(a),
              this.getHeaderItemSortIndex(b)
            );
          } catch (e) {
            throw e;
          }
        });
      return (
        <tr style={{ width: "100%" }}>
          {sortArr.map((item, idx) => {
            const readonlyInput = (() => {
              const common = {
                minWidth: "100px",
                borderTop: "none",
                borderBottom: "none",
                borderLeft: `1px solid ${this.tableBorderColor}`,
                borderRight: "none",
                borderRadius: 0,
                textAlign: "center",
                ...this.cellStyle
              };
              return (
                <MyInput
                  addStyle={
                    colOptions[item].fn
                      ? {
                          ...common,
                          ...this.calcCellStyle
                        }
                      : {
                          ...common
                        }
                  }
                  parentColumnId={
                    this.uniqueKey
                      ? colOptions[this.uniqueKey]
                        ? colOptions[this.uniqueKey]
                        : colOptions["table_id"]
                      : colOptions["table_id"]
                  }
                  componentName={this.$options.name}
                  editPropName={item}
                  readonly
                  value={
                    typeof colOptions[item] == "object"
                      ? colOptions[item].value
                      : colOptions[item]
                  }
                />
              );
            })();
            const editInput = (() => {
              return (
                <MyInput
                  style={{ minWidth: "100px" }}
                  addStyle={
                    `td_id_${colOptions[this.uniqueKey]}_${item}_${idx}` !=
                    this.curEditTdId
                      ? {
                          borderTop: "none",
                          borderBottom: "none",
                          borderLeft: `1px solid ${this.tableBorderColor}`,
                          borderRight: "none",
                          borderRadius: 0,
                          textAlign: "center",
                          ...this.cellStyle
                        }
                      : {
                          textAlign: "center"
                        }
                  }
                  parentColumnId={
                    this.uniqueKey
                      ? colOptions[this.uniqueKey]
                        ? colOptions[this.uniqueKey]
                        : colOptions["table_id"]
                      : colOptions["table_id"]
                  }
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
                class="row-td "
                id={`td_id_${colOptions[this.uniqueKey]}_${item}_${idx}`}
                style={{
                  borderBottom: `1px solid ${this.tableBorderColor}`,
                  width: `${1 / this.ossTableHeader.length * 100}%`,
                  verticalAlign: "middle"
                }}
                onClick={this.tdClickHandler.bind(
                  this,
                  `td_id_${colOptions[this.uniqueKey]}_${item}_${idx}`
                )}
              >
                {this.isReadOnly
                  ? readonlyInput
                  : this.getHeaderItemByKey(item) &&
                    this.getHeaderItemByKey(item).isCanEdit
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
      <section class="nui-scroll nui-scroll-x">
        <Toast />
        <div style={{ display: "flex" }}>
          <div class="flex-1">{this.renderPanelBody()}</div>
          <div style={{ width: "300px" }}>{this.renderOneCellItem()}</div>
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



