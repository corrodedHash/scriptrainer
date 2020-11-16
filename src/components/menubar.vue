<template>
  <div id="menubar">
    <ul id="horizontal_menu">
      <li class="menuitem_box">
        <dropdown
          v-on:selectionMade="handleTrainerSelect"
          v-bind:optionnames="['Korean', 'Braille', 'Cyrillic']"
          >Trainer Selection</dropdown
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts" src="./menubar.ts" />
<style scoped src="./menubar.css" />
