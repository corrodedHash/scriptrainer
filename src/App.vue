<template>
  <div id="app">
    <menubar v-on:selectionMade="selectTrainer" />
    <quizbox v-bind:trainer="trainer" />
    {{ bla }}
  </div>
</template>

<script lang="ts" >
import { defineComponent } from 'vue'

import quizbox from '@/components/quizbox.vue'
import menubar from '@/components/menubar.vue'
import { Script, convert} from '@pnfo/pali-converter'


export default defineComponent({
    components: {
        menubar, quizbox
    },
    props: {
        peekCount: { type: Number, default: 3 }
    },
    data() {
        return {
            trainer: "Braille"
            , bla: convert('ဖြိုး', Script.RO, Script.MY)
        }
    },
    methods: {
        selectTrainer(trainer: string) {
            this.trainer = trainer
        }
    },
})
</script>

<style scoped >
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
