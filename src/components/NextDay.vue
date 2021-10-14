<template>
    <v-container>
        <v-card-text>
            <v-row>
                <!-- 明日の天気 -->
                <v-col cols="4">
                    <v-img 
                        :src="weatherIcon" 
                        :alt="weatherMain" 
                        width="90"
                    ></v-img>
                    <v-list-item-subtitle v-text="weatherDescription"></v-list-item-subtitle>
                </v-col>
                <!-- 最高気温・最低気温 -->
                <v-col cols="8">
                    <v-card-text class="text-h4 red--text" v-text="maxTemp"></v-card-text>
                    <v-card-text class="text-h4 blue--text" v-text="minTemp"></v-card-text>
                </v-col>
            </v-row>
            <!-- 明日の気象情報 -->
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
    name: "nextDay",
    computed: {
        /**
         * 天気詳細
         */
        weatherDescription() {
            return this.$store.getters.daily ? this.$store.getters.daily[1].weather[0].description : "-";
        },
        /**
         * アイコン
         */
        weatherIcon() {
            return this.$store.getters.daily ? "http://openweathermap.org/img/wn/" + this.$store.getters.daily[1].weather[0].icon + "@2x.png" : "";
        },
        /**
         * 天気概況
         */
        weatherMain() {
            return this.$store.getters.daily ? this.$store.getters.daily[1].weather[0].main : "-";
        },
        /**
         * 最高気温
         */
        maxTemp() {
            return (this.$store.getters.daily ? this.$store.getters.daily[1].temp.max : "-") + "°C";
        },
        /**
         * 最低気温
         */
        minTemp() {
            return (this.$store.getters.daily ? this.$store.getters.daily[1].temp.min : "-") + "°C";
        },
        /**
         * 気象情報
         */
        items() {
            return [
                { name: "降水確率", icon: "mdi-weather-rainy", value: (this.$store.getters.daily ? this.$store.getters.daily[1].pop * 100 : "-") + "%" },
                { name: "降水量", icon: "mdi-weather-rainy", value: (this.$store.getters.daily && this.$store.getters.daily[1].rain ? this.$store.getters.daily[1].rain : "-") + "mm" },
                { name: "日の出", icon: "mdi-weather-sunset-up", value: this.$store.getters.daily ? new Date(this.$store.getters.daily[1].sunrise * 1000).toLocaleTimeString() : "-" },
                { name: "日の入", icon: "mdi-weather-sunset-down", value: this.$store.getters.daily ? new Date(this.$store.getters.daily[1].sunset * 1000).toLocaleTimeString() : "-" },
            ];
        }
    }
}
</script>