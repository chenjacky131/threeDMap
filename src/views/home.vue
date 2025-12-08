<template>
  <div class="home">
    <Map />
    <EngineRoom v-if="mode === 'map-engineRoom' || mode === 'map-engineRoom-radar' || mode === 'map-engineRoom-radar-camera'"/>
    <RadarAndVideo v-if="mode === 'map-engineRoom-radar' || mode === 'map-engineRoom-radar-camera'" :mode="mode"/>
    <div class="nav">
      <div class="nav-item" v-for="item in navItems" @click="changeMode(item)">
        {{ item.name }}
      </div>
    </div>
    <div class="ship-info-popup">
      船舶信息
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import Map from '@Components/Map/index.vue';
import EngineRoom from '@Components/EngineRoom/index.vue';
import RadarAndVideo from '@Components/RadarAndVideo/index.vue';
const mode = ref("map");
const navItems = ref([
  { name: '海图', mode: 'map'},
  { name: '海图+机舱', mode: 'map-engineRoom'},
  { name: '海图+机舱+雷达', mode: 'map-engineRoom-radar'},
  { name: '海图+机舱+雷达+摄像头', mode: 'map-engineRoom-radar-camera'},
])
function changeMode(item) {
  mode.value = item.mode;
}
</script>
<style scoped>
.home {
  height: 100vh;
  padding-bottom: 40px;
  box-sizing: border-box;
  display: flex;
  .nav{
    position: absolute;
    bottom: 0;
    display: flex;
    line-height: 40px;
    left: 0;
    right: 0;
    background: #99d8fb;
    border-top: 1px solid #fff;
    .nav-item{
      padding: 0 10px;
      cursor: pointer;
    }
  }
}
.ship-info-popup {
    position: absolute;
    right: 0;
    top: 0;
    width: 300px;
    height: auto;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 4px;
    color: #fff;
}
</style>
