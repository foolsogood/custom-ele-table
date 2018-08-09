let tableBody = [
    {
        code:'',//单元格标识
        name: '工业总产值',//指标名称
        bqz: '',//本期值
        lastyear_value: '',//上年同期值
        unit: '万元',//计量单位
        change_rate: '',//同比变化率
        shuoming:''
    },
    {
        code:'',//单元格标识
        unit: '万元',
        name: '工业增加值',
        bqz: '',
        lastyear_value: '',
        change_rate: '85%',
        shuoming:''
        
    },
    {
        code:'',//单元格标识
        name: '销售收入',
        unit: '万元',
        bqz: '100',
        lastyear_value: '',
        change_rate: '',
        shuoming:''
        
    },
]
let tableHeader = [
    {
        title: '指标名称',
        key: 'name',
        onlyOneCell: false,//是否只有一个单元格
        isCanEdit:false,//该属性是否可编辑
    },
    {
        title: '计量单位',
        key: 'unit',
        onlyOneCell: false,
        isCanEdit:false
    },
    {
        title: '本期值',
        key: 'bqz',
        onlyOneCell: false,
        isCanEdit:true
    },
    {
        title: '上年同期值',
        key: 'lastyear_value',
        onlyOneCell: false,
        isCanEdit:true
    },
    {
        title: '同比变化率',
        key: 'change_rate',
        onlyOneCell: false,
        isCanEdit:true

    },
    {
        title: '产值及能耗消费变化情况说明',
        key: 'shuoming',
        onlyOneCell: true,//
        isCanEdit:true
    },

]
export default {
    tableBody, tableHeader
}