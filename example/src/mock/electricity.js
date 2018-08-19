let tableBody = [
  {
      xuhao: '1',//序号
      code: '0001',
      type: {
          value: '出线(底数)',
          rowSpan: 2
      },//类型
      name: '依黄甲线电度表抄表',//云端表计名称
      alias: 'PM_YHJX',//别名
      note: '',//标注
      mark: 'B11',//标签
  },
  {
      xuhao: '2',//序号
      code: '0002',

      type: {
          value: '出线(底数)',
          rowSpan: 2
      },//类型
      name: '依黄乙线电度表抄表',//云端表计名称
      alias: 'PM_YHYX',//别名
      note: '',//标注
      mark: '',//标签
  },
  {
      xuhao: '3',//序号
      code: '0003',

      type: '#9高备变抄表（底数）正向有功',//类型
      name: '#9高备变抄表',//云端表计名称
      alias: 'PM_GBD_09',//别名
      note: '',//标注
      mark: 'B23',//标签
  },
  {
      xuhao: '4',//序号
      code: '0004',

      type: {
          value: '发电机出口电度表抄表（底数）/发电量',
          rowSpan: 3
      },//类型
      name: '#1机发电机出口电度表抄表',//云端表计名称
      alias: 'PM_FDJCK_01',//别名
      note: '',//标注
      mark: '',//标签
  },
  {
      xuhao: '5',//序号
      code: '0005',

      type: {
          value: '发电机出口电度表抄表（底数）/发电量',
          rowSpan: 3
      },//类型
      name: '#2机发电机出口电度表抄表',//云端表计名称
      alias: 'PM_FDJCK_02',//别名
      note: '',//标注
      mark: 'B14',//标签
  },
  {
      xuhao: '6',//序号
      code: '0006',
      type: {
          value: '发电机出口电度表抄表（底数）/发电量',
          rowSpan: 3
      },//类型
      name: '#3机发电机出口电度表抄表',//云端表计名称
      alias: 'PM_FDJCK_03',//别名
      note: '',//标注
      mark: 'B15',//标签
  },
]
let tableHeader = [
  {
      title: '序号',
      key: 'xuhao',
      "rowSpan": 2,
      
      isCanEdit: false,//该属性是否可编辑
  },
  {
      title: '类型',
      key: 'type',
      "rowSpan": 2,
      
      isCanEdit: false
  },
  {
      title: '云端表计名称',
      key: 'name',
      "rowSpan": 2,
      
      isCanEdit: true
  },
  {
      title: '表计别名',
      key: 'alias',
      "rowSpan": 2,
      
      isCanEdit: true
  },
  {
      title: 'A/B泵',
      // key: 'ab',
      key: 'note',
      
      isCanEdit: true,
      children: [{
          title: '标注',
          isCanEdit: true,
      }]
  },
  {
      title: '计算标签',
      "rowSpan": 2,
      
      key: 'mark',
      isCanEdit: false
  },

]
export default {
  tableBody, tableHeader
}
// (x,y)=>x+y