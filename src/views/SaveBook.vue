<template>
    <main>
        <save-book :key="isAdd"/>
    </main>
</template>

<script>
    import SaveBook from '@/components/book/BookSaver.vue'

    export default {
        name: 'edit_book_page',
        components: {SaveBook},
        computed: {
            isAdd() {
                return (Object.keys(this.$store.state.book).length !== 0) ? 1 : 2
            }
        }
    }
</script>