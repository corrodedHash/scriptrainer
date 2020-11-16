<template>
  <div class="dropdown">
    <button class="dropbtn"><slot></slot></button>
    <div class="dropdown-content">
      <div class="dropdown-item" v-for="optname in optionnames" v-on:click="clickHandler(optname)">{{
        optname
      }}</div>
    </div>
  </div>
</template>

<script lang="ts" src="./dropdown.ts" />
<style scoped src="./dropdown.css" />
