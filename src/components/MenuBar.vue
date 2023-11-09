<template>
  <div id="menubar">
    <ul id="horizontal_menu">
      <li class="menuitem_box">
        <drop-down
          id="trainer_selection"
          v-on:selectionMade="handleTrainerSelect"
          v-bind:optionnames="['Korean', 'Braille', 'Cyrillic', 'Myanmar']"
          >Trainer Selection</drop-down
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DropDown from '@/components/DropDown.vue'

export default defineComponent({
  components: {
    DropDown
  },
  methods: {
    handleTrainerSelect(name: string) {
      this.$emit('selectionMade', name)
    }
  }
})
</script>
<style scoped>
#horizontal_menu {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  background-color: #333;
}

.menuitem_box {
  float: left;
}

.menuitem {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  cursor: pointer;
}

/* Change the link color to #111 (black) on hover */
.menuitem:hover {
  background-color: #111;
}
</style>
