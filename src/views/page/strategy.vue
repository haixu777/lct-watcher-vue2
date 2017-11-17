<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row stripe>
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="table-expand">
            <!-- <el-form-item label="CPU">
              <span>{{ props.row.CPU }}</span>
            </el-form-item>
            <el-form-item label="MEMORY">
              <span>{{ props.row.MEMORY }}</span>
            </el-form-item>
            <el-form-item label="DISK">
              <span>{{ props.row.DISK }}</span>
            </el-form-item> -->
          </el-form>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="序号" width="65">
        <template scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column> -->
      <el-table-column align="center" label='系统' width="95" fixed>
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
      <el-table-column label="end_point" align="center" width="110">
        <template scope="scope">
          {{scope.row.end_point}}
        </template>
      </el-table-column>
      <el-table-column label="operator" width="130" align="center">
        <template scope="scope">
          {{scope.row.operator}}
        </template>
      </el-table-column>
      <el-table-column label="right_value" width="130" align="center">
        <template scope="scope">
          {{scope.row.right_value}}
        </template>
      </el-table-column>
      <el-table-column label="func" width="130" align="center">
        <template scope="scope">
          {{scope.row.func}}
        </template>
      </el-table-column>
      <el-table-column label="max_step" width="130" align="center">
        <template scope="scope">
          {{scope.row.max_step}}
        </template>
      </el-table-column>
      <el-table-column label="note" width="130" align="center">
        <template scope="scope">
          {{scope.row.note}}
        </template>
      </el-table-column>
      <el-table-column label="下发邮箱" width="130" align="center">
        <template scope="scope">
          {{scope.row.email}}
        </template>
      </el-table-column>
      <el-table-column label="目前状态" align="center" fixed="right">
        <template scope="scope">
          {{scope.row.status}}
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
import { getList } from '@/api/strategy';
export default {
  data() {
    return {
      list: [],
      currentPage: 1,
      perItem: 15,
      totalItem: null,
      listLoading: false
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
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetch();
    }
  },
  mounted() {
    this.fetchList();
  }
}
</script>
