
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
        name: 'collection'
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
