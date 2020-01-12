<template>
  <div class="app-container">
    <el-table :data="tableData" style="width: 100%" border stripe>
      <el-table-column label="日期" prop="date" width="180" />
      <el-table-column label="用户名" prop="name" width="180" />
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
          id: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          id: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          id: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          id: '上海市普陀区金沙江路 1516 弄'
        }]
    }
  },
  methods: {
    test() {
      this.$message.info('测试')
    }
  }
}
</script>
