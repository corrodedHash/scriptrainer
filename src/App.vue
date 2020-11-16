<template>
  <div id="app">
    <menubar v-on:selectionMade="selectTrainer" />
    <quizbox v-bind:trainer="trainer" />
  </div>
</template>

<script lang="ts" src="./App.ts" />

<style src="./App.css" scoped />
