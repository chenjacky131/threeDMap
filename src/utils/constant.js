const tk = '97695e2519cbdde8fb92aa6ebb3532a5'
export const map_source = {
  'addressInfo:6': {
    //  标注
    type: 'raster',
    tiles: [
      `https://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${tk}`,
    ],
    tileSize: 256,
  },
  'satelliteMap:5': {
    // 卫星图
    type: 'raster',
    tiles: [`https://t0.tianditu.gov.cn/DataServer/?T=img_w&X={x}&Y={y}&L={z}&tk=${tk}`],
    tileSize: 256,
  },
  "seaMapDayStandard:5": {
    //  海图白天标准
    type: "raster",
    tiles: [`/api/tiles/day/standard/{z}/{y}/{x}.png`],
    tileSize: 256,
  },
}
