<template>
  <div class="app-container">
    <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" border stripe @cell-click="gotoEdit">
      <el-table-column label="日期" sortable prop="date" width="180" />
      <el-table-column label="用户名" sortable prop="name" width="180">
        <template v-slot="scope">
          <a :href="scope.row.uid">{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column label="住址" prop="id" />
    </el-table>
    <el-button @click="test">测试按钮</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          id: '上海市普陀区金沙江路 1518 弄',
          uid: '123'
        }, {
          date: '2016-05-04',
          name: '李二',
          id: '上海市普陀区金沙江路 1517 弄',
          uid: '456'
        }, {
          date: '2016-05-01',
          name: '张三',
          id: '上海市普陀区金沙江路 1519 弄',
          uid: '789'
        }, {
          date: '2016-05-03',
          name: '王四',
          id: '上海市普陀区金沙江路 1516 弄',
          uid: '0'
        }]
    }
  },
  methods: {
    test() {
      this.$message.info('测试')
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        return 'color:#1588dc'
      } else {
        return ''
      }
    },
    gotoEdit(row, column, cell, event) {
      if (column.label === '用户名') {
        console.log(row.uid)
        row.id = '测试'
      }
    }

  }
}
</script>
