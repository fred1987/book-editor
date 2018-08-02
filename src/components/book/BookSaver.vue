<template>
    <div>
        <h1>{{ title }}</h1>
        <form @submit.prevent="saveBook">
            <div class="form_wrap">
                <div ref="img_uploader"
                     :class="{active: (imgSrc)}"
                     class="img_upload icon_my shadow">
                    <input
                            name="img"
                            type="file"
                            data-vv-as="Обложка книги"
                            data-vv-name="img"
                            @change="imgChange"
                            v-validate="'mimes:image/*|size:2000'">
                    <img
                            ref="img_upload"
                            v-show="imgSrc"
                            :src="imgSrc"
                            :alt="book.title">
                </div>
                <div class="inputs_wrap shadow">
                    <label>
                        <span>Название книги:</span>
                        <input
                                type="text"
                                name="title"
                                v-model="bookTitle"
                                data-vv-as="Название книги"
                                placeholder="Алмазный меч, деревянный меч"
                                v-validate="'required|max:30'">
                    </label>
                    <label>
                        <span>Название издательства:</span>
                        <input
                                type="text"
                                name="publisher_name"
                                v-model="publisherName"
                                placeholder="Эксмо"
                                data-vv-as="Название издательства"
                                v-validate="'max:30'">
                    </label>
                    <label>
                        <span>ISBN:</span>
                        <input
                                type="text"
                                name="ISBN"
                                v-model="ISBN"
                                placeholder="978-5-699-77398-5"
                                v-validate="{regex: /^(?:ISBN(?:-1[03])?:? )?(?=[-0-9 ]{17}$|[-0-9X ]{13}$|↵[0-9X]{10}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?(?:[0-9]+[- ]?){2}[0-9X]$/}">
                    </label>
                    <label>
                        <span>Имя и фамилия автора:</span>
                        <div class="author_wrap" v-for="author in authors" :key="author.id">
                            <input
                                    type="text"
                                    :name="`author_name_${author.id}`"
                                    v-model="author.name"
                                    data-vv-as="Имя автор"
                                    placeholder="Ник"
                                    v-validate="{required: (author.id === 1), max: 20, regex: /^([a-zA-Zа-яА-Я]+)$/}">
                            <input
                                    type="text"
                                    :name="`author_surname_${author.id}`"
                                    data-vv-as="Фамилия автора"
                                    v-model="author.surname"
                                    placeholder="Перумов"
                                    v-validate="{required: (author.id === 1), max: 20, regex: /^([a-zA-Zа-яА-Я]+)$/}">
                            <button
                                    v-if="author.id !== 1"
                                    type="button"
                                    class="icon_cross btn danger"
                                    @click="removeAuthor(author.id)"></button>
                        </div>
                        <button
                                class="btn add_author info"
                                type="button"
                                @click="addAuthor">
                            Добавить автора
                        </button>
                    </label>
                    <label>
                        <span>Количество страниц:</span>
                        <input
                                type="text"
                                name="pages"
                                placeholder="784"
                                v-model="pages"
                                data-vv-as="Количество страниц"
                                v-validate="'required|between:1,10000'">
                    </label>
                    <label>
                        <span>Год публикации:</span>
                        <input
                                type="text"
                                name="year"
                                placeholder="2014"
                                v-model="year"
                                data-vv-as="Год публикации"
                                v-validate="'date_format:YYYY|after:1799'">
                    </label>
                    <label>
                        <span>Дата выхода в тираж:</span>
                        <input
                                type="text"
                                name="circulation_date"
                                data-vv-as="Дата выхода в тираж"
                                v-model="circulationDate"
                                placeholder="13.12.2014"
                                v-validate="'date_format:DD.MM.YYYY|after:31.12.1799'">
                    </label>
                </div>
            </div>
            <ul class="errors" v-if="errors.items.length > 0">
                <li v-for="err in errors.items">{{err.msg}}</li>
            </ul>
            <button
                    ref="submit_btn"
                    class="btn form_submit_btn"
                    type="submit">
                Сохранить книгу
            </button>
            <button
                    v-if="isBook"
                    @click="removeBook"
                    class="btn remove_book_btn danger"
                    type="button">
                Удалить книгу
            </button>
        </form>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import cyrillicToTranslit from 'cyrillic-to-translit-js'

    export default {
        name: 'save_book_component',
        data() {
            return {
                ISBN: '',
                circulationDate: '',
                pages: '',
                publisherName: '',
                year: '',
                bookTitle: '',
                authors: [{
                    id: 1,
                    name: '',
                    surname: ''
                }],
                imgSrc: '',
                authorID: 1
            }
        },
        computed: {
            ...mapState(['book']),
            title() {
                return (this.isBook) ? 'Редактирование книги' : 'Добавление новой книги'
            },
            isBook() {
                return Object.keys(this.book).length !== 0
            }
        },
        created() {
            if (this.isBook) {
                this.ISBN = this.book.ISBN
                this.circulationDate = this.book.circulationDate
                this.pages = this.book.pages
                this.publisherName = this.book.publisherName
                this.bookTitle = this.book.title
                this.authors = this.book.authors
                this.imgSrc = this.book.img
                this.year = this.book.year
            }
        },
        methods: {
            imgChange(e) {
                this.$validator.validate('img').then(result => {
                    if (result) {
                        let el = e.target
                        this.$refs.submit_btn.setAttribute('disabled', 'disabled')
                        if (el.files && el.files[0]) {
                            let reader = new FileReader()
                            reader.onload = () => {
                                let img = this.$refs.img_upload
                                img.src = reader.result
                                img.onload = () => {
                                    this.getBase64(img)
                                }
                            }
                            reader.readAsDataURL(el.files[0])
                            this.$refs.submit_btn.removeAttribute('disabled')
                        }
                    }
                })
            },
            getBase64(img) {
                let canvas = document.createElement('canvas')
                canvas.width = img.naturalWidth
                canvas.height = img.naturalHeight
                let ctx = canvas.getContext('2d')
                ctx.drawImage(img, 0, 0)
                this.imgSrc = canvas.toDataURL('image/png')
            },
            saveBook(e) {
                let elements = e.target.elements
                this.$validator.validate().then(result => {
                    if (result) {
                        let authors = this.authors.filter(x => x.name !== '' && x.surname !== '')
                        let data = {
                            titleTranslit: cyrillicToTranslit().transform(elements.title.value.toLowerCase(), '_'),
                            title: elements.title.value,
                            pages: elements.pages.value,
                            publisherName: elements.publisher_name.value,
                            year: elements.year.value,
                            circulationDate: elements.circulation_date.value,
                            ISBN: elements.ISBN.value,
                            img: this.imgSrc,
                            authors
                        }
                        if (this.isBook) {
                            this.$store.dispatch('updateBook', {data})
                        } else {
                            this.$store.dispatch('addBook', {data})
                        }
                        this.$router.push({name: 'home'})
                    }
                })
            },
            addAuthor() {
                this.authorID++
                this.authors.push({
                    name: '',
                    surname: '',
                    id: this.authorID
                })
            },
            removeAuthor(id) {
                this.authors = this.authors.filter((el) => {
                    return el.id !== id
                })
            },
            removeBook() {
                this.$store.dispatch('removeBook', {ISBN: this.ISBN})
                this.$router.push({name: 'home'})
            }
        }
    }
