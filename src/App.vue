<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-toolbar-title>Vue.jsサンプル 天気予報アプリ</v-toolbar-title>
      </div>
    </v-app-bar>

    <v-main>
      <!--都市を選択するヘッダコンポーネント-->
      <location-header :location-items="locationList" @updated="getOneCallData($event)" />
      <!--コンポーネントが変わる時に、アニメーションを行う-->
      <transition name="fade" mode="out-in">
        <!--VueRouterでルーティング設定したコンポーネントを表示する-->
        <router-view/>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import LocationHeader from './components/headers/LocationHeader.vue'
export default {
  name: 'App',
  components: {
    /**
     * 地点を選択するコンポーネント
     */
    LocationHeader,
  },
  data() {
    return {
      /**
       * プルダウンの内容
       */
      locationList :[
          { text: "東京", value: { lat: 35.68944, lon: 139.69167, }, },
          { text: "名古屋", value: { lat: 35.18028, lon: 136.90667, }, },
          { text: "大阪", value: { lat: 34.68639, lon: 135.52, }, },
          { text: "福岡", value: { lat: 33.60639, lon: 130.41806, }, },
      ],
    }
  },
  methods: {
    /**
     * 気象情報APIの呼び出し
     */
    getOneCallData(event) {
        // storeに定義されたactionを呼び出す
        this.$store.dispatch("getOneCallData", event);
    },
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  /* 変化中の動き */
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  /* 表示変化前の設定、非表示変化後の設定 */
  opacity: 0;
}
.fade-leave, .fade-enter-to {
  /* 非表示変化前の設定、表示変化後の設定 */
  opacity: 1;
}
</style>