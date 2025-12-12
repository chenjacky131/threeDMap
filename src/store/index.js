import { createStore } from "vuex";

export default createStore({
  namespaced: true,
  state: {
    showShipInfo: false, //  是否显示船舶信息
    currentShipInfo: null, //  当前船舶信息
  },
  mutations: {
    SET_SHOW_SHIP_INFO: (state, payload) => {
      state.showShipInfo = payload;
    },
    SET_CURRENT_SHIP_INFO: (state, payload) => {
      state.currentShipInfo = payload;
    },
  },
  actions: {
  },
  plugins: [
  ],
});
