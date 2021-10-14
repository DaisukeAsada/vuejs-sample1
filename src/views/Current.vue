<template>
  <v-container id="current">
    <v-row justify="center">
      <v-col md="4" sm="6">
        <v-card 
            class="mx-auto" 
        >
          <!-- 現在の気象情報 -->
          <current-info />
          <v-divider></v-divider>
          <!-- タブ選択肢 -->
          <v-tabs v-model="tabs">
            <v-tab href="#daily">明日の天気</v-tab>
            <v-tab href="#hourly">これからの天気</v-tab>
            <v-tab href="#minutely">降雨予報</v-tab>
          </v-tabs>
          <!-- タブコンテンツ -->
          <v-tabs-items v-model="tabs">
            <v-tab-item value="daily">
              <!-- 翌日の情報 -->
              <next-day />
            </v-tab-item>
            <v-tab-item value="hourly">
              <!-- 1時間ごとの情報 -->
              <next-hourly />
            </v-tab-item>
            <v-tab-item value="minutely">
              <!-- 1分ごとの降雨量 -->
              <precipitation />
            </v-tab-item>
            <!-- ツールチップ -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <!-- フローティングボタン -->
                <v-fab-transition>
                  <v-btn
                    absolute
                    small
                    fab
                    top
                    right
                    color="primary"
                    @click="redirect()"
                    class="v-btn--detail"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-fab-transition>
              </template>
              <span>詳細</span>
            </v-tooltip>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import CurrentInfo from '../components/CurrentInfo.vue'
  import NextHourly from '../components/NextHourly.vue'
  import NextDay from '../components/NextDay.vue'
  import Precipitation from '../components/Precipitation.vue'

  export default {
    name: 'current',
    components: {
      /**
       * 現在の情報
       */
      CurrentInfo,
      /**
       * １時間ごとの情報
       */
      NextHourly,
      /**
       * 翌日の情報
       */
      NextDay,
      /**
       * 1分ごとの降雨量
       */
      Precipitation,
    },
    data() {
      return {
        /**
         * タブ選択
         */
        tabs: null
      };
    },
    methods: {
      /**
       * 詳細ページへ遷移
       */
      redirect() {
        this.$router.push("/details/" + this.tabs);
      },
    }
  }
</script>
<style>
  #current .v-btn--detail {
    /* 詳細ボタンの設定 */
    bottom: 0;
    position: absolute;
    margin: 20px 0 0 0;
  }
</style>