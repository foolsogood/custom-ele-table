let tableBody=[{
	"realNum": "100",
	"useCoeff": "0.72",
	"code": "01",
	"transConsum": "",
	"industryConsum": "11",
	"total": {
		"code": "01",
		"key": "total",
		"type": "",
		"fnParms": [{
			"code": "01",
			"key": "industryConsum"
		}, {
			"code": "01",
			"key": "deindustryConsum"
		}],
		"parmArrs": null,
		"fn": "function(){return Array.prototype.reduce.call(arguments,(a,b)=>a+b)}",
		"cal": null,
		"isCanEdit": 0,
		"value": "35"
	},
	"money": "0.1",
	"material": "",
	"referCoeff": "0.71",
	"beginNum": "100",
	"energyName": "原煤",
	"endNum": {
		"code": "01",
		"key": "endNum",
		"type": "",
		"fnParms": [{
			"code": "01",
			"key": "beginNum"
		}, {
			"code": "01",
			"key": "realNum"
		}, {
			"code": "01",
			"key": "total"
		}],
		"parmArrs": null,
		"fn": "function(a,b,c){return(a+b-c)}",
		"cal": null,
		"isCanEdit": 0,
		"value": "165"
	},
	"energyUnit": "吨",
	"energyCode": "01",
	"deindustryConsum": "24"
}, {
	"realNum": "",
	"useCoeff": "1.786",
	"code": "02",
	"transConsum": "",
	"industryConsum": "4",
	"total": {
		"code": "14",
		"key": "total",
		"type": "",
		"fnParms": [{
			"code": "14",
			"key": "industryConsum"
		}, {
			"code": "14",
			"key": "deindustryConsum"
		}],
		"parmArrs": null,
		"fn": "function(){return Array.prototype.reduce.call(arguments,(a,b)=>a+b)}",
		"cal": null,
		"isCanEdit": 0,
		"value": ""
	},
	"money": "",
	"material": "",
	"referCoeff": "1.786",
	"beginNum": "2",
	"energyName": "发生炉煤气",
	"endNum": {
		"code": "14",
		"key": "endNum",
		"type": "",
		"fnParms": [{
			"code": "14",
			"key": "beginNum"
		}, {
			"code": "14",
			"key": "realNum"
		}, {
			"code": "14",
			"key": "total"
		}],
		"parmArrs": null,
		"fn": "function(a,b,c){return(a+b-c)}",
		"cal": null,
		"isCanEdit": 0,
		"value": ""
	},
	"energyUnit": "万立方米",
	"energyCode": "14",
	"deindustryConsum": ""
}, {
	"realNum": "",
	"useCoeff": "",
	"code": "40",
	"transConsum": "",
	"industryConsum": "11",
	"total": "",
	"money": {
		"code": "40",
		"key": "money",
		"type": "",
		"fnParms": [{
			"code": "01",
			"key": "money"
		}, {
			"code": "02",
			"key": "money"
		}],
		"parmArrs": null,
		"fn": "function(){return Array.prototype.reduce.call(arguments,(a,b)=>a+b)}",
		"cal": null,
		"isCanEdit": 0,
		"value": ""
	},
	"material": "",
	"referCoeff": "",
	"beginNum": {
		"code": "40",
		"key": "beginNum",
		"type": "",
		"fnParms": [{
			"code": "01",
			"key": "beginNum"
		}, {
			"code": "01",
			"key": "useCoeff"
		}, {
			"code": "02",
			"key": "beginNum"
		}, {
			"code": "02",
			"key": "useCoeff"
		}],
		"parmArrs": null,
		"fn": "function(a1,b1,a2,b2){return (a1*b1+a2*b2)}",
		"cal": null,
		"isCanEdit": 0,
		"value": ""
	},
	"energyName": "能源合计",
	"endNum": "",
	"energyUnit": "吨标准煤",
	"energyCode": "40",
	"deindustryConsum": ""
}]
let tableHeader=[{
	"title": "能源名称",
	"onlyOneCell": 0,
	"isCanEdit": 0,
	"isClick": 1,
	"rowSpan": 2,
	"colSpan": 1,
	"children": [{
		"children": [{
			"key": "energyName",
			"title": "甲",
			"onlyOneCell": 0,
			"isCanEdit": 0,
			"isClick": 0,
			"rowSpan": 1,
			"colSpan": 1,
			"children": []
		}]
	}]
}, {
	"title": "计量单位",
	"onlyOneCell": 0,
	"isCanEdit": 0,
	"isClick": 0,
	"rowSpan": 2,
	"colSpan": 1,
	"children": [{
		"children": [{
			"key": "energyUnit",
			"title": "乙",
			"onlyOneCell": 0,
			"isCanEdit": 0,
			"isClick": 0,
			"rowSpan": 1,
			"colSpan": 1,
			"children": []
		}]
	}]
}, {
	"title": "代码",
	"onlyOneCell": 0,
	"isCanEdit": 0,
	"isClick": 0,
	"rowSpan": 2,
	"colSpan": 1,
	"children": [{
		"children": [{
			"key": "energyCode",
			"title": "丙",
			"onlyOneCell": 0,
			"isCanEdit": 1,
			"isClick": 0,
			"rowSpan": 1,
			"colSpan": 1,
			"children": []
		}]
	}]
}, {
	"title": "期初库存量",
	"onlyOneCell": 0,
	"isCanEdit": 1,
	"isClick": 0,
	"rowSpan": 2,
	"colSpan": 1,
	"children": [{
		"children": [{
			"key": "beginNum",
			"title": "1",
			"onlyOneCell": 0,
			"isCanEdit": 1,
			"isClick": 0,
			"rowSpan": 1,
			"colSpan": 1,
			"children": []
		}]
	}]
}, {
	"title": "购进量",
	"onlyOneCell": 0,
	"isCanEdit": 1,
	"isClick": 0,
	"rowSpan": 1,
	"colSpan": 2,
	"children": [{
		"title": "实物量",
		"onlyOneCell": 0,
		"isCanEdit": 1,
		"isClick": 0,
		"rowSpan": 1,
		"colSpan": 1,
		"children": [{
			"key": "realNum",
			"title": "2",
			"onlyOneCell": 0,
			"isCanEdit": 1,
			"isClick": 0,
			"rowSpan": 1,
			"colSpan": 1,
			"children": []
		}]
	}, {
		"title": "金额(千元)",
		"onlyOneCell": 0,
		"isCanEdit": 1,
		"isClick": 0,
		"rowSpan": 1,
		"colSpan": 1,
		"children": [{
			"key": "money",
			"title": "3",
			"onlyOneCell": 0,
			"isCanEdit": 1,
			"isClick": 0,
			"rowSpan": 1,
			"colSpan": 1,
			"children": []
		}]
	}]
}, {
	"title": "消费量",
	"onlyOneCell": 0,
	"isCanEdit": 1,
	"isClick": 0,
	"rowSpan": 1,
	"colSpan": 5,
	"children": [{
		"title": "合计",
		"onlyOneCell": 0,
		"isCanEdit": 1,
		"isClick": 0,
		"rowSpan": 1,
		"colSpan": 1,
		"children": [{
			"key": "total",
			"title": "4",
			"onlyOneCell": 0,
			"isCanEdit": 1,
			"isClick": 0,
			"rowSpan": 1,
			"colSpan": 1,
			"children": []
		}]
	}, {
		"title": "工业生产消费",
		"onlyOneCell": 0,
		"isCanEdit": 1,
		"isClick": 0,
		"rowSpan": 1,
		"colSpan": 1,
		"children": [{
			"key": "industryConsum",
			"title": "5",
			"onlyOneCell": 0,
			"isCanEdit": 1,
			"isClick": 0,
			"rowSpan": 1,
			"colSpan": 1,
			"children": []
		}]
	}, {
		"title": "用于原材料",
		"onlyOneCell": 0,
		"isCanEdit": 1,
		"isClick": 0,
		"rowSpan": 1,
		"colSpan": 1,
		"children": [{
			"key": "material",
			"title": "6",
			"onlyOneCell": 0,
			"isCanEdit": 1,
			"isClick": 0,
			"rowSpan": 1,
			"colSpan": 1,
			"children": []
		}]
	}, {
		"title": "非工业生产消费",
		"onlyOneCell": 0,
		"isCanEdit": 1,
		"isClick": 0,
		"rowSpan": 1,
		"colSpan": 1,
		"children": [{
			"key": "deindustryConsum",
			"title": "7",
			"onlyOneCell": 0,
			"isCanEdit": 1,
			"isClick": 0,
			"rowSpan": 1,
			"colSpan": 1,
			"children": []
		}]
	}, {
		"title": "合计中：运输工具消费",
		"onlyOneCell": 0,
		"isCanEdit": 1,
		"isClick": 0,
		"rowSpan": 1,
		"colSpan": 1,
		"children": [{
			"key": "transConsum",
			"title": "8",
			"onlyOneCell": 0,
			"isCanEdit": 1,
			"isClick": 0,
			"rowSpan": 1,
			"colSpan": 1,
			"children": []
		}]
	}]
}, {
	"title": "期末库存量",
	"onlyOneCell": 0,
	"isCanEdit": 1,
	"isClick": 0,
	"rowSpan": 2,
	"colSpan": 1,
	"children": [{
		"children": [{
			"key": "endNum",
			"title": "9",
			"onlyOneCell": 0,
			"isCanEdit": 1,
			"isClick": 0,
			"rowSpan": 1,
			"colSpan": 1,
			"children": []
		}]
	}]
}, {
	"title": "采用折标系数",
	"onlyOneCell": 0,
	"isCanEdit": 1,
	"isClick": 0,
	"rowSpan": 2,
	"colSpan": 1,
	"children": [{
		"children": [{
			"key": "useCoeff",
			"title": "10",
			"onlyOneCell": 0,
			"isCanEdit": 1,
			"isClick": 0,
			"rowSpan": 1,
			"colSpan": 1,
			"children": []
		}]
	}]
}, {
	"title": "参考折标系数",
	"onlyOneCell": 0,
	"isCanEdit": 0,
	"isClick": 0,
	"rowSpan": 2,
	"colSpan": 1,
	"children": [{
		"children": [{
			"key": "referCoeff",
			"title": "丁",
			"onlyOneCell": 0,
			"isCanEdit": 0,
			"isClick": 0,
			"rowSpan": 1,
			"colSpan": 1,
			"children": []
		}]
	}]
}]
export default {
    tableBody, tableHeader
}