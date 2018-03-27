<template>
  <div class="app-container">
    <div class="condtion_container">
      <div class="condtion_item">
        <span class="label">时间范围</span>
        <DatePicker
          type="daterange"
          v-model="condition.timeRange"
          placement="bottom-start"
          placeholder="请选择时间范围"
          confirm
          style="width: 200px"
          @on-ok="fetchList"
          @on-clear="clearTime">
        </DatePicker>
      </div>
      <div class="condtion_item">
        <span class="label">系统</span>
        <Select v-model="condition.appId" style="width:100px" clearable @on-change="fetchList">
          <!-- <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option> -->
          <Option v-for="app in appList" :value="app.id" :key="app.id">{{ app.name }}</Option>
        </Select>
      </div>
      <div class="condtion_item">
        <span class="label">状态</span>
        <Select v-model="condition.status" style="width:100px" @on-change="fetchList">
          <!-- <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option> -->
          <Option :value="-1" :key="-1">{{ '所有' }}</Option>
          <Option :value="1" :key="1">{{ '已修复' }}</Option>
          <Option :value="0" :key="0">{{ '未修复' }}</Option>
        </Select>
      </div>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row stripe>
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="CPU">
              <div v-for="value, label in JSON.parse(props.row.CPU)" v-if="value">{{ (label + ':' + value) }}</div>
            </el-form-item>
            <el-form-item label="MEMORY">
              <div v-for="value, label in JSON.parse(props.row.MEMORY)" v-if="value">{{ (label + ':' + value) }}</div>
            </el-form-item>
            <el-form-item label="DISK">
              <div v-for="value, label in JSON.parse(props.row.DISK)" v-if="value">{{ (label + ':' + value) }}</div>
            </el-form-item>
            <el-form-item label="故障快照" v-if="props.row.snapshot">
              <vue-images
                :imgs="[{imageUrl: props.row.snapshot}]"
                class="snapshot_photo"
                modalclose>
              </vue-images>
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
      <el-table-column align="center" prop="time" label="时间" width="250">
        <template scope="scope">
          <p>
            <span style="color:#f30;">发生</span>
            <i class="el-icon-time"></i>
            <span>{{formatTime(new Date(scope.row.time))}}</span>
          </p>
          <p v-if="scope.row.fix_time">
            <span style="color:#13ce66;">修复</span>
            <i class="el-icon-time"></i>
            <span>{{formatTime(new Date(scope.row.time))}}</span>
          </p>
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
import { getAppModuleList } from '@/api/home'
const vueImages = require('vue-images')

export default {
  data() {
    return {
      list: [],
      perItem: 15,
      currentPage: 1,
      listLoading: false,
      totalItem: 100,
      appList: [],
      condition: {
        appId: 0,
        timeRange: [],
        status: -1
      }
    }
  },
  components: {
    vueImages: vueImages.default
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
        currentPage: this.currentPage,
        app_id: this.condition.appId,
        timeStart: this.condition.timeRange[0],
        timeEnd: this.condition.timeRange[1],
        status: this.condition.status
      }).then((res) => {
        this.list = res.data.rows
        this.totalItem = res.data.count
      }).catch((err) => {
        console.log(err)
      })
    },
    fetchAppList() {
      getAppModuleList()
        .then((res) => {
          this.appList = res.data
        }).catch((err) => {
          console.log(err)
        })
    },
    handleSizeChange(size) {
      this.perItem = size
      this.fetchList()
    },
    handleCurrentChange(index) {
      this.currentPage = index
      this.fetchList()
    },
    formatTime(d) {
      return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
    },
    clearTime() {
      this.condition.timeRange = []
      this.fetchList()
    }
  },
  mounted() {
    if (this.$route.query.app) {
      this.condition.appId = this.$route.query.app
      this.condition.status = 0
    }
    this.fetchAppList()
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
    margin-bottom: 20px;
    width: 50%;
    .snapshot_photo {
      img {
        width: 100%;
        height: 250px;
        border: 3px solid #13ce66;
      }
    }
  }
  .fancybox .image-wrapper .image {
    max-height: calc(100vh - 180px) !important;
    height: calc(100vh - 180px) !important;
    min-height: 200px;
  }
  .condtion_container {
    .condtion_item {
      display: inline-block;
      margin-right: 40px;
      border-radius: 5px;
      background: #4f96c0;
      .label {
        color: #fff;
      }
    }
  }
</style>
