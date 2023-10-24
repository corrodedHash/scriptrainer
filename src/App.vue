<template>
  <div id="app">
    <menubar v-on:selectionMade="selectTrainer" />
    <quizbox v-bind:trainer="trainer" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { to_syllables } from '@/burmese/mya2rom.mjs'

import quizbox from '@/components/quizbox.vue'
import menubar from '@/components/menubar.vue'
const trainer = ref('Braille')
const selectTrainer = (t: string) => {
  trainer.value = t
}
console.log(to_syllables('ရေးသားတည်းဖြတ်သော'))
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
