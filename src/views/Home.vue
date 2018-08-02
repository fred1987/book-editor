<template>
    <main>
        <book-sort/>
        <book-list/>
    </main>
</template>

<script>
    import BookList from '@/components/book/BookList.vue'
    import BookSort from '@/components/book/BookSort.vue'

    export default {
        name: 'home_page',
        components: {BookList, BookSort}
    }
</script>