import { createStore } from "vuex";

export default createStore({
  namespaced: true,
  state: {
    showShipInfo: false, //  是否显示船舶信息
    currentShipInfo: null, //  当前船舶信息
    time: '00:00:00', //  当前时间
    dateTime: '0000-00-00 00:00:00', //  当前日期时间
  },
  mutations: {
    SET_SHOW_SHIP_INFO: (state, payload) => {
      state.showShipInfo = payload;
    },
    SET_CURRENT_SHIP_INFO: (state, payload) => {
      state.currentShipInfo = payload;
    },
    SET_TIME: (state, payload) => {
      state.time = payload;
    },
    SET_DATE_TIME: (state, payload) => {
      state.dateTime = payload;
    },
  },
  actions: {
  },
  plugins: [
  ],
});
