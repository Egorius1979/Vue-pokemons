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
    props: (route) => ({ query: route.query.page }),
    component: () => import('../components/List'),
    children: [{
      path: 'type=:currentType',
      name: 'TypePageFiltered',
      props: (route) => ({ query: route.query.page }),
      component: () => import('../components/List'),
    },
    {
      path: 'subtype=:currentSubType',
      name: 'SubtypePageFiltered',
      props: (route) => ({ query: route.query.page }),
      component: () => import('../components/List'),
    },
    {
      path: 'type=:currentType/subtype=:currentSubType',
      name: 'BothTypesPageFiltered',
      props: (route) => ({ query: route.query.page }),
      component: () => import('../components/List'),
    }],
  },
  {
    path: '/:id',
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
