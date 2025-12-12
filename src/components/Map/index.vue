<template>
  <div class="map-container">
    <div id="map">
      <ShipInfo />
      <Alarm />
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { Map } from '@/components/Map/map.js'
import { Ship } from '@/utils/ship.js'
import ShipInfo from '@Components/ShipInfo/index.vue';
import Alarm from '@Components/Alarm/index.vue';
let mapInstance, shipInstance
onMounted(() => {
  mapInstance = new Map()
  mapInstance.initMap('map')
  mapInstance.map.on('load', () => {
    shipInstance = new Ship(mapInstance.map)
    shipInstance.init()
  })
})
</script>
<style scoped lang="scss">
.map-container {
  height: 100%;
  flex: 1;
  position: relative;
}
#map {
  height: 100%;
  :deep(.maplibregl-canvas) {
    cursor: grab !important;
    &.pointer {
      cursor: pointer !important;
    }
  }
}
</style>
