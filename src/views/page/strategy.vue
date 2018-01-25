<template>
  <div class="app-container">
    <div class="condition_area">
      <RadioGroup v-model="range" type="button" size="small" @on-change="fetchList">
        <Radio label="0">内网</Radio>
        <Radio label="-1">全部</Radio>
        <Radio label="1">外网</Radio>
      </RadioGroup>
    </div>
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
        <el-button type="warning" size="mini" style="width:100%;" @click="metricModalAddBtn">metric添加</el-button>
      </div>
      <div class="strategyContent">
        <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row stripe>
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
          <el-table-column label="数据类型" width="130" align="center">
            <template scope="scope">
              {{ scope.row.dataType }}
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
              <el-button type="primary" icon="edit" size="mini" :disabled="Boolean(scope.row.update_stat) || Boolean(scope.row.del_stat)" @click="handleEdit(scope.row)"></el-button>
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

    <!-- metric添加dialog start -->
    <Modal v-model="metricModal" width="400">
      <p slot="header" style="color:#f7ba2a;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>{{ metricAdd ? 'metric添加' : 'metric编辑' }}</span>
      </p>
        <div style="text-align:center">
          <Form :model="formMetric" ref="dynamicValidateForm" :rules="rules" :label-width="80">
            <FormItem label="所属模块" prop="">
              <Cascader :data="treeData" trigger="hover" v-model="ascaderMoudle" :disabled="!metricAdd"></Cascader>
            </FormItem>
            <FormItem label="所属范围" prop="range">
              <Select v-model="formMetric.range" placeholder="所属范围" :disabled="!metricAdd">
                <Option value="0">内网</Option>
                <Option value="1">外网</Option>
              </Select>
            </FormItem>
            <FormItem label="metric" prop="metric">
              <Input v-model="formMetric.metric" placeholder="Enter something..." :disabled="!metricAdd"></Input>
            </FormItem>
            <FormItem label="endPoint" prop="endPoint">
              <Input v-model="formMetric.endPoint" placeholder="Enter something..." :disabled="!metricAdd"></Input>
            </FormItem>
            <FormItem label="策略" prop="func">
              <span>if</span>
              <Input v-model="formMetric.func" class="strategy_input" placeholder="all(#1)"></Input>
              <Select v-model="formMetric.operator" class="strategy_input" placeholder="operator">
                <Option value="==">==</Option>
                <Option value="!=">!=</Option>
                <Option value="<"><</Option>
                <Option value="<="><=</Option>
                <Option value=">">></Option>
                <Option value=">=">>=</Option>
              </Select>
              <InputNumber class="strategy_input" :max="10" :min="1" v-model="formMetric.rightValue" placeholder="rightValue"></InputNumber>
            </FormItem>
            <FormItem label="maxStep" prop="maxStep">
              <InputNumber :max="10" :min="1" v-model="formMetric.maxStep" style="float:left;"></InputNumber>
              <span style="">间隔S</span>
              <InputNumber :max="86400" :min="1" :step="10" v-model="formMetric.step" style=""></InputNumber>
            </FormItem>
            <FormItem label="dataType" prop="dataType">
              <Select v-model="formMetric.dataType" placeholder="数据类型">
                <Option value="GAUGE">GAUGE</Option>
                <Option value="COUNTER">COUNTER</Option>
              </Select>
            </FormItem>
            <FormItem label="note" prop="note">
              <Input v-model="formMetric.note" type="textarea" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="email" prop="email">
              <Input v-model="formMetric.email" placeholder="多个email请用英文逗号分割"></Input>
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <Button type="primary" size="large" long @click="handleMetricAdd(metricAdd)">{{ metricAdd ? '添加' : '更新' }}</Button>
        </div>
    </Modal>
    <!-- metriv添加dialog end -->
  </div>
</template>

<script>
import { getList, handleDelToServer, addMetric, editMetric } from '@/api/strategy';
import { moduleDel, moduleAdd } from '@/api/module';
import { getAppModuleTree } from '@/api/home';

