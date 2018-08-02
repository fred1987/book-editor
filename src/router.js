import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import Home from './views/Home.vue'
import Book from './views/Book.vue'
import Add from './views/Add.vue'
import EditBook from './views/EditBook.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/add',
        component: Add,
        name: 'add'
    },
    {
        path: '/:book',
        name: 'book',
        component: Book
    },
    {
        path: '/:book/edit',
        component: EditBook,
        name: 'edit-book'
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    if (!store.state.loaded) store.dispatch('getBooks')
    if (to.params.hasOwnProperty('book')) {
        store.commit('book', {ISBN: to.params.book})
        next()
    } else {
        store.commit('clearBook')
        next()
    }
})

export default router
