import { getMapRatio } from '@/components/Map/map.js'
import { mockData1, mockData2,mockData3, mockData4,mockData5,mockData6,mockData7,mockData8,mockData9,mockData10,mockData11,mockData12,mockData13,mockData14, mockData15 } from '../mock/index.js'
import * as turf from '@turf/turf'
import store from '@/store/index.js'
const shipsLayerName = 'shipsLayer:84'
const shipsNameLayerName = 'shipsNameLayer:86'
const triangleShipSize = 0.5 //  三角形船图标的尺寸，1倍尺寸是20*39
const shipWidthInPs = 160 // 大船图标的宽度
const shipLengthInPs = 600 // 大船图标的长度
const transformLength = (partPixexLength, pixelLength, realLength) => {
  //  船长转像素长度
  return realLength * (partPixexLength / pixelLength)
}
class Ship {
  constructor(map) {
    this.map = map
    this.pollingTimer
    this.shipData = []
    this.requirePolling = true //  停止轮询控制变量

    this.shipsGeoJson = {
      //  船舶geojson数据
      type: 'FeatureCollection',
      features: [],
    }
    this.shipsLayer = {
      id: shipsLayerName,
      type: 'fill',
      source: 'shipsSource',
      paint: {
        'fill-color': '#70500cff',
        'fill-outline-color': '#0066ffff',
      },
    }
    this.bindHandleClick = this.handleClick.bind(this);
    this.counter = 1;
  }
  init() {
    this.map.on('zoomend', this.generateShipGeoJson.bind(this))
    this.map.on('zoomstart', () => {
      this.map.removeLayer(shipsLayerName)
      this.map.removeLayer(shipsNameLayerName)
    })
    this.map.on("mouseenter", shipsLayerName, this.handleMouseEnter.bind(this));
    this.map.on("mouseleave", shipsLayerName, this.handleMouseLeave.bind(this));
    this.map.on("click", shipsLayerName, this.bindHandleClick);
    this.pollingData()
  }
  //  设置地图鼠标状态
  setMouseCursor(type) {
    if (this.map) {
      const canvas = this.map.getCanvas();
      canvas.classList = "maplibregl-canvas " + type;
    }
  }
  //  处理船舶鼠标进入事件
  handleMouseEnter() {
    this.setMouseCursor("pointer");
  }
  //  处理船舶鼠标离开事件
  handleMouseLeave() {
    this.setMouseCursor("");
  }
  handleClick(e){
    //  点击弹出船舶信息
    const features = this.map.queryRenderedFeatures(e.point, {
      layers: [shipsLayerName],
    });
    const feature = features[0];
    const properties = feature.properties;
    store.commit('SET_SHOW_SHIP_INFO', true)
    store.commit('SET_CURRENT_SHIP_INFO', properties)
  }
  requestData() {
    //  请求船舶数据并绘制
    return new Promise((resolve, _) => {
      setTimeout(() => {
        switch(this.counter){
          case 1:
            this.shipData = [...mockData1];
            break;
          case 2:
            this.shipData = [...mockData2];
            break;
          case 3:
            this.shipData = [...mockData3];
            break;
          case 4:
            this.shipData = [...mockData4];
            break;
          case 5:
            this.shipData = [...mockData5];
            break;
          case 6:
            this.shipData = [...mockData6];
            break;
          case 7:
            this.shipData = [...mockData7];
            break;
          case 8:
            this.shipData = [...mockData8];
            break;
          case 9:
            this.shipData = [...mockData9];
            break;
          case 10:
            this.shipData = [...mockData10];
            break;
          case 11:
            this.shipData = [...mockData11];
            break;
          case 12:
            this.shipData = [...mockData12];
            break;
          case 13:
            this.shipData = [...mockData13];
            break;
          case 14:
            this.shipData = [...mockData14];
            break;
          case 15:
            this.shipData = [...mockData15];
            break;
        }
        this.generateShipGeoJson()
        this.counter +=1;
        if(this.counter > 15){
          this.counter = 1;
        }
        resolve(this.shipData)
      }, 1000)
    })
  }
  pollingData() {
    //  轮询船舶数据
    this.requestData().then(() => {
      if (this.requirePolling) {
        this.pollingData()
      }
    })
  }
  getBigShipCoords(
    center,
    shipW,
    shipL,
    map,
    centerObj = {
      toHead: 0,
      toRight: 0,
      toTail: 0,
      toLeft: 0,
    },
  ) {
    //  获取大船的坐标
    let { toHead, toRight, toTail, toLeft } = centerObj
    toHead = toHead || 0
    toRight = toRight || 0
    toTail = toTail || 0
    toLeft = toLeft || 0
    if (toHead === 0) {
      toHead = (shipL * 3) / 4
    }
    if (toTail === 0) {
      toTail = (shipL * 1) / 4
    }
    toRight = (shipW * 1) / 2
    toLeft = (shipW * 1) / 2
    const ratio = getMapRatio(map)
    const shipWidth = shipW / ratio
    const shipLength = shipL / ratio
    const { x, y } = map.project(center)
    const toHeadInPixel = toHead / ratio
    const toRightInPixel = toRight / ratio
    const toTailInPixel = toTail / ratio
    const toLeftInPixel = toLeft / ratio
    const isOnLeftSide = toLeft < toRight
    const _3_4LengthInPixel = shipLength * (3 / 4)
    const _1_4LengthInPixel = shipLength * (1 / 4)
    const isOnTopSide = toHeadInPixel < _3_4LengthInPixel
    //  centerX, centerY四分之一船长居中的位置
    const centerX = isOnLeftSide
      ? x + (shipWidth / 2 - toLeftInPixel)
      : x - (shipWidth / 2 - toRightInPixel)
    const centerY = isOnTopSide
      ? y + (_3_4LengthInPixel - toHeadInPixel)
      : y - (_1_4LengthInPixel - toTailInPixel)
    const _p1 = map.unproject([centerX, centerY - transformLength(420, shipLengthInPs, shipLength)])
    const _p2 = map.unproject([
      centerX + transformLength(50, shipWidthInPs, shipWidth),
      centerY - transformLength(370, shipLengthInPs, shipLength),
    ])
    const _p3 = map.unproject([
      centerX + transformLength(80, shipWidthInPs, shipWidth),
      centerY - transformLength(320, shipLengthInPs, shipLength),
    ])
    const _p4 = map.unproject([
      centerX + transformLength(80, shipWidthInPs, shipWidth),
      centerY + transformLength(140, shipLengthInPs, shipLength),
    ])
    const _p5 = map.unproject([
      centerX + transformLength(57, shipWidthInPs, shipWidth),
      centerY + transformLength(180, shipLengthInPs, shipLength),
    ])
    const _p6 = map.unproject([
      centerX - transformLength(57, shipWidthInPs, shipWidth),
      centerY + transformLength(180, shipLengthInPs, shipLength),
    ])
    const _p7 = map.unproject([
      centerX - transformLength(80, shipWidthInPs, shipWidth),
      centerY + transformLength(140, shipLengthInPs, shipLength),
    ])
    const _p8 = map.unproject([
      centerX - transformLength(80, shipWidthInPs, shipWidth),
      centerY - transformLength(320, shipLengthInPs, shipLength),
    ])
    const _p9 = map.unproject([
      centerX - transformLength(50, shipWidthInPs, shipWidth),
      centerY - transformLength(370, shipLengthInPs, shipLength),
    ])
    return [
      [_p1.lng, _p1.lat],
      [_p2.lng, _p2.lat],
      [_p3.lng, _p3.lat],
      [_p4.lng, _p4.lat],
      [_p5.lng, _p5.lat],
      [_p6.lng, _p6.lat],
      [_p7.lng, _p7.lat],
      [_p8.lng, _p8.lat],
      [_p9.lng, _p9.lat],
      [_p1.lng, _p1.lat],
    ]
  }
  getTriangleShipCoords(center, map) {
    //  获取三角形船的坐标
    const { x, y } = map.project(center)
    const _p1 = map.unproject([x, y - 29.42 * triangleShipSize])
    const _p2 = map.unproject([x + 10 * triangleShipSize, y + 9.58 * triangleShipSize])
    const _p3 = map.unproject([x - 10 * triangleShipSize, y + 9.58 * triangleShipSize])
    return [
      [_p1.lng, _p1.lat],
      [_p2.lng, _p2.lat],
      [_p3.lng, _p3.lat],
      [_p1.lng, _p1.lat],
    ]
  }
  realShipIconCondition(params) {
    //  判断开始渲染大船图标的条件
    const { length, breadth, zoom } = params
    const condition =
      ((zoom >= 13 && zoom < 14 && length > 200) ||
        (zoom >= 14 && zoom < 15 && length > 100) ||
        (zoom >= 15 && zoom < 16 && length > 60) ||
        (zoom >= 16 && zoom < 17 && length > 30) ||
        zoom >= 17) &&
      length > 0 &&
      breadth > 0 &&
      breadth / length < 0.5 &&
      length <= 400
    return condition
  }
  generateShipGeoJson() {
    const zoom = +this.map.getZoom().toFixed(1)
    this.shipsGeoJson.features = []
    const pitch = this.map.getPitch()
    const is3D = pitch > 0
    is3D && this.map.setPitch(0)
    for (let i = 0; i < this.shipData.length; i++) {
      //  处理数据
      let ship = this.shipData[i]
      const { length, breadth, lat, lon, heading, course, speed, customName, name } = ship
      let center = [lon / 600000, lat / 600000]
      const shipName = customName ? customName : name
      const shipHead = heading && heading !== -1 ? heading : course / 10
      const condition = this.realShipIconCondition({ length, breadth, zoom })
      const centerObj = {
        toHead: 0,
        toRight: 0,
        toTail: 0,
        toLeft: 0,
      }
      const shipCoords = condition
        ? this.getBigShipCoords(center, breadth, length, this.map, centerObj)
        : this.getTriangleShipCoords(center, this.map)

      const polygon = turf.polygon([shipCoords])
      const _heading = shipHead - this.map.getBearing()
      const rotatedPolygon = turf.transformRotate(polygon, _heading, {
        pivot: center, // 以中心点为旋转中心
      })
      rotatedPolygon.properties = {
        shipName,
        speed,
        lat: lat / 600000,
        lng: lon / 600000,
        heading: shipHead,
        course: course / 10,
      }
      this.shipsGeoJson.features.push(rotatedPolygon)
    }
    is3D && this.map.setPitch(pitch)
    this.drawShip()
  }
  drawShip() {
    //  绘制船
    const data = this.shipsGeoJson
    const source = this.map.getSource('shipsSource')
    if (source) {
      source.setData(data)
    } else {
      this.map.addSource('shipsSource', {
        type: 'geojson',
        data: data,
      })
    }
    const shipsLayer = this.map.getLayer(shipsLayerName)
    if (!shipsLayer) {
      this.map.addLayer(this.shipsLayer)
    }
    const shipsNameLayer = this.map.getLayer(shipsNameLayerName)
    if (!shipsNameLayer) {
      this.map.addLayer({
        id: 'shipsNameLayer:86',
        type: 'symbol',
        source: 'shipsSource',
        layout: {
          'text-field': ['get', 'shipName'],
          'text-size': 12,
          'text-anchor': 'center',
          'text-overlap': 'never',
          'text-offset': [0, -2],
          'text-max-width': 20,
        },
        paint: {
          'text-color': '#000000',
        },
      })
    }
  }
}
export { Ship }
