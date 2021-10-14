<template>
    <v-container>
        <!-- 対象日時・地点 -->
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="text-h6" v-text="currentDateTime"></v-list-item-title>
                <v-list-item-subtitle v-text="$store.getters.location"></v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-card-text>
            <v-row>
                <!-- 現在の天気 -->
                <v-col cols="4">
                    <v-img 
                        :src="weatherIcon" 
                        :alt="weatherMain" 
                        width="90"
                    ></v-img>
                    <v-list-item-subtitle v-text="weatherDescription"></v-list-item-subtitle>
                </v-col>
                <!-- 現在の気温 -->
                <v-col 
                    class="text-h3" 
                    cols="8" 
                    v-text="temp"
                ></v-col>
            </v-row>
            <!-- 現在の気象情報 -->
            <v-simple-table>
                <template v-slot:default>
                    <tbody>
                        <tr
                            v-for="(item, index) in items"
                            :key="index"
                        >
                            <td v-text="item.name"></td>
                            <td><v-icon v-text="item.icon"></v-icon></td>
                            <td v-text="item.value"></td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card-text>
    </v-container>
</template>
<script>
export default {
    name: "current",
    computed:  {
        /**
         * 取得日時
         */
        currentDateTime() {
            var currenttime = this.$store.getters.current ? new Date(this.$store.getters.current.dt * 1000) : null;
            return currenttime ? currenttime.toLocaleDateString() + " " + currenttime.toLocaleTimeString() : "";
        },
        /**
         * 気温
         */
        temp() {
            return this.$store.getters.current ? this.$store.getters.current.temp + "°C" : "";
        },
        /**
         * 天気詳細
         */
        weatherDescription() {
            return this.$store.getters.current ? this.$store.getters.current.weather[0].description : "";
        },
        /**
         * アイコン
         */
        weatherIcon() {
            return this.$store.getters.current ? "http://openweathermap.org/img/wn/" + this.$store.getters.current.weather[0].icon + "@2x.png" : "";
        },
        /**
         * 天気概況
         */
        weatherMain() {
            return this.$store.getters.current ? this.$store.getters.current.weather[0].main : "";
        },
        /**
         * 気象情報
         */
        items() {
            return [
                { name: "湿度", icon: "mdi-water-percent", value: (this.$store.getters.current ? this.$store.getters.current.humidity : "-") + "%" },
                { name: "風速", icon: "mdi-weather-windy", value: (this.$store.getters.current ? this.$store.getters.current.wind_speed : "-") + "m/s" },
                { name: "雲量", icon: "mdi-weather-cloudy", value: (this.$store.getters.current ? this.$store.getters.current.clouds : "-") + "%" },
            ];
        },
    },
}
</script>