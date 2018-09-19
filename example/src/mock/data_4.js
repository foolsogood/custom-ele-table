let tableHeader = [{
    "title": "能源名称",
    "onlyOneCell": 0,
    "isCanEdit": 1,
    "isClick": 0,
    rowSpan:2,
    colSpan:1,
    "children": [{

        "children": [{
            "key": "energyName",
            "title": "甲",
            "onlyOneCell": 0,
            "isCanEdit": 1,
            "isClick": 0,
        }]
    }]
}, {
    "title": "计量单位",
    "onlyOneCell": 0,
    "isCanEdit": 1,
    "isClick": 0,
    rowSpan:2,
    colSpan:1,
    "children": [{

        "children": [{
            "key": "energyUnit",
            "title": "乙",
            "onlyOneCell": 0,
            "isCanEdit": 1,
            "isClick": 0,
        }]
    }]
}, {
    "title": "代码",
    "onlyOneCell": 0,
    "isCanEdit": 1,
    "isClick": 0,
    rowSpan:2,
    colSpan:1,
    "children": [{

        "children": [{
            "key": "energyCode",
            "title": "丙",
            "onlyOneCell": 0,
            "isCanEdit": 1,
            "isClick": 0,
        }]
    }]
}, {
    "title": "期初库存量",
    "onlyOneCell": 0,
    "isCanEdit": 1,
    "isClick": 0,
    rowSpan:2,
    colSpan:1,
    "children": [{

        "children": [{
            "key": "beginNum",
            "title": "1",
            "onlyOneCell": 0,
            "isCanEdit": 1,
            "isClick": 0,
        }]
    }]
}, {
    "title": "购进量",
    "onlyOneCell": 0,
    "isCanEdit": 1,
    "isClick": 0,
    rowSpan:1,
    colSpan:2,
    "children": [{
        "title": "实物量",
        "onlyOneCell": 0,
        "isCanEdit": 1,
        "isClick": 0,
        rowSpan:1,
        colSpan:1,
        "children": [{
            "key": "realNum",
            "title": "2",
            "onlyOneCell": 0,
            "isCanEdit": 1,
            "isClick": 0,
            "children": []
        }]
    }, {
        "title": "金额(千元)",
        "onlyOneCell": 0,
        "isCanEdit": 1,
        "isClick": 0,
        rowSpan:1,
        colSpan:1,
        "children": [{
            "key": "money",
            "title": "3",
            "onlyOneCell": 0,
            "isCanEdit": 1,
            "isClick": 0,
            "children": []
        }]
    }]
}, {
    "title": "消费量",
    "onlyOneCell": 0,
    "isCanEdit": 1,
    "isClick": 0,
    rowSpan:1,
    colSpan:5,
    "children": [{
        "title": "合计",
        "onlyOneCell": 0,
        "isCanEdit": 1,
        "isClick": 0,
        rowSpan:1,
        colSpan:1,
        "children": [{
            "key": "total",
            "title": "4",
            "onlyOneCell": 0,
            "isCanEdit": 1,
            "isClick": 0,
            "children": []
        }]
    }, {
        "title": "工业生产消费",
        "onlyOneCell": 0,
        "isCanEdit": 1,
        "isClick": 0,
        rowSpan:1,
        colSpan:1,
        "children": [{
            "key": "industry_consum",
            "title": "5",
            "onlyOneCell": 0,
            "isCanEdit": 1,
            "isClick": 0,
            "children": []
        }]
    }, {
        "title": "用于原材料",
        "onlyOneCell": 0,
        "isCanEdit": 1,
        "isClick": 0,
        rowSpan:1,
        colSpan:1,
        "children": [{
            "key": "material",
            "title": "6",
            "onlyOneCell": 0,
            "isCanEdit": 1,
            "isClick": 0,
            "children": []
        }]
    }, {
        "title": "非工业生产消费",
        "onlyOneCell": 0,
        "isCanEdit": 1,
        "isClick": 0,
        rowSpan:1,
        colSpan:1,
        "children": [{

            "key": "deindustry_consum",
            "title": "7",
            "onlyOneCell": 0,
            "isCanEdit": 1,
            "isClick": 0,

            "children": []
        }]
    }, {
        "title": "合计中：运输工具消费",
        "onlyOneCell": 0,
        "isCanEdit": 1,
        "isClick": 0,
        rowSpan:1,
        colSpan:1,
        "children": [
            {
                "key": "trans_consum",
                "title": "8",
                "onlyOneCell": 0,
                "isCanEdit": 1,
                "isClick": 0,
                "children": []
            },
        ]
    }]
}, {
    "title": "期末库存量",
    "onlyOneCell": 0,
    "isCanEdit": 1,
    "isClick": 0,
    rowSpan:2,
    colSpan:1,
    "children": [{

        "children": [{
            "key": "end_num",
            "title": "9",
            "onlyOneCell": 0,
            "isCanEdit": 1,
            "isClick": 0,
        }]
    }]
}, {
    "title": "采用折标系数",
    "onlyOneCell": 0,
    "isCanEdit": 1,
    "isClick": 0,
    rowSpan:2,
    colSpan:1,
    "children": [{

        "children": [{
            "key": "use_coeff",
            "title": "10",
            "onlyOneCell": 0,
            "isCanEdit": 1,
            "isClick": 0,
        }]
    }]
}, {
    "title": "参考折标系数",
    "onlyOneCell": 0,
    "isCanEdit": 1,
    "isClick": 0,
    rowSpan:2,
    colSpan:1,
    "children": [{

        "children": [{
            "key": "refer_coeff",
            "title": "丁",
            "onlyOneCell": 0,
            "isCanEdit": 1,
            "isClick": 0,
        }]
    }]
}]
export default {
    tableHeader
}
