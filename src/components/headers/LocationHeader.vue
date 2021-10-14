<template>
    <v-container>
      <v-row justify="center">
        <!-- プルダウン -->
        <v-col md="3">
          <v-select
            v-model="location"
            :items="locationList"
            item-text="label"
            return-object
          ></v-select>
        </v-col>
        <!-- 更新ボタン -->
        <v-col md="1">
          <v-btn @click="getOneCallData()">更新</v-btn>
        </v-col>
      </v-row>
    </v-container>
</template>
<script>
export default {
    name: "LocationHeader",
    data() {
        return {
            /**
             * プルダウンの内容
             */
            locationList :[
                { label: "東京", lat: 35.68944, lon: 139.69167, },
                { label: "名古屋", lat: 35.18028, lon: 136.90667, },
                { label: "大阪", lat: 34.68639, lon: 135.52, },
                { label: "福岡", lat: 33.60639, lon: 130.41806, },
            ],
            /**
             * プルダウンの選択値
             */
            location: null,
        };
    },
    /**
     * インスタンスが生成された後のイベント
     */
    created() {
        this.location = this.locationList[0];
    },
    // データプロパティが変化した時の処理
    watch: {
        /**
         * プルダウンの選択値が変わった時の処理
         */
        location() {
            this.getOneCallData();
        }
    },
    methods: {
        /**
         * 気象情報APIの呼び出し
         */
        getOneCallData() {
            // storeに定義されたactionを呼び出す
            this.$store.dispatch("getOneCallData", {
                location: this.location,
            });
        }
    }
}
</script>