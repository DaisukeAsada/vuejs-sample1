<template>
    <v-container>
        <div>1分ごとの降雨量予報</div>
        <!-- １週間予報の一覧表 -->
        <v-data-table
            :headers="headers"
            :items="minutely"
        >
        </v-data-table>
    </v-container>
</template>
<script>
export default {
    name: "minutely",
    data() {
        return {
            /**
             * 一覧のヘッダー情報
             */
            headers: [
                { text: "日時", value: "dt" },
                { text: "降水量", value: "precipitation" },
            ],
        };
    },
    // 算出プロパティ
    computed: {
        /**
         * 一覧のデータ情報
         * 単位を付加、null時の置き換え、文字列形式の変換などを行う。
         */
        minutely() {
            var minutely = this.$store.getters.minutely ? this.$store.getters.minutely : [];
            return minutely.map(item => {
                var date = new Date(item.dt * 1000);
                var dt = date.toLocaleDateString() + " " + date.toLocaleTimeString();
                var precipitation = item.precipitation + "mm";
                return { dt, precipitation, };
            });
        },
    }
}
</script>