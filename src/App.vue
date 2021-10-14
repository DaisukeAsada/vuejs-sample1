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
      <location-header />
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