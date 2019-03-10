export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/form/basic-form' },
      {
        path: '/form/basic-form',
        icon: 'form',
        name: 'form',
        component: './Forms/BasicForm',
      },
      {
        path: '/form/notice',
        icon: 'form',
        name: 'form',
        component: './Forms/notice',
      },
      {
        component: '404',
      },
    ],
  },
];
