import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import * as turf from '@turf/turf'
import { map_source } from '@/utils/constant.js'
import store from '@/store/index.js'
const shipsLayerName = 'shipsLayer:84'
class Map {
  constructor() {}
  initMap(id) {
    this.map = new maplibregl.Map({
      container: id,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [118.16517, 24.48146],
      zoom: 11,
      style: {
        sources: map_source,
        version: 8,
        layers: [],
        // 使用相对路径，适应GitHub Pages子目录部署
        glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
      },
      attributionControl: false,
      fadeDuration: 0, //  去除渐隐渐显效果
      failIfMajorPerformanceCaveat: false, // 兼容低端设备,
      canvasContextAttributes: { antialias: true },
    })
    //  重写添加图层方法，增加自动按id名称中的(layerName:index)index的值来堆叠
    const originalAddLayer = this.map.addLayer
      const originalGetLayer = this.map.getLayer;
      const originalRemoveLayer = this.map.removeLayer;
    this.map.addLayer = function (layer, beforeId) {
      originalAddLayer.call(this, layer, beforeId)
      const allLayers = Object.keys(this.style._layers)
      const indexLayers = allLayers.filter((layer) => layer.indexOf(':') > -1)
      indexLayers.sort((a, b) => {
        //  按index倒叙排列
        const indexA = +a.split(':')[1]
        const indexB = +b.split(':')[1]
        return indexB - indexA
      })
      let layerIndex = indexLayers.findIndex((item) => item === layer.id)
      if (layerIndex > 0) {
        this.moveLayer(indexLayers[layerIndex], indexLayers[layerIndex - 1])
      }
      return this
    }
      this.map.removeLayer = function (layerName) {
        if (originalGetLayer.call(this, layerName)) {
          originalRemoveLayer.call(this, layerName);
        }
      };
    this.map.on('load', this.handleMapLoad.bind(this));
    this.map.on('click', (e) => { //  点击隐藏船舶信息
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: [shipsLayerName],
      });
      if (features.length === 0) {
        store.commit('SET_SHOW_SHIP_INFO', false);
        store.commit('SET_CURRENT_SHIP_INFO', null);
      }
    })
  }
  handleMapLoad() {
    this.switchMap('seaMapDayStandard')
  }
  switchMap(mapType) {
    this.clearExistTiles()
    this.map.addLayer({
      id: mapType + ':5',
      type: 'raster',
      source: mapType + ':5',
    })
    this.map.addLayer({
      id: 'addressInfo:6',
      type: 'raster',
      source: 'addressInfo:6',
    })
  }
  clearExistTiles() {
    // 清底图
    if (!this.map) return
    for (let key in this.map.style._layers) {
      if (Object.keys(map_source).includes(key)) {
        this.map.removeLayer(key)
      }
    }
  }
  //  设置地图鼠标状态
  setMouseCursor(type) {
    if (this.map) {
      const canvas = this.map.getCanvas();
      canvas.classList = "maplibregl-canvas " + type;
    }
  }
}
//  获取地图的像素与公里的比例
export const getMapRatio = (map) => {
  const y = map._container.clientHeight / 2
  const left = map.unproject([0, y])
  const right = map.unproject([10000, y])
  const maxMeters = left.distanceTo(right)
  const ratio = maxMeters / 10000
  return ratio
}

export { Map }
