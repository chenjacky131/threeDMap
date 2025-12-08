<template>
  <div class="radar-and-video">
    <div class="radar">雷达</div>
    <div class="video" v-if="showVideo">视频</div>
  </div>
</template>
<script setup>
import { watch, ref } from 'vue'
const props = defineProps({
  mode: {
    type: String,
    default: 'map-engineRoom-radar',
  },
})
const showVideo = ref(false)
watch(
  () => props.mode,
  (newMode) => {
    showVideo.value = newMode === 'map-engineRoom-radar-camera'
  },
  { immediate: true },
)
</script>
<style lang="scss" scoped>
.radar-and-video {
  width: 400px;
  display: flex;
  flex-direction: column;
    background: #99d8fb;
  .radar,
  .video {
    flex: 1;
  }
}
</style>
