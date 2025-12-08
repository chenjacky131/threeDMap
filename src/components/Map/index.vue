<template>
  <div id="map"></div>
</template>
<script setup>
import { onMounted } from 'vue'
import { Map } from '@/components/Map/map.js'
import { Ship } from '@/utils/ship.js'
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
#map {
  height: 100%;
  flex: 1;
  :deep(.maplibregl-canvas) {
    cursor: grab !important;
    &.pointer {
      cursor: pointer !important;
    }
  }
}
</style>
