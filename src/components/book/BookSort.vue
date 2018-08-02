<template>
    <div v-if="isBooks" class="book_sort">
        <label for="sort">
            Сортировать по:
        </label>
        <select id="sort" @change="sort">
            <option disabled selected>Выберите сортировку</option>
            <option value="title">Названию</option>
            <option value="year">Год публикации</option>
        </select>
    </div>
</template>

<script>
    export default {
        name: 'book_sort_component',
        methods: {
            sort(e) {
                this.$store.dispatch('sort', e.target.value)
            }
        },
        computed: {
            isBooks() {
                return this.$store.state.books.length > 0
            }
        }
    }
</script>

<style scoped>
    .book_sort {
        margin-bottom: 20px;
        background-color: #fff;
        padding: 11px;
        font-size: 1.1em;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    }

    select {
        appearance: none;
        cursor: pointer;
        position: relative;
        width: 250px;
        outline: none;
        border: 1px solid #A9A9A9;
        height: 35px;
        padding: 0 5px;
        background: url("../../assets/img/arrow.jpg") no-repeat right 7px top 50%;
        background-size: 25px;
    }
</style>