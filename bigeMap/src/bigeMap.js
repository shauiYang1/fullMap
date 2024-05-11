import { createVNode, render } from 'vue';
import App from './App.vue';

/* type optionType = {
  el: string,
  httpurl: string,
  mapkey: string,
  center: [number, number],
  zoom: number
} */

const bigeMap = (option) => {
  const mask = document.getElementById(option.el);
  const VNode = createVNode(App);
  render(VNode, mask);
}

// const bigeMap = 1212;

export default bigeMap;