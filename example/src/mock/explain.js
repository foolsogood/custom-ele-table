let propTableBody = [{
    prop: 'tableData',
    explain: '表体数据',
    type:'Array',
    default:'[]',
    staticTable: '✔️',
    rowEditableTable:'✔️',
    mutilTable: '✔️',
},{
    prop: 'tableHeader',
    explain: '表头数据',
    type:'Array',
    default:'[]',
    staticTable: '❌',
    rowEditableTable:'✔️',
    mutilTable: '✔️',
},{
    prop: 'tableBorderColor',
    explain: '表格边框颜色',
    type:'String',
    default:'#ddd',
    staticTable: '✔️',
    rowEditableTable:'✔️',
    mutilTable: '✔️',
},{
    prop: 'cellHeight',
    explain: '单元格高度',
    type:'String, Number',
    default:'40',
    staticTable: '✔️',
    rowEditableTable:'✔️',
    mutilTable: '✔️',
},{
    prop: 'bodyNotShowProps',
    explain: '表体不显示的属性',
    type:'Array',
    default:'[]',
    staticTable: '❌',
    rowEditableTable:'✔️',
    mutilTable: '✔️',
},{
    prop: 'uniqueKey',
    explain: '每一行的唯一标识(如code,id)',
    type:'String',
    default:'',
    staticTable: '❌',
    rowEditableTable:'✔️',
    mutilTable: '✔️',
},{
    prop: 'firstThClickHandler',
    explain: '点击表头首个th触发事件',
    type:'Function',
    default:'/',
    staticTable: '❌',
    rowEditableTable:'✔️',
    mutilTable: '✔️',
},{
    prop: 'isFirstThEableClick',
    explain: 'firstThClickHandler属性是否可用',
    type:'Boolean',
    default:'false',
    staticTable: '❌',
    rowEditableTable:'✔️',
    mutilTable: '✔️',
},{
    prop: 'firstThStyle',
    explain: '表头首个th样式',
    type:'Object',
    default:'{}',
    staticTable: '❌',
    rowEditableTable:'✔️',
    mutilTable: '✔️',
},{
    prop: 'isReadOnly',
    explain: '该表格是否只读',
    type:'Boolean',
    default:'false',
    staticTable: '❌',
    rowEditableTable:'✔️',
    mutilTable: '✔️',
},{
    prop: 'bodyEmptyTips',
    explain: '表体无数据显示的提示语',
    type:'String',
    default:'暂无数据',
    staticTable: '❌',
    rowEditableTable:'✔️',
    mutilTable: '✔️',
},{
    prop: 'headerStyle',
    explain: 'header样式',
    type:'Object',
    default:'{background: "rgb(230, 242, 246)",color: "#333"}',
    staticTable: '✔️',
    rowEditableTable:'✔️',
    mutilTable: '✔️',
},{
    prop: 'cellStyle',
    explain: 'body单元格样式',
    type:'Object',
    default:'{background: "#fff",color: "#333"}',
    staticTable: '✔️',
    rowEditableTable:'✔️',
    mutilTable: '✔️',
}]
let funcTableData=[
    {
        func: 'TableDataChange',
        explain: '表体数据变化回调方法',
        // way:'',
        staticTable: '❌',
        rowEditableTable:'✔️',
        mutilTable: '✔️',
    }
]
let funcTableHeader = [
    {
        title: '方法',
        key: 'func'
    },
    {
        title: '说明',
        key: 'explain',
        isCanEdit: 0
    },
    // {
    //     title: '使用方法',
    //     key: 'way',
    //     isCanEdit: 0
    // },
    
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
  

]
let propTableHeader = [
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
   

]
export default {
    propTableHeader,
    propTableBody,
    funcTableData,
    funcTableHeader
}
