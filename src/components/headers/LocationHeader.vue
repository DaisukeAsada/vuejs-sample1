<template>
    <v-container>
      <v-row justify="center">
        <!-- プルダウン -->
        <v-col md="3">
          <v-select
            v-model="location"
            :items="locationItems"
          ></v-select>
        </v-col>
        <!-- 更新ボタン -->
        <v-col md="1">
          <v-btn @click="updated()">更新</v-btn>
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
             * プルダウンの選択値
             */
            location: null,
        };
    },
    props: {
        /**
         * プルダウンの内容
         */
        locationItems: {
            type: Array,
            required: true,
        }
    },
    /**
     * インスタンスが生成された後のイベント
     */
    created() {
        this.location = this.locationItems[0].value;
    },
    // データプロパティが変化した時の処理
    watch: {
        /**
         * プルダウンの選択値が変わった時の処理
         */
        location() {
            this.updated();
        }
    },
    methods: {
        updated() {
            this.$emit('updated', this.location);
        }
    }
}
</script>