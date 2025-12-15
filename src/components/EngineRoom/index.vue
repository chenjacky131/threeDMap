<template>
  <div class="engine-room">
    <div class="engine-room-item">
      <div class="time">{{ store.state.time }}</div>
      <div class="ship-head">
        <div class="data-item top">艏向 127.6°</div>
        <div class="data-item right-top">风向(R) 180.0°</div>
        <div class="data-item right-bottom">风速(R) 30.0kn</div>
        <div class="data-item left-bottom">航速 17.0kn</div>
        <div class="data-item left-top">航向 131.1°</div>
        <div class="ship-nav">
          <div class="blue-line"></div>
          <div class="nav-txt N">N</div>
          <div class="nav-txt S">S</div>
          <div class="nav-txt W">W</div>
          <div class="nav-txt E">E</div>
          <div class="ship-icon"></div>
          <div class="inner-bg"></div>
          <div class="cross">
            <div class="cross-line r"></div>
            <div class="cross-line c"></div>
            <div class="cross-line short d-10"></div>
            <div class="cross-line short d-20"></div>
            <div class="cross-line short d-30"></div>
            <div class="cross-line short d-40"></div>
            <div class="cross-line short d-50"></div>
            <div class="cross-line short d-60"></div>
            <div class="cross-line short d-70"></div>
            <div class="cross-line short d-80"></div>
            <div class="cross-line short d-100"></div>
            <div class="cross-line short d-110"></div>
            <div class="cross-line short d-120"></div>
            <div class="cross-line short d-130"></div>
            <div class="cross-line short d-140"></div>
            <div class="cross-line short d-150"></div>
            <div class="cross-line short d-160"></div>
            <div class="cross-line short d-170"></div>
          </div>
        </div>
      </div>
      <div class="ship-middle">
        <div class="chart">
          <div id="chart1"></div>
        </div>
        <div class="chart">
          <div id="chart2"></div>
        </div>
        <div class="chart">
          <div id="chart3"></div>
        </div>
        <div class="chart">
          <div id="chart4"></div>
        </div>
      </div>
      <div class="ship-bottom">
        <div id="line"></div>
        <div id="gauge"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { useStore } from 'vuex'
const store = useStore()
const timer = ref(null)

