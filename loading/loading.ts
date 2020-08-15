import ElementUI from 'element-ui';
import loadingConfig from './components/loading/index.vue'; //全局的一个基本参数配置
import merge from './merge.ts'; //全局的一个基本参数配置

import Vue from 'vue';

const LoadingConstructor = Vue.extend(loadingConfig);

let loading = null;
let fullscreenLoading;
const defaults = {
  text: null,
  fullscreen: true,
  body: false,
  lock: false,
  customClass: '',
};

const loadingShow = (options) => {
  if (Vue.prototype.$isServer) return;
  options = merge({}, defaults, options);
  if (typeof options.target === 'string') {
    options.target = document.querySelector(options.target);
  }
  options.target = options.target || document.body;
  options.body = true;

  let parent = options.body ? document.body : options.target;
  loading = new LoadingConstructor({
    el: document.createElement('div'),
    data: options,
  });

  parent.appendChild(loading.$el);
  Vue.nextTick(() => {
    loading.visible = true;
  });
  //   if (options.fullscreen) {
  //     fullscreenLoading = instance;
  //   }
  return loading;
};
LoadingConstructor.prototype.close = function () {
  setTimeout(() => {
    const target = this.body ? document.body : this.target;
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
    this.$destroy();
  }, 100);
  this.visible = false;
};

const loadingHide = () => {
  loading.close();
  //   if (this.fullscreen) {
  //     fullscreenLoading = undefined;
  //   }
  //   setTimeout(() => {
  //     const target = this.body ? document.body : this.target;
  //     if (this.$el && this.$el.parentNode) {
  //       this.$el.parentNode.removeChild(this.$el);
  //     }
  //     this.$destroy();
  //   }, 100);
  //   this.visible = false;
  //   debugger;
  //   loading.close();
};

const loadingObj = {
  loadingShow,
  loadingHide,
};

export default loadingObj;
