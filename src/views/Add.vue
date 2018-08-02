<template>
    <main>
        <save-book/>
    </main>
</template>

<script>
    import SaveBook from '@/components/book/BookSaver.vue'

    export default {
        name: 'edit_book_page',
        components: {SaveBook}
    }
</script>