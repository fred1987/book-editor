<template>
    <div id="app">
        <header>
            <nav-app/>
        </header>
        <router-view/>
        <footer-app/>
    </div>
</template>

<script>
    import NavApp from '@/components/Nav.vue'
    import FooterApp from '@/components/Footer.vue'

    export default {
        name: 'app',
        components: {NavApp, FooterApp}
    }
</script>

<style>
    @import "assets/css/normalize.css";
    @import "assets/css/icomoon.css";
    @import "assets/css/main.css";
</style>