onMounted(() => {
  timer.value = setInterval(() => {
    const time = new Date()
    const hours = time.getHours().toString().padStart(2, '0')
    const minutes = time.getMinutes().toString().padStart(2, '0')
    const seconds = time.getSeconds().toString().padStart(2, '0')
    const timeString = `${hours}:${minutes}:${seconds}`;
    const dateTimeString = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${hours}:${minutes}:${seconds}`;
    store.commit('SET_TIME', timeString);
    store.commit('SET_DATE_TIME', dateTimeString);  
  }, 1000)

  let chartDom1 = document.getElementById('chart1')
  let myChart1 = echarts.init(chartDom1)
  let chartDom2 = document.getElementById('chart2')
  let myChart2 = echarts.init(chartDom2)
  let chartDom3 = document.getElementById('chart3')
  let myChart3 = echarts.init(chartDom3)
  let chartDom4 = document.getElementById('chart4')
  let myChart4 = echarts.init(chartDom4)
  let chartDom5 = document.getElementById('line')
  let myChart5 = echarts.init(chartDom5)
  let chartDom6 = document.getElementById('gauge')
  let myChart6 = echarts.init(chartDom6)
  let option1, option2, option3, option4, option5, option6

  option1 = {
    series: [
      {
        type: 'gauge',
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.7, '#00ff00'],
              [1, '#fd666d'],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: '#fff',
          },
        },
        axisTick: {
          distance: -10,
          length: 2,
          lineStyle: {
            color: '#fff',
            width: 1,
          },
        },
        splitLine: {
          distance: -10,
          length: 10,
          lineStyle: {
            color: '#fff',
            width: 1,
          },
        },
        axisLabel: {
          color: '#fff',
          distance: -15,
          fontSize: 12,
        },
        detail: {
          valueAnimation: true,
          formatter: '{value} rpm',
          color: '#fff',
          fontSize: 12,
        },
        data: [
          {
            value: 38,
          },
        ],
      },
    ],
    title: {
      text: '发动机',
      textStyle: {
        color: '#fff',
        fontSize: 14,
      },
      bottom: 0,
    },
  }
  option2 = {
    series: [
      {
        type: 'gauge',
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.7, '#00ff00'],
              [1, '#fd666d'],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: '#fff',
          },
        },
        axisTick: {
          distance: -10,
          length: 2,
          lineStyle: {
            color: '#fff',
            width: 1,
          },
        },
        splitLine: {
          distance: -10,
          length: 10,
          lineStyle: {
            color: '#fff',
            width: 1,
          },
        },
        axisLabel: {
          color: '#fff',
          distance: -15,
          fontSize: 12,
        },
        detail: {
          valueAnimation: true,
          formatter: '{value} rpm',
          color: '#fff',
          fontSize: 12,
        },
        data: [
          {
            value: 50,
          },
        ],
      },
    ],
    title: {
      text: '1#发电机',
      textStyle: {
        color: '#fff',
        fontSize: 14,
      },
      bottom: 0,
    },
  }
  option3 = {
    series: [
      {
        type: 'gauge',
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.7, '#00ff00'],
              [1, '#fd666d'],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: '#fff',
          },
        },
        axisTick: {
          distance: -10,
          length: 2,
          lineStyle: {
            color: '#fff',
            width: 1,
          },
        },
        splitLine: {
          distance: -10,
          length: 10,
          lineStyle: {
            color: '#fff',
            width: 1,
          },
        },
        axisLabel: {
          color: '#fff',
          distance: -15,
          fontSize: 12,
        },
        detail: {
          valueAnimation: true,
          formatter: '{value} rpm',
          color: '#fff',
          fontSize: 12,
        },
        data: [
          {
            value: 60,
          },
        ],
      },
    ],
    title: {
      text: '2#发电机',
      textStyle: {
        color: '#fff',
        fontSize: 14,
      },
      bottom: 0,
    },
  }
  option4 = {
    series: [
      {
        type: 'gauge',
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.7, '#00ff00'],
              [1, '#fd666d'],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: '#fff',
          },
        },
        axisTick: {
          distance: -10,
          length: 2,
          lineStyle: {
            color: '#fff',
            width: 1,
          },
        },
        splitLine: {
          distance: -10,
          length: 10,
          lineStyle: {
            color: '#fff',
            width: 1,
          },
        },
        axisLabel: {
          color: '#fff',
          distance: -15,
          fontSize: 12,
        },
        detail: {
          valueAnimation: true,
          formatter: '{value} rpm',
          color: '#fff',
          fontSize: 12,
        },
        data: [
          {
            value: 53,
          },
        ],
      },
    ],
    title: {
      text: '3#发电机',
      textStyle: {
        color: '#fff',
        fontSize: 14,
      },
      bottom: 0,
    },
  }
  option5 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#fff',
        },
      },
    },
    xAxis: {
      type: 'category',
      data: ['冷藏舱(左前)', '冷藏舱(右后)', '速冻舱(左前)', '苏东舱(右后)', '肉库', '菜库'],
      axisLabel: {
        color: '#fff',
        fontSize: 10,
        interval: 0,
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#fff',
        fontSize: 10,
      },
      splitNumber: 3,
    },
    textStyle: {
      color: '#fff',
      fontSize: 12,
    },
    series: [
      {
        data: [5, 8, -22.5, -19, -3, 5],
        type: 'bar',
        name: '温度',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
      },
    ],
  }
  option6 = {
    series: [
      {
        type: 'gauge',
        min: -50,
        max: 50,
        splitNumber: 10,
        radius: '90%',
        axisLine: {
          lineStyle: {
            color: [[1, '#fff']],
            width: 2,
          },
        },
        splitLine: {
          distance: 0,
          length: 10,
          lineStyle: {
            color: '#fff',
          },
        },
        axisTick: {
          distance: 0,
          length: 6,
          lineStyle: {
            color: '#fff',
          },
        },
        axisLabel: {
          distance: 5,
          color: '#fff',
          fontSize: 12,
        },
        anchor: {
          show: true,
          size: 10,
          itemStyle: {
            borderColor: '#26b0e1',
            borderWidth: 1,
          },
        },
        pointer: {
          offsetCenter: [0, '10%'],
          icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
          length: '98%',
          itemStyle: {
            color: '#26b0e1',
          },
        },
        detail: {
          valueAnimation: true,
          color: '#fff',
          precision: 1,
        },
        title: {
          offsetCenter: [0, '-30%'],
          color: '#fff',
        },
        data: [
          {
            value: -2.7,
            name: '左舵角',
          },
        ],
      },
    ],
  }
  setTimeout(() => {
    myChart1.setOption(option1)
    myChart2.setOption(option2)
    myChart3.setOption(option3)
    myChart4.setOption(option4)
    myChart5.setOption(option5)
    myChart6.setOption(option6)
  }, 1000)
})
onUnmounted(() => {
  clearInterval(timer.value)
})
</script>
<style lang="scss" scoped>
.engine-room {
  width: 500px;
  background: #0d1836;
  position: relative;
  .engine-room-item {
    background: #1d3460;
    position: absolute;
    z-index: 1;
    left: 10px;
    right: 10px;
    bottom: 10px;
    top: 10px;
    border-top-left-radius: 250px;
    border-top-right-radius: 250px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  .time {
    color: #fff;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -5px;
    background: #5180f580;
    font-size: 24px;
    border-radius: 6px;
    padding: 0 10px;
  }
  .ship-head {
    height: 300px;
    position: absolute;
    top: 34px;
    left: 0;
    right: 0;
    color: #fff;
    .ship-nav,
    .inner-bg {
      width: 180px;
      height: 180px;
      background: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
    }
    .inner-bg {
      width: 150px;
      height: 150px;
      background: #1d3460;
      z-index: 2;
    }
    .blue-line {
      width: 150px;
      height: 1px;
      background: #0085ff;
      position: absolute;
      top: 50%;
      z-index: 4;
      left: 50%;
      transform: translateX(-50%) rotate(41deg);
      &::after {
        content: '';
        width: 10px;
        height: 10px;
        background: #0085ff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
      }
      &::before {
        content: '';
        position: absolute;
        border-bottom: 15px solid #0085ff;
        border-left: 8px solid transparent;
        border-right: 9px solid transparent;
        border-top: 10px solid transparent;
        right: 6px;
        transform: rotate(90deg) translateY(-50%);
        top: -12px;
      }
    }
    .cross {
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      top: 0;
    }
    .cross-line {
      height: 1px;
      background: #000000;
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      &.c {
        transform: rotate(90deg);
        transform-origin: center center;
      }
      &.short {
        left: 8px;
        right: 8px;
        transform-origin: center center;
        &.d-10 {
          transform: rotate(10deg);
        }
        &.d-20 {
          transform: rotate(20deg);
        }
        &.d-30 {
          transform: rotate(30deg);
        }
        &.d-40 {
          transform: rotate(40deg);
        }
        &.d-50 {
          transform: rotate(50deg);
        }
        &.d-60 {
          transform: rotate(60deg);
        }
        &.d-70 {
          transform: rotate(70deg);
        }
        &.d-80 {
          transform: rotate(80deg);
        }
        &.d-100 {
          transform: rotate(100deg);
        }
        &.d-110 {
          transform: rotate(110deg);
        }
        &.d-120 {
          transform: rotate(120deg);
        }
        &.d-130 {
          transform: rotate(130deg);
        }
        &.d-140 {
          transform: rotate(140deg);
        }
        &.d-150 {
          transform: rotate(150deg);
        }
        &.d-160 {
          transform: rotate(160deg);
        }
        &.d-170 {
          transform: rotate(170deg);
        }
      }
    }
    .nav-txt {
      position: absolute;
      font-size: 16px;
      color: #fff;
      &.N {
        top: -25px;
        left: 50%;
        transform: translateX(-50%);
      }
      &.S {
        bottom: -25px;
        left: 50%;
        transform: translateX(-50%);
      }
      &.W {
        left: -25px;
        top: 50%;
        transform: translateY(-50%);
      }
      &.E {
        right: -25px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .ship-icon {
      background: #ffffff;
      width: 16px;
      height: 70px;
      border-top-left-radius: 50%;
      border-top-right-radius: 50%;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) rotate(131deg);
      position: absolute;
      z-index: 3;
    }
    .data-item {
      position: absolute;
      top: 0;
      left: 0;
      width: 96px;
      border: 1px solid #fff;
      border-radius: 4px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      white-space: nowrap;
      font-size: 14px;
      &.top {
        left: 50%;
        transform: translateX(-50%);
        top: 10px;
      }
      &.right-top {
        top: 60px;
        right: 62px;
        left: auto;
      }
      &.right-bottom {
        bottom: 60px;
        right: 62px;
        left: auto;
        top: auto;
      }
      &.left-bottom {
        bottom: 60px;
        left: 62px;
        top: auto;
      }
      &.left-top {
        top: 60px;
        left: 62px;
      }
    }
  }
  .ship-middle {
    position: absolute;
    width: 100%;
    top: 300px;
    height: 270px;
    display: flex;
    flex-wrap: wrap;
    .chart {
      height: 50%;
      width: 50%;
      & > div {
        width: 100%;
        height: 100%;
      }
    }
  }
  .ship-bottom {
    position: absolute;
    top: 520px;
    width: 100%;
    #line {
      height: 200px;
    }
    #gauge {
      height: 180px;
      margin-top: -50px;
    }
  }
}
</style>
