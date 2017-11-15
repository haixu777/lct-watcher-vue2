<template>
  <div class="app-container">
    <div class="_dashboard">
      <el-card class="_card" :body-style="{ padding: '0px' }" v-for="app in appStatus" :key="app.code">
        <img :src="require('@/assets/app_logo/'+app.code+'.png')" class="image">
        <div style="padding: 14px;">
          <span class="_tag" :style="app.status ? 'background:#19be6b;' : 'background:#ed3f14'"></span>
          <span style="font-size:14px;">{{ app.name }}</span>
          <div class="bottom clearfix" style="font-size:12px;">
            {{ app.status ? '正常' : '异常模块：' + app.module }}
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getAppStatus, getAppModuleList } from '@/api/home'
export default {
  data() {
    return {
      appStatus: [
        { name: '预制拦截', code: 'YZLJ', note: '', module: '', status: 1 },
        { name: '全网清查', code: 'QWQC', note: '', module: '', status: 1 },
        { name: '论坛贴吧', code: 'LTTB', note: '', module: '', status: 1 },
        { name: '聚合搜索', code: 'JHSS', note: '', module: '', status: 1 },
        { name: '相似系统', code: 'XSXT', note: '', module: '', status: 1 },
        { name: '音视频', code: 'YSP', note: '', module: '', status: 1 },
        { name: '直播系统', code: 'ZBXT', note: '', module: '', status: 1 },
        { name: '账号系统', code: 'ZHXT', note: '', module: '', status: 1 }
      ],
      appModuleList: [],
      currentStatus: []
    }
  },
  methods: {
    fetchAppStatus () {
      getAppStatus().then((res) => {
        res.data.forEach((item) => {
          this.appStatus.forEach((app) => {
            if (item.module.app.CODE == app.code) {
              app.status = 0;
              app.module = item.module.name;
              app.note = item.note;
            }
          })
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    fetchAppModuleList () {
      getAppModuleList().then((res) => {
        this.appModuleList = res.data
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.fetchAppStatus();
    this.fetchAppModuleList();

    this.$options.sockets.notice = (data) => {
      this.appModuleList.forEach((app) => {
        if (app.id == data.app_id) {
          this.appStatus.forEach((_app) => {
            if (_app.code == app.CODE) {
              _app.status = 0;
            }
          })
        }
      })
    }

    this.$options.sockets.noticeCancel = (data) => {
      this.appModuleList.forEach((app) => {
        if (app.id == data.app_id) {
          this.appStatus.forEach((_app) => {
            if (_app.code == app.CODE) {
              _app.status = 1;
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
._dashboard {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
._card {
  display: inline-block;
  width: 200px;
  height: 275px;
  margin: 15px;
}
._tag {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 8px;
  border-radius: 50%;
  background: #e9eaec;
  position: relative;
  top: 1px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>
