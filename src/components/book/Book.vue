<template>
    <router-link
            tag="article"
            :to="{name: 'book', params: {book: book.ISBN}}"
            class="book">
        <img :src="book.img" :alt="book.title">
        <p>{{ book.title }}</p>
    </router-link>
</template>

<script>
    export default {
        props: {
            book: {
                type: Object,
                required: true
            }
        },
        name: 'book_component'
    }
</script>

<style scoped>
    .book {
        display: grid;
        background-color: #fff;
        justify-items: center;
        cursor: pointer;
        transition: all .3s ease;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    }

    .book:hover {
        box-shadow: 0 8px 17px 2px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
    }

    p {
        align-self: end;
        padding: 11px 0;
        margin: 0;
    }

    .book img {
        width: 100%;
    }
</style>