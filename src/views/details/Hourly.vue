<template>
    <v-container>
        <div>1時間ごとの気象予報</div>
        <!-- １週間予報の一覧表 -->
        <v-data-table
            :headers="headers"
            :items="hourly"
        >
            <!-- icon列の表示方法をv-imgタグに変更する -->
            <template v-slot:[`item.icon`]="{ item }">
                <v-img :src="item.icon" height="30" width="30"></v-img>
            </template>
        </v-data-table>
    </v-container>
</template>
<script>
export default {
    name: "hourly",
    data() {
        return {
            /**
             * 一覧のヘッダー情報
             */
            headers: [
                { text: "日時", value: "dt" },
                { text: "天気", value: "icon" },
                { value: "description" },
                { text: "気温", value: "temp" },
                { text: "降雨", value: "rain" },
                { text: "湿度", value: "humidity" },
                { text: "雲量", value: "clouds" },
            ],
        };
    },
    // 算出プロパティ
    computed: {
        /**
         * 一覧のデータ情報
         * 単位を付加、null時の置き換え、文字列形式の変換などを行う。
         */
        hourly() {
            var hourly = this.$store.getters.hourly ? this.$store.getters.hourly : [];
            return hourly.map(item => {
                var date = new Date(item.dt * 1000);
                var dt = date.toLocaleDateString() + " " + date.toLocaleTimeString();
                var icon = "http://openweathermap.org/img/wn/" + item.weather[0].icon + "@2x.png";
                var description = item.weather[0].description;
                var temp = item.temp + "°C";
                var rain = (item.rain && item.rain["1h"] ? item.rain["1h"] : 0) + "mm";
                var humidity = item.humidity + "%";
                var clouds = item.clouds + "%";
                return { dt, icon, description, temp, rain, humidity, clouds };
            });
        }
    }
}
</script>

