<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row stripe>
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="CPU">
              <span>{{ props.row.CPU }}</span>
            </el-form-item>
            <el-form-item label="MEMORY">
              <span>{{ props.row.MEMORY }}</span>
            </el-form-item>
            <el-form-item label="DISK">
              <span>{{ props.row.DISK }}</span>
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
          {{scope.row.module.app.name}}
        </template>
      </el-table-column>
      <el-table-column label="模块" width="110" align="center">
        <template scope="scope">
          {{scope.row.module.name}}
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
      <el-table-column label="状态" width="130" align="center">
        <template scope="scope">
          <el-tag :type="scope.row.fixed | statusFilter">{{ scope.row.fixed ? '已修复' : '故障中'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="time" label="时间" width="200">
        <template scope="scope">
          <i class="el-icon-time"></i>
          <span>{{formatTime(new Date(scope.row.time))}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="float:right;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[15, 30, 50, 100]"
      :page-size="perItem"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalItem">
    </el-pagination>
  </div>
</template>

<script>
import { getList } from '@/api/record'
export default {
  data() {
    return {
      list: [],
      perItem: 15,
      currentPage: 1,
      listLoading: false,
      totalItem: 100
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'danger',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  methods: {
    fetchList() {
      getList({
        perItem: this.perItem,
        currentPage: this.currentPage
      }).then((res) => {
        this.list = res.data.rows
        this.totalItem = res.data.count
      }).catch((err) => {
        console.log(err)
      })
    },
    handleSizeChange(size) {
      this.perItem = size;
      this.fetchList();
    },
    handleCurrentChange(index) {
      this.currentPage = index;
      this.fetchList();
    },
    formatTime(d) {
      return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
    }
  },
  mounted() {
    this.fetchList()
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
  }
</style>
