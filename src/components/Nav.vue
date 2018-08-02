<template>
    <nav>
        <router-link class="title" :to="{name: 'home'}" exact>{{ title }}</router-link>
        <router-link class="add_book_link icon_link btn success" :to="{name: 'add'}">Добавить книгу</router-link>
    </nav>
</template>

<script>
    export default {
        name: 'nav_component',
        data() {
            return {
                title: 'Book Editor'
            }
        }
    }
</script>

<style scoped>
    nav {
        height: 50px;
        line-height: 50px;
        background: #1E1C1C;
        z-index: 5;
        padding: 0 20px;
        position: relative;
    }

    .title {
        color: #fff;
        text-decoration: none;
        font-size: 1.2em;
    }

    .add_book_link {
        position: absolute;
        right: 20px;
        top: 10px;
        text-decoration: none;
        padding: 0 11px 0 36px;
        line-height: 30px;
    }

    .add_book_link:before {
        content: '\ea0a';
        display: block;
        position: absolute;
        left: 11px;
        top: 7px;
    }
</style>