</script>

<style scoped>
    .form_wrap {
        display: grid;
        grid-gap: 20px;
        grid-template-columns: 250px 1fr;
    }

    .inputs_wrap {
        display: grid;
        grid-gap: 20px;
        grid-template-columns: repeat(3, minmax(200px, 1fr));
        background-color: #fff;
        padding: 11px;
    }

    label span {
        display: block;
        margin-bottom: 5px;
    }

    label:not(:nth-child(4)) input {
        width: 100%;
    }

    label:nth-child(4) {
        grid-column: 1/-1;
    }

    label:nth-child(4) .author_wrap {
        display: grid;
        grid-gap: 20px;
        margin-bottom: 20px;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }

    label:nth-child(4) .author_wrap button {
        grid-column: -1/-1;
    }

    .img_upload {
        position: relative;
        overflow: hidden;
        align-self: center;
        min-height: 200px;
        background-color: #fff;
    }

    .img_upload.active {
        min-height: 0;
    }

    .img_upload:before {
        font-size: 35px;
        display: block;
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: auto;
        transform: translateY(-50%);
        text-align: center;
        z-index: 5;
    }

    .img_upload:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .img_upload:hover:after {
        background-color: #222d32;
        opacity: .3;
    }

    .img_upload:not(.active):before {
        content: '\ea0a';
        color: #1E1C1C;
    }

    .img_upload:not(.active):hover:before {
        color: #fff;
    }

    .img_upload.active:before {
        color: #eee;
    }

    .img_upload.active:hover:before {
        content: '\ea2e';
        color: #fff;
    }

    .img_upload input[type="file"] {
        display: block;
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 100;
    }

    .btn {
        margin: 20px 0 0 20px;
        float: right;
    }

    .add_author {
        float: none;
        margin: 0;
    }

    .icon_cross {
        margin: 0;
        height: 30px;
        line-height: 30px;
        font-size: 13px;
    }

    ul.errors {
        background-color: #f2dede;
        border-color: #ebcccc;
        padding: 11px;
        margin: 20px 0 0 0;
    }

    ul.errors li {
        list-style: none;
        margin-bottom: 7px;
        color: #a94442;
    }
</style>

<style>
    .img_upload img {
        width: 100%;
        float: left;
    }
</style>