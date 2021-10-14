import axios from 'axios';

export default {
    /**
     * 気象情報取得APIを呼び出す
     * @param {Number} lat 緯度
     * @param {Number} lon 経度
     * @param {String} appid APIID
     * @param {String} units 単位
     * @param {String} lang 言語
     * @returns Promiseで結果を返す
     */
    get(lat, lon, appid, units, lang) {
        console.log("oneCall", "get", lat, lon, appid, units, lang);
        console.log(process.env.VUE_APP_OPEN_WEATHER_BASE_URL)
        // Axiosを利用してAPIを呼び出す
        const client = axios.create({
            baseURL: process.env.VUE_APP_OPEN_WEATHER_BASE_URL,
            headers: {
                "Content-Type": "application/json",
            }
        });
        var parameter = {
            params: {
                lat,
                lon,
                appid,
                units,
                lang,
            }
        };
        return client.get('/onecall', parameter);
    }
}