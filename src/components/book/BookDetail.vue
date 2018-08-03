<template>
    <div>
        <h1>{{ book.title }}</h1>
        <div class="book">
            <img :src="book.img" :alt="book.title" class="shadow">
            <div class="book_data shadow">
                <p><b>Изательство:</b> {{ book.publisherName }}</p>
                <p><b>ISBN:</b> {{ book.ISBN }}</p>
                <p v-if="authors.length === 1"><b>Автор:</b> {{ authors[0] }}</p>
                <p v-else>
                    <b>Авторы: </b>
                    <span
                            v-for="(author, i) in authors"
                            :key="author.id">
                        {{ (authors.length !== i + 1) ? `${author}, ` : author}}
                    </span>
                </p>
                <p><b>Количество страниц:</b> {{ book.pages }}</p>
                <p><b>Год публикации:</b> {{ book.year }}</p>
                <p><b>Дата выхода в тираж:</b> {{ book.circulationDate }}</p>
            </div>
        </div>
        <router-link
                class="btn book_edit_link"
                :to="{name: 'edit-book'}">
            Редактировать книгу
        </router-link>
        <router-link
                class="btn back_link icon_back"
                :to="{name: 'home'}">
            Вернуться к списку книг
        </router-link>

    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: 'book_component',
        computed: {
            ...mapState(['book']),
            authors() {
                let authors = []
                this.book.authors.forEach((item) => {
                    let author = `${item.name} ${item.surname}`
                    authors.push(author)
                })
                return authors
            }
        }
    }
</script>

<style scoped>
    .book {
        display: grid;
        grid-gap: 20px;
        grid-template-columns: 250px 1fr;
    }

    .book img {
        width: 100%;
        justify-self: center;
        max-width: 300px;
    }

    .book_data {
        padding: 11px;
        background-color: #fff;
    }

    .book_edit_link {
        float: right;
        margin: 20px 0 0 0;
    }

    .book_data p:last-child {
        margin: 0;
    }

    @media only screen and (max-width: 630px) {
        .book {
            grid-template-columns: 1fr;
        }
    }
</style>