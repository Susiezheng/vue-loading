import loadingConfig from './partialLoding.vue';
import afterLeave from './after-leave';
import Vue from 'vue';

const LoadingConstructor = Vue.extend(loadingConfig);

const defaults: any = {
  body: false,
  customClass: '',
};
const instances: any[] = [];
LoadingConstructor.prototype.close = function(i: any) {
  instances.splice(i, 1);
  afterLeave(
    this,
    (_: any) => {
      //   const target = this.body ? document.body : this.target;
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
      this.$destroy();
    },
    300
  );
  this.visible = false;
};

const loadingShow = (options: any) => {
  let parent: any = null;
  let loading: any = null;
  if (Vue.prototype.$isServer) {
    return;
  }
  if (options) {
    defaults.target = options;
  } else {
    defaults.target = document.body;
  }

  parent = options ? options : document.body;
  loading = new LoadingConstructor({
    el: document.createElement('div'),
    data: defaults,
  });

  parent.$el
    ? parent.$el.appendChild(loading.$el)
    : parent.appendChild(loading.$el);
  Vue.nextTick(() => {
    loading.parent = parent;
    loading.visible = true;
  });
  instances.push({ par: options, el: loading });
  return loading;
};

const loadingHide = (options: any) => {
  const len = instances.length;

  for (let i = 0; i < len; i++) {
    if (options === (instances[i] && instances[i].par)) {
      instances[i].el.close(i);
    }
  }
};

export const loadingObj = {
  loadingShow,
  loadingHide,
};

const loadingDirective: any = {};
// tslint:disable-next-line:no-shadowed-variable
loadingDirective.install = (Vue: any) => {
  Vue.prototype.$loadingZsq = loadingObj;
};

export default loadingDirective;
