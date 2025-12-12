<template>
  <div class="alarm-popup" v-if="store.state.showShipInfo">
    <div class="cont-wrap">
      <div class="table-tit">导航系统告警</div>
      <div class="table-cont">
        <table>
          <thead>
            <tr>
              <th>标号</th>
              <th>状态</th>
              <th>描述</th>
              <th>确认</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td><img class="alarm-icon" :src="triRed" /></td>
              <td>AIS目标丢失</td>
              <td class="color-blue">未确认</td>
            </tr>
            <tr>
              <td>2</td>
              <td><img class="alarm-icon" :src="triRed" /></td>
              <td>穿越安全等深线</td>
              <td class="color-blue">未确认</td>
            </tr>
            <tr>
              <td>3</td>
              <td><img class="alarm-icon" :src="triRed" /></td>
              <td>风速风向仪无数据</td>
              <td class="color-blue">未确认</td>
            </tr>
            <tr>
              <td>4</td>
              <td><img class="alarm-icon" :src="triRed" /></td>
              <td>Head-Depth无数据</td>
              <td class="color-blue">未确认</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-tab">
        <div class="tab-item active">警报</div>
        <div class="tab-item">警告</div>
        <div class="tab-item">警示</div>
      </div>
    </div>
    <div class="cont-wrap">
      <div class="table-tit">机舱系统告警</div>
      <div class="table-cont">
        <table>
          <thead>
            <tr>
              <th>标号</th>
              <th>状态</th>
              <th>描述</th>
              <th>来源</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td><img class="alarm-icon" :src="triRed" /></td>
              <td>随动功能障碍</td>
              <td>未确认</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-tab">
        <div class="tab-item">主机</div>
        <div class="tab-item">齿轮箱</div>
        <div class="tab-item">1#发电机</div>
        <div class="tab-item">2#发电机</div>
        <div class="tab-item">3#发电机</div>
        <div class="tab-item">配电板</div>
        <div class="tab-item active">操舵仪</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from 'vuex';
import triRed from '@/assets/icons/tri-red.png'

const store = useStore()
</script>

<style scoped>
.alarm-popup {
  position: absolute;
  background: #162a6f;
  color: #fff;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  z-index: 2;
  .cont-wrap {
    width: 50%;
    padding: 0 10px;
    overflow: hidden;
    & + .cont-wrap {
      border-left: 1px solid #ccc;
    }
    .table-tit {
      font-size: 14px;
      padding: 4px 0;
    }
    .table-cont {
      font-size: 12px;
      min-height: 194px;
      table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid #ccc;
        text-align: center;
        th,
        td {
          border: 1px solid #ccc;
          padding: 5px;
        }
      }
      .color-blue {
        color: #3764ff;
      }
      .alarm-icon {
        width: 30px;
        vertical-align: middle;
      }
    }
    .table-tab {
      margin: 4px 0;
      display: flex;
      justify-content: center;
      border: 1px solid #ccc;
      .tab-item {
        padding: 0 10px;
        cursor: pointer;
        flex: 1;
        text-align: center;
        color: #3764ff;
        + .tab-item {
          border-left: 1px solid #ccc;
        }
        &.active {
          background: #3764ff;
          color: #fff;
        }
      }
    }
  }
}
</style>
