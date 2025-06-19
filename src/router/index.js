import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import MyMusic from '../views/MyMusic.vue';
import About from '../views/About.vue';
import NewMusic from '../views/NewMusic.vue';
import Throwback from '../views/Throwback.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/library',
            name: 'library',
            component: MyMusic
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/releases',
            name: 'releases',
            component: NewMusic
        },
        {
            path: '/throwback',
            name: 'throwback',
            component: Throwback
        },
        {
            path: '/:catchAll(.*)', // Rota para lidar com caminhos não encontrados
            redirect: '/' // Redireciona para a home
        }
    ]
})

export default router;