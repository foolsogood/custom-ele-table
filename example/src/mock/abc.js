let tableBody = [{
    prop: 'tableData',
    explain: '表体数据',
    type:'Array',
    default:'[]',
    staticTable: '✔️',
    rowEditableTable:'✔️',
    mutilTable: '✔️',
    formulaTable: '✔️',
},{
    prop: 'tableHeader',
    explain: '表头数据',
    type:'Array',
    default:'[]',
    staticTable: '❌',
    rowEditableTable:'✔️',
    mutilTable: '✔️',
    formulaTable: '✔️',
},{
    prop: 'tableBorderColor',
    explain: '表格边框颜色',
    type:'String',
    default:'#ddd',
    staticTable: '✔️',
    rowEditableTable:'✔️',
    mutilTable: '✔️',
    formulaTable: '✔️',
},{
    prop: 'cellHeight',
    explain: '单元格高度',
    type:'String, Number',
    default:'40',
    staticTable: '✔️',
    rowEditableTable:'✔️',
    mutilTable: '✔️',
    formulaTable: '✔️',
},{
    prop: 'bodyNotShowProps',
    explain: '表体不显示的属性',
    type:'Array',
    default:'[]',
    staticTable: '❌',
    rowEditableTable:'✔️',
    mutilTable: '✔️',
    formulaTable: '✔️',
},{
    prop: 'uniqueKey',
    explain: '每一行的唯一标识(如code,id)',
    type:'String',
    default:'',
    staticTable: '❌',
    rowEditableTable:'✔️',
    mutilTable: '✔️',
    formulaTable: '✔️',
},{
    prop: 'firstThClickHandler',
    explain: '点击表头首个th触发事件',
    type:'Function',
    default:'/',
    staticTable: '❌',
    rowEditableTable:'✔️',
    mutilTable: '✔️',
    formulaTable: '✔️',
},{
    prop: 'isFirstThEableClick',
    explain: 'firstThClickHandler属性是否可用',
    type:'Boolean',
    default:'false',
    staticTable: '❌',
    rowEditableTable:'✔️',
    mutilTable: '✔️',
    formulaTable: '✔️',
},{
    prop: 'firstThStyle',
    explain: '表头首个th样式',
    type:'Object',
    default:'{}',
    staticTable: '❌',
    rowEditableTable:'✔️',
    mutilTable: '✔️',
    formulaTable: '✔️',
},{
    prop: 'isReadOnly',
    explain: '该表格是否只读',
    type:'Boolean',
    default:'false',
    staticTable: '❌',
    rowEditableTable:'✔️',
    mutilTable: '✔️',
    formulaTable: '✔️',
},{
    prop: 'firstThClickHandler',
    explain: '点击第一个th触发事件',
    type:'Function',
    default:'/',
    staticTable: '❌',
    rowEditableTable:'✔️',
    mutilTable: '✔️',
    formulaTable: '✔️',
},]
let tableHeader = [
    {
        title: '属性',
        key: 'prop'
    },
    {
        title: '说明',
        key: 'explain',
        isCanEdit: 0
    },
    {
        title: '类型',
        key: 'type',
        isCanEdit: 0
    },
    {
        title: '默认值',
        key: 'default',
        isCanEdit: 0
    },
    {
        title: 'staticTable',
        key: 'staticTable',
        isCanEdit: 0
    },
    {
        title: 'rowEditableTable',
        key: 'rowEditableTable',
        isCanEdit: 0
    },
    {
        title: 'mutilTable',
        key: 'mutilTable',
        isCanEdit: 0
    },
    {
        title: 'formulaTable',
        key: 'formulaTable',
        isCanEdit: 0
    },

]

export default {
    tableHeader,
    tableBody
}
