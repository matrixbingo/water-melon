export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './Welcome' },
    ],
  },
  { name: '大盘', icon: 'table', path: '/dash-board', component: './dash-board' },
  { name: '板块管理', icon: 'table', path: '/concep-board-manager', component: './concep-board-manager' },
  { name: '个股查看', icon: 'table', path: '/stocks-view-list', component: './stock-view/stocks-view-list' },
  { name: '涨停查看', icon: 'table', path: '/stock-raising-limit-radar', component: './stock-view/stock-raising-limit-radar' },
  { name: '板块查看', icon: 'table', path: '/concep-board-view', component: './concep-board-view' },
  { name: '参数管理', icon: 'table', path: '/param-manager', component: './param-manager' },
  { path: '/', redirect: '/welcome' },
  { path: '*', component: './404' },
];
