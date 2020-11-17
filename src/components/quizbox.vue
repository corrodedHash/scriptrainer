<template>
  <div id="quizbox">
    <preview_section v-bind:quizItems="next_questions" />
    <question_section
      v-bind:quizItem="question_queue.current"
      v-on:solved="this.question_queue.pop()"
    />
  </div>
</template>

<script lang="ts" src="./quizbox.ts" />
<style scoped src="./quizbox.css" />
