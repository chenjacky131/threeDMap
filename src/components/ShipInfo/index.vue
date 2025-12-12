<template>
  <div class="ship-info-popup" v-if="store.state.showShipInfo">
    <div class="ship-name">{{ currentShipInfo.shipName }}</div>
    <div class="lnglat">
      <div>
        {{
          currentShipInfo.lng > 0
            ? `${currentShipInfo.lng.toFixed(2)} E`
            : `${currentShipInfo.lng.toFixed(2)} W`
        }}
      </div>
      <div>
        {{
          currentShipInfo.lat > 0
            ? `${currentShipInfo.lat.toFixed(2)} N`
            : `${currentShipInfo.lat.toFixed(2)} S`
        }}
      </div>
    </div>
    <div class="info">
      <div>
        航速
        <div class="val-div">{{ currentShipInfo.speed }}KN</div>
      </div>
      <div>
        艏向
        <div class="val-div">{{ currentShipInfo.heading }}°</div>
      </div>
      <div>
        航向
        <div class="val-div">{{ currentShipInfo.course }}°</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const currentShipInfo = computed(() => store.state.currentShipInfo)
</script>

<style scoped>
.ship-info-popup {
  position: absolute;
  right: 20px;
  top: 20px;
  width: 300px;
  height: auto;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 4px;
  color: #fff;
  padding: 10px;
  z-index: 2;
  .lnglat {
    font-size: 32px;
    text-align: center;
    line-height: 1.2;
  }
  .info {
    & > div {
      display: flex;
      .val-div {
        flex: 1;
        text-align: center;
      }
    }
  }
}
</style>
