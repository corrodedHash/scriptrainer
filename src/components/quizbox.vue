<template>
    <div id="quizbox" v-if="initialized">
      <preview_section
        v-bind:quizItems="next_questions"
      />
      <question_section
        v-bind:quizItem="question_queue.current"
        v-on:solved="handleSolve"
      />
    </div>
</template>

<script lang="ts" src="./quizbox.ts" />
<style scoped src="./quizbox.css" />
