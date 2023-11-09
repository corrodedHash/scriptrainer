<template>
  <div id="app">
    <menu-bar v-on:selectionMade="selectTrainer" />
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()

import MenuBar from '@/components/MenuBar.vue'
const selectTrainer = (t: string) => {
  router.push(`/${t}`)
}
</script>

<style scoped>
#quizbox {
  display: flex;
  flex-direction: column;
  width: 20em;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
}

#app {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
