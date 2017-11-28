<template>
  <div class="app-container">
    <div class="strategy_container">
      <div class="strategyTree">
        <h3 class="strategyTree_title">APP</h3>
        <el-tree
          highlight-current
          :data="treeData"
          :props="defaultProps"
          :render-content="renderContent"
          @node-click="handleNodeClick">
        </el-tree>
      </div>
      <div class="strategyContent">
        <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row stripe>
          <!-- <el-table-column type="expand">
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
          </el-table-column> -->
          <!-- <el-table-column align="center" label="序号" width="65">
            <template scope="scope">
              {{scope.$index+1}}
            </template>
          </el-table-column> -->
          <!-- <el-table-column align="center" label='系统' width="95" fixed>
            <template scope="scope">
              {{scope.row.module.app.name}}
            </template>
          </el-table-column>
          <el-table-column label="模块" width="110" align="center">
            <template scope="scope">
              {{scope.row.module.name}}
            </template>
          </el-table-column> -->
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
          <el-table-column label="状态" align="center">
            <template scope="scope">
              {{scope.row.status}}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="95">
            <template scope="scope">
              <el-button type="primary" icon="edit" size="mini" :disabled="Boolean(scope.row.update_stat)" @click="handleEdit(scope.row)"></el-button>
              <el-button type="danger" icon="delete" size="mini" :disabled="Boolean(scope.row.del_stat)" @click="handleDel(scope.row)"></el-button>
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
    </div>
  </div>
</template>

<script>
import { getList, handleDelToServer } from '@/api/strategy';
import { getAppModuleTree } from '@/api/home';

export default {
  data() {
    return {
      list: [],
      currentPage: 1,
      perItem: 15,
      totalItem: null,
      listLoading: false,
      treeData: [],
      moduleId: null,
      appId: null,
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  methods: {
    fetchList() {
      getList({
        perItem: this.perItem,
        currentPage: this.currentPage,
        appId: this.appId,
        moduleId: this.moduleId
      }).then((res) => {
        this.list = res.data.rows
        this.totalItem = res.data.count
      }).catch((err) => {
        console.log(err)
      })
    },
    fetchAppTree() {
      getAppModuleTree()
        .then((res) => {
          console.log(res)
          this.treeData = res.data
        }).catch((err) => {
          console.log(err)
        })
    },
    delToServer(id) {
      handleDelToServer(id).then((res) => {
        this.$message({
          type: 'success',
          message: res.msg
        })
        this.fetchList();
      }).catch((err) => {
        console.log(err)
      })
    },
    renderContent(h, { node, data, store }) {
      let trigger_add = Boolean(data.children) ? 'inline-block' : 'none'
      let trigger_del = Boolean(data.children) ? 'none' : 'inline-block'
      return (
        <span>
          <span>
            <span>{node.label}</span>
          </span>
          <span style={"float: right; margin-right: 20px;display:"+trigger_add}>
            <el-button size="mini" icon="plus" type="success"></el-button>
          </span>
          <span style={"float: right; margin-right: 20px;display:"+trigger_del}>
            <el-button size="mini" icon="delete" type="danger"></el-button>
          </span>
        </span>
      );
    },
    handleSizeChange(size) {
      this.perItem = size;
      this.fetchList();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchList();
    },
    handleNodeClick(app) {
      this.appId = null
      this.moduleId = null
      if (app.children) {
        this.appId = app.id
      } else {
        this.moduleId = app.id
      }
      this.fetchList();
    },
    handleEdit (strategy) {
      this.$message({
        type: 'info',
        message: '功能开发中...'
      });
    },
    handleDel (strategy) {
      this.$confirm('此操作将永久删除该条'+strategy.metric+'策略, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delToServer(strategy.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    }
  },
  mounted() {
    this.fetchList();
    this.fetchAppTree();
  }
}
</script>
<style lang="scss" socopd>
.strategy_container {
  min-width: 750px;
  .strategyTree {
    display: inline-block;
    width: 140px;
    .strategyTree_title {
      height: 40px;
      line-height: 40px;
      background: #eef1f6;
      text-align: center;
      border: 1px solid #dfe6ec;
      border-bottom: none;
    }
  }
  .strategyContent {
    display: inline-block;
    width: calc(99% - 140px);
    vertical-align: top;
  }
}
</style>
