<template>
    <v-container>
        <div>1週間の気象予報</div>
        <!-- １週間予報の一覧表 -->
        <v-data-table
            :headers="headers"
            :items="daily"
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
    name: "daily",
    data() {
        return {
            /**
             * 一覧のヘッダー情報
             */
            headers: [
                { text: "日付", value: "dt" },
                { text: "天気", value: "icon" },
                { value: "description" },
                { text: "最高気温", value: "maxTemp" },
                { text: "最低気温", value: "minTemp" },
                { text: "降雨", value: "rain" },
                { text: "湿度", value: "humidity" },
                { text: "雲量", value: "clouds" },
                { text: "日の出", value: "sunrise" },
                { text: "日の入", value: "sunset" },
            ],
        };
    },
    // 算出プロパティ
    computed: {
        /**
         * 一覧のデータ情報
         * 単位を付加、null時の置き換え、文字列形式の変換などを行う。
         */
        daily() {
            var daily = this.$store.getters.daily ? this.$store.getters.daily : [];
            return daily.slice(1).map(item => {
                var date = new Date(item.dt * 1000);
                var dt = date.toLocaleDateString();
                var icon = "http://openweathermap.org/img/wn/" + item.weather[0].icon + "@2x.png";
                var description = item.weather[0].description;
                var maxTemp = item.temp.max + "°C";
                var minTemp = item.temp.min + "°C";
                var rain = (item.rain ? item.rain : 0) + "mm";
                var humidity = item.humidity + "%";
                var clouds = item.clouds + "%";
                var sunrise = new Date(item.sunrise * 1000).toLocaleTimeString();
                var sunset = new Date(item.sunset * 1000).toLocaleTimeString();
                return { dt, icon, description, maxTemp, minTemp, rain, humidity, clouds, sunrise, sunset };
            });
        },
    }
}
</script>

