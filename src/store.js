import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        books: [],
        book: {},
        loaded: false
    },
    mutations: {
        sort(state, payload) {
            state.books.sort((a, b) => {
                switch (payload) {
                    case 'title':
                        if (a.title > b.title) {
                            return 1
                        }
                        if (a.title < b.title) {
                            return -1
                        }
                        return 0
                    case 'year':
                        return a.year - b.year
                }
            })
        },
        book(state, payload) {
            state.book = state.books.find(x => x.ISBN === payload.ISBN)
        },
        clearBook(state) {
            state.book = {}
        },
        addBook(state, payload) {
            state.books.unshift(payload)
        },
        updateBook(state, payload) {
            state.books.forEach((item, i) => {
                if (item.ISBN === payload.ISBN) {
                    state['books'][i] = payload
                }
            })
        },
        removeBook(state, payload) {
            state.books = state.books.filter(x => x.ISBN !== payload.ISBN)
        },
        saveBooks(state, payload) {
            state.loaded = true
            state.books = payload
        }
    },
    actions: {
        sort(store, payload) {
            store.commit('sort', payload)
            localStorage.setItem('books', JSON.stringify(store.state.books))
        },
        updateBook(store, payload) {
            store.commit('updateBook', payload.data)
            localStorage.setItem('books', JSON.stringify(store.state.books))
        },
        addBook(store, payload) {
            store.commit('addBook', payload.data)
            localStorage.setItem('books', JSON.stringify(store.state.books))
        },
        getBooks(store) {
            let books = JSON.parse(localStorage.getItem('books'))
            if (books) store.commit('saveBooks', books)
        },
        removeBook(store, payload) {
            store.commit('removeBook', payload)
            localStorage.setItem('books', JSON.stringify(store.state.books))
        }
    }
})