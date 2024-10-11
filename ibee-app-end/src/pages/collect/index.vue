<template>
  <topTitle />
  <tarbar :active="1"></tarbar>
</template>

<script setup lang='ts'>
import tarbar from '@/components/common/tarbar.vue';
import topTitle from '@/components/common/topTitle.vue';
import { reactive, ref } from 'vue'

</script>
<style scoped lang='less'></style>