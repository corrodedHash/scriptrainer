<template>
  <div class="dropdown">
    <button class="dropbtn"><slot></slot></button>
    <div class="dropdown-content">
      <div
        class="dropdown-item"
        v-for="optname in optionnames"
        :key="optname"
        @:click="handleClick(optname)"
      >
        {{ optname }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ optionnames: string[] }>()
const emits = defineEmits<{ (e: 'selectionMade', name: string): void }>()
const handleClick = (name: string) => emits('selectionMade', name)
</script>
<style scoped>
/* Style The Dropdown Button */
.dropbtn {
  background-color: #2b7e2e;
  color: white;
  padding: 16px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  cursor: pointer;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
  overflow: visible;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content .dropdown-item {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

/* Change color of dropdown links on hover */
.dropdown-content .dropdown-item:hover {
  background-color: #f1f1f1;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}
</style>
