<template>
  <tm-app>
    <tm-tabbar :autoSelect="false" v-model:active="props.active" :showSafe=true>
      <tm-tabbar-item activeColor="blue" open-type="reLaunch" text="首页" :iconSize="50" icon="tmicon-home"
        @click="goToItem(0)"></tm-tabbar-item>
      <tm-tabbar-item activeColor="blue" text="收藏" icon="tmicon-collection-fill" :iconSize="50"
        @click="goToItem(1)"></tm-tabbar-item>
      <tm-tabbar-item btn-top fontColor="white" activeColor="white" @click="goToItem(2)"
        style="display: flex; justify-content: center; align-items: center; font-size: 50px;" :iconSize="50"
        :fontSize="30">
        <img :src="Logo" alt=""
          style="font-size: 50px; width: 100px !important; height: 200px !important; position: absolute;">
        <!-- <tm-image :padding="[2, 2]" preview :width="155" :height="156" :src="Logo"></tm-image> -->
      </tm-tabbar-item>
      <tm-tabbar-item activeColor="blue" text="排行榜" unicon="tmicon-ios-ribbon" :iconSize="50" icon="tmicon-ios-ribbon"
        @click="goToItem(3)"></tm-tabbar-item>
      <tm-tabbar-item activeColor="blue" text="个人中心" :iconSize="50" unicon="tmicon-account" icon="tmicon-account"
        @click="goToItem(4)"></tm-tabbar-item>
    </tm-tabbar>
  </tm-app>
</template>
<script lang="ts" setup>
import { ref } from "vue"
import { onShow, onLoad } from "@dcloudio/uni-app"
import Logo from '@/static/logo.svg'
import tmApp from "@/tmui/components/tm-app/tm-app.vue"
import tmTabbar from "@/tmui/components/tm-tabbar/tm-tabbar.vue"
import tmTabbarItem from "@/tmui/components/tm-tabbar-item/tm-tabbar-item.vue"
const props = defineProps({
  active: Number
})
// const acc = ref(0)
const tabUrl = ref([
  {
    acc: 0,
    url: "/pages/index/index",
  },
  {
    acc: 1,
    url: "/pages/collect/index",
  },
  {
    acc: 2,
    url: "/pages/index/index",
  },
  {
    acc: 3,
    url: "/pages/rank/index",
  },
  {
    acc: 4,
    url: "/pages/user/index",
  },
])
const switchTab = (url: string) => {
  uni.switchTab({
    url: url,
  })
}
const goToItem = (id: any) => {
  switchTab(tabUrl.value[id].url)
}

</script>

<style scoped lang="less"></style>
