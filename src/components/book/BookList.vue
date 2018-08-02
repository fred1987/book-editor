<template>
    <div>
        <h1>Список книг</h1>
        <div v-if="books.length > 0" class="book_list">
            <book v-for="book in books" :book="book" :key="book.ISBN"/>
        </div>
        <p v-else>Пока не добавлено ни одной книги...</p>
    </div>
</template>

<script>
    import Book from '@/components/book/Book.vue'
    import {mapState} from 'vuex'

    export default {
        name: 'book_list_component',
        components: {Book},
        computed: {
            ...mapState(['books'])
        }
    }
</script>

<style scoped>
    .book_list {
        display: grid;
        grid-auto-rows: minmax(150px, auto);
        grid-gap: 20px;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        justify-items: stretch;
        align-items: stretch;
    }
</style>