import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    image: null,
    cropValues: null
  },
  mutations: {
    SET_CROP_VALUES(state, vals) {
      state.cropValues = vals;
    },
    IMAGE_LOADED(state, img) {
      state.image = img;
    }
  },
  actions: {},
  modules: {}
});
