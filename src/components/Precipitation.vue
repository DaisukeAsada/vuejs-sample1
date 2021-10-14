<template>
    <v-container>
        <!--棒グラフコンポーネント-->
        <bar-chart :chartData="chartData" :options="options" />
    </v-container>
</template>
<script>
import BarChart from './charts/BarChart.vue'
export default {
    name: "precipitation",
    components : {
        BarChart,
    },
    data() {
        return {
            /**
             * グラフオプション
             */
            options: {
                responsive: true, // ウィンドウのサイズによってグラフの大きさが変わるか
                maintainAspectRatio: false, // グラフの縦横比を固定するか
                scales: {
                    // x軸に関して
                    xAxes: [
                        {
                            // ラベルについて
                            scaleLabel: {
                                display: true,
                            }
                        }
                    ],
                    // y軸に関して
                    yAxes: [
                        {
                            // 目盛りについて
                            ticks: {
                                beginAtZero: true, // 0からスタートするか
                                stepSize: 10, // 目盛りの間隔
                                callback(label) {
                                    return label + 'mm';
                                }
                            }
                        }
                    ],
                },
                // hoverした時に出てくる表示
                tooltips: {
                    callbacks: {
                        label(tooltipItem) {
                            return tooltipItem.yLabel + 'mm';
                        }
                    }
                }
            }
        }
    },
    computed: {
        /**
         * グラフデータ
         */
        chartData() {
            var minutely = this.$store.getters.minutely ? this.$store.getters.minutely : [];
            var labels = minutely.map((item, index) => {
                    var date = new Date(item.dt * 1000)
                    return index % 10 == 0 ? date.toLocaleTimeString() : " ";
                });
            var datasets = [
                {
                    label: "予想降雨量(mm)",
                    data: minutely.map((item) => {
                        return item.precipitation;
                    }),
                }
            ];
            return { labels, datasets };
        },
    },
}
</script>

