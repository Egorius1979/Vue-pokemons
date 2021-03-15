import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/list',
    name: 'ListPage',
    component: () => import('../components/List'),
  },
  {
    path: '/list/type=:currentType',
    name: 'TypePageFiltered',
    component: () => import('../components/List'),
  },
  {
    path: '/list/subtype=:currentSubType',
    name: 'SubtypePageFiltered',
    component: () => import('../components/List'),
  },
  {
    path: '/list/type=:currentType/subtype=:currentSubType',
    name: 'BothTypesPageFiltered',
    component: () => import('../components/List'),
  },
  {
    path: '/:id',
    name: 'DetailsPage',
    component: () => import('../components/DetailsPage'),
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
