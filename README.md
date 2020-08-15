# vue-loading

封装 vue-loading 插件

#### 请求接口增加 loading 显示隐藏

```js
//main.ts 全局写入
import loading from './loading/partialLoding.ts';
Vue.use(glo_loading);

//vue文件里引用
mounted() {
    this.getList();
}
getList() {
    this.$loadingZsq.loadingShow(this.$refs.loadingTable);
    this.$Api.tikTokList().then((res: any) => {
        this.list = res.data.result.info;
        this.$loadingZsq.loadingHide(this.$refs.loadingTable);
    });
}

```

#### 全局路由 loading 显示隐藏

```js
import loading from './loading/loading.ts';

Vue.use(Router);

const routes: any[] = route;

const router = new Router({
  base: '/',
  mode: 'history',
  routes: routes,
});

router.beforeEach((to, from, next) => {
  loading.loadingShow();
  const type = to.meta.type;
  if (type == 'login') {
    next();
    loading.loadingHide();
  } else {
    next(); //如果不需要登录
    loading.loadingHide();
  }
});
```
