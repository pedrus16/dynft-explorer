
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), 'name': 'home' },
      {
        path: ':publisher_id',
        component: () => import('pages/Publisher.vue'),
        name: 'publisher'
      },
      {
        path: ':publisher_id/:collection_id',
        component: () => import('pages/Collection.vue'),
        name: 'collection',
        props: true
      },
      {
        path: ':publisher_id/:collection_id/:item_id',
        component: () => import('pages/Collection.vue'),
        name: 'collection-item',
        props: true
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
