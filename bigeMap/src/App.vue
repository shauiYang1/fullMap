<template>
  <div id="bige_map"></div>
</template>
<script setup lang="ts" name="bigeMap">
import { onMounted } from "vue";

const props = defineProps({
  httpurl: {
    type: String,
    default: "http://192.168.3.205:3000",
  },
  mapkey: {
    type: String,
    default: "bigemap.ctw393y0",
  },
  center: {
    type: Array,
    default: () => [31.8179931640625, 117.11885070800781],
  },
  zoom: {
    type: Number,
    default: 16,
  },
});

const loadScript = (url: string) => {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src="${url}"]`)) {
      resolve({
        success: true,
        message: "加载成功",
        url: url,
      });
    }

    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == "complete" || script.readyState == "loaded") {
          resolve({
            success: true,
            message: "加载成功",
            url: url,
          });
        } else {
          throw new Error(`加载失败 ${script.readyState}`);
        }
      };
    } else {
      script.onload = function () {
        resolve({
          success: true,
          message: "加载成功",
          url: url,
        });
      };
      script.onerror = function (err) {
        throw new Error(`加载失败 ${err}`);
      };
    }
    script.src = url;
    document.head.appendChild(script);
  });
};

const init = async () => {
  await loadScript("http://192.168.3.205:3000/bigemap.js/v2.1.0/bigemap.js");
  const { httpurl, mapkey, center, zoom } = props;
  BM.Config.HTTP_URL = httpurl;
  const map = BM.map("bige_map", mapkey, {
    crs: BM.CRS.Baidu,
    center,
    zoom,
    zoomControl: true,
    attributionControl: false,
  });
  map.on("move", () => {
    console.log("move");
  });
  return map;
};
onMounted(async () => {
  const map = await init();
});
</script>
<style src="./assets/css/bigemap.css"></style>
<style scoped>
#bige_map {
  width: 100%;
  height: 100%;
}
</style>
