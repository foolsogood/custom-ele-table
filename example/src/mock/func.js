

let tableBody = [
    {
        "explain": "",
        code: "01000001",
        "rate":
            {
                fnParms: [
                    { key: "thisYearValue", code: "01000001" },
                    { key: "lastYearValue", code: "01000001" }
                ],
                "fn": "function(a,b){return((a-b)/b)*100+'%'}",
                "value": "",
                "cal": ""
            }

        ,
        "thisYearValue": {
            value: '1',
            isColPlus: 1,//是否参与列的累计
            // isRowPlus: 0,//是否参与行的累计
        }


        ,
        "lastYearValue": "",
        "index": "工业总产值（可比价）",
        "uint": "万元"
    },
    {
        "explain": "",
        code: "01000002",
        "thisYearValue": {
            value: '',
            isColPlus: 1,//是否参与列的累计
            // isRowPlus: 0,//是否参与行的累计
        },
        "rate": {
            fnParms: [
                { key: "thisYearValue", code: "01000002" },
                { key: "lastYearValue", code: "01000002" }
            ],
            "fn": "function(a,b){return((a-b)/b)*100+'%'}",
            "value": "",
            "cal": ""
        },
        "lastYearValue": "",
        "index": "工业增加值",
        "uint": "万元"
    },
    {
        "explain": "",
        code: "01000003",
        "thisYearValue": {
            value: '',
            isColPlus: 1,//是否参与列的累计
            // isRowPlus: 0,//是否参与行的累计
        },
        "rate": {
            fnParms: [
                { key: "thisYearValue", code: "01000003" },
                { key: "lastYearValue", code: "01000003" }
            ],
            "fn": "function(a,b){return((a-b)/b)*100+'%'}",
            "value": "",
            "cal": ""
        },
        "lastYearValue": "",
        "index": "综合能源消费量(当量值)",
        "uint": "万吨标准煤"
    },
    {
        "explain": "",
        code: "01000004",
        "thisYearValue": {
            fnParms: [
                { key: "thisYearValue", code: "01000001" },
                { key: "thisYearValue", code: "01000002" },
                { key: "thisYearValue", code: "01000003" }
            ],
            "fn": "",
            "value": "",
            "cal": "lj",
            isCanEdit: 0
        },
        "rate": '',
        "lastYearValue": "",
        "index": "合计",
        "uint": "/"
    }
]
// 
let tableHeader = [
    {
        key: "index",
        "title": "指标名称",
        "onlyOneCell": 0,
        "isCanEdit": 0,
        "isClick": 0,
        "rowSpan": 1,
        "colSpan": 1,
        "children": []
    },
    {
        key: "uint",
        "title": "计量单位",
        "onlyOneCell": 0,
        "isCanEdit": 0,
        "isClick": 0,
        "rowSpan": 1,
        "colSpan": 1,
        "children": []
    },
    {
        key: "thisYearValue",
        "title": "本期值",
        "onlyOneCell": 0,
        "isCanEdit": 1,
        "isClick": 0,
        "rowSpan": 1,
        "colSpan": 1,
        "children": []
    },
    {
        key: "lastYearValue",
        "title": "上年同期值",
        "onlyOneCell": 0,
        "isCanEdit": 1,
        "isClick": 0,
        "rowSpan": 1,
        "colSpan": 1,
        "children": []
    },
    {
        key: "rate",
        "title": "同比变化率",
        "onlyOneCell": 0,
        "isCanEdit": 0,
        "isClick": 0,
        "rowSpan": 1,
        "colSpan": 1,
        "children": []
    },
    {
        key: "explain",
        "title": "产值及能耗消费变化情况说明",
        "onlyOneCell": 1,
        "isCanEdit": 1,
        "isClick": 0,
        "rowSpan": 1,
        "colSpan": 1,
        "children": []
    }
]
export default {
    tableBody, tableHeader
}


