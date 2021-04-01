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
    children: [{
      path: 'type=:currentType',
      name: 'TypePageFiltered',
      component: () => import('../components/List'),
    },
    {
      path: 'subtype=:currentSubType',
      name: 'SubtypePageFiltered',
      component: () => import('../components/List'),
    },
    {
      path: 'type=:currentType/subtype=:currentSubType',
      name: 'BothTypesPageFiltered',
      component: () => import('../components/List'),
    }],
  },
  {
    path: '/pokemon/:id',
    name: 'DetailsPage',
    component: () => import('../components/DetailsPage'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
