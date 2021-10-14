// Vuexの設定スクリプト
import Vue from 'vue'
import Vuex from 'vuex'

// API呼び出しモジュールをインポート
import OneCall from "@/api/oneCall.js"

Vue.use(Vuex)

export default new Vuex.Store({
  // アプリ全体で利用するデータ
  state: {
    /**
     * 気象情報データ
     */
    oneCallData: {},
  },
  // stateから別の値を算出する
  getters: {
    /**
     * 座標を取得する
     * @param {*}} state 
     * @returns 座標（緯度,経度）
     */
    location(state) {
      return state.oneCallData.lat + ", " + state.oneCallData.lon;
    },
    /**
     * 現在の気象情報を取得する
     * @param {*} state 
     * @returns 現在の気象情報
     */
    current(state) {
      return state.oneCallData.current;
    },
    /**
     * 1分ごとの降雨量予報を取得する
     * @param {*} state 
     * @returns 1分ごとの降雨量予報
     */
    minutely(state) {
      return state.oneCallData.minutely;
    },
    /**
     * 1時間ごとの気象情報を取得する
     * @param {*} state 
     * @returns 1時間ごとの気象情報
     */
     hourly(state) {
      return state.oneCallData.hourly;
    },
    /**
     * 1日ごとの気象情報を取得する
     * @param {*} state 
     * @returns 1日ごとの気象情報
     */
     daily(state) {
      return state.oneCallData.daily;
    },
  },
  // stateの値を更新する
  mutations: {
    /**
     * 取得した気象情報データを更新する
     * @param {*} state 
     * @param {*} data 
     */
    setOneCallData(state, data) {
      state.oneCallData = data;
    }
  },
  // API通信などを行い、mutationを呼び出す
  // コンポーネントから直接mutationを呼び出すことは非推奨とされる
  actions: {
    /**
     * 気象情報データを取得し、データを更新する
     * @param {*} param0 
     * @param {*} data 
     */
    getOneCallData({ commit }, data) {
      // 引数から緯度・経度、環境変数からAPPIDを取得
      // 単位はメートル、言語は日本語
      OneCall.get(data.location.lat, data.location.lon, process.env.VUE_APP_OPEN_WEATHER_APP_ID, "metric", "ja")
      .then((response) => {
          console.log("getOneCall Response", response.data);
          commit("setOneCallData", response.data);
      })
      .catch((error) => {
          console.log("getOneCall Error", error);
          commit("setOneCallData", {});
      });
    }
  },
  modules: {
  }
})
