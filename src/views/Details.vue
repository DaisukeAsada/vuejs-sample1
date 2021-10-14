<template>
    <v-container>
        <v-btn @click="$router.push('/')">Home</v-btn>
        <!--VueRouterでルーティング設定したコンポーネントを表示する-->
        <router-view />
    </v-container>
</template>
<script>
export default {
    name: "details",
}
</script>

