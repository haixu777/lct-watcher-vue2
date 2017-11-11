<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row stripe>
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="CPU">
              <span>{{ props.row.cpu }}</span>
            </el-form-item>
            <el-form-item label="MEMORY">
              <span>{{ props.row.memory }}</span>
            </el-form-item>
            <el-form-item label="DISK">
              <span>{{ props.row.disk }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" label="序号" width="65">
        <template scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='系统' width="95">
        <template scope="scope">
          {{scope.row.appName}}
        </template>
      </el-table-column>
      <el-table-column label="模块" width="110" align="center">
        <template scope="scope">
          {{scope.row.moduleName}}
        </template>
      </el-table-column>
      <el-table-column label="metric" width="110" align="center">
        <template scope="scope">
          <span>{{scope.row.metric}}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template scope="scope">
          {{scope.row.desc}}
        </template>
      </el-table-column>
      <el-table-column label="通知状态" width="130" align="center">
        <template scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="time" label="时间" width="200">
        <template scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.time}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          appName: '预制拦截',
          moduleName: 'xx模块',
          metric: 'metric_asd',
          desc: '三大困难时刻记得你啊离开我们的离开',
          time: '2017-11-07 14:32:02',
          status: '邮件发送成功',
          cpu: '123',
          memory: '222',
          disk: '239Mb'
        },
        {
          appName: '预制拦截',
          moduleName: 'xx模块',
          metric: 'metric_asd',
          desc: '三大困难时刻记得你啊离开我们的离开',
          time: '2017-11-07 14:32:02',
          status: '邮件发送失败',
          cpu: '932',
          memory: '23',
          disk: '123Mb'
        }
      ],
      listLoading: false
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        邮件发送成功: 'success',
        邮件发送失败: 'danger',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 25%;
  }
</style>
