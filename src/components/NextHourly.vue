<template>
    <v-container>
        <!-- 今後の１時間ごとの気象情報 -->
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th>日時</th>
                        <th>天気</th>
                        <th>気温</th>
                        <th>降雨</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, index) in hourly"
                        :key="index"
                    >
                        <td v-text="item.dt"></td>
                        <td><v-img :src="item.icon" height="30" width="30"></v-img></td>
                        <td v-text="item.temp"></td>
                        <td v-text="item.rain"></td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-container>
</template>

<script>
export default {
    name: "nextHourly",
    computed: {
        /**
         * 1時間ごとの気象情報
         */
        hourly() {
            var hourly = this.$store.getters.hourly ? this.$store.getters.hourly : [];
            // 直近６時間分を抽出
            return hourly.slice(0, 6).map(item => {
                var date = new Date(item.dt * 1000);
                var dt = date.toLocaleDateString() + " " + date.toLocaleTimeString();
                var icon = "http://openweathermap.org/img/wn/" + item.weather[0].icon + "@2x.png";
                var temp = item.temp + "°C";
                var rain = (item.rain && item.rain["1h"] ? item.rain["1h"] : 0) + "mm";
                return { dt, icon, temp, rain };
            });
        },
    }
}
</script>