export default {
  data() {
    var validateIp = (rule, value, callback) => {
      var re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/
      if (value === '') {
        callback(new Error('请输入endPoint'));
      } else if (!(re.test(value))) {
        callback(new Error('endPoint格式不正确'));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      // var re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      var re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})([,，]([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6}))*$/
      if (value === '') {
        callback(new Error('请输入email'));
      } else if (!(re.test(value))) {
        callback(new Error('email格式不正确'));
      } else {
        callback();
      }
    };
    return {
      list: [],
      currentPage: 1,
      perItem: 15,
      totalItem: null,
      listLoading: false,
      treeData: [],
      moduleId: null,
      appId: null,
      range: -1,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      moduleAddName: null,
      metricModal: false,
      metricAdd: false,
      formMetric: {
        id: null,
        app: null,
        module: null,
        metric: null,
        endPoint: null,
        func: null,
        operator: null,
        rightValue: null,
        maxStep: 1,
        step: 1,
        note: null,
        email: null,
        dataType: 'GAUGE',
        range: 0
      },
      ascaderMoudle: [],
      rules: {
        ascaderMoudle: [
          // { required: true, message: '请选择app', trigger: 'blur' }
        ],
        metric: [
          { required: true, message: '请输入metric', trigger: 'blur' }
        ],
        endPoint: [
          { required: true, trigger: 'blur', validator: validateIp }
        ],
        func: [
          { required: true, message: '请配置策略', trigger: 'blur' }
        ],
        maxStep: [
          // { required: true, message: '请输入maxStep', trigger: 'blur' }
        ],
        note: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ],
        email: [
          { required: true, trigger: 'blur', validator: validateEmail }
        ],
        dataType: [
          { required: true, trigger: 'blur' }
        ],
        range: [
          { required: true, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    fetchList() {
      getList({
        perItem: this.perItem,
        currentPage: this.currentPage,
        appId: this.appId,
        moduleId: this.moduleId,
        range: this.range
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
        this.$Message.success(res.msg)
        this.fetchList();
      }).catch((err) => {
        console.log(err)
      })
    },
    delMoudleToServer(id) {
      moduleDel(id).then((res) => {
        this.$Message.success(res.data)
        this.fetchAppTree();
        this.fetchList();
      }).catch((err) => {
        console.log(err)
      })
    },
    addModuleToServer(appId, moduleName) {
      moduleAdd(appId, moduleName).then((res) => {
        this.$Message.success('模块添加成功!')
        this.fetchAppTree();
        this.fetchList();
      }).catch((err) => {
        console.log(err)
      })
    },
    addMetricToServer(formMetric) {
      addMetric(formMetric).then((res) => {
        this.$Message.success(res.msg)
        this.fetchList()
        this.metricModal = false
      }).catch((err) => {
        console.log(err)
      })
    },
    editMetricToServer(formMetric) {
      editMetric(formMetric).then((res) => {
        this.$Message.success(res.msg)
        this.fetchList()
        this.metricModal = false
      }).catch((err) => {
        console.log(err)
      })
    },
    renderContent(h, { node, data, store }) {
      let trigger_add = Boolean(data.children) ? 'inline-block' : 'none'
      let trigger_del = Boolean(data.children) ? 'none' : 'inline-block'
      let trigger_comfirm = true
      let temp_children = []
      if (data.children) {
        data.children.map((child) => {
          temp_children.push(child.label)
        })
      }
      const __moduleAdd_btn = h('el-button', {
        props: {
          type: 'success',
          size: 'mini',
          icon: 'plus'
        },
        nativeOn: {
          click: () => {
            this.$Modal.confirm({
              onOk: () => {
                if (!trigger_comfirm) {
                  this.$Message.error('module重复，无法添加!')
                } else {
                  this.addModuleToServer(data.value, this.moduleAddName)
                }
              },
              onCancel: () => {
                this.$Message.info('取消操作')
              },
              render: (h) => {
                return h('Input', {
                  props: {
                    value: null,
                    autofocus: true,
                    placeholder: '请输入需要添加的module名'
                  },
                  on: {
                    input: (val) => {
                      trigger_comfirm = true
                      temp_children.forEach((child) => {
                        if (child == val) {
                          trigger_comfirm = false
                        }
                      })
                      this.moduleAddName = val
                    }
                  }
                })
              }
            })
          }
        }
      })

      const __moduleDel_btn = h('Poptip',{
        props: {
          title: `确定删除模块：${data.label}？`,
          confirm: true
        },
        on: {
          'on-ok': () => {
            this.delMoudleToServer(data.value)
          },
          'on-cancel': () => {
            this.$Message.info('已取消删除')
          }
        }
      }, [
        h('el-button', {
          props: {
            type: 'danger',
            size: 'mini',
            icon: 'delete'
          }
        })
      ])

      return (
        <span>
          <span>
            <span>{node.label}</span>
          </span>
          <span style={"float: right; margin-right: 20px;display:"+trigger_add}>
            {__moduleAdd_btn}
          </span>
          <span style={"float: right; margin-right: 20px;display:"+trigger_del}>
            {__moduleDel_btn}
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
        this.appId = app.value
      } else {
        this.moduleId = app.value
      }
      this.fetchList();
    },
    handleEdit (strategy) {
      this.ascaderMoudle = [strategy.app_id, strategy.module_id]
      this.formMetric = {
        id: strategy.id,
        metric: strategy.metric,
        endPoint: strategy.end_point,
        func: strategy.func,
        operator: strategy.operator,
        rightValue: Number(strategy.right_value),
        maxStep: strategy.max_step,
        step: strategy.step,
        note: strategy.note,
        email: strategy.email,
        dataType: strategy.dataType,
        range: strategy.intranet + ''
      }
      this.metricModal = true
      this.metricAdd = false
    },
    handleDel (strategy) {
      this.$confirm('此操作将永久删除该条'+strategy.metric+'策略, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delToServer(strategy.id)
      }).catch(() => {
        this.$Message.info('已取消删除')
      })
    },
    metricModalAddBtn () {
      this.ascaderMoudle = []
      this.formMetric = {
        app: null,
        module: null,
        metric: null,
        endPoint: null,
        func: null,
        operator: null,
        rightValue: null,
        maxStep: 1,
        step: 10,
        note: null,
        email: null,
        dataType: 'GAUGE',
        range: 0
      }
      this.metricModal = true
      this.metricAdd = true
    },
    handleMetricAdd (isAdd) {
      if (isAdd) { // 添加
        if (this.ascaderMoudle.length == 0) { // 表单验证 app
          this.$Message.error('请选择metric所属app模块')
        } else {
          this.formMetric.app = this.ascaderMoudle[0]
          this.formMetric.module = this.ascaderMoudle[1]
          this.$refs['dynamicValidateForm'].validate((valid) => {
            if (valid) {
              this.addMetricToServer(this.formMetric)
            } else {
              this.$Message.error('表单验证失败');
            }
          })
        }
      } else { // 编辑
        this.$refs['dynamicValidateForm'].validate((valid) => {
          if (valid) {
            this.editMetricToServer(this.formMetric)
          } else {
            this.$Message.error('表单验证失败');
          }
        })
      }
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
.strategy_input {
  display: inline-block;
  width: 31%;
}
</